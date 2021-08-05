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

/* 
Understanding: 
Access the dinosaur array and return the *longest* dinosaur by *feet*
The output is an object with the dinosaur name and length in feet with 2 decimal points
Plan: 
Set the default output as an object
loop through the array to find the dinosaur with the longest length in meters, which is Brachiosaurus with 30 meters in length
then set default output equal to the dinosaur name
*/

function getTallestDinosaur(dinosaurs) {
  // Checks to see if dinosaurs array is empty, if it is, the output is an empty object  
  if(dinosaurs.length === 0){
    return {};
  }
  // Accumulator to get the longest Dino
  let longestDino = dinosaurs[0];
  let longestDinoObj = {}
  for (let i=1; i<dinosaurs.length; i++){
    let dinoLength = dinosaurs[i].lengthInMeters;
    if(dinoLength > longestDino.lengthInMeters){
      longestDino = dinosaurs[i];
    }
  }
  // Sets the Dino name as the key within the empty object and sets the value to length in feet by multiplying meters by 3.281
  longestDinoObj[longestDino.name] = longestDino.lengthInMeters * 3.281;
  return longestDinoObj;
}

getTallestDinosaur(exampleDinosaurData);

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
  // Set default 
  let dinoDescription = '';
  // Accumulator to see if given ID is equal to a dinosaur ID, set description
  for (let i=0; i<dinosaurs.length; i++){
    let dinosaurId = dinosaurs[i].dinosaurId;
    if (dinosaurId === id){
      let dino = dinosaurs[i];
      dinoDescription = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`;
    } 
  }
  // Error checking if ID is valid
  if (dinoDescription === ''){
    return `A dinosaur with an ID of '${id}' cannot be found.`
  } else {
    return dinoDescription;
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
  // Set default value to an empty array
  let dinoAlive = [];
  // Loop through dinosaurs
  for (let i=0; i<dinosaurs.length; i++){
    let dino = dinosaurs[i];
    let dinoYearsArr = dinosaurs[i].mya;
    let dinoID = dinosaurs[i].dinosaurId
    
    if (!key && (mya <= dinoYearsArr[0] && mya >= dinoYearsArr[1])){
      dinoAlive.push(dinoID);
    } else if (!key && (mya === dinoYearsArr[0] || mya === (dinoYearsArr[0]-1))){
      dinoAlive.push(dinoID);
    } else if (key && (mya === dinoYearsArr[0] || mya === (dinoYearsArr[0]-1)) || (mya <= dinoYearsArr[0] && mya >= dinoYearsArr[1])){
      dinoAlive.push(dino[key]);
    } else if (key !== dino && (mya === dinoYearsArr[0] || mya === (dinoYearsArr[0]-1)) || (mya <= dinoYearsArr[0] && mya >= dinoYearsArr[1])){
      dinoAlive.push(dinoID);
    }
  }
  return dinoAlive;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
