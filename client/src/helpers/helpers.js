// Splits charity name into two letters used if API doesnt provides logo
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
// Shortens a charity descryption to fit card
export const stringShortener = (str, length) => {
  return str.length > length
    ? str.substr(0, length - 1).toLowerCase() + "..."
    : str;
};
// Shortens url string to fit card
export const urlShortener = (url) => {
  let newUrl = url.replace(/^http:\/\//, "");
  newUrl = newUrl.substring(
    0,
    newUrl.indexOf("/") !== -1 ? newUrl.indexOf("/") : newUrl.length
  );
  return newUrl;
};
// Capitalize first Letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Date
export const getDate = (deliveryType) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  date.setDate(date.getDate() + deliveryType);
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formatted = `${monthName} ${day}, ${year}`;
  return formatted;
};
