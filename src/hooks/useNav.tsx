import { MouseEvent, useCallback, useState } from 'react';
import { isCurrentTarget } from '_utils';

const useNav = () => {

  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = useCallback(() => {

    setExpanded(v => !v);

  }, []);

  const handleClick = (e: MouseEvent<HTMLElement>): false | void => isCurrentTarget(e) && setExpanded(false);

  return {
    expanded,
    toggleExpanded,
    handleClick
  };

};

export default useNav;
