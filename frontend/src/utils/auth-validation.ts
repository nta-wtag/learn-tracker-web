import validator from "validator";

export const validateAuth = (values: any, isLogin: boolean) => {
  const errors: Record<string, string> = {};

  if (!values.email) errors.email = "Email is required";
  else if (!validator.isEmail(values.email))
    errors.email = "Invalid email format";

  if (!values.password) errors.password = "Password is required";
  else if (!validator.isStrongPassword(values.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    }))
    errors.password =
      "Password must be at least 8 characters, include letters, numbers and a special character";

  if (!isLogin && (!values.username || values.username.length < 3))
    errors.username = "Username must be at least 3 characters";

  return errors;
};
