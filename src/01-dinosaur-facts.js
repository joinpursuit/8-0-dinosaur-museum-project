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
  let dinoSizes = 0 // setting up a number variable for the dinosaur heights in the for loop
  let dinoName = " " // setting up a string variable for the dinosaur names in the for loop

  if (dinosaurs.length === 0){
    return {}
  } 
  
  // above is the guard clause, stating that if the length of the array equals zero, meaning there's nothing in it, then 
  // return the empty object

  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > dinoSizes){
      dinoSizes = dinosaurs[i].lengthInMeters
      dinoName = dinosaurs[i].name
      console.log(dinoName)
    }
  }
  
  // the for loop above states that when going through every index in the dinosaurs array, if the lengthInMeters value is greater than
  // the value of the dinoSizes variable, console.log the value of dinoName, which was assigned in the logic of the loop. it also
  // reiterates the values of the dinoSizes and dinoName variables
  
  dinoSizes = dinoSizes * 3.281
  let final = {}
  final[dinoName] = dinoSizes
  return final

  // this final part converts the dinoSizes into meters and creates an empty object to assign the key value pair of dinoName and dinoSizes.
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

  // declare a variable to store your information
  let allInfo;

  // this loop explains that if each id in the dinosaurs object matches up to the id parameter, return the given string
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId === id){
       allInfo = dinosaurs[i] // this declaration stores the information of every index in the dinosaurs object
       return(`${allInfo.name} (${allInfo.pronunciation})\n${allInfo.info} It lived in the ${allInfo.period} period, over ${allInfo.mya[allInfo.mya.length - 1]} million years ago.`)
    } 
  }
  // returns an error message if the for loop cannot be completed
 return  `A dinosaur with an ID of 'incorrect-id' cannot be found.`
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
  // purpose of the function is to return an array of values containing dinosaurs that were alive at the given 'mya' parameter
  // if key is provided, returns value of each key. otherwise if the value of the key is not provided, returns the id.
  // if mya is a single digit, it's allowed to equal the given value or one less than the given value.
  // this will be a for of loop, the two numbers are a range

  let dinoArray = []; // create an empty array to push the information into
  
  for (const dinosaur of dinosaurs) { // separates the individual dinosaur objects from the dinosaurs array of objects
    if (dinosaur.mya[0] === mya || dinosaur.mya[0] - 1 === mya ){ 
      // if the first element of the individual dinosaur object in the key of mya is equal to the given value of the parameter mya
      // or if one less of the first element of the individual dinosaur object in the key of mya is equal to the given value of the 
      // parameter mya
      dinoArray.push(dinosaur[key])
      // then push that into the empty array dinoArray, specifically with the key of "dinosaurId", shown in the parameter above
    } if (dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya){
      // if the first element of the individual dinosaur object in the key of mya is greater than or equal to the given mya value 
      // AND if the second element of the individual dinosaur object in the key of mya is less than or equal to the given mya value
      dinoArray.push(dinosaur[key])
      // then push that into the // then push that into the empty array dinoArray, specifically with the key of "dinosaurId"
      // this covers the dinosaurs that were alive within a range of numbers
    }
  } return dinoArray 
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
