export const BASE_API_URL = "https://e-receipts.herokuapp.com";

export const toastError = (error, title, description, stay) => {
  // Configs for Chakra UI error toast
  return {
    status: "error",
    title: title || "Something weird happened",
    description:
      description ||
      (error?.errorMessage?.errors && error?.errorMessage?.errors[0][0]) ||
      error?.errorMessage?.message ||
      "Try again maybe?",
    duration: stay ? null : 4000,
    isClosable: true,
    position: "bottom-left",
  };
};

export const toastSuccess = (title, description, stay) => {
  // Configs for Chakra UI success toast
  return {
    status: "success",
    title: title || "Successful!",
    description: description || "",
    duration: stay ? null : 4000,
    isClosable: true,
    position: "bottom-left",
  };
};

export const separateWithComma = (number) => {
  // Separate number with commas
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};
export const findInArray = (body, group, query) => {
  // Find an object within an array of objects
  return body ? body.find((element) => element[group] == query) : null;
};
export const wordTruncate = (word, limit) => {
  // To replace part of a string with ellipsis after a certain length
  if (word.length > limit) {
    return word.toString().slice(0, limit).concat("...");
  } else {
    return word;
  }
};

export const formatDateToDDMMYY = (format, date) => {
  // To format a date string to dd-mm-yyyy or yyyy-mm-dd
  var today = date ? new Date(date) : new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return format === "yyyy-mm-dd"
    ? `${yyyy}-${mm}-${dd}`
    : `${dd}-${mm}-${yyyy}`;
};

export const calculateAge = (birthday) => {
  // birthday is a date
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
