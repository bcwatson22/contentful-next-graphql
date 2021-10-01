import { createRef, RefObject, useRef, useState } from 'react';

const useTabs = (length: number, initial: string) => {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<RefObject<HTMLDivElement>[]>(Array(length).fill('').map(() => createRef()));
  const [forward, setForward] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>(initial);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activateTab = (id: string, i: number): void => {

    setForward(activeIndex < i);
    setActiveTab(id);
    setActiveIndex(i);
  
  };

  return {
    wrapperRef,
    tabRefs,
    forward,
    activeTab,
    activateTab
  };

};

export default useTabs;
