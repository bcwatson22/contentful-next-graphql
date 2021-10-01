import { useEffect, useRef, useState } from 'react';
import scrollMonitor from 'scrollmonitor';

const useMonitor = () => {

  const monitorRef = useRef<HTMLDivElement>(null);
  const [inViewport, setInViewport] = useState<boolean>(false);

  useEffect(() => {

    const elementWatcher = scrollMonitor.create(monitorRef.current, -300);

    elementWatcher.enterViewport(() => setInViewport(true));  
    
    elementWatcher.exitViewport(() => setInViewport(false));
    
  });

  return {
    monitorRef, 
    inViewport 
  };

};

export default useMonitor;