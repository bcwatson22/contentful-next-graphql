import { ReactNode, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Cross } from '_vectors';
import { delay } from '_utils';

interface IProps {
  launch: boolean;
  wrapper?: boolean;
  background?: boolean;
  button?: boolean;
  classes?: string;
  emitClose?: () => void;
  children: ReactNode;
}

const duration = 0.25;

const tween = {
  autoAlpha: 1,
  duration,
  ease: 'power2.inOut'
};

const Modal = ({ launch, wrapper = true, background = true, button = true, classes, emitClose, children }: IProps) => {

  const [shown, setShown] = useState<boolean>(false);
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLElement>(null);
  const tl = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {

    tl.current
      .to(rootRef.current, {
        ...tween,
        scale: 1,
        onStart: () => {

          gsap.set(bgRef.current, { visibility: 'visible' });
        
        },
        onReverseComplete: () => {

          gsap.set(rootRef.current, { clearProps: true });
          
          if (bgRef.current) gsap.set(bgRef.current, { clearProps: true });

          emitClose && emitClose();

        }
      })
      .reverse();

  }, []);

  useEffect(() => {

    const bodyClass = 'block-scroll';

    tl.current.reversed(!shown);

    shown
      ? document.documentElement.classList.add(bodyClass)
      : delay(duration * 1000).then(() => document.documentElement.classList.remove(bodyClass));

  }, [shown]);

  useEffect(() => {

    setShown(launch);

  }, [launch]);

  return (
    <aside ref={rootRef}
      className={classes ? classes : ''}>
      {background && (
        <span ref={bgRef}
          className="modal__bg"
          onClick={() => setShown(false)} />
      )}
      {wrapper ? (
        <section className="modal__inner">
          {button && (
            <button className="modal__close"
              aria-label="Close"
              onClick={() => setShown(false)}>
              <Cross /> 
            </button>
          )}
          { children }
        </section>
      ) : children}
    </aside>
  );

};

export default Modal;
