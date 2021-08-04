// this is our island, everything should go inside of these functions. Do NOT make global variables.
// How to use the debugger with this file:
// 1. Call the function

 // call function for debugger
// pass in our dinosaur data for THIS file to run the debugger.
// dinosaurs = given object (it's in the data/dinosaurs file)

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



// HELPER FUNCTION #1:
function searchForTallestDinosaur(dinosaurs) {
  // Accumulator Pattern to determine tallest
  // Height of first dinosaur
  let highestDino = dinosaurs[0];
  // Iterate through `dinosaurs` array
  for (let i = 1; i < dinosaurs.length; i++) {
    let dino = dinosaurs[i];
    if (dino.lengthInMeters > highestDino.lengthInMeters) {
      // Tallest dinosaur
      highestDino = dino;
    }
  }
  // Return `highestDino` when found
  return highestDino; 
}

// HELPER FUNCTION #2
// Isolating the logic of multiplying
function convertMetersToFeet(meters){
  // convert `lengthInMeters` to feet
  return meters * 3.281;
}

// MAIN FUNCTION
function getTallestDinosaur(dinosaurs) {
  if (!dinosaurs.length) { 
    return {};
  }
  // Assign variable to helper function to isolate the tallest dinosaur
  // call helper function, but pass the argument into it to access `dinosaurs`
  let foundDino = searchForTallestDinosaur(dinosaurs); 
  // provide `foundDino.lengthInMeters` and multiply by 3.281 and it will return it
  let lengthInFeet = convertMetersToFeet(foundDino.lengthInMeters); 
  return {[foundDino.name]: lengthInFeet};
}
// getTallestDinosaur(exampleDinosaurData);

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
  // Default `description` error message if the dinosaur cannot be found
  let description = `A dinosaur with an ID of '${id}' cannot be found.`;
  // Iterate through `dinosaurs` array, each called `dino`
  for (let dino of dinosaurs) {
    // Compare current `dino.dinosaurId` to `id`
    if (dino.dinosaurId === id) {
      // if `id` found, re-assign value of description, with `dino.mya[dino.mya.length -1]` as last element.
      description = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length -1]} million years ago.`
    } 
  }
  // Return `description` as string
  return description;
}
// getDinosaurDescription(exampleDinosaurData, "U9vuZmgKwUr");
// getDinosaurDescription(exampleDinosaurData, "incorrect-id");

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
  // Declare empty array `newArray`
  let newArray = [];
  // iterate through `dinosaurs` array, each called `dino`
  for (const dino of dinosaurs) {
    // Compare current `dino.mya[0]` to/> mya && `dino.mya[1]` to/< mya // `dino.mya.length` === 2
    if (dino.mya[0] >= mya && dino.mya[1] <= mya && dino.mya.length === 2) {
      // if `key` given, .push `dino[key]` into `newArray`
      if (key) {
        newArray.push(dino[key]);
      } else {
        // if alive, .push `dino.dinosaurId` into `newArray`
        newArray.push(dino.dinosaurId);
      }
    }
    // Compare current `dino.mya[0]` to/=== mya || `dino.mya[0]` -1 to/=== mya
    if (dino.mya[0] === mya || dino.mya[0] -1 === mya) {
      // if `key` given, .push `dino[key]` into `newArray`
      if (key) {
        newArray.push(dino[key]);
      } else {
        // if alive, .push `dino.dinosaurId` into `newArray`
        newArray.push(dino.dinosaurId);
      }
    }
  }
  // return `newArray`
  return newArray;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
