import { BACKEND_ORIGIN } from "./constants";
import { convertToDate, convertToTime } from "./convertTime";

/**
 *
 * @param {String} fullName
 */
export const fUsername = (fullName) => {
  const splittedFullName = fullName?.split(" ");
  let firstName = fullName && splittedFullName[0];
  let lastname = fullName && splittedFullName[1];

  if (lastname) {
    return `${firstName.at(0)}. ${lastname}`;
  } else {
    return firstName || "User" + ".";
  }
};

export const fUserImageLink = (name) => {
  if(!name) return undefined;
  return `${BACKEND_ORIGIN}/users-profile-images/${name}`;
};
export const fGroupImageLink = (name) => {
  if(!name) return undefined;
  return `${BACKEND_ORIGIN}/groups-profile-images/${name}`;
}

/**
 * 
 * @param {string} date_string 
 * @returns {string}
 */
export const fChatboxTime = (date_string) => {
  return convertToDate(date_string) + convertToTime(date_string);
}