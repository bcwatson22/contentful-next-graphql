import { useEffect, useState } from 'react';
import { debounce } from '_utils';

interface IWindowSize {
  vw?: number;
  vh?: number;
}

interface IHook {
  hasWindow: boolean;
  windowSize: IWindowSize;
}

const useWindow = (): IHook => {

  const [windowSize, setWindowSize] = useState<IWindowSize>({
    vw: undefined,
    vh: undefined
  });

  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {

    // only execute all the code below in client side
    if (hasWindow) {

      // Handler to call on window resize
      const handleResize = debounce((): void => {

        // Set window width/height to state
        setWindowSize({
          vw: window.innerWidth,
          vh: window.innerHeight,
        });

      }, 100);
    
      // Add event listener
      window.addEventListener('resize', handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);

    }

  }, []); // Empty array ensures that effect is only run on mount

  return { 
    hasWindow,
    windowSize
  };

};

export default useWindow;
