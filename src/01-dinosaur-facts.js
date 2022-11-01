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
  if (dinosaurs.length === 0) { // checking if theres no dinosaurs
    return {} //if there is no dinosaurs , we are returning an empty object
  }
  let longestDino = dinosaurs[0] // we are letting L.D equal dinosaurs at the first index 
  for (let i = 1; i < dinosaurs.length; i++) { //starting our for loop at 1 since we are already starting at 0
    if (dinosaurs[i].lengthInMeters > longestDino.lengthInMeters) { // are condition her is testing if dino at postion [i] is greater than lonestDino at length in meters 
      longestDino = dinosaurs[i] // here we are setting longest to be equal to dinosaurs at index i
    }
  }
  let finalDino = {} // here we are creating an empty object to be able to return our value in 
  finalDino[longestDino.name] = longestDino.lengthInMeters * 3.281 //here we are setting up the in the proper order , finding the the name of the dino = to the length in meters * 3.381 to covert it to feet
  return finalDino // returning the longest dino 
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
  for (let i = 0; i < dinosaurs.length; i++) { // here i created a for loop to go thur the array of dino 
    if (dinosaurs[i].dinosaurId === id) //checking if dino at index i is equal to the id 
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.` // if the condition is true we return the dino in the this format, providing information thur dot notiation 
  }
  return `A dinosaur with an ID of '${id}' cannot be found.` // if the dino at index i != the the id we want to return a statment saying the dino was not found with the id. we do this outside the for loop
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
  let dino = [] // here i set dino to an empty array since we see that the return is in an array
  for (let i = 0; i < dinosaurs.length; i++) { // creata a for loop in order to compare the value at index i to the set mya
    if (dinosaurs[i].mya.length === 1) { // here im checking if the dinosaur only has a single value for `mya`
      if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] - 1 === mya) { // i did a nested if statment, where we already determined that there is one  single value. I am checking to see if dino. at the random index of i mya at the first index is equaly to mya or a dino. at index i - 1 is equal to mya
        if (key) { // another nested if statment to check if the key is included
          dino.push(dinosaurs[i][key]) // if key is included i pushed using .push() , dino. at index i and the key properitys into empty array of dino 
        } else {
          dino.push(dinosaurs[i].dinosaurId) // The else statment is doing the same as the code above but put dino. at index i ,dino.id  inside the empty if the is statments above are false
        }
      }// 2nd if statment 
    } else if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya) { //finding range. checking to see if the dino at index i , mya at the first and second idex is greater than and equal to and less than or equal to mya
      if (key) {
        dino.push(dinosaurs[i][key])
      } else {
        dino.push(dinosaurs[i].dinosaurId)
      }
    }
  }//end of loop
  return dino // returning dino after the for loop
}//end of function

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
