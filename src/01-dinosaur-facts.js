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
 * 
 * 
 * 
 */

function getTallestDinosaur(dinosaurs) {
  if(!dinosaurs.length){
    return {};
  }
  let height = dinosaurs[0].lengthInMeters;
  let key;
  for(let i = 1;i < dinosaurs.length;i++){
    let dino = dinosaurs[i];
    if(dino.lengthInMeters > height){
      key = dino.name;
      height = dino.lengthInMeters;
    }
  }
  let lengthInFeet = height * 3.281;
   return {[key]: lengthInFeet};
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
/*
1.loop through the dinosaur array.
2. usa an if statement to compare each element (each dino object) to the target id
3. if target match

"Elasmosaurus (ee-LAZ-mo-sore-us)\nElasmosaurus was an aquatic dinosaur with an extremely long neck that likely fed on other smaller aquatic fauna like fish, molluscs, and squid. E.D. Cope mistakenly placed the skull of an Elasmosaurus on the much shorter tail rather than the extremely long neck. It lived in the Late Cretaceous period, over 80.5 million years ago.";

*/
function getDinosaurDescription(dinosaurs, id) {
  let returnValue =  `A dinosaur with an ID of '${id}' cannot be found.`;
  for(let dinosaur of dinosaurs){
    if(dinosaur.dinosaurId === id){
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`;
      } 
    }
    return returnValue;
  }
// This function takes in array and target and if target is found in the array then return the index of the target
// if not found return an error message.
// function findTargetNum(array, target){
//   let foundIndex;
//   let targetFound = `Target found at ${foundIndex}.`;
// for(let i = 0;i < array.length;i++){
//   if(array[i] === target){
//     foundIndex = i;
//     return targetFound;
//   } 
// } 
// return "Target not found.";
// }
// console.log(findTargetNum(["Lions", "Tigers", "Bears"], "Dogs"));


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
/*
first, needs to return an ARRAY of dinosaur IDs that lived within the mya range provided. If the mya !==
any dino.mya's within range, return an empty array.
2. if a dino only has on mya year provided, the logic has to allow for the given mya OR dino.mya-1
3. if the 'key' argument IS PROVIDED (i.e. truthy), it needs to return the value of that key for each dino
alive at that time, in an ARRAY.
4. if the key argument !== any dino(key), return the IDs as above.






*/
}








module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
