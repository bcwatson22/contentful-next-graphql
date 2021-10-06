import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import {
  IBanner,
  IServices
} from '_organisms';

interface IDynamic {
  Banner: ComponentType<IBanner>;
  Services: ComponentType<IServices>;
}

const dynamicComponents: IDynamic = {
  Banner: dynamic(() => import('_components/organisms/Banner')),
  Services: dynamic(() => import('_components/organisms/Services'))
};

const useComponent = (id: string) => {

  const mapped = Object.entries(dynamicComponents).map(([key, val]) => {

    return {
      id: key, 
      component: val
    };

  });

  const target = mapped.find(item => item.id === id);
  const component = target ? target.component : null;

  return component;

};

export default useComponent;
