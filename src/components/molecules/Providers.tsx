import { ReactNode } from 'react';
import { Provider as QueryProvider } from 'urql';
import { LazyProvider, ModalProvider, NavProvider } from '_context';
import { clientContent, clientPreview } from '_utils';

interface IProps extends IPreview {
	children: ReactNode;
}

const Providers = ({ preview, children }: IProps) => (
  <QueryProvider value={preview ? clientPreview : clientContent}>
    <LazyProvider>
      <ModalProvider>
        <NavProvider>
          { children }
        </NavProvider>
      </ModalProvider>
    </LazyProvider>
  </QueryProvider>
);

export default Providers;
