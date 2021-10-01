import { createRef, RefObject, useRef } from 'react';

const useAnimation = (wipeCount: number, slideCount: number, growCount: number) => {

  const wipeRefs = useRef<RefObject<HTMLElement>[]>(Array(wipeCount).fill('').map(() => createRef()));
  const slideRefs = useRef<RefObject<HTMLDivElement>[]>(Array(slideCount).fill('').map(() => createRef()));
  const growRefs = useRef<RefObject<HTMLSpanElement>[]>(Array(growCount).fill('').map(() => createRef()));

  return {
    wipeRefs, 
    slideRefs,
    growRefs
  };

};

export default useAnimation;