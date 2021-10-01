import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';
import useWindow from './useWindow';

interface ITrack {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
}

const useTracking = () => {

  const router = useRouter();
  const { asPath } = router;
  const { hasWindow } = useWindow();

  const trackEvent = (category = '', action = '', label?: string): ITrack => {

    const obj = {
      event: 'Tracking',
      eventCategory: category,
      eventAction: action,
      eventLabel: label ? label : asPath
    };

    TagManager.dataLayer({
      dataLayer: obj
    });

    return obj;

  };

  const trackEventAndNavigate = (e: MouseEvent, href: string, category = '', action = '', label?: string): void => {

    e.preventDefault();

    trackEvent(category, action, label);

    if (hasWindow) window.location.href = href;

  };

  return {
    trackEvent,
    trackEventAndNavigate
  };

};

export default useTracking;
