import { ReactNode } from 'react';
import { LazyProvider, ModalProvider, NavProvider } from '_context';

interface IProps {
	children: ReactNode;
}

const Providers = ({ children }: IProps) => (
  <LazyProvider>
    <ModalProvider>
      <NavProvider>
        { children }
      </NavProvider>
    </ModalProvider>
  </LazyProvider>
);

export default Providers;
