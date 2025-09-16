import type { AuthData } from "../types/AuthData"; 

export const validateAuth = (values: Partial<AuthData>, isLogin: boolean) => {
  const errors: Partial<AuthData> = {};

  if (!isLogin) {
    if (!values.username) errors.username = "Username is required";
    else if (values.username.length < 3)
      errors.username = "Username must be at least 3 characters";
  }

  if (!values.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Invalid email format";

  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password))
    errors.password = "Password must contain at least one letter, one number and one special character"

  return errors;
};
