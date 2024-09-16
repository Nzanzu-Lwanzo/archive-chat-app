import { genSaltSync, hashSync, compareSync, } from "bcrypt";

/**
 * 
 * @param {String} plainText 
 * @returns {String}
 */
export const hashPassword = (plainText) => {
    const salt = genSaltSync(10);
    const password = hashSync(plainText,salt);
    return password;
}

/**
 * 
 * @param {String} plainText 
 * @param {String} phash 
 * @returns {Boolean}
 */
export const validatePassword = (plainText,hash) => {
    return compareSync(plainText,hash ?? "");
}