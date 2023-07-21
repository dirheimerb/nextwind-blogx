'use client';
import React from 'react';

export interface MarkdownContextProps {
  markdown: string;
  html: string;
  handleMarkdownUpdate: (markdown: string) => void;
}

export interface MarkdownProviderProps {
  children: React.ReactNode;
}

export const MarkdownContext = React.createContext<MarkdownContextProps>({
  markdown: '',
  html: '',
  handleMarkdownUpdate: () => {}, // Provide a default function
});

export default function MarkdownProvider({
  children,
  markdown,
  html,
  handleMarkdownUpdate,
}: MarkdownProviderProps & MarkdownContextProps) {
  return (
    <MarkdownContext.Provider value={{ markdown, html, handleMarkdownUpdate }}>
      {children}
    </MarkdownContext.Provider>
  );
}