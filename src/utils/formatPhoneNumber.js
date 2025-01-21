export const formatPhoneNumber = (number) => {
  number = String(number).trim();
  if (number.startsWith("233")) {
    return number;
  }

  // Replace the leading '0' with '233'
  const internationalNumber = "233" + number.slice(1);

  return internationalNumber;
};
