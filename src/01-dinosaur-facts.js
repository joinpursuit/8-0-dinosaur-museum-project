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

  let longestDinoInfo = {};
  let longestDino = dinosaurs[0];
  
  //Searches for the longest dinosaur by comparing the dinosaurs and stores the longest to longestDino. Repeats until all dinosaurs have been compared.
  for (let i = 1; i < dinosaurs.length; i++){
    if(longestDino.lengthInMeters < dinosaurs[i].lengthInMeters){
      longestDino = dinosaurs[i];
    }
  }
  
  // Checks if there are dinosaurs given. If there are dinosaurs, then it creates a property with the name of longest dinosaur as the key-name and the length-in-feet as the key-value
  if(longestDino){
  longestDino["lengthInFeet"] = longestDino.lengthInMeters * 3.281;
  longestDinoInfo[longestDino.name] = longestDino.lengthInFeet;
  }

  return longestDinoInfo;
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
  let dinoDescrip = `A dinosaur with an ID of '${id}' cannot be found.`;
  
  for(let dino of dinosaurs){
    if(id === dino.dinosaurId){ // checks if given id is valid; Otherwise, returns original value of dinoScript (error message)
      dinoDescrip = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`;
    }
  }

  return dinoDescrip
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
  const dinosAlive = []; 
  
  for(let dino of dinosaurs){ 
    if(dino.mya.length === 2){ // checks if a dinosaur has two number values in its mya array, and then checks the following conditions
      if((dino.mya[0] >= mya) && (mya >= dino.mya[dino.mya.length-1])){ // Uses the dinosaurs mya values as ranges, and checks if given mya falls into the range
        if(dino[key]){
          dinosAlive.push(dino[key]);
        }
        else { 
          dinosAlive.push(dino.dinosaurId); //stores dinosaur IDs if specific key (information) has not been requested
        }
      }
    }

    if(dino.mya.length === 1){ // checks if a dinosaur has one number value in its mya array, and then checks the following conditions
      if((dino.mya[0] === mya) || (dino.mya[0] === (mya + 1))){ // allows for the `mya` value to be equal to the given value or one less
        if(dino[key]){
          dinosAlive.push(dino[key]);
        }
        else { 
          dinosAlive.push(dino.dinosaurId); 
        }
      }
    }
  }
  return dinosAlive;
}

getDinosaursAliveMya(exampleDinosaurData, 150)

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
