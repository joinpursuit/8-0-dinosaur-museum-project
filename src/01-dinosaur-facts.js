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
//consider if the array of objects is empty, should return an empty object.
  if(dinosaurs.length === 0){
    return {}
  }

  // Create an empty object to later return.
let obj = {}

// Set tallest to the first index so we have something to compare to when searching for the tallest. Comparing the lengthInMeters
let tallest = dinosaurs[0].lengthInMeters
// create an empty string to later fill with the name of the tallest/longest dino.
let nameDino = ""

//loop thru the array of objects (dinosaurs)
for(let i =0; i < dinosaurs.length; i++){

  //compare the dinosaurs at index i to the variable that contains the "tallest"
    if(dinosaurs[i]['lengthInMeters'] > tallest){
      //update the name of the tallest/longest dino
    nameDino = dinosaurs[i].name
    //update the length in meters 
    tallest = dinosaurs[i].lengthInMeters
  }

} 
//convert from meters to feet by multiplying by 3.281
tallest *= 3.281

//create a new key/value pair in the empty object
obj[nameDino] = tallest 

return obj
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

//create a loop to iterate thru dinosaurs object
for(let i =0; i < dinosaurs.length; i++){
  //comparing the dinosaurs.Id to the id (param) to see if they are deeply equal
  if(dinosaurs[i].dinosaurId === id){

//if they are equal, return a string by calling to the keys within the object to build the name, pronunciation, and the description.
    return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length-1]} million years ago.`
  }
}
//if the id doesn't match, return an error message.
return `A dinosaur with an ID of '${id}' cannot be found.`
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
function getDinosaursAliveMya(dinosaurs, mya, key = 'dinosaurId') {
  //set the defualt value of the parameter 'key' to be 'dinosaurId'
  //Create an empty array to return later on
let arr = []

//create a for of loop for the object
for(let dinosaur of dinosaurs){

  //check if mya is equal to a range of values. if it is, push that dinosaurId to the empty array created.
  if(dinosaur.mya[0] >= mya && dinosaur.mya[0]-1 <= mya){
    arr.push(dinosaur[key])
  } else if(dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya){
    arr.push(dinosaur[key])
  }
  
} 
return arr
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
