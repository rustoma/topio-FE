import { z } from "zod";

import { ValidatorPasswordMessagesI } from "@/types/validator";
import { REGEX } from "@/utils/regex";

const emailValidator = (message?: string) =>
  z
    .string()
    .email({ message })
    .transform((val) => val.toLowerCase());

const requiredValidator = (message?: string) =>
  z
    .string({
      required_error: message,
    })
    .min(1, { message });

const requiredNumberValidator = (message?: string) =>
  z
    .number({
      invalid_type_error: message,
      required_error: message,
    })
    .min(1, { message });

const digitsWithSpacesValidator = (message?: string, invalidValueMessage?: string) =>
  requiredValidator(message).regex(REGEX.number_spaces, {
    message: invalidValueMessage,
  });

const passwordValidator = (minNumberOfCharacters: number, messages: ValidatorPasswordMessagesI) =>
  z
    .string()
    .min(minNumberOfCharacters, { message: messages.minNumberOfCharacters })
    .regex(REGEX.one_or_more_lowercase_letters, {
      message: messages.oneOrMoreLowercaseLetters,
    })
    .regex(REGEX.one_or_more_uppercase_letters, {
      message: messages.oneOrMoreUppercaseLetters,
    })
    .regex(REGEX.one_or_more_numbers, {
      message: messages.oneOrMoreNumbers,
    })
    .regex(REGEX.one_or_more_special_characters, {
      message: messages.oneOrMoreSpecialCharacters,
    });

export const VALIDATORS = {
  email: emailValidator,
  required: requiredValidator,
  requiredNumber: requiredNumberValidator,
  phoneNumber: digitsWithSpacesValidator,
  password: passwordValidator,
};
