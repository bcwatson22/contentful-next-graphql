const debounce = (func: Function, delay: number) => {

  let timerId: any;

  return function (...args: any) {

    if (timerId) {

      clearTimeout(timerId);

    }

    timerId = setTimeout(() => {

      func(...args);

      timerId = null;

    }, delay);

  };

};

export default debounce;