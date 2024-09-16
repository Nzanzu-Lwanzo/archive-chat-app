import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

/**
 * 
 * @param {Object} playload 
 * @returns {String}
 */
export const genToken = (playload) => {
    const secret = process.env.SECRET_KEY || "my-secret-key";
    const token = sign(playload,secret,{expiresIn:"30d"});
    return token;
}

/**
 * 
 * @param {String} token 
 * @returns {Object}
 */
export const decToken = (token) => {
    const secret = process.env.SECRET_KEY || "my-secret-key";
    const tokenData = verify(token,secret);
    return tokenData
}



