import * as yup from "yup";
import validator from "validator";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

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

export function formatDate(inputDate) {
  const date = moment(inputDate);
  const now = moment();

  const diffInHours = now.diff(date, "hours");
  const diffInDays = now.diff(date, "days");

  if (diffInHours < 1) {
    return date.fromNow();
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return diffInDays === 1 ? "a day ago" : `${diffInDays} days ago`;
  } else {
    return date.format("Do MMMM");
  }
}

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
