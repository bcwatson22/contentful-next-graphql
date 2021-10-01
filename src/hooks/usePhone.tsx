import { useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils.js';

const usePhone = () => {
  
  const [instance, setInstance] = useState<intlTelInput.Plugin | null>(null);

  const phoneValidation = { 
    required: 'We need your phone number to keep in touch. Please try again',
    validate: () => instance?.isValidNumber() || `That number doesn't look quite right. Please check and try again`
  };

  const initPhone = (ref: Element) => {
    
    setInstance(intlTelInput(ref, {
      preferredCountries: ['au', 'gb'],
      separateDialCode: true
    }));
  
  };

  return {
    instance,
    phoneValidation,
    initPhone
  };

};

export default usePhone;