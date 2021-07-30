/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. 
  This data is pulled from the `data/dinosaurs.js` file.

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
  // input: `dinosaurs` is a special variable that will hold the value of the argument when the function is invoked 
  // output: return object { Brachiosaurus: 98.43 }

  // edge case: if array is empty
  if (dinosaurs.length === 0) {
    // return empty object
    return {};
  }

  let height = dinosaurs[0].lengthInMeters;
  let name = dinosaurs[0].name;

  // loop through array of objects to find the tallest dinosaur
  for (let i = 1; i < dinosaurs.length; i++) {
    // if dinosaurs[i].lengthInMeters is greater than the height of the tallest dinosaur
    if (dinosaurs[i].lengthInMeters > height) {
      // reassign the height of the tallest dinosaur to dinosaurs[i].lengthInMeters
      height = dinosaurs[i].lengthInMeters;
      // reassign the name of the tallest dinosaur to dinosaurs[i].name
      name = dinosaurs[i].name;

    }
  }
  
  // return object with key - value pair {name: height * conversion to feet}
  return {[name]: height * 3.281};
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. `If` the dinosaur cannot be found, returns an error message.
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
  // input: `Dinosaurs` and `id` are special variable for that will hold the value of the argument when the function is invoked
  //        `id` is a string that is equivalent to accessing dinosaurs[i].dinosaurId
  // output: return a string using template literals
  //         `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaur.mya[]} million years ago.`;
  //         `A dinosaur with an ID of 'incorrect-id' cannot be found.`;

  // for readability use for of instead of for i to loop through dinosaurs
  for (const dinosaur of dinosaurs) {

    // if dinosaur ID is found and if there is only one value in `mya`
    if (dinosaur.dinosaurId === id && dinosaur.mya.length === 1) {
        // return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaur.mya[0]} million years ago.`;
        return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[0]} million years ago.`;
        // if dinosaur ID is found 
      } else if (dinosaur.dinosaurId === id) {
        // return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaur.mya[dinosaur.mya.length -1]} million years ago.`;
        return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length -1]} million years ago.`;
    }
  }
  // otherwise 
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
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
 function range (dinosaurs, mya) {  
  // loop through an object in dinosaurs array 
  for (let i = dinosaurs.mya[0] ; i >= dinosaurs.mya[dinosaurs.mya.length - 1]; i--) {
    // if dinosaur was alive `mya`
    if (i === mya) {
      return true;
      // if object in dinosaur has one element and the dinosaur was alive 1 `mya` before `mya`
    } else if (dinosaurs.mya.length === 1 && i - 1 === mya ) {
      return true;
    }
  }
  return false;
}
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // input: `dinosaurs`, `mya` and `key` are special variable for that will hold the value of the argument when the function is invoked
  //        `mya` is a number in an array and is equivalent to accessing dinosaur.mya[]
  //        `key` is a string if "name" return dinosaur name otherwise return dinosaur Id 
  // output: return an array of strings if dinosaurs lived `mya` 

  // declare a variable `alive` and assign it an empty arr
  let alive = [];

  // loop through each objects in dinosaurs array
  for (let i = 0; i < dinosaurs.length; i++ ) {
    // if a dinosaur is alive `mya` and if key is stricly equal to "name"  
    if (range(dinosaurs[i], mya)  && key === "name") {
      // push dinosaur name into alive
      alive.push(dinosaurs[i].name);

      // if a dinosaur is alive `mya` 
    } else if (range(dinosaurs[i], mya) ) {
      // push dinosaur Id into alive
      alive.push(dinosaurs[i].dinosaurId);
    }
  }
  return alive;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
