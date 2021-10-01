import { ReactNode, useContext, useEffect } from 'react';
import { EnvContext } from '_context';

interface IProps {
  endpoint?: string;
  host?: string;
	children: ReactNode;
}

const Layout = ({ endpoint, host, children }: IProps) => {

  const { saveEnv, saveHost } = useContext(EnvContext);

  useEffect(() => {

    if (endpoint) saveEnv(endpoint.substring(0, endpoint.indexOf('/api') + 4));

    if (host) saveHost(host);

  }, [endpoint, host]);

  return (
    <div className="wrapper">
      <main role="main">
        { children }
      </main>
    </div>
  );

};

export default Layout;
