

/**
 * 
 * @param {Array} chats 
 * @param {number} uid 
 * @returns {boolean}
 */
export const checkIsInvited = (chats,uid) => chats.some( chat => chat.id === uid);