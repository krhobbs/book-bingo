import { useEffect, useState } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

type Breakpoint = 'sm' | 'md' | 'lg';

const useBreakpoint: () => Breakpoint | undefined = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>(
    undefined,
  );
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: undefined,
    width: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowSize.width !== undefined) {
      if (windowSize.width < 600) {
        setBreakpoint('sm');
      } else if (windowSize.width < 1024) {
        setBreakpoint('md');
      } else {
        setBreakpoint('lg');
      }
    }
  }, [windowSize.width]);

  return breakpoint;
};

export default useBreakpoint;
