'use client';

import React, { useEffect } from 'react';
import { useMousePosition } from '@/lib/mouse';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export default function Particles({
  className = '',
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  //   const canvasRef = React.useRef<HTMLCanvasElement>(null);
  //   const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  //   const context = React.useRef<CanvasRenderingContext2D | null>(null);
  //   const circles = React.useRef<any[]>([]);
  //   const mousePosition = useMousePosition();
  //   const mouse = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  //   const canvasSize = React.useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  //   const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const context = React.useRef<CanvasRenderingContext2D | null>(null);
  const circles = React.useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = React.useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  // define your functions directly inside useCallback or useEffect
  // omitting unnecessary internal function declarations

  // circleParams, drawCircle, drawParticles, and resizeCanvas
  // are properly defined inside useCallback now

  // animation function defined before its usage

  function circleParams(): Circle {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }

  const drawCircle = React.useCallback(
    (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          circles.current.push(circle);
        }
      }
    },
    [dpr],
  );

  const drawParticles = React.useCallback(() => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [drawCircle, quantity]);

  const resizeCanvas = React.useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const initCanvas = React.useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [drawParticles, resizeCanvas]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    // animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, [initCanvas]);

  const onMouseMove = React.useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  }, [mousePosition.x, mousePosition.y]);

  React.useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y, onMouseMove]);

  React.useEffect(() => {
    initCanvas();
  }, [initCanvas, refresh]);

  function clearContext() {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  }

  function remapValue(
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  }

  const animate = React.useCallback(() => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      // Handle the magnetism
      const distance = Math.sqrt(
        Math.pow(mouse.current.x - circle.x, 2) +
          Math.pow(mouse.current.y - circle.y, 2),
      );
      const remapDistance = remapValue(
        distance,
        0,
        canvasSize.current.w / 2,
        0,
        circle.magnetism,
      );
      circle.dx = circle.dx + (mouse.current.x - circle.x) * remapDistance;
      circle.dy = circle.dy + (mouse.current.y - circle.y) * remapDistance;
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.dx *= 0.9;
      circle.dy *= 0.9;
      // Handle the ease
      circle.translateX += (circle.x - circle.translateX) / ease;
      circle.translateY += (circle.y - circle.translateY) / ease;
      drawCircle(circle, true);
      // Remove circles that are out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
      }
    });
    requestAnimationFrame(animate);
  }, [drawCircle, ease]);

  return (
    <div
      className={className}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
