'use client';
import React from 'react';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';

export interface Highlighter {
  str: string;
  lang: string;
}

export const useHighlight = (str: string) => {
  const [code, setCode] = React.useState<string>('');

  React.useEffect(() => {
    if (str) {
      setCode(str);
    }
  }, [str]);

  React.useEffect(() => {
    const worker = new Worker(new URL('../workers/worker.ts', import.meta.url));
    worker.onmessage = (event) => {
      setCode(event.data);
    };
    worker.postMessage({ code: code, pathToHighlightJS: hljs });
    return () => {
      worker.terminate();
    };
  }, [code]);

  return { code };
};
