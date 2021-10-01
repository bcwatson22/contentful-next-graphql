import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Expander.module.scss';

interface IProps {
  expanded: boolean;
  delay?: number;
  duration?: number;
  children: ReactNode;
  emitComplete?: () => void;
}

const Expander = ({ expanded, delay = 0, duration = 0.3, children, emitComplete }: IProps) => {

  const expanderRef = useRef<HTMLDivElement>(null);
  const tl = useRef(gsap.timeline({ paused: true }));

  const tween = {
    height: 0,
    duration,
    delay,
    ease: 'power3.inOut'
  };

  const setHeightAuto = () => {
    
    gsap.set(expanderRef.current, { height: 'auto' });

  };

  useEffect(() => {

    if (expanded) {

      setHeightAuto();

      tl.current
        .from(expanderRef.current, {
          ...tween,
          onComplete: setHeightAuto
        })
        .play();

    } else {

      tl.current
        .to(expanderRef.current, {
          ...tween,
          clearProps: true,
          onComplete: () => emitComplete && emitComplete()
        })
        .play();

    }

  }, [expanded]);

  return (
    <div ref={expanderRef}
      className={styles.root}>
      { children }
    </div>
  );

};

export default Expander;
