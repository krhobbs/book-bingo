import { useEffect, useState } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (windowSize.width && windowSize.height) {
      window.addEventListener('resize', handleResize);
      handleResize();

      if (0 < windowSize.width && windowSize.width < 600) {
        setBreakPoint('sm');
      }
      if (600 < windowSize.width && windowSize.width < 1024) {
        setBreakPoint('md');
      }
      if (windowSize.width >= 1024) {
        setBreakPoint('lg');
      }

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;
