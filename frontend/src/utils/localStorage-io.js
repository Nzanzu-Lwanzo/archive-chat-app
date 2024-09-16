/**
 *
 * @param {[String,any]} data
 */
export const lsWrite = ([key, data]) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

/**
 *
 * @param {String} key
 * @param {any} defaultValue
 * @returns {any}
 */
export const lsRead = (key, defaultValue) => {
  const jsonData = window.localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    if (!data) throw new Error();
    return data;
  } catch (e) {
    return defaultValue;
  }
};

export const lsClear = () => {
  window.localStorage.clear();
};

/**
 *
 * @param {object} options
 * @param {string} options.read
 * @param {object} options.lkp
 * @param {string} options.lkp.key
 * @param {any} options.lkp.val
 * @param {any} options.replacementData
 * @returns {Array | undefined}
 */
export const lsUpdateArray = ({
  read,
  lkp = { key: "id", val: undefined },
  replacementData,
},replace=true) => {
  /**@type {Array} */
  const array = lsRead(read);

  if (!Array.isArray(array)) return;

  const idx = array.findIndex(
    (element) => element[lkp.key] === lkp.val || replacementData[lkp.key]
  );

  if (idx === -1) return array;

  if(replace) {
    array.splice(idx, 1, replacementData);
  } else {
    array.splice(idx, 1);
  }

  console.log(array)
  lsWrite([read, array]);

  return array;
};

export const lsAddToArray = (read, newData, place = "AFTER") => {
  const array = lsRead(read);

  if (!Array.isArray(array)) return;

  switch (place) {
    case "BEFORE":
      array.unshift(newData);
      lsWrite([read, array]);
      return array;
    case "AFTER":
      array.push(newData);
      lsWrite([read, array]);
      return array;
  }
};
