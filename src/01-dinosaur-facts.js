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
  // Guard clause: if there is no dinosaur, return an empty object
  if (!dinosaurs.length) {
    return {};
  }
  // Get the first dinosaur and supposed it is the tallest
  let tallestDino = dinosaurs[0];
  // For loop to skip the first element and iterate over every other elements
  for (let i=1; i<dinosaurs.length; i++) {
    // For each dinosaur, check if it is taller
    if (dinosaurs[i].lengthInMeters > tallestDino.lengthInMeters) {
      // change the value of tallestDino
      tallestDino = dinosaurs[i];
    }

  }
  // return the new object with key as key and tallestDino as value convert in feet.
  return {[tallestDino.name]:tallestDino.lengthInMeters*3.281};
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
  // a string that will be returned in case the id doesn't with any
  let dinoDescription =`A dinosaur with an ID of '${id}' cannot be found.`;
  // define the for loop and iterate over all dinosaurs
  for (let dinosaur of dinosaurs) {
    // compare if each dinosaur id matches the given one
    if(dinosaur.dinosaurId === id) {
      // if true change the default value
      dinoDescription = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`;
    }

  }
  // after the for loop return description variable.
  return dinoDescription;
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
   // return an empty array as default value
  let dinoArray = [];
  // iterate over all dinosaurs
  for (let dino of dinosaurs) {
    // if dinosaur's mya has a simple value
    if (dino.mya.length === 1) {
      // check if its mya is equal or one less equal to the given mya
      if (dino.mya[0] === mya || dino.mya[0]-1 === mya) {
        // if true and if the key has been given and it's a key of dino object, push that key value in the array. Otherwise push the id.
        (key in dino) ? dinoArray.push(dino[key]):dinoArray.push(dino.dinosaurId);
        
      }
    }
    // if dinosaur's has a single value
    else {
      // check if the given mya is between the two dinosaur's mya values inclusive.
      if (dino.mya[1] <= mya && mya <= dino.mya[0]) {
        // if true and if the key has been given and it's a key of dino object, push that key value in the array. Otherwise push the id. 
        (key in dino) ? dinoArray.push(dino[key]):dinoArray.push(dino.dinosaurId);

      }
    }

  }
  // return dinoArray either empty or containing dinosaurs ids or given key values.
  return dinoArray;

}
module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
