export const spliter = (name) => {
  let newStr = "";
  let splitL = name.split(" ");
  splitL.forEach((letter, i) => {
    if (i <= 1) {
      newStr += letter[0].toUpperCase();
    }
  });
  return newStr;
};
