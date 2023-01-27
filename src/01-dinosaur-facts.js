/*
  Do not change the line below. If you'd like to run code from this file, 
  you may use the `exampleDinosaurData` variable below to gain access to tickets data. 
  This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. 
  You may assume the shape of the data remains the same but that the values may change.

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
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` 
 * file for an example of the input.
 * 
 * @returns {Object} An object where the key is the name of the dinosaur and the value is 
 * the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let maxLength = 0;
  const longestDino = {};
  let dinoName = '';
  // Need to iterate through the array with a for loop
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > maxLength) {
      delete longestDino[dinoName];
      dinoName = dinosaurs[i].name
      maxLength = dinosaurs[i].lengthInMeters;
      longestDino[dinoName] = dinosaurs[i].lengthInMeters * 3.281;
    }
  }
  return longestDino;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, 
 * returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string 
 * should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` 
 * file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with 
 * elaborate ornamentation of projections, knobs, and spikes. It lived in the Early 
 * Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // Iterates through the array of objects called 'dinosaurs'
  for (let i = 0; i < dinosaurs.length; i++) {
    // Checks if the current object's id matches with the given id
    if (dinosaurs[i].dinosaurId == id) {
      // If there is a matching id, returns a formatted string with the required information by accessing the 
      // corresponding properties of the current object
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`
    }
  }
  // If there is no matching id, returns a formatted error message
  return `A dinosaur with an ID of '${id}' cannot be found.`
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` 
 * (i.e. "millions of years ago") value. If a `key` is provided, 
 * returns the value of that key for each dinosaur alive at that time. 
 * Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be 
 * equal to the given value or one less. For example, if a dinosaur has a `mya` value of 
 * `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` 
 * file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived 
 * during the `mya` value given, will return the value of the supplied key. 
 * Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. 
 * The array should only include data of dinosaurs who lived during the given time period.
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
  // Creates empty array to be filled with IDs of dinosaurs alive in the given time period
  const aliveDinos = [];
  // Iterates through the array of objects called 'dinosaurs'
  for (let i = 0; i < dinosaurs.length; i++) {
    // Checks if the 'millions of years ago' key of the current dinosaur has more than one value
    if (dinosaurs[i].mya.length > 1) {
      // If it has more than one value, 
      // checks if the given time period is within the time period interval between the two values (inclusive)
      if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // If it is, adds the current dinosaur's ID to the array of aliveDinos
        aliveDinos.push(dinosaurs[i].dinosaurId);
      } 
      // If it does not have more than one value, checks if the given time period matches the value, 
      // or the value minus 1
    } else if (mya == dinosaurs[i].mya[0] || mya == dinosaurs[i].mya[0] - 1) {
      // If it does, adds the current dinosaur's ID to the array of aliveDinos
      aliveDinos.push(dinosaurs[i].dinosaurId);
    }
  }

  // If a third argument is given
  if (key) {
    // Iterates through the array of aliveDinos
    for (let j = 0; j < aliveDinos.length; j++) {
      // Iterates through the array of dinosaurs to access their properties and match IDs
      for (let x = 0; x < dinosaurs.length; x++) {
        // Checks if IDs match
        if (dinosaurs[x].dinosaurId == aliveDinos[j]) {
          // If IDs match, sets the value of the current element in the array to be equal to the value of the 
          // required key of the current dinosaur
          aliveDinos[j] = dinosaurs[x][key];
        }
      }
    }
  }
  // Returns an array of IDs of dinosaurs alive in the given time period if a third argument was not provided,
  // or an array of values corresponding to the desired key of dinosaurs alive in the given time period
  return aliveDinos;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
