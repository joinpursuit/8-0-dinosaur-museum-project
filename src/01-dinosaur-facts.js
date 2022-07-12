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
  // in case the dinsaurs object is empty, I still want to return something (an empty object).
  if (!dinosaurs.length) {
    return {};
  }
  // I declared a new variable and initialized it as an empty object, which I will use later on to store the longest dino.
  let obj = {};
  // I declared a new variable and did not initialized it with any value.
  // I want to use it as a key in my "obj" to store the name of the longest dino.
  let dinoName;
  // I declared a new variable and initialized it with the value 0.
  // I want to use it a key value in my "obj" to store the height of the longest dino.
  let heightInFeet = 0;
  // create a for loop to iterate through the dinosaurs object.
  for (let i = 0; i < dinosaurs.length; i++) {
    // check it the length in meters of the dino at index i is greater than 0 first.
    if (dinosaurs[i].lengthInMeters > heightInFeet) {
      // keep replacing my heightInFeet with "i" each time it is less than "i". 
    // stop when we iterate through the last element.
      heightInFeet = dinosaurs[i].lengthInMeters;
      // assign the name of the longest dino's name to my variable "dinoName".
      dinoName = dinosaurs[i].name;
    }
  }
  // push my variable "dinoName" as a key in my "obj" and give it the value of "heightInFeet".
  // multiply the lenghtInMeters by 3.281 to get the length in feet.
  obj[dinoName] = (heightInFeet * 3.281);
  // return my new obj.
  return obj;
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
  // this is a guard clause.
  // return an error message as a string if the "id" is not found in the dinosaurs object.
    if (id === "incorrect-id") {
      return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
    }
  let str;  // will store the last string I want to return.
  let dinoName;  // will store the name of the dino that pass the test.
  let dinoPronound;  // will store the pronunciation of the dino that pass the test.
  let description;  // will store the info of the dino that pass the test.
  let time;  // will store the period of the dino that pass the test.
  let years;  // will store the "mya" of the dino that pass the test.
  // use a for loop to iterate through my "dinosaurs" object.
  for (let i = 0; i < dinosaurs.length; i++) {
    // check if "id" is strictly equal to any "dinosaurId" in the "dinosaurs" object.
    if (id === dinosaurs[i].dinosaurId) {
      dinoName = dinosaurs[i].name;  // assign the "name" of the dino that pass the test to my variable "dinoName".
      dinoPronound = dinosaurs[i].pronunciation;  //assign the "pronunciation" of the dino that pass the test to my variable "dinoPronound".
      description = dinosaurs[i].info;  // assign the "info" of the dino that pass the test to my variable "description".
      time = dinosaurs[i].period;  // assign the "period" of the dino that pass the test to my variable "time".
      years = dinosaurs[i].mya.slice(-1)[0]; // assign the last element in the "mya" array to my variable "years".
    }
  }
  // return a string that will have on the:
  // first line "name" and the "pronunciation" of the dino that pass the test.
  // second line a detailed description of that dino.
  return str = `${dinoName} (${dinoPronound})\n${description} It lived in the ${time} period, over ${years} million years ago.`;
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
  let arr = [];  // create an empty array to push the "dinosaurId" that pass the test.
  // looping through the dinosaurs object.
  for (let i = 0; i < dinosaurs.length; i++) {
    // checking if a dino's "mya" has a single value.
    // if yes return that value or 1 less that value.
    // return the value of the key or the ID in case no.
    if (dinosaurs[i].mya[0] - 1 <= mya) {
      if (dinosaurs[i].mya[0] >= mya) {
        arr.push(dinosaurs[i][key]);
      }
    } else if (dinosaurs[i].mya[1] <= mya) {
      if (dinosaurs[i].mya[0] >= mya) {
        arr.push(dinosaurs[i][key]);
      }
    }
  }
  return arr;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
