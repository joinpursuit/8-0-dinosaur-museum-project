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
  const tallestDinosaur = {};

  if (dinosaurs.length === 0) {
    return tallestDinosaur;
  }

  let iteratedTallestDinosaur = dinosaurs[0];
  // Sets the first dinosaur object as the "tallest" to be compared with the others in the following loop
  // This also takes care of a dinosaurs array with only one dinosaur object

  for (let i = 1; i < dinosaurs.length; ++i) {
    if (iteratedTallestDinosaur.lengthInMeters < dinosaurs[i].lengthInMeters) {
      iteratedTallestDinosaur = dinosaurs[i];
    }
  }
  // Loops through dinosaurs array and compares heights
  // If it finds a taller dinosaur it assigns it to iteratedTallestDinosaur.

  tallestDinosaur[iteratedTallestDinosaur.name] =
    iteratedTallestDinosaur.lengthInMeters * 3.281;

  return tallestDinosaur;
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
  let dinosaurDescription = `A dinosaur with an ID of '${id}' cannot be found.`;

  for (let dinosaur of dinosaurs) {
    if (id === dinosaur.dinosaurId) {
      // Loops through dinosaurs array to find matching id
      dinosaurDescription = `${dinosaur.name} (${dinosaur.pronunciation})\n${
        dinosaur.info
      } It lived in the ${dinosaur.period} period, over ${
        dinosaur.mya[dinosaur.mya.length - 1]
      } million years ago.`;
    }
    // If a matching dinosaur is found the function creates a string with the dinosaur's info
  }
  return dinosaurDescription;
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
  let dinosaursAliveMya = [];

  for (let dinosaur of dinosaurs) {
    if (
      (dinosaur.mya[1] <= mya && mya <= dinosaur.mya[0]) ||
      dinosaur.mya[0] === mya ||
      dinosaur.mya[0] - 1 === mya
    ) {
      // Loops through dinosaurs array and runs the succeeding code for dinosaurs that fall within the time frame given (mya)
      // The conditional above works for dinosaurs with two years in the dinosaur.mya array and for dinosaurs with one year
      if (dinosaur[key]) {
        dinosaursAliveMya.push(dinosaur[key]);
        // If the key parameter is provided and it is a key in the dinosaur object it pushes that key for the specific dinosaur instead of its ID
      } else {
        dinosaursAliveMya.push(dinosaur.dinosaurId);
        // If a key parameter is provided and it is not a key in the dinosaur object it pushes the dinosaur's ID instead
      }
    }
  }

  return dinosaursAliveMya;
}
module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
