import { MONTHS } from "./constants";

/**
 * 
 * @param {String} dateString 
 */
export const convertToDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${MONTHS[month + 1]} ${year}`;
}


/**
 * 
 * @param {String} dateString 
 */
export const convertToTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}

/**
 * 
 * @param {String} dateString 
 */
export const getMessageTime = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();

    if(
        messageDate.getFullYear() === today.getFullYear() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getDate() === today.getDate() 
    ) {
        return convertToTime(dateString);
    } else {
        return `${convertToDate(dateString)} ${convertToTime(dateString)}`;
    }
    
}




