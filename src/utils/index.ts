export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateExpiryDate = () => {
  return `${randomInteger(1, 12).toString().padStart(2, '0')}/${randomInteger(
    24,
    27
  )}`;
};

export const generateCreditCardNumber = () => {
  let result = '';
  for (let i = 0; i < 4; i++) {
    const segment = randomInteger(0, 9999).toString().padStart(4, '0');
    result += (i === 0 ? '' : ' ') + segment;
  }
  return result;
};

export const generateCvv = () => {
  return randomInteger(0, 999).toString().padStart(3, '0');
};
