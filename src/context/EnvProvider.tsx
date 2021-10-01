import { ReactNode, useState } from 'react';
import EnvContext from './EnvContext';

interface IProps {
	children: ReactNode;
}

const EnvProvider = ({ children }: IProps) => {

  const [env, setEnv] = useState<string>('');
  const [host, setHost] = useState<string>('');

  const saveEnv = (endpoint: string) => setEnv(endpoint);

  const saveHost = (host: string) => setHost(host);

  return (
    <EnvContext.Provider value={{ env, saveEnv, host, saveHost }}>
      { children }
    </EnvContext.Provider>
  );

};

export default EnvProvider;
