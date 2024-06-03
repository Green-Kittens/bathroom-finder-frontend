import { useCallback } from "react";
import validator from "validator";

const useEmailValidation = () => {
  const validateEmail = useCallback((email: string) => {
    return validator.isEmail(email);
  }, []);

  return { validateEmail };
};

export default useEmailValidation;
