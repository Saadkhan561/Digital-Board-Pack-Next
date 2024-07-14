import * as yup from "yup";
import validator from "validator";

export const passwordValidation = (fieldName) =>
  yup
    .string()
    .required(`${fieldName} is required`)
    .min(8, `${fieldName} must contain at least 8 characters`)
    .max(64, `${fieldName} should not contain more than 64 characters`)
    .test(
      "is-strong-password",
      `${fieldName} must be strong, should contain 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number at least`,
      (value) =>
        value &&
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1,
        })
    );
