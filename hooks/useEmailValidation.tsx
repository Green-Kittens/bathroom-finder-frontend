import { useCallback } from "react";
import RE2 from "re2";

const useEmailValidation = () => {
  const emailRegex = new RE2(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  );

  const validateEmail = useCallback(
    (email: string) => {
      return emailRegex.test(email);
    },
    [emailRegex],
  );

  return { validateEmail };
};

export default useEmailValidation;
