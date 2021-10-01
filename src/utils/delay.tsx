const delay = (time: number) => {

  return new Promise<void>(resolve => {

    const timeout = setTimeout(() => {

      clearTimeout(timeout);
      resolve();

    }, time);

  });

};

export default delay;
