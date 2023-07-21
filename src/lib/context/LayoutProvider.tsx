'use client';
import React from 'react';

export interface LayoutContextProps {
  children: React.ReactNode | React.ReactNode[];
}
interface LayoutProps {
  logoHovered: boolean;
  setLogoHovered: (value: boolean) => void;
}

export const RootLayoutContext = React.createContext<LayoutProps | null>(null);

export const useLayoutContext = () => {
  const [logoHovered, setLogoHovered] = React.useState(false);

  const value = React.useMemo(
    () => ({ logoHovered, setLogoHovered }),
    [logoHovered, setLogoHovered],
  );
  return value;
};
export default function LayoutProvider({ children }: LayoutContextProps) {
  const value = useLayoutContext();
  return (
    <RootLayoutContext.Provider value={value}>
      {children}
    </RootLayoutContext.Provider>
  );
}
