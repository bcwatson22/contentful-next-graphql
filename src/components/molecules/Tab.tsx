import { RefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IProps {
  wrapper: RefObject<HTMLDivElement>;
  tab: RefObject<HTMLElement>;
  hide: boolean;
  forward: boolean;
  first?: boolean;
  children: JSX.Element;
}

const tween = { 
  duration: 0.3, 
  ease: 'power2.inOut'
};

const Tab = ({ wrapper, tab, forward, hide, first = false, children }: IProps) => {

  const tl = useRef(gsap.timeline({ paused: true }));
  const firstRender = useRef(true);

  const getAnimValue = () => {
  
    let value = null;
  
    switch (true) {
  
      case (!hide && forward)
        || (hide && !forward):
        value = 20;
        break;
  
      case (hide && forward)
        || (!hide && !forward):
        value = -20;
        break;
  
      default:
        value = 0;
        break;
  
    }

    return value;

  };

  useEffect(() => {

    const oldHeight = wrapper.current?.scrollHeight;

    if (firstRender.current) {

      if (first) gsap.set(tab.current, { opacity: 1, visibility: 'visible', display: 'block' });

      firstRender.current = false;

    } else {

      gsap.set(tab.current, { position: 'absolute' });

      const animValue = getAnimValue();

      if (hide) {

        tl.current
          .to(tab.current, {
            autoAlpha: 0,
            x: animValue,
            clearProps: 'display,opacity,visibility,position',
            ...tween
          });
  
      } else {
  
        gsap.set(tab.current, { display: 'block' });
  
        const newHeight = tab.current?.scrollHeight;
  
        tl.current
          .fromTo(wrapper.current, {
            height: oldHeight
          }, {
            height: newHeight,
            ...tween,
            delay: 0.15
          });
  
        tl.current
          .fromTo(tab.current, {
            autoAlpha: 0,
            x: animValue,
          }, {
            autoAlpha: 1,
            x: 0,
            clearProps: 'position',
            onComplete: () => {
              
              gsap.set(wrapper.current, { clearProps: 'height' });
              
            },
            ...tween
          });
  
      }
  
      tl.current.play();

    }

  }, [hide]);

  return children;

};

export default Tab;
