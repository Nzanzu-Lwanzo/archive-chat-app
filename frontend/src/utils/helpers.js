
/**
 * 
 * @param {Array} array 
 * @param {number} id 
 * @param {Function} cb 
 * 
 * @returns {Array}
 */
export const removeFromArray = (array,id,cb) => {

    const selected_idx = array.findIndex(element => element.id === id );

    array.splice(selected_idx,1);

    cb(array);

    return array;
}