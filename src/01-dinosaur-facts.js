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
  // 1st line = Declaring a new variable, set to the first index in the dinosaurs array,
  // 2nd line = declaring a new object or object literal.
  // 3rd line = conditionals: if the length of the array given is less than one, then return an empty object.
  // 4th line  = starting a for i loop to iterate through the dinosaurs array.
  // for loop-stating if the index at the key of lengthInMeters is greater than our (tallDino) variable, then set tallDino to the index it finds to be true.
  // after exiting the loop we create a key variable set to the value of the key given within our (tallest) variable
  // we create a key for our (Obj) object and set the value to the result of multiplying tallest.lengthInMeters by 3.281
  // returning our new object.
  let tallDino = dinosaurs[0];
  let obj = {};
  if(dinosaurs.length < 1){
    return {};
  }
 for (let i = 0; i < dinosaurs.length; i++){
      if (dinosaurs[i].lengthInMeters > tallDino.lengthInMeters){
        tallDino = dinosaurs[i]
      }
  }
  let key = tallDino.name;
   obj[key] = tallDino.lengthInMeters * 3.281;
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

// Need to loop through the array of Dinosaurs.
// use id to identify the dinosaur object we searching for.
//
function getDinosaurDescription(dinosaurs, id) {
  // //start our for loop to iterate through the given array.
  //if the key at (dinosaurs.Id) equals the id provided, and if the length of mya array in the object equals one, then return our message including the first index given with the mya array.
  //if there two indexes with the mya array, then include the second element within the mya array
  //if all else fails, return the error message
  for (let i = 0; i < dinosaurs.length; i++){
    if (dinosaurs[i].dinosaurId === id){
      if (dinosaurs[i].mya.length === 1){
        return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[0]} million years ago.`;
      }else {
        return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[1]} million years ago.`;
      }
      
    }
  }
  return  `A dinosaur with an ID of '${id}' cannot be found.`;
  
  
// for (let i = 0; i < dinosaurs.length; i++) {
//   if(dinosaurs[i].dinosaurId === id) {
//     if (dinosaurs[i].mya.length === 1) {
//       return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[0]} million years ago.`;
//     } else {
//       return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[1]} million years ago.`;
//     }
//  }
//    } 
//  return `A dinosaur with an ID of '${id}' cannot be found.`;
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
  // Declare and empty object to push the found dinosaur into.
  // Define or set a for i loop to iterate through the dinosaurs array 
  // setting conditionals: the first condition is to determine if the key given is included in the dinos that lived at the mya if not we return the ID.
  // Did a nested conditional to determine how many elements is in the mya array and also set a range of values for which if a number is entered within the range provided will match or pick out the dino we looking for and push it into the array we declared.
  // an else statement for the second condition of the mya array if it has 2 elements in it and also an if statement to check if the elements at each index is equal to the given mya value for the dino we want and push it to our declared array.
  // 
  let livingDino = [];
  for (let i = 0; i < dinosaurs.length; i++){
    if(key){ 
      if (dinosaurs[i].mya.length === 1){
        if ((dinosaurs[i].mya[0] - mya) <= 1 && (dinosaurs[i].mya[0] - mya) >= -1){
          livingDino.push(dinosaurs[i][key]);
        }
      } else if(dinosaurs[i].mya.length === 2){
        if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya){
          livingDino.push(dinosaurs[i][key]);
        }
      }
    } else {
      if (dinosaurs[i].mya.length === 1){
        if ((dinosaurs[i].mya[0] - mya) <= 1 && (dinosaurs[i].mya[0] - mya) >= -1){
          livingDino.push(dinosaurs[i].dinosaurId);
        }
      } else if(dinosaurs[i].mya.length === 2){
        if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya){
          livingDino.push(dinosaurs[i].dinosaurId);
        }
      }
    }
  }
  return livingDino;
}


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
