import { ReactNode, useState } from 'react';
import NavContext from './NavContext';

interface IProps {
	children: ReactNode;
}

const NavProvider = ({ children }: IProps) => {

  const [navOpen, setNavOpen] = useState<boolean>(false);

  const openNav = () => setNavOpen(true);

  const closeNav = () => setNavOpen(false);

  return (
    <NavContext.Provider value={{ navOpen, openNav, closeNav }}>
      { children }
    </NavContext.Provider>
  );

};

export default NavProvider;
