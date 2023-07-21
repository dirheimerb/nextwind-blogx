'use client';
import { FadeInStaggerContext } from '@/ui/FadeIn';
import React from 'react';

export const useFadeInStaggerContext = () => {
  const [fade, setFade] = React.useState<boolean>(false);
  const fadeIn = React.useContext(FadeInStaggerContext);

  React.useEffect(() => {
    setFade(fadeIn);
  }, [fadeIn]);

  return fade;
};
