import { useEffect } from 'react';
import { Router } from 'next/router';
import { isLoading } from '_utils';

interface IProps {
  children: JSX.Element;
}

const Indicator = ({ children }: IProps) => {

  useEffect(() => {

    isLoading(false);

    Router.events.on('routeChangeStart', () => isLoading(true));
    Router.events.on('routeChangeComplete', () => isLoading(false));

    return () => {

      Router.events.off('routeChangeStart', () => isLoading(false));
      Router.events.off('routeChangeComplete', () => isLoading(false));

    };

  }, []);

  return children;

};

export default Indicator;
