export const isJSON = (fileName: string) => {
  try {
    const result = JSON.parse(fileName);
    return !!Object.keys(result).length;
  } catch (e) {
    return false;
  }
};

export const formatJson = (fileName: object) => {
  return JSON.stringify(fileName, null, 2);
};
