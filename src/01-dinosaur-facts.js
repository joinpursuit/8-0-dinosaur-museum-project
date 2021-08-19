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

//return an object
//the object is going to be the dinosaur objects that is the tallest in height
//the tallest height is in meters
//convert it to feet
//create a helper function to convert the length from meters to feet
//create a loop
//the loop is to check for the tallest dinosaur
//set an initial value to be the tallest ... 
//return the tallest dinosaur (object)

function convertToFeet(n){
  return n * 3.281
}

function getTallestDinosaur(dinosaurs) {
  let tall = {};
  let currentDino = dinosaurs[0];
  if (dinosaurs.length === 0){
    return {}
  }
  
  for (let i = 1; i < dinosaurs.length; i++){
if (dinosaurs[i].lengthInMeters > currentDino.lengthInMeters){
  currentDino = dinosaurs[i]
   }
  }
  tall[currentDino.name] = currentDino.lengthInMeters * 3.281
  return tall;
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

//returns a string
//with details from an array of objects
//create a loop 
//the loop is to check for the dinosaur (objects) that match the id
//return a string with the dinosaur that match the id with a specific message //> string
//the (string) message has details that need to be accessed from the array of objects
//if not (so any id that doesn't match) return error message //> string

function getDinosaurDescription(dinosaurs, id) {
  
  for(let i = 0; i < dinosaurs.length; i++){
    
    let dinosaur = dinosaurs[i]
    let dinosaursId = dinosaur.dinosaurId
    
    
    if (dinosaursId === id){
      let foundDino = dinosaur
      
      if(foundDino.mya.length === 1){
      
      return foundDino.name + " (" + foundDino.pronunciation +")\n" + foundDino.info + " " + "It lived in the " + foundDino.period + " " + "period, over " + foundDino.mya[0] + " million years ago."}
      
      return foundDino.name + " (" + foundDino.pronunciation +")\n" + foundDino.info + " " + "It lived in the " + foundDino.period + " " + "period, over " + foundDino.mya[1] + " million years ago."
    }
  }
  return "A dinosaur with an ID of 'incorrect-id' cannot be found." 
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
//returns an array 
//the array will be of dinosaurs that lived during a given time period
//the array will include the values of keys that match that are in the parameter/ if they are in the parameter
//create a loop
//the loop will check if dinosaur is alive during that given time period
//the loop will also check if the dinosaur (object) includes the key if provided in the parameter
//returns an array with the id of dinosaur that lived during the given time period & values of keys in the parameter (if given)
//need to access these details from the array of objects 

function getDinosaursAliveMya(dinosaurs, mya, key) {
  let dinoArray = []
  for (let dino of dinosaurs){
    let dinoYears = dino.mya 
    if(mya <= dinoYears[0] && mya >= dinoYears[1] ||
    dinoYears.length === 1 && mya === dinoYears[0] ||
    dinoYears.length === 1 && mya + 1 === dinoYears[0]){
      if(key && dino.hasOwnProperty(key)){ 
       dinoArray.push(dino[key])
      }else {
       dinoArray.push(dino.dinosaurId)
      }
    }
  }
 return dinoArray;
}
  

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
