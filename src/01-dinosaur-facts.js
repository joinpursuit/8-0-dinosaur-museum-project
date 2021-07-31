/*
  Do not change the line below. If you'd like to run code from this file, you may use
  the `exampleDinosaurData` variable below to gain access to tickets data. 
  This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the 
  data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getTallestDinosaur()
 * ---------------------
 * Returns an object with the tallest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` 
 * file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value 
 * is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */

// Input: array [dinosaurs] of {dinorsaur} objects
// Output: {new object} - key: name of the highest dino, value: height of the dinosaur in feet

// declare and define helper function toFeet, parameter: number
function toFeet(number) {
  // RETURN NUMBER * 3.281
  return number * 3.281;
}

function getTallestDinosaur(dinosaurs) {
  let tallestDino = {};
  let highestDino = dinosaurs[0];

  if (dinosaurs.length === 0) {
    return tallestDino;
  }
    
  for (const dinosaur of dinosaurs) {
    if (dinosaur.lengthInMeters > highestDino.lengthInMeters) {
      highestDino = dinosaur;
    }
  }
  tallestDino[highestDino.name] = toFeet(highestDino.lengthInMeters);
  return tallestDino;
}
getTallestDinosaur(exampleDinosaurData);
/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. 
 * If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below 
 * to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony 
 * frill with elaborate ornamentation of projections, knobs, and spikes. 
 * It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */

// Input: Dinosaurs - an array of objects, and
// ID - id of each dinosaur object (to get the description of)
// Output: String - formatted description of a dinosaur

function getDinosaurDescription(dinosaurs, id) {

  // Intial Value:
  // declare dinoDescription and assign an empty string
  let dinoDescription = `A dinosaur with an ID of '${id}' cannot be found.`;

  // Iterate through DINOSAURS []
  for (const eachDinosaur of dinosaurs) {
    // IF eachDinosaur's "dinosaurId" matches "ID"
    if (eachDinosaur.dinosaurId === id) {
      // re-assign dinoDescription to an interpolated string of:
      // use eachDinosaur's keys
      // NAME, PRONOUNCIATION (new line)
      // INFO "." "It lived in the PERIOD period, 
      // over eachDinosaur.mya[eachDinosaur.length -1 ] million years ago"
      dinoDescription = `${eachDinosaur.name} (${eachDinosaur.pronunciation})\n${eachDinosaur.info} It lived in the ${eachDinosaur.period} period, over ${eachDinosaur.mya[eachDinosaur.mya.length - 1]} million years ago.`
    }
  }
  // RETURN modified dinoDescription
  return dinoDescription;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. 
 * If a `key` is provided, returns the value of that key for each dinosaur alive at that time. 
 * Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given 
 * value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information 
 * will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` 
 * file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during 
 * the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only 
 * include data of dinosaurs who lived during the given time period.
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

// declare and define function isAlive 
// parameters: eachDinosaurMya, argMya
function isAlive(eachDinosaurMya, argMya) {

// declare isAlive and assign it False
let isAlive = false;

  // IF argMya is less than or equal to eachDinosaurMya[0] 
  // AND greater than or equal to eachDinosaur[1]
  if (argMya <= eachDinosaurMya[0] && argMya >= eachDinosaurMya[1]) {
    // isAlive is re-assigned to true
    isAlive = true;
    // ELSE IF eachDinosaurMya[0] is strictly equal to argMya 
    // OR eachDinosaur[0] minus 1 strictly equal to argMya
  } else if (eachDinosaurMya[0] === argMya || (eachDinosaurMya[0] - 1) === argMya) {
    // isAlive is re-assigned to true
    isAlive = true;
  }
  // RETURN modified isAlive
  return isAlive;
}

function getDinosaursAliveMya(dinosaurs, mya, key) {
  // declare aliveDinosaurs and assign an empty array []
  let aliveDinosaurs = [];

  // Iterate through each dinosaur{} in dinosaurs []
  for (const dinosaur of dinosaurs) {
    // IF isAlive is true (invoke function isAlive) and KEY is true
    if (isAlive(dinosaur.mya, mya) && key) {
      // PUSH {dinosaur} [KEY] into aliveDinosaurs []
      aliveDinosaurs.push(dinosaur[key]);
      // ELSE IF isAlive is true
    } else if (isAlive(dinosaur.mya, mya)) {
      // PUSH eachDinosaur's dinosaurId into aliveDinosaurs []
      aliveDinosaurs.push(dinosaur.dinosaurId);
    }
  }
  // RETURN modified aliveDinosaurs
  return aliveDinosaurs;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
