const translationTable = [...Array(26).keys()]
  .map((x) => ({ [String.fromCharCode(65 + x)]: x + 10 }))
  .reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
    };
  }, {});

const translateLettersToNumber = (str: string): string => {
  const upperCase = str.toUpperCase();
  const ibanNumbers = [...upperCase].map((char) => (char.match(/[A-Z]/i) ? translationTable[char] : char)).join('');
  return ibanNumbers;
};

export const validateIban = (iban: string): boolean => {
  if (iban.length > 34) {
    return false;
  }

  if (!/^[A-Z]{2}[0-9]{2}/i.test(iban)) {
    return false;
  }
  const ibanWithOffsetPrefix = `${iban.slice(4)}${iban.slice(0, 4)}`;

  const ibanNumbers = translateLettersToNumber(ibanWithOffsetPrefix);

  const ibanModulo97 = BigInt(ibanNumbers) % 97n;
  if (ibanModulo97 === 1n) {
    return true;
  }
  return false;
};
