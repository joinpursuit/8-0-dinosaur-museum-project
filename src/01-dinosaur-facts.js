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
//1.get the tallest dinosaur from the array of dinosaur objects
//how to get the tallest dinosar from the array of dinosaur objects?
//create a loop to get the name of the tallest dinosaur, and a loop to get the height
//then convert the height to feet
//return the object
// const dinosaurs = [
//   {
//     dinosaurId: "YLtkN9R37",
//     name: "Allosaurus",
//     pronunciation: "AL-oh-sore-us",
//     meaningOfName: "other lizard",
//     diet: "carnivorous",
//     lengthInMeters: 12,
//     period: "Late Jurassic",
//     mya: [156, 144],
//     info: "Allosaurus was an apex predator in the Late Jurassic in North America.",
//   },
//2. return an object => {dinosaur name : height} in feet => key:value pair

//
function getTallestDinosaur(dinosaurs) {
  //returns null of the array is empty
  if (dinosaurs.length === 0) {
    return {};
  }

  let results = {};
  let tallestDino = dinosaurs[0];

  for (let i = 1; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > tallestDino.lengthInMeters) {
      tallestDino = dinosaurs[i];
    }
  }
  results[tallestDino.name] = tallestDino.lengthInMeters * 3.281;
  return results;
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
//  {
//   dinosaurId: "U9vuZmgKwUr",
//   name: "Xenoceratops",
//   pronunciation: "ZEE-no-SEH-ruh-tops",
//   meaningOfName: "alien horned face",
//   diet: "herbivorous",
//   lengthInMeters: 6,
//   period: "Early Cretaceous",
//   mya: [78.5, 77.5],
//   info: "Xenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes.",
// },
function getDinosaurDescription(dinosaurs, id) {
  let stringInfo = "A dinosaur with an ID of 'incorrect-id' cannot be found.";
  let yearVariable = "";
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId === id) {
      if (dinosaurs[i].mya.length > 1) {
        yearVariable = dinosaurs[i].mya[1];
      } else {
        yearVariable = dinosaurs[i].mya[0];
      }
      stringInfo = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${yearVariable} million years ago.`;
    }
  }

  return stringInfo;
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
  // if (!dinosaurs.mya) return [];

  let dinoId = [];

  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].mya.length === 1) {
      //console.log(typeof dinosaurs[i].mya[0], typeof mya);
      //dinosaurs were alive at the given time return their dinosaurID
      //set year = mya and also year = mya - 1. We are checking for these two conditionals
      //checking if either each year is equal to mya given or the year given is year less
      if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] === mya - 1) {
        //console.log(dinosaurs[i].mya);
        dinoId.push(dinosaurs[i].dinosaurId);
        //console.log(dinoId);
      }
    }
  }
  return dinoId;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
