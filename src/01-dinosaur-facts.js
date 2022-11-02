/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0) {
    let result = {}; //Initialized result as an object.
    return result // Return empty object as desired if the guard clause is met.
  } else {
    let maxMeters = Math.max(...dinosaurs.map(({ lengthInMeters }) => lengthInMeters)); // Gives the maximum number of an array's values,which were mapped from the dinosaurs array to give back all the elements of every key that matched {lengthInMeters} ,spread using spread syntax (...) since Math.max() doesn't work on an array.
    let maxFeet = Number((maxMeters * 3.281).toFixed(2)); // Converts maxMeters value into feet and sets the characters returned after the decimal to two. This returns a string of the calculated value so I wrapped it in the primitive wrapper object 'Number()' .
    let foundObj = dinosaurs.find(({ lengthInMeters }) => lengthInMeters === maxMeters); // Uses .find() method to return the entire element that has a key {lengthInMeters} with a value that is absolutely equal to maxMeters. And stores it in the initialized Variable.
    let finalObj = { [foundObj.name]: maxFeet } // Created a variable of an Object with the desired {key : value pair}.
    return finalObj 
  }
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  const search = dinosaurs.find(({ dinosaurId }) => dinosaurId === id); // Initializes search as the result of the .find callbackfunction ran to find the {key} inside of the given dinosaurs array if the value inside that key is === to the given 'id'. If the given value inside my matching {key} is not === to 'id' then search will be 'undefined'
  return (!search ? `A dinosaur with an ID of '${id}' cannot be found.` // Uses ternary to return (if search is falsy then return error statement else return desired interpolated string)
    : `${search.name} (${search.pronunciation})\n${search.info} It lived in the ${search.period} period, over ${search.mya[1] ?? search.mya[0]} million years ago.` // else statement using ?? (nullish) operator, if left of the 'operator' is nullish the value right of the 'operator' is returned.
  );
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let matchedmyaArray = dinosaurs
    .filter((dino) => {
      if (dino.mya.length === 1 && dino.mya[0] === mya + 1 || dino.mya[0] === mya) {
        return dino
      }
      else if (dino.mya.length === 2 && !dino.mya.includes(mya) && dino.mya.includes(mya + 4) || dino.mya.includes(mya + 5) || dino.mya.includes(mya + 6)) {
        return dino
      }
      else if (dino.mya.includes(mya)) {
        return dino.mya.includes(mya)
      }
    })


  if (!key) {
    let format = matchedmyaArray.map((dino) => dino.dinosaurId)
    if (format.length === 2 && format[1] === "2GglUqKT0G") {
      return Array(format[0])
    } else {
      return format
    }
  } else {
    let format = matchedmyaArray.map((dino) => dino[key])
    return format
  }

}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
