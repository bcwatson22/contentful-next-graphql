import { useEffect, useRef } from 'react';

const useMounted = (): { current: boolean } => {
  
  const componentIsMounted = useRef(true);

  useEffect(() => {

    return () => { componentIsMounted.current = false; };
  
  }, []);

  return componentIsMounted;

};

export default useMounted;