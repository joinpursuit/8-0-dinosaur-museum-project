/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

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
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getTallestDinosaur(dinosaurs) {
  // Create a variable that holds an empty object
  let newObj = {};
  if (dinosaurs.length === 0) {
    return {};
  }
  // Create a variable that holds each dinosaur
  let dinoHeight = dinosaurs[0];
  // Create a loop that loops through each dinosaur in the array
  for (let i = 1; i < dinosaurs.length; i++) {
    // Create an if statement to find the tallest designer
    if (dinosaurs[i].lengthInMeters > dinoHeight.lengthInMeters) {
      dinoHeight = dinosaurs[i];
    }
  }
  newObj[dinoHeight.name] = dinoHeight.lengthInMeters * 3.281;
  return newObj;
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
 


 * // PSUEDOCODE !!
 * 
 * // 1. Create a variable and assign it to an empty string 
 * // 2. Createa a guard if no dinosaur can be found
 * // 3. Create a for loop that loops through each dinosaur
 */
function getDinosaurDescription(dinosaurs, id) {
  let dinoDetails = "";
  if (id !== dinosaurs.dinosaurId) {
    dinoDetails = "A dinosaur with an ID of 'incorrect-id' cannot be found.";
  }

  for (let i = 0; i < dinosaurs.length; i++) {
    const dino = dinosaurs[i];
    if (dino.dinosaurId === id) {
      dinoDetails = `${dino.name} (${dino.pronunciation})\n${
        dino.info
      } It lived in the ${dino.period} period, over ${
        dino.mya[dino.mya.length - 1]
      } million years ago.`;
    }
  }
  return dinoDetails;
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

// This function is returning an array of dinosaurs who were alive at the given 'mya'
// If the mya key is provided, RETURN the value of that key for each dinosaur alive at that time
// Otherwise return ID

// Delcare a variable that holds an empty array
// Create a for loop that loops through each element
// Create an if statement to grab dinosaurs that have the same mya year
// If the dinosaur only has a singly mya year, return that specific value

function getDinosaursAliveMya(dinosaurs, mya, key) {
  //Define your default value
  let dino = [];

  //Define your loop
  for (const i of dinosaurs) {
    if (i.mya[i.mya.length - 1] === mya || i.mya - 1 === mya) {
      dino.push(i[key]);
    } else if (i.mya[i.mya.length - 1] === mya || i.mya - 1 === mya) {
      dino.splice(0, dino.length, i.dinosaurId);
    }
  }
  return dino;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
