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
  let max = 0
  // Max length
  let name = 0
  // empty string
  let newDino = {}
  //empty object 
  if(dinosaurs.length === 0){
    return {}
  }
  //It want us to return an empty object if there is nothing in it.
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].lengthInMeters > max){
    max = dinosaurs[i].lengthInMeters 
    name = dinosaurs[i].name
  }
  //Looking for the longest Dinosaur setup a function that will loop through the array.
}
  max *= 3.281
  //Once we get the longest dinosaur we convert it to feet.
 newDino[name] = max 
 //The empty object of newDino put in the object key of name and the key of max
 return newDino
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
let newId;
let newName;
let newPronunciation;
let newMeaning;
let newDiet;
let newLength;
let newPeriod;
let newMya;
let newInfo;
let exist = false
//To match with the id value in the function

 for(let i = 0; i < dinosaurs.length; i++){
  if(dinosaurs[i].dinosaurId === id){
    newId = dinosaurs[i].dinosaurId
    newName = dinosaurs[i].name
    newPronunciation = dinosaurs[i].pronunciation
    newMeaning = dinosaurs[i].meaningOfName
    newDiet = dinosaurs[i].diet
    newLength = dinosaurs[i].lengthInMeters
    newPeriod = dinosaurs[i].period 
    newMya = dinosaurs[i].mya[dinosaurs[i].mya.length - 1]
    newInfo = dinosaurs[i].info
    exist = true
    //To see if all the values matches with the id.
  }
 
  
 }
 if(exist === false){
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
  //To ge the error message if the dinosaur id does not match.
}
 return `${newName} (${newPronunciation})\n${newInfo} It lived in the ${newPeriod} period, over ${newMya} million years ago.` 
//Return message if the id matches
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
function getDinosaursAliveMya(dinosaurs, mya, key = "dinosaurId") {
  //set the key equal toe DinosaurId to push in the id into a new array later on
  let newArray = []
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].mya[0]-1 <= mya && dinosaurs[i].mya >= mya){
      newArray.push(dinosaurs[i][key])
    }
   else if (dinosaurs[i].mya[dinosaurs[i].mya.length - 1] <= mya && dinosaurs[i].mya[0] >= mya){
    newArray.push(dinosaurs[i][key])
   }
  }
  return newArray
  }
  


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
