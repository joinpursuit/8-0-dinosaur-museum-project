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
/*First approach:
-loop through the "lengthOfDino" and get the biggest number.
-find the name of the dinosaur that has the biggest "lengthOfDino" number.
-assign to a new object and return it. 
>This approach needs two loops, one to find biggest num and another to find the name.

Better approach:
-loop through the "lengthOfDino" and get the biggest number.
-if found, assign the biggest number AND the name of the dinosaur in the variable
-assign to a new object and return it.*/
function getLongestDinosaur(dinosaurs) {
  let newObj = {};
  let nameOfDino = '';
  let lengthOfDino = 0;
  //if the array it's empty, it will return the empty object.
  if (dinosaurs.length !== 0) {
    for (let dino of dinosaurs) {
      //if the next dinosaur length is bigger than current value in "strOfHeight",
      //update the name of the dino and the its length.
      if (dino.lengthInMeters > lengthOfDino) {
        nameOfDino = dino.name;
        lengthOfDino = dino.lengthInMeters;
      } 
    }
    //set key and value in the object with final updated name and length of longest Dinosaur.
    //converted string to number, from meters to feet, and set to have only two to decimals.
    newObj[nameOfDino] = Number((lengthOfDino * 3.281).toFixed(2));
  }
  return newObj;
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
  let str = '';
  for (let dino of dinosaurs) {
    //if the "dinosaurId" of the current index is iqual to "id",
    //return a text with given format. For "mya" value, return the last element of the array.
    //must break out of the loop if the "id" is found, so it doesn't keep updating with wrong value.
    if (dino.dinosaurId === id) {
      str = `${dino.name} (${dino.pronunciation})
${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`;
      break;
      //if can't find it, return an error massage.
    } else {
      str = `A dinosaur with an ID of '${id}' cannot be found.`;
    }
  }
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
  let arr = [];
  for (let dino of dinosaurs) {
    //checking if the "param mya" is in between the numbers of "array mya"
    if (dino.mya[0] >= mya && mya >= dino.mya[dino.mya.length-1]) {
      //if it has key in the "dinosaurs", push the value of the key to the array
      if (dino[key]) {
        arr.push(dino[key]);
        //if not, push the "dinosaurId" to the array
      } else {
        arr.push(dino.dinosaurId);
      }
      //if it has only one value in the array
      //and the value is equal or one less to the "param mya", push the "dinosaurId" to the array
    } else if (mya === dino.mya || mya === dino.mya[0]-1) {
      arr.push(dino.dinosaurId)
    }
  }
  return arr;
}
// FIRST ATTEMPT (trying out):
// function getDinosaursAliveMya(dinosaurs, mya, key) {
//   let arr = [];
//   for (let dino of dinosaurs) {
//     if (dino.mya.length > 1 && mya < dino.mya[0] && mya >= dino.mya[dino.mya.length-1]) {
//       if (dino[key]) {
//         arr.push(dino[key])
//       } else {
//         arr.push(dino.dinosaurId)
//       }
//     } else {
//       if (mya === dino.mya[0] || mya === dino.mya[0]-1) {
//         if (dino[key]) {
//           arr.push(dino[key])
//         } else {
//           arr.push(dino.dinosaurId)
//         }
//       }
//     }
//   }
//   return arr;
// }

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
