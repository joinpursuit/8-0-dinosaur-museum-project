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
function getTallestDinosaur(dinosaurs) {
  if (!dinosaurs.length) { // if no dinosaurs/if false
    return {};
  }
let height = dinosaurs[0].lengthInMeters; // first dinosaur
let key;
  for (let i = 1; i < dinosaurs.length; i++) {
    let dino = dinosaurs[i];
    if (dino.lengthInMeters > height) {
      key = dino.name;
      height = dino.lengthInMeters; // height of tallest dinosaur
    }
  }
  let lengthInFeet = height * 3.281; // convert meters to feet
  return {[key]: lengthInFeet};  // outside for loop
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
  // If the dinosaur cannot be found, returns an error message - default message
  let description = `A dinosaur with an ID of '${id}' cannot be found.`;
  for (let dino of dinosaurs) { // for loop
    if (dino.dinosaurId === id) {
      // re-assign value of description, include mya as last element in case you do find the id.
      description = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length -1]} million years ago.`
    } 
  }
  return description; // outside for loop
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
// default is the id.
let newArr = [];
for (let dino of dinosaurs) { // for loop
  if (dino.mya.length === 1) {
    if (dino.mya[0] === mya || dino.mya[0] -1 === mya) {
      if (key in dino) { // if key exists in dino
        newArr.push(dino[key]);
      } else {
        newArr.push(dino.dinosaurId);
      }
    }
  } else {
    if (dino.mya[1] <= mya && mya <= dino.mya[0]) { // between
      if (key in dino) {
        newArr.push(dino[key]);
      } else {
        newArr.push(dino.dinosaurId);
      }
    }
  }
}
return newArr;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
