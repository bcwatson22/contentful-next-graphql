import AbortController from 'abort-controller';
import { useContext, useState } from 'react';
import { EnvContext } from '_context';
import { getRequestHeaders, isLoading } from '_utils';

const errorMessage = 'Oops... Something went wrong. Please try again';
const controller = new AbortController();
const { signal } = controller;
const timeout = 5000;

const useFetch = () => {

  const { env } = useContext(EnvContext);
  const [error, setError] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const stateError = (errorCode = 0) => {

    setError(errorCode);
    setSuccess(false);
    isLoading(false);

  };

  const stateRevert = () => {

    setError(null);
    setSuccess(false);
    isLoading(true);

  };

  const fetchData = async (endpoint: string) => {

    if (!env.length) return false;

    stateRevert();

    try {

      const delay = setTimeout(() => {

        controller.abort();

      }, timeout);
  
      const response = await fetch(`${env}${endpoint}`, {
        credentials: 'include',
        headers: getRequestHeaders(),
        signal
      });

      clearTimeout(delay);

      const { ok, status } = response;

      isLoading(false);

      if (ok) {

        const responseData = await response.json();

        setSuccess(true);
        setError(null);

        return responseData;

      } else {

        setSuccess(false);
        setError(status);

        return status;

      }

    } catch (e) {
      
      if ((e as Error).name === 'AbortError') {

        stateError(408);

      } else {

        stateError(); 
        console.log(e);

      }

    }

  };

  const postData = async (endpoint: string, data: any, processed = false) => {

    if (!env.length) return false;

    stateRevert();

    try {

      const response = await fetch(`${env}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: getRequestHeaders(processed),
        body: processed ? data : JSON.stringify(data)
      });

      const { ok, status } = response;

      isLoading(false);

      if (ok) {

        const responseData = await response.json();

        setError(null);
        setSuccess(true);

        return responseData;

      } else {

        setSuccess(false);
        setError(status);

        return status;

      }

    } catch (e) {

      stateError();

      console.log(e);

    }

  };

  return {
    env,
    error,
    errorMessage,
    submitted,
    success,
    setSubmitted,
    fetchData,
    postData
  };

};

export default useFetch;
