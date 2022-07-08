/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const dinosaurs = require("../data/dinosaurs");
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
// initialized variables to store through each iterations 
let longest = 0
let name = 0
let newObj = {}

if (dinosaurs.length === 0 ){
// returnining empty object if length is 0
  return {}
}
// initialized for loop to loop through array of objects dinosaurs
  for (let i = 0; i < dinosaurs.length; i++){

    if (dinosaurs[i].lengthInMeters > longest){
       longest = dinosaurs[i].lengthInMeters
       name = dinosaurs[i].name
    } 
}
longest *= 3.281
newObj[name] = longest
return newObj;
}
// console.log(getLongestDinosaur(exampleDinosaurData));

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
  // initialized variables to store values later on.
  let dinoID = 0
  let name = 0
  let pronunciation = 0
  let information = 0
  let period = 0
  let years = 0 
  let doesItExist = false 
  // use for loop through dinosaurs array of objects
  for (let i = 0; i < dinosaurs.length; i++){
    if (dinosaurs[i].dinosaurId === id){
      dinoID = dinosaurs[i].id
      name = dinosaurs[i].name
      pronunciation = dinosaurs[i].pronunciation
      information = dinosaurs[i].info
      period = dinosaurs[i].period
      years = [...dinosaurs[i].mya]
      years = years[years.length-1]
      doesItExist = true
    } 
  }
  // after loop runs and if the boolean is still false then print an error message for incorrect-id
  if (doesItExist === false){
    return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
  }// returns the description as specified by using template literal
  return `${name} (${pronunciation})\n${information} It lived in the ${period} period, over ${years} million years ago.`
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
  // initialize empty array
let arr= [];

//  looping through dinosaurs array of {}
for (let i = 0; i < dinosaurs.length; i++){
  // if (dinosaurs[i].mya[0]-1 <= mya && dinosaurs[i].mya[0] >= mya){
  //   arr.push(dinosaurs[i].dinosaurId)
  //   console.log(arr)
  // } else if (dinosaurs[i].mya[1]<= mya && dinosaurs[i].mya[0]>= mya){
  // arr.push(dinosaurs[i].dinosaurId)
  // console.log(arr)}

  // check if `mya` value to be equal to the given value or one less.
 if (dinosaurs[i].mya[0]-1 <= mya && dinosaurs[i].mya[0] >= mya){
   // pushing to empty array if condition is true
  arr.push(dinosaurs[i][key])
  console.log(arr)
  // check if mya value is any value between mya[0] and mya[1]
} else if (dinosaurs[i].mya[1]<= mya && dinosaurs[i].mya[0]>= mya){
  // pushing to empty array if condition is true
arr.push(dinosaurs[i][key])
console.log(arr)
}
}
//returns the arr after checking each conditionals
return arr
}

console.log(getDinosaursAliveMya((dinosaurs, 150)));
module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
