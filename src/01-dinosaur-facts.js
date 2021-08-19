/*
  Do not change the line below. If you'd like to run code from this file, you may use the 
  `exampleDinosaurData` variable below to gain access to tickets data. 
  This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. 
  You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const dinosaurs = require("../data/dinosaurs");
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

function converterToFeet(n) {
  return n * 3.281
}
// Must iterate through array to find tallest dinosaur.
// must be converted from meters to feet
// Must access key and vaule of tallest dinosaur to be returned.
//what is our input: an array of objects with several keys
//what is our output: its returning an object that must be a key with the name of the dinosaur and its value is the height of dinosaurs
// create a new object to copy info into
// set var to the tallest dinosaur (currentDino = the tallest dino)
// loop through the input array
// if the dino we are looping through is taller than the currentDino, then we set currentDino = the current looped dino.
// return format should look like `result[currentDino.name] =  currentDino.lengthInMeters * 3.281
function getTallestDinosaur(dinosaurs) {
  if(dinosaurs.length === 0) {
    return {};
  }
  let result = {};

  let currentDino = dinosaurs[0]; 
  for (let i = 1; i < dinosaurs.length; i++) {
    if(dinosaurs[i].lengthInMeters > currentDino.lengthInMeters){
      currentDino = dinosaurs[i];
  
    }
    
  }
  // {currentDino.name: .lengthInMeters}
  result[currentDino.name] = converterToFeet(currentDino.lengthInMeters) 
  return result;
}
getTallestDinosaur(exampleDinosaurData)

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

// what is our input: an array of objects w/ several keys and the string id.
// what is our output: must return a description of a dinosaur that includes `.name`, `.pronunciation`, a line break (`\n`), `.info` and a concentated sentence that states: "...It lived in the `${dinosaurs.period}` period, over `${dinosaurs.mya}` million years ago."
// return error message if dinosaur can't be found: "A dinosaur with an ID of 'incorrect-id' cannot be found."

function getDinosaurDescription(dinosaur, id) {
  let errResult = `A dinosaur with an ID of '${id}' cannot be found.`;
  // struggled with this loop for hours then changed to a 'for of' instead of 'for i' loop. Not sure why it worked for one and not the other.
  for (let dinosaur of dinosaurs) {
    if (dinosaur.dinosaurId === id) {
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length -1]} million years ago.`;
    }
  }

return errResult;
}
//getDinosaurDescription(dinosaurs, id)
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
// what is our input: dinosaurs and the property `.mya`
// what is our output: returns an array with the proper `.id`
let result = [];
//let givenMya = "";

for (let dinosaur of dinosaurs) {
  //Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
  //if (dinosaurs.mya.length) {
  // return givenMya
  //}
  return result;
}


}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
