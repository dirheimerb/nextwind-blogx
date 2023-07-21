'use client';
import React from 'react';
import md from '@/lib/markdown';
import { MarkdownContext } from '@/lib/context/MarkdownProvider';

// export const useMarkdown = () => {
//     const { markdown, html } = React.useContext(MarkdownContext);
//     const [markdownValue, setMarkdownValue] = React.useState<string>('');
//     const [htmlValue, setHtmlValue] = React.useState<string>('');

//     React.useEffect(() => {
//         setHtmlValue(html);
//     }, [html]);

//     React.useEffect(() => {
//         setMarkdownValue(markdown);
//         setHtmlValue(md.render(markdown));
//     }, [markdown]);

//     return {
//         markdownValue,
//         htmlValue,
//     };
// };

export const useMarkdown = () => {
  const [markdown, setMarkdown] = React.useState<string>('');
  const [html, setHtml] = React.useState<string>('');

  const handleMarkdownUpdate = (markdown: string) => {
    setMarkdown(markdown);
  };

  const updatedValue = React.useMemo(() => {
    const value = md.render(markdown);
    value.trim();
    return value;
  }, [markdown]);

  React.useEffect(() => {
    setHtml(updatedValue);
  }, [updatedValue]);

  return {
    markdown,
    html,
    handleMarkdownUpdate,
  };
};

/**
 * 
    
    React.useEffect(() => {
        handleMarkdownUpdate(markdown);

    }, [markdown]);

    return {
        markdown: markdownValue,
        html: htmlValue,
        handleMarkdownUpdate,
    };
};
 */
