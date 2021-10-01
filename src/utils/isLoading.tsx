const isLoading = (showLoader: boolean) => {

  const className = 'loading';

  showLoader
    ? document.body.classList.add(className)
    : document.body.classList.remove(className);

};

export default isLoading;
