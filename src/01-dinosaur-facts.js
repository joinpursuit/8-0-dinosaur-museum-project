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
  let tallestDino = {}; //Create new object
  //If dinosaurs object does not have an element at index 0, it is empty, return empty object
  if (!dinosaurs[0]) {
    return tallestDino;
  }
  //Create key and value variable and set them to respective dinosaurs.name and dinosaurs.lengthInMeters from first index
  let key = dinosaurs[0].name;
  let value = dinosaurs[0].lengthInMeters;
  //Iterate through dinosaurs array
  for (const dinosaur of dinosaurs) {
    //If the given dinosaur.lengthInMeters is greater than value, reassign value and key to given dinosaur
    if (dinosaur.lengthInMeters > value) {
      key = dinosaur.name;
      value = dinosaur.lengthInMeters;
    }
  }
  value *= 3.281;  //Convert value to feet
  tallestDino[key] = value; //Create key in tallestDino object using key varaibl and give value of 'value' variable
  return tallestDino;
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
  let str = ""; //Declare empty string str
  //Iterate through dinosaur array
  for (const dinosaur of dinosaurs) {
    //If given dinosaurId matches input id
    if (dinosaur.dinosaurId === id) {
      //If given dinosaur['mya'] array has more than 1 element, using string interpolation, dinosaur['mya'] second index is used
      //Otherwise, dinosar['mya'] first index is used for str
      if (dinosaur["mya"].length > 1) {
        str = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur['mya'][1]} million years ago.`;
      } else {
        str = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur['mya'][0]} million years ago.`;
      }
      return str; //return str here so the loop ends
    } 
  }
  //If dinosaurIds never equal input id, there was no match/no return, so id cannot be found
  str = `A dinosaur with an ID of '${id}' cannot be found.`;
  return str;
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
  let alive = []; //Declare new array called alive
  //Loop through dinosaurs array
  for (const dinosaur of dinosaurs) {
    //If input mya value falls between first and second elements of the given dinosaur['mya'] array
    if (dinosaur.mya[1] <= mya && mya <= dinosaur.mya[0]) {
      //If a key is inputted, push the key value of the given dinosaur to alive array
      if (dinosaur[key] != undefined) {
        alive.push(dinosaur[key]);
        //Otherwise just push given dinosaurId to alive array
      } else {
        alive.push(dinosaur.dinosaurId);
      }
    }
    //if input mya is equal to the first element of given dinosaur['mya'] array, or 1 less then first element
    if (dinosaur.mya[0] === mya || dinosaur.mya[0] - 1 === mya) {
      //If a key is inputted, push the key value of the given dinosaur to alive array
      if (dinosaur[key] != undefined) {
        alive.push(dinosaur[key]);
        //Otherwise just push given dinosaurId to alive array
      } else {
        alive.push(dinosaur.dinosaurId);
      }
    }
  }
  return alive;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
