import { validationResult, matchedData } from "express-validator";
import { Model } from "sequelize";
import { decToken } from "./handleAuthTokens.mjs";


/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {Function} next 
 * @returns {Object}
 */
export const getCleanData = (request,response,next) => {
    const valRes = validationResult(request);
    if(!valRes.isEmpty()) return response.status(400).json(valRes.array());
    const cleanData = matchedData(request);
    
    request.getCleanData = () => {
        return cleanData;
    }
    next()
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {Function} next 
 * @returns {Object}
 */
export const parseDataId = (request,response,next) => {
    const {id} = request.params;
    let parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.status(400).json({
        message : "Vous avez soumis un paramètre incorrect !"
    })
    request.parsedId = parsedId;
    next();
}


/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {Function} next 
 * @returns {Object}
 */
export const isAuthenticated = (request,response,next) => {
    if(!request.cookies?.ut) return response.status(401).json({
        message :"Vous devez d'abord vous connecter !"
    })
    next()
}


/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {Function} next 
 * @returns {Object}
 */
export const isAdmin = (request,response,next) => {
    if(!request.cookies?.ut) return response.status(401).json({
        message :"Vous devez d'abord vous connecter !"
    })
    if(!decToken(request.cookies?.ut || "")?.isAdmin) return response.status(401).json({
        message :"Accès restreint aux seuls administrateurs !"
    })
    next()
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {Function} next 
 * @returns {Object}
 */
export const getUserFromSession = (request,response,next) => {

    try {

        const decodedToken = decToken(request.cookies?.ut);
        request.user = decodedToken || {};
        next();

    } catch (e) { return response.sendStatus(401); }

}
