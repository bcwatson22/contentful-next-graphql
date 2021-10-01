import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

interface IVector {
  id: string;
  component: ComponentType;
}

const vectors: IVector[] = [
  {
    id: 'facebook',
    component: dynamic(() => import('_components/vectors/Facebook'))
  },
  {
    id: 'instagram',
    component: dynamic(() => import('_components/vectors/Instagram'))
  },
  {
    id: 'linkedin',
    component: dynamic(() => import('_components/vectors/LinkedIn'))
  },
  {
    id: 'twitter',
    component: dynamic(() => import('_components/vectors/Twitter'))
  }
];

const useVector = (id: string | undefined) => {

  const target = vectors.find(item => item.id === id);
  const component = target ? target.component : null;

  return component;

};

export default useVector;
