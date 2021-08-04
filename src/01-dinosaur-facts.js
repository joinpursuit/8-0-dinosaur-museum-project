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
  //INPUT is an array of dinosaurs
  if (dinosaurs.length === 0) {
    return {};
  }
  //Create default variable = {}
  let tallest = {};

  //Create a new variable for = tallest Dino. currentDino = tallestDino
  let currentDino = dinosaurs[0];

  //Define loop and code to loop thru
  for (let i = 1; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > currentDino.lengthInMeters) {
      currentDino = dinosaurs[i];
    }
  }
  //tallest[currentDino.name] = currentDino.lengthInMeters * 3.281
  tallest[currentDino.name] = currentDino.lengthInMeters * 3.281;

  //OUTPUT: return new object > DINOSAUR NAME:DINOSAUR HEIGHT IN FEET = {name:heightInFeet}
  return tallest;
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
  //IF DINOSAUR NOT FOUND RETURN ERROR MESSAGE
  //IF DINOSAUR FOUND RETURN DINO DESCRIPTION
  //DEFINE DEFAULT VALUE = ERROR MESSAGE
  //DEFINE LOOP

  let message = `A dinosaur with an ID of '${id}' cannot be found.`;

  for (let i = 0; i < dinosaurs.length; i++) {
    let dinosaur = dinosaurs[i];

    if (dinosaur.dinosaurId === id) {
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${
        dinosaur.info
      } It lived in the ${dinosaur.period} period, over ${
        dinosaur.mya[dinosaur.mya.length - 1]
      } million years ago.`;
    }
  }
  return message;
}
//console.log(getDinosaurDescription(exampleDinosaurData, "U9vuZmgKwUr"));

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

//HELPER FUNCTION... DOES NOTHING UNTIL IT IS CALLED BY ANOTHER FUNCTION
/*function isItAlive(dino, year) {
  //Dino = dino.mya and Year = mya which 
  //dino is an array. Parameters passed in on line 134
  if (dino[0] >= year && dino[1] <= year) {
    return true;
    //if (66) = given year or (65) = given year
  } else if (dino[0] === year || dino[0] - 1 === year) {
    return true;
  }
  return false;
}
function getDinosaursAliveMya(dinosaurs, mya, key) {
  //Default value is an empty array
  let liveDino = [];
  
  //Dino represents each individual dinosaur in dinosaurs array
  for (let dino of dinosaurs) {

    //
    if (isItAlive(dino.mya, mya) && key) {
      liveDino.push(dino[key]);
      
    } 
    else if (isItAlive(dino.mya, mya)) {
      liveDino.push(dino.dinosaurId);
    }
  }
  return liveDino;

};*/

function getDinosaursAliveMya(dinosaurs, mya, key) {
  let liveDino = [];
  for (let dinosaur of dinosaurs) {
    if (dinosaur.mya.length > 1) {
      if (dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya) {
        if (key in dinosaur) {
          liveDino.push(dinosaur[key]); 
        } else {
          liveDino.push(dinosaur.dinosaurId)
        }
      }
    } else if (dinosaur.mya.length === 1){
      if (dinosaur.mya[0] === mya || dinosaur.mya[0] === mya + 1) {
        if (key in dinosaur) {
          liveDino.push(dinosaur[key]);
        } else {
          liveDino.push(dinosaur.dinosaurId);
        }
      }
    }
  }
  return liveDino;
 }

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
