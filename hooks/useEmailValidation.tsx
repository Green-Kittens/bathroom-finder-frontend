import { useCallback } from "react";

const useEmailValidation = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,63}$/;

  const validateEmail = useCallback((email: string) => {
    return emailRegex.test(email);
  }, []);

  return { validateEmail };
};

export default useEmailValidation;
