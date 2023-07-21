'use client';
import React from 'react';

export interface PageLevelContextType {
  level: number;
}

export const PageLevelContext = React.createContext<PageLevelContextType>({
  level: 0,
});
export const PageLevelProvider = PageLevelContext.Provider;
export const PageLevelConsumer = PageLevelContext.Consumer;

export function usePageLevel() {
  const context = React.useContext(PageLevelContext);
  const [level, setLevel] = React.useState(context.level);
  if (context === undefined) {
    throw new Error('usePageLevel must be used within a PageLevelProvider');
  }

  const handleLevelChange = React.useCallback(
    (newLevel: number) => {
      setLevel(newLevel);
    },
    [setLevel],
  );

  React.useEffect(() => {
    if (context.level !== level) {
      handleLevelChange(context.level);
    }
  }, [context.level, level, handleLevelChange]);

  return {
    level,
    handleLevelChange,
  };
}
