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
  let tallest = dinosaurs[0]
  //Declared a variable tallest and set it equal to the first dinosaur height 
  //because the parameter dinosaurs is an array of objects.
  let newDinoObject = {};
  //Declared an empty object
  //Below put the length in the condition and used for of loop to iterate through the array
  if (dinosaurs.length) {
    for (const dino of dinosaurs) {
      if (tallest.lengthInMeters < dino.lengthInMeters) {
        tallest = dino
        //Utlized the less than comparison operator for tallest.lengthInMeters
      }
    }
     const lengthInFeet = tallest.lengthInMeters * 3.281
     newDinoObject[tallest.name] = lengthInFeet
     //Declared a new variable in feet by converting the lengthInMeters * given 3.281
  }
  return newDinoObject;
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
  let foundDino = null
  let dinoDescription = ''
  //Declared varibles
  // Utilized for of loop to iterate through this array
  //Compare current dino.dinosaurId to id
  for (let dinos of dinosaurs) {
    if (dinos.dinosaurId === id) {
      foundDino = dinos
    }
  }
  //Used string interpolation and the sentence that needs to be used in order for it to pass.
  if(!foundDino) {
    return `A dinosaur with an ID of '${id}' cannot be found.`
  } 
  return `${foundDino.name} (${foundDino.pronunciation})\n${foundDino.info} It lived in the ${foundDino.period} period, over ${foundDino.mya[foundDino.mya.length - 1]} million years ago.`  
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
  let dinoAlive = [];
  //Declared an empty array
  // Check if dino.mya.length is equal to 2 and utlized the comparison operator to for index 0 and 1
  for (const dino of dinosaurs) {
    if(dino.mya.length === 2 && dino.mya[0] >= mya && dino.mya[1] <= mya) {
      if (key) {
        dinoAlive.push(dino[key])
      } else {
        dinoAlive.push(dino.dinosaurId)
      }
      // If there is a key push the dinokey in the array
      // If there is no key push the dinosaur id inot dino array
      // Below this line is checking to see if dino.mya index 0 equal to mya or the other one
      // If there is a key then it pushes the key
      // the other one will push dinosaurId in array
      } else if (dino.mya[0] === mya || (dino.mya[0])-1 === mya) {
        if (key) {
          dinoAlive.push(dino[key])
        } else {
          dinoAlive.push(dino.dinosaurId)
        }
      }
    }
    return dinoAlive;
  }


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
