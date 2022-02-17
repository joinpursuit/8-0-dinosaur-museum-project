/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const dinosaurs = require("../data/dinosaurs");
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

// My solution -
// function getTallestDinosaur(dinosaurs) {
//   let tallestDino = {};
//   let tallest = dinosaurs[0];

//   // Guard clause to see if the array is empty or not
//   if (dinosaurs.length < 1) {
//     return tallestDino;
//   }
  
//   for (let i = 1; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].lengthInMeters > tallest.lengthInMeters) {
//       tallest = dinosaurs[i];
//     }
//   }

//   const lengthInFeet = tallest.lengthInMeters * 3.281;
//   tallestDino[tallest.name] = lengthInFeet;
  
//   return tallestDino;
// }

// Tim McKiernan - 8.4nw instructor

// input: dinosaurs array
// output: object with the key of 'name' pointing to height of dino in feet.
// 1. set a variable for first dino - tallestSoFar
// 2. loop through the array - compare dino, lengthInMeters to tallestSoFar - if it is larger dino[i] = tallestSoFar;
// 3. return an object { tallestSoFar.name : tallestSoFar.lengthInMeters converted to feet}

function getTallestDinosaur(dinosaurs) {
  let result = {};
  // If null or empty array tests
  if (!dinosaurs || dinosaurs.length < 1) {
    return result;
  }
  let tallestSoFar = dinosaurs[0];
  for (let i = 1; i < dinosaurs.length; i++) {
    let current = dinosaurs[i];
    if (current.lengthInMeters > tallestSoFar.lengthInMeters) {
      //console.log('old tallest ', tallestSoFar)
      tallestSoFar = current;
      //console.log('new tallest', tallestSoFar)
    }
  }
  result[tallestSoFar.name] = tallestSoFar.lengthInMeters * 3.281;
  // console.log(result);
  return result;
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

// My solution -
// function getDinosaurDescription(dinosaurs, id) {
//   let descriptionDino = `A dinosaur with an ID of '${id}' cannot be found.`;

//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].dinosaurId === id) {
//       descriptionDino = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length-1]} million years ago.`;
//     } 
  
//   }
  
//   return descriptionDino;
// }

// Tim McKiernan - 8.4nw instructor

// .5. declare a variable - for default
// 1. loop through dinosaurs - find where id === dinosaurId
// if we find a match, set default var as dinosaur[i]
// 2. build string. We need to return a string with a lot of interpolated data;
// return string;

function getDinosaurDescription(dinosaurs, id) {
  let dino = `A dinosaur with an ID of '${id}' cannot be found.`;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (id === dinosaurs[i].dinosaurId) {
      dino = dinosaurs[i];

      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`;// build out our string
    }
  }
  // console.log(dino, " <-------dino"); 
  // console.log(id, "<-------passed ID");
  return dino;
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

// My solution -
// function getDinosaursAliveMya(dinosaurs, mya, key) {
//   // Check if the key has any value or is undefined.
//   if (key === undefined) {
//     key = 'dinosaurId';
//   }
//   // Check if the key is contained within any dinosaurs object's keys in the array. Is it a valid key?
//   // The third option is that the key is defined and is in the dinosaurs object(s).
//   if (dinosaurs[0][key] === undefined) {
//     key = 'dinosaurId';
//   }

//   // Declare and define an empty array.
//   let dataOfDinosAlive = [];

//   // For loop for iterating over the dinosaurs array in order to retrieve the needed values.
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].mya.length === 1 && (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] - 1 === mya)) {
//       dataOfDinosAlive.push(dinosaurs[i][key]);
//     } else if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya) {
//       dataOfDinosAlive.push(dinosaurs[i][key]);
//     }
//   }

//   // Return the new array.
//   return dataOfDinosAlive;
// }

// Tim McKiernan - 8.4nw instructor

// 1. set my return var = [];
// 2. loop through the array and check our .mya values;
// 3. determine if my is between our dinosaur .mya values (i.e. one big num and one small num);
// 4. if an extra key was passed we need to push the dinosaur value at that key into return var;
    // if no key was passed we will push the dinosaur id;

function getDinosaursAliveMya(dinosaurs, mya, key) {
  // takes care of default
  let str = key || 'dinosaurId';
  
  let aliveMya = [];

  for (let dino of dinosaurs) {
    let low = dino.mya[dino.mya.length-1];
    let high =  dino.mya[0];
    //console.log(low, high);
    // we are setting a range.
    if (dino.mya.length > 1) {
      if (mya <= high && mya >= low) {
        //console.log('this dino was alive during this time period!')
        aliveMya.push(dino[str]);
      }
    } else if (mya === high || mya === high - 1) {
        aliveMya.push(dino[str]);
    }
      
  }
  //console.log(aliveMya);
  return aliveMya;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
