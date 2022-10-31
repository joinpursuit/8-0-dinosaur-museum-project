/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/* LOGIC: While refractoring I prioritized readability and simplicity. Some of the code could be writen in fewer lines/pieces, but it also would have made the code harder to read (at least to me 🤷🏽‍♂️) .
Each of the functions below has a similar structure.
They each start with the ACCUMULATOR variable(s) which track pieces of the final result,
that's followed by a FUNCTION that will be executed on the dinosaurs array during a loop,
(using helper functions helps avoid nested if statments, improving readability)
followed by the LOOP, if neccessary code to account for ERRORS, and the return statment */

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
  //ACCUMULATORS
  let result = {};
  let name = ""
  let length = 0

  //FUNCTION
  const getLongestInfo = (dinoObject) => {
    if (dinoObject.lengthInMeters > length) ({lengthInMeters: length, name} = dinoObject) ;
  };

  //LOOP
  dinosaurs.forEach(dino => getLongestInfo(dino))
  
  //ERROR: Ensures that name & length are only passed into object if they have values
  if(length > 0) {result[name] = length * 3.281}

  //RETURN
  return result
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
  //ACCUMULATORS
  let name, pronunciation, info, period, mya;

  //FUNCTION
  const getInfoById = (dinoObject) => {if(dinoObject.dinosaurId == id) ({name, pronunciation, info, period, mya} = dinoObject)} ;

  //LOOP
  dinosaurs.forEach (dino => getInfoById(dino))

  //ERROR
  if(!name){
    return `A dinosaur with an ID of '${id}' cannot be found.`
  }

  //RETURN
  return `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${mya[mya.length-1]} million years ago.`
}
//console.log(getDinosaurDescription(exampleDinosaurData, "U9vuZmgKwUr"))

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
  //ACCUMULATOR
  let result = []
  
  /*FUNCTION: Takes a dinosuar object as well as the end of their mya range (myaEnd) as param.
  All dinosaurs have at least one mya value. Dinos that only have one value are accounted for with the myaEnd param.
  If the mya is within range, the program will pushes either a key if one is provded and exsist within any dinosaur object or the dinosaur's ID */
  const pushToResult = (currentDino, myaEnd) => {
  if (currentDino.mya[0] >= mya && myaEnd <= mya ) {
    result.push(dinosaurs[0].hasOwnProperty(key) ? currentDino[key] : currentDino.dinosaurId)
      } 
    }

  /*LOOP If the current dino had two mya values the myaEnd varibale is sets to that dinos second value
  otherwise myaEnd will be set to one year less (as per the test/instructions)*/
  dinosaurs.forEach(dino => {
    let myaEnd = dino.mya.length == 2 ? dino.mya[1] : dino.mya[0]-1;

    pushToResult(dino, myaEnd);
  })

  //RETURN
  return result
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
