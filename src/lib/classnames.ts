import { twJoin, twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...classNames: (string | undefined)[]): string {
  const mergedClassNames = twMerge(...classNames.filter(Boolean));
  return clsx(mergedClassNames);
}
export function cnb(...classNames: (string | undefined)[]): string {
  const mergedClassNames = twMerge(...classNames.filter(Boolean));
  return clsx(mergedClassNames, 'block');
}
export function cnJoin(...classNames: (string | undefined)[]): string {
  const merged = twJoin(clsx(...classNames));
  return merged;
}

export function join(...args: string[]): string {
  return args.filter(Boolean).join(' ');
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function isClient(): boolean {
  return !isServer();
}
