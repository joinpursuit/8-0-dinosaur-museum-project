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
  let obj = {}; //A place holder for the answer
  let longest = 0; //Holds the vaule of the longets dinosaur
  let name = 0; //Holds the name of the dinosaur that corresponds to the longest length
  for (let i = 0; i < dinosaurs.length; i++){ //Loop that goes through the dinosaurs array.
    if (dinosaurs[i].lengthInMeters > longest){ //Checks if given dinosaur in array has a length longer then the value held by longest
      longest = dinosaurs[i].lengthInMeters; //Replaces longest value with new vaule if given dinosaur length is larger then value held by longest
      name = dinosaurs[i].name; //Replaces name values with the name of the dinosaur that corresponds to the longest length
    }
  }
    obj[name] = longest * 3.281; //Formats the name and length(in meters) of the largest dinosaur in to an object 
  if(dinosaurs.length === 0){ //Checks if dinosaurs array is empty
    obj = {}; //Gives back empty object for error message
  } 
    return obj; //Returns the obj that was formated
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
  let description = ""; //Hold the answer
  for (let i = 0; i < dinosaurs.length; i++){ //Loop that goes through dinosaurs array
    if (dinosaurs[i].dinosaurId === id){ //Checks if id is inside of the array of dinosaurs
    description = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`; //Formats all required information 
    return description; //Returns answer
    } else { //Used for error messages
    description = `A dinosaur with an ID of '${id}' cannot be found.` //Correct format of error message
  }
  } 
  return description //Used to return error message
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
  let result = []; //Holds answer
  for (i = 0 ; i < dinosaurs.length ; i++) { //Loop that goes through dinosaurs array
  if (dinosaurs[i].mya.length === 2 && dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya){ //Checks if dinosaurs[i].mya.length is = 2 and if the first vlaues is greater then or equal to mya and if the second value is less then or equal to mya 
    if (Object.keys(dinosaurs[i]).includes(key)){ //Checks if any keys inside of an element of the dinosaurs array matches to key
      result.push(dinosaurs[i][key]) //Pushes the value related to that key into reult
    } else { //If the Key does not match 
      result.push(dinosaurs[i].dinosaurId) //Pushes the id of the dinosaurs that lived in the given mya
      }
    } else if (dinosaurs[i].mya.length === 1 && (dinosaurs[i].mya[0] - 1 === mya || dinosaurs[i].mya[0] === mya)){ //Checks ifany dinosaurs in dinosaurs array lived in the given mya. also if the mya they exsited in -1  = mya
        if (Object.keys(dinosaurs[i]).includes(key)){ //Checks if any keys inside of an element of the dinosaurs array matches to key
      result.push(dinosaurs[i][key]) //Pushes the value related to that key into reult
        } else { //If the Key does not match 
      result.push(dinosaurs[i].dinosaurId) //Pushes the id of the dinosaurs that lived in the given mya
      }
    }
  }
  return result //Returns the answer
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
