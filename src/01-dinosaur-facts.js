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
    // guard clause
    return {};
  }
  let longestDino = dinosaurs[0]; // set this to first dinosaur in array

  for (let i = 1; i < dinosaurs.length; i++) {
    //loop through rest of array
    if (dinosaurs[i].lengthInMeters > longestDino.lengthInMeters) {
      //we are testing the index([i]) of dinosaurs to check if its GREATER then the key set for dino @ position 0.
      // console.log(true) // testing
      longestDino = dinosaurs[i]; //let that index = the key of the longest donosaur
    } //end condition
  } //end loop
  let finalDino = {}; //we are creating an empty object to return if no dinosaurs are present
  finalDino[longestDino.name] = longestDino.lengthInMeters * 3.281; //here we are multiplying the length in Meters of the original property to give us a real world example in feet plus it's name.
  return finalDino; // returning the longest dino
} //end function

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
  //what's the parameters? they are already defined remember that!
  for (let i = 0; i < dinosaurs.length; i++) {
    //loop through array of objects that is 'dinosaurs'
    if (dinosaurs[i].dinosaurId === id)
      //check if dinosaur at index is equal to the id we have given it.
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${
        dinosaurs[i].info
      } It lived in the ${dinosaurs[i].period} period, over ${
        dinosaurs[i].mya[dinosaurs[i].mya.length - 1]
      } million years ago.`; // if this condition is true, return the dino with this string format using dot notation
  }
  return `A dinosaur with an ID of '${id}' cannot be found.`;
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
  let dino = []; //the accumulator

  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].mya.length === 1) {
      //looking for dinos wit 1 mya value and
      if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] - 1 === mya) {
        // if it equals the amount or -1
        if (key) {
          // does the key exist
          dino.push(dinosaurs[i][key]);
        } else {
          dino.push(dinosaurs[i].dinosaurId);
        }
      } // 2nd condition
    } else if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya) {
      // comparitive range --
      if (key) {
        dino.push(dinosaurs[i][key]);
      } else {
        dino.push(dinosaurs[i].dinosaurId);
      }
    }
  } //loop-end
  return dino;
} //function-end

//  logically condense this into 5 conditions -- there are 6 tests
//  figure out 4 'if' conditions ---> leads to correct dino
//  check if we were provided a 'key' = simple if/else
//  !check if your logic matches the range! and watch your operands!
//  less than max greater then lowest

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
