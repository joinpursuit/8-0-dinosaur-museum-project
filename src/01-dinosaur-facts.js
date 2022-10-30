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
  //3 new variables that we can manipulate as we go; empty object to return; var for name of longest once found; var for length of lognest once found
  let longDino = {};
  let longName;
  let longLength = 0;
  //Loop checking to see if the length is longer than the new var which is updated as we lap
  for (i = 0; i < dinosaurs.length; i++) {
    // If the length of the dino at i index is longer than the longLength var, we will update the var as well as the longName var.
    if (dinosaurs[i].lengthInMeters > longLength) {
      longLength = dinosaurs[i].lengthInMeters;
      longName = dinosaurs[i].name;
    }
  }
  //After the loop is done, we do the meter=>feet calc; if check to stop us from putting empty values in our new oject
  longLength = longLength * 3.281;
  if (longName !== undefined) {
    longDino[longName] = longLength;
  }
  // console.log (longLength)
  return longDino;
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
  /**
   * Loop to go through the dinosaur param and look for the given id param.
   * If found, will return string that uses various properties from the given dino object.
  */
  for (i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId === id) {
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`;
    }
  }
  // If the loop completes and the id param is not found, we will return this erro message.
  return `A dinosaur with an ID of '${id}' cannot be found.`
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
  //New empty array which will be used to push alive dinos too.
  let aliveDino = [];
  for (i = 0; i < dinosaurs.length; i++) {
    /**
     * We start by checking mya array length.
     * If it is 2, we then check is the given mya param falls within the range of the 2 elements.
     * If there is a key param given, we push that to our empty aliveDino array.
     * If there is no key param given, then we push the dinoId as instructed.
    */
    if (dinosaurs[i].mya.length === 2) {
      if (dinosaurs[i].mya[1] <= mya && dinosaurs[i].mya[0] >= mya) {
        if (key) {
          aliveDino.push(dinosaurs[i][key]);
        } else {
          aliveDino.push(dinosaurs[i].dinosaurId);
        }
      }
      /**
       * If there is only one element in the mya array, then we will check to see if the mya params matches it or is within 1.
       * If there is a key param given, we push that to our empty aliveDino array.
       * If there is no key param given, then we push the dinoId as instructed.
      */
    } else if (dinosaurs[i].mya.length === 1) {
      if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] - 1 === mya) {
        if (key) {
          aliveDino.push(dinosaurs[i][key]);
        } else {
          aliveDino.push(dinosaurs[i].dinosaurId);
        }
      }
    }
  }
  return aliveDino;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
