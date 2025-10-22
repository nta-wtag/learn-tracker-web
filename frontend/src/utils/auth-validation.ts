import validator from "validator";
import type { AuthFormValues } from "types/auth-types";
import { findUserByEmail } from "./auth-storage";

export const validateAuth = (
  values: AuthFormValues,
  isLoginMode: boolean,
  isEditing?: boolean,
  currentEmail?: string
) => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Invalid email format";
  } else if (
    isEditing &&
    values.email !== currentEmail &&
    findUserByEmail(values.email)
  ) {
    errors.email = "Email already exists";
  }

  if (!isLoginMode || isEditing) {
    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
  }

  if (!values.password) {
    if (!isLoginMode && !isEditing) {
      errors.password = "Password is required";
    }
  } else {
    if (!validator.isStrongPassword(values.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      errors.password = "Password must be at least 8 characters long and include a number and a symbol";
    }
  }

  return errors;
};
