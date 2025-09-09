export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  // Correct regex to add thousands separator
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
