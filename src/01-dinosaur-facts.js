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


// returns an object (key - name of dinosaur & value - height in feet)
// object must contain the longest dinosaur (comparison operator)
// the greatest length must be converted from meters to feet (* 3.281)
// we need an accumulator to hold the value of "longest dino" while we compare

function getLongestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0){return {}}

  let longDino // create a variable that will hold values we will later assign to an object
  
  let longestLengthMeters = 0 // create longestDino to hold the value of the greatest dinosaur length

for (let i = 0; i < dinosaurs.length; i ++){
  // loop through the dinosaurs array
  if (dinosaurs[i].lengthInMeters > longestLengthMeters){
    // check if there is a length in meters value that is greater than longestLengthInMeters(currently valued at 0)
    longestLengthMeters = dinosaurs[i].lengthInMeters
    // longestLengthMeters will hold the value of the largest number in .lengthInMeters
    let obj = {}
    // create an empty object 
    obj[dinosaurs[i].name]=(dinosaurs[i].lengthInMeters * 3.281)
    // assigned key & values to our object 
    // the key should be the dinosaur name 
    // the returned value should be the dinosaurs lengthInMeters converted to feet 
    longDino = (obj);
    // assigns creted object to longDino variable
  }
} 


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
 * // returns a string containing : the dinosaur name & info
 * // if the dinosaur cannot be found, returns an error message. 
 * // error message should be "A dinosaur with an ID of 'incorrect-id' cannot be found."
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  for (let i = 0; i < dinosaurs.length; i ++){
    // loop through dinosars array
    if (dinosaurs[i].dinosaurId === id){
    // check if anything in the dinosaurs list matches the requested id 
    return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`
    } 
    // return the dinosaurs name, pronunciation & info with the requested format.
  } 
 return "A dinosaur with an ID of 'incorrect-id' cannot be found."
    // if nothing matches the requested id, return this error message
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
 * 
 * // returns an array of dinos alive at the mya value 
 * // if key already provided - return the value otherwise, return dino id
 * // if dino has only one value for mya, allows mya value to be equal to the given value or one less
 * // mya = array of two numbers
 * // loop through dinosaurs & look at .mya value 
 * // check if mya values are 1 less than or equal to mya param
 * // if so, return an array with the value of the key 
 * // if no key, return ID
 */

function getDinosaursAliveMya(dinosaurs, mya, key) {
 let aliveArray = []
for (let i = 0; i < dinosaurs.length; i ++){
  if (dinosaurs[i].mya.includes(mya) ||dinosaurs[i].mya[0] > mya && dinosaurs[i].mya[1] < mya || dinosaurs[i].mya - 1 === mya){
    if (key){
      aliveArray.push(dinosaurs[i][key])
    } else {
      aliveArray.push(dinosaurs[i].dinosaurId)
    }
  }
  


  }
   return aliveArray;
}



module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
