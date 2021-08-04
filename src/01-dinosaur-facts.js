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
  // Accumulator Pattern to determin tallest
  // Convert lengthInMeters to feet
  // Return the newly created object with name of the dinosaur as the key and height as the value
  let obj = {}
  let height = 0
  if(!dinosaurs.length){
    return obj;
  }
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].lengthInMeters > height){
       height = dinosaurs[i].lengthInMeters;
       key = dinosaurs[i].name; 
       lengthInFeet = height * 3.281;
    } 
  } 
  obj[key] = lengthInFeet
  return obj;
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
  //make a for loop to check each element
  //compare each element to target to see if they match
  //if a match is found, return the target value
  //if the loop completes and the target isn't found, return an error message
  for(let dino of dinosaurs){
    if(dino.dinosaurId === id){
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length -1]} million years ago.`;
    }
  }
  return `A dinosaur with an ID of '${id}' cannot be found.`
}
getDinosaurDescription(exampleDinosaurData);
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
// First, needs to return an ARRAY of "dinosaurId's" that lived within the "mya" range provided. 
  let arr = [];
  let dinoKey = "dinosaurId";
// If the "key" parameter IS PROVIDED (i.e. truthy), it needs to return the value of the that key for each
// dinosaur alive at that time, in an ARRAY
  if(Object.keys(dinosaurs[0]).includes(key)){ // Object.keys method
    dinoKey = key;
  }
// If the "key" param !== any dino[key], return the IDs as above.

 // // Ternary method
    //let dinosaurKey = dinosaurs[key] ? key : "dinosaurId"
    
    // Or
    
    // if method
    // if(!dinosaur[key]){
    //   dinosaurKey = key
    // }else{
    //   dinosaurKey = "dinosaurId"
    // }
    
  for(let dino of dinosaurs){
// Next, if a dino only has one mya year porvided, the logic has to allow for the given mya OR dino.mya -1       
    if(dino.mya.length === 2){
     if(mya <= dino.mya[0] && mya >= dino.mya[1]){
       arr.push(dino[dinoKey])
     }
    }else{
      if(mya === dino.mya[0] || mya === (dino.mya[0] - 1)){
       arr.push(dino[dinoKey])
      }
    }
  }
// If the mya !== any dino.mya's within range, return an empyt array.
  return arr;
}
getDinosaursAliveMya(exampleDinosaurData, 150, "teeth");

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};



/**
 * Example Function
 * @param {array} an array of numbers
 * @param {number} a target number to search for in the array
 * @return {number or string} returns the target number if found. if number is not found, returns a error message.
 * 
 * let numArr = [4,7,9,2,11,5,5,13,2]
 * 
 * PSEUDOCODE
 * make a for loop to check each element
 * compare each element to target to see if they match
 * if a match is found, return the target value
 * if the loop completes and the target isn't found, return an error message
 */

// function findTargetNum(array, target)
//{ for(let num of array){
//  if(num === target){
//    return num
//}  
//}
//return `${target} not found`
//}
//
//console.log(findTargetNum(numArr, 13))