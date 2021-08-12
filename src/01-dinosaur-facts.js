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
// Create a helper function to convert from meters to feet. 
function convertToFeet(n) {
  return n * 3.281;
}
function getTallestDinosaur(dinosaurs) {
  // What is the input? An array of objects called dinosaurs
  // What is the output? An object: key = name. Figure out the value of the tallest dinosaur, convert it from meters to feet.
  
  // Declare a variable that will hold the final result in an object or return an empty object as the default value (edge case).
  let tallestDino = {};
  // If statement to account for an empty array of objects. 
  if (dinosaurs.length === 0) {
    return {};  
  }
  // 2. hold the temp value of current dinosaurs, as an object
  // ??let currentDino = {};
  let currentDino = dinosaurs[0]; //Element #1
  // Create a for loop to go through the array until it finds the tallest dino.
  for (let i = 1; i < dinosaurs.length; i++) {
    let dino = dinosaurs[i];
    // // When the dino we're looping through is taller than currentDino.
    if (dino.lengthInMeters >
      currentDino.lengthInMeters) {
        currentDino = dino;
      }
    }
    // Convert tallestDino result from meters into feet. Use the helper function called converToFeet.
    tallestDino[currentDino.name] = convertToFeet(currentDino.lengthInMeters);
    
    return tallestDino; 
  }
getTallestDinosaur(exampleDinosaurData);
  
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
  // What is the output data & default value? 
  // 1. Output data: returns a detailed description of a dinosaur. 
  // Define a loop to go through the dinosaur array. 
  for (let i = 0; i < dinosaurs.length; i++) {
    let dino = dinosaurs[i];
    if (dino.dinosaurId === id) {
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`;
    }
  }
      // Default value: When dinosaur id is not in the array, return an error message as a string. ERROR MESSAGE: 'A dinosaur with an ID of 'incorrect-id' cannot be found.
      return `A dinosaur with an ID of '${id}' cannot be found.`    
}


//console.log(getDinosaurDescription(exampleDinosaurData));



//   for (let i = 0; 1 < dinosaurs.length; i++) {
//     if (dinosaurs[i].dinosaurId === id) {
//       return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`;
//     }
//   }
//     if (!dinosaurs.dinosaurId) {
//     return `A dinosaur with an ID of '${id}cannot be found.`
//   }
// }
// getDinosaurDescription();
// for (let dino of dinosaurs) {
// if (dino.length === 0) {
//   return `"A dinosaur with an ID of ${id} cannot be found."`;
// }
// if (dino.dinosaurId === id) {
//   return `${dino.name} [${dino.pronunciation}]\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya.length-1} million years ago.`
// }
// }
// }
// Identify the input & output
// Type "Error Message" as a string
//   if (!dinosaur )
//   // What is our input? An array with several keys
//   //
//   // Create a new object to copy info into
//   // Looping through the inputted array
// // Return a string
//   return
// }

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
  // Identify the input & output
  // If key is given,include its name.
  // Edge case: if
  // if ()
  // What is our input? An dinosaurs array with several keys
  //
  // Looping through the inputted array: use a for..of loop

  //   //determine input - output
    let newArr = [];
    //define loop
    //iterate through dinosaurs arr
    for (let dino of dinosaurs) {
      if (key) {
        if (
          dino.mya[0] === mya ||
          dino.mya[0] - 1 === mya ||
          dino.mya[dino.mya.length - 1] === mya
          ) {
          //push dino id into arr if it meets condition. Repeat to clear each error.
          newArr.push(dino[key]);
        } else if (dino.mya[0] >= mya && dino.mya[dino.mya.length - 1] <= mya) {
          newArr.push(dino.key);
        }
      } else if (!key) {
        if (
          dino.mya[0] - 1 === mya ||
          dino.mya[0] === mya ||
          dino.mya[dino.mya.length - 1] === mya
        ) {
          newArr.push(dino.dinosaurId);
        } else if (dino.mya[0] >= mya && dino.mya[dino.mya.length - 1] <= mya) {
          newArr.push(dino.dinosaurId);
        }
      }
    }
    return newArr;
  }

  
// getDinosaursAliveMya(exampleDinosaurData);

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
