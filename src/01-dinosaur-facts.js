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
  //Overall Plan: Loop through dinos, hold on to tallestDino in a variable outside of the loop, and return a formatted object representing our tallest dino
  //Account for the edgecase of an empty array
  if (!dinosaurs[0]){
    return {};
  }
  //Declare result variable to accumulate to, empty object
  const result = {};
  //Declare tallestDino object to accumulate to, set to first dino
  let tallestDino = dinosaurs[0];
  //Declare loop to iterate through all dinos (except the first)
  for (let i = 1; i < dinosaurs.length; i++){
    //create currentDino variable for clarity
    currentDino = dinosaurs[i];
    //in loop, check if current dino is taller than our tallest dino
    if (currentDino.lengthInMeters > tallestDino.lengthInMeters){
      //if it is, make it our new tallest dino
      tallestDino = currentDino;
    }
  }
  //after loop, push the name and height(in feet) of our tallest dino into our new object, formatted
  result[tallestDino.name] = tallestDino.lengthInMeters * 3.281 
  //return result
  return result;
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
  //Overall Plan: Loop through dinos, save the dino w/ the corrisponding ID, and then return string based on object
  //Declare variable to accumulate to (to hold our target dino)
  let targetDino = {};
  //Declare loop to iterate through dinosaurs
  for (let currentDino of dinosaurs){
    //in loop, check if target id is our currentDino's ID
    if (currentDino.dinosaurId === id){
      //if it is, make targetDino = currentDino
      targetDino = currentDino
    }
  }
  //after loop, return error if id wasn't found, or formatted text for the found dino
  if (!targetDino.dinosaurId){
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  } else {
    return `${targetDino.name} (${targetDino.pronunciation})\n${targetDino.info} It lived in the ${targetDino.period} period, over ${targetDino.mya[targetDino.mya.length - 1]} million years ago.`
  }
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
  //Declare result variable to iterate to
  const result = [];
  //Declare loop to iterate through dinosaurs
  for (const currentDino of dinosaurs){
    //in loop, check if current dinosaur was alive during the mya
    switch (true){
      //if there are 2 mya values
      default:
        //check if the given mya is <= the first, AND >= second
        if (mya <= currentDino.mya[0] && mya >= currentDino.mya[1]){
          //if dino was alive during those years
          //check if key is valid, if it is, push currentDino[key] to array, if not push id
          currentDino[key] ? result.push(currentDino[key]) : result.push(currentDino.dinosaurId);
        }
        break;
      //if case has 1 mya value
      case (currentDino.mya.length === 1):
        //check if the given mya is = to currentDino.mya, OR currentDino.mya - 1
        if (mya === currentDino.mya[0] || mya === currentDino.mya[0] - 1){
          //if dino was alive during those years
          //check if key is valid, if it is, push currentDino[key] to array, if not push id
          currentDino[key] ? result.push(currentDino[key]) : result.push(currentDino.dinosaurId);
        }
        break;
    }
  }
  //after loop, return our result array
  return result;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
