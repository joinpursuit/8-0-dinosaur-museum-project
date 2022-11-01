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
  // declaring a variable to represent the value of the largest length for a dinosaur
  let maxLength = 0;
  // declairng a variable to represent the name of the longest dinosaur 
  let dinoName = '';
  // declaring a variable as an empty object to return at the output of the function
  let longestDino = {};

  // using an if statement to determine if the length of the inputted dinosaur array is equal to 0
  if (dinosaurs.length === 0) {
    // returning longestDino variable inside if statement
    return longestDino
  }
  
  // created a for loop to iterate through dinosaurs array 
  for (let i = 0; i < dinosaurs.length; i++) {
    // using an if statement to determine if the lengthInMeters property at the current index is greater than the maxLength variable 
    if (dinosaurs[i].lengthInMeters > maxLength) {
      // assigning lengthInMeters property of the current index to the maxLength variable
      maxLength = dinosaurs[i].lengthInMeters 
      // assigning name property of the current index to the dinoName variable
      dinoName = dinosaurs[i].name
    }
  }
  // creating a key in the longestDino object with bracket notation and using the dinoName variable to title the new key
  // assigning the value of the maxLength variable multiplied by 3.281 to the dinoName key
  longestDino[dinoName] = maxLength * 3.281;
  // returning the longestDino object 
  return longestDino
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
  // using a for loop to iterate through dinosaurs array 
  for (let i = 0; i < dinosaurs.length; i++) {
    // using an if statement to determine if the dinosaur id at index [i] is equal to the value of the id parameter
    if (dinosaurs[i].dinosaurId === id) {
      // returning a template literal  with a detailed description of the dinosaur with the matching id inside if statement
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`
    }
  }
  // returning an error message if the provided id is has not matched with any of the dinosaurId properties
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
 *  getDinosaursAliveMya(dinosaurs, 65, "uonknwn-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // declaring an array as a variable to return as the output of the function 
  let dinosAliveArray= [];

  // using a for loop to iterate through the dinosaurs array
for (let i = 0; i < dinosaurs.length; i++) {
  // using an if statement to determine if the mya parameter is less tham or equal to the value of the first element in the mya array at the current index
  // AND if the mya parameter is greater than or equal to the value of the second element in the mya array at the current index
  if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
    // nested if statement to determine if the key parameter is truthy
    if (key) {
      // pushes value of key parameter at current index into dinosAliveArray
      dinosAliveArray.push(dinosaurs[i][key])
      // else statement to run if key parameter is falsy
    } else {
      // pushes value of dinosaurId key at the current index into dinosAliveArray
      dinosAliveArray.push(dinosaurs[i].dinosaurId)
    }
    // else if statement to determine if the value of the first element in the mya array at the current index is equal to mya parameter
    // OR if else if statement to determine ifthe value of the first element in the mya array at the current index is equal to mya parameter minus 1
  } else if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] - 1 === mya  ) {
    // nested if statement to determine if the key parameter is truthy
    if (key) {
      // pushes value of key parameter at current index into dinosAliveArray
      dinosAliveArray.push(dinosaurs[i][key])
    } else {
      // pushes value of dinosaurId key at the current index into dinosAliveArray
      dinosAliveArray.push(dinosaurs[i].dinosaurId)
  }
  }
 }
//  returns dinosAliveArray variable 
 return dinosAliveArray
}
module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
