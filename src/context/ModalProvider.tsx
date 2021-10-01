import { ReactNode, useState } from 'react';
import ModalContext from './ModalContext';

interface IProps {
	children: ReactNode;
}

const ModalProvider = ({ children }: IProps) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      { children }
    </ModalContext.Provider>
  );

};

export default ModalProvider;
