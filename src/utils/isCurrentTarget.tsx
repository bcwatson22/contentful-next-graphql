import { MouseEvent } from 'react';

const isCurrentTarget = (e: MouseEvent<HTMLElement>): boolean => (e.target === e.currentTarget);

export default isCurrentTarget;
