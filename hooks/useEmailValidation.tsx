import { useCallback } from "react";

const useEmailValidation = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = useCallback((email: string) => {
    return emailRegex.test(email);
  }, []);

  return { validateEmail };
};

export default useEmailValidation;
