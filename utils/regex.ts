export const REGEX = {
  number_dashes_dots: /^[0-9.-]*$/,
  number_dashes: /^[0-9-]*$/,
  number_spaces: /^[\d\s]+$/,
  one_or_more_uppercase_letters: /[A-Z]/,
  one_or_more_lowercase_letters: /[a-z]/,
  one_or_more_special_characters: /[●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
  one_or_more_numbers: /[0-9]/,
  float: /^[0-9]*[.]?([0-9]{0,2})$/,
};
