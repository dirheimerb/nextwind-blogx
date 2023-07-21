'use client';
import React from 'react';
import LayoutContextProvider from '@/lib/context/LayoutProvider';
import MarkdownProvider from '@/lib/context/MarkdownProvider';
import ThemeProvider from '@/lib/context/ThemeProvider';
import { useMarkdown } from '@/hooks/use-markdown';

export interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function Providers({ children }: ProviderProps) {
  const { markdown, html, handleMarkdownUpdate } = useMarkdown();

  return (
    <ThemeProvider>
      <LayoutContextProvider>
        <MarkdownProvider
          markdown={markdown}
          html={html}
          handleMarkdownUpdate={handleMarkdownUpdate}
        >
          {children}
        </MarkdownProvider>
      </LayoutContextProvider>
    </ThemeProvider>
  );
}
