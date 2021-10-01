import { useContext, useEffect, useState } from 'react';
import { LazyContext } from '_context';
import { delay } from '_utils';
import SwiperClass from 'swiper/types/swiper-class';

const useSlider = () => {

  const { bumpRefresh } = useContext(LazyContext);
  const [nav, setNav] = useState<SwiperClass>();
  const [slider, setSlider] = useState<SwiperClass>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [atStart, setAtStart] = useState<boolean>(true);
  const [atEnd, setAtEnd] = useState<boolean>(false);

  const resetButtons = (slider: SwiperClass): void => {

    !slider?.isBeginning && setAtStart(false);
    !slider?.isEnd && setAtEnd(false);

  };

  const handleSlideChange = (slider: SwiperClass): void => {

    resetButtons(slider);
    setActiveSlide(slider.activeIndex);

  };

  useEffect(() => {

    // wait for slider animation to finish, then manually refresh lazyloading (in Page comp)
    delay(300).then(() => bumpRefresh());

  }, [activeSlide]);

  return {
    nav,
    slider, 
    activeSlide,
    atStart,
    atEnd,
    setNav,
    setSlider,
    setActiveSlide,
    setAtStart,
    setAtEnd,
    resetButtons,
    handleSlideChange
  };

};

export default useSlider;