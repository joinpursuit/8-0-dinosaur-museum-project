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
  let longestDinosaursObj = {}
  let dinosaursName = ""
  let dinosaurHeight = 0;
  if (dinosaurs.length === 0) { return longestDinosaursObj }

  for (let i = 0; i < dinosaurs.length; i++) {

    if (dinosaurs[i].lengthInMeters > dinosaurHeight) {

      dinosaurHeight = dinosaurs[i].lengthInMeters
      dinosaursName = dinosaurs[i].name


    }
  }
  dinosaurHeight = dinosaurHeight * 3.281
  longestDinosaursObj[dinosaursName] = dinosaurHeight







  return longestDinosaursObj
}








//Brainstorming ---V 

// let arr
//   let longestDinosaurs = 0
//   let longestDinosaursObj = {}
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].lengthInMeters > longestDinosaurs) {
//       longestDinosaurs = dinosaurs[i].lenghtinMeters

//       longestDinosaursObj[dinosaurs[i].name] = (dinosaurs[i].lengthInMeters * 3.281)
//       arr = (longestDinosaursObj);
//       return arr
//     }

//   }
//   return longestDinosaursObj
//-----------------------------------------------------------------------------------------

// let longestDinosaurs = {};
// let dinosaursName = ""
//   let dinosaurHeight = 0;
// if (dinosaurs.length != 0) {
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].lenghtInMeters > dinosaurHeight) {
//       dinosaurHeight = dinosaurs[i].lenghtInMeters
//       dinosaursName = dinosaurs[i].name
//     }
//   }
//   dinosaurHeight = dinosaurHeight * 3.281
//   longestDinosaurs[dinosaursName] = dinosaurHeight

//code option #1--^----code option #2-----v---------------------------------------------------

// for (const dino of dinosaurs) {
//   if (dinosaurs.lengthInMeters > dinosaurHeight) {
//     dinosaurHeight = dinosaurs.lengthInMeters
//     dinosaursName = dinosaurs.name
//   }
// }
// dinosaurHeight = dinosaurs.lenghtInMeters
// dinosaursName = dinosaurs.name
//let longestDinosaurs = {};
// let dinosaursName = ""
//   let dinosaurHeight = 0;

// const dinoObj = {}
// return dinoObj; //>returns an empty object 
// const input2 = dinosaurs.getElementById("lengthInMeters").value = val / dinosaur. length OR 3.281
// console.log(input2);
// val.value = input2.valueOf();
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
  let dinosaursDescription = `A dinosaur with an ID of '${id}' cannot be found.`

  for (let i = 0; i < dinosaurs.length; i++) {
    const dino = dinosaurs[i]//running through the array of dinosaurs with dino as the vairable used for the loop
    if (dino.dinosaurId === id) {
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1]} million years ago.`
    }//will return string with desired given dinosaur name, pronunction, time and years they lived.

  }


  return dinosaursDescription
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
  let dinoMatchArr = [];
  //for of loop to run throught the array of dinosaurs
  for (let dino of dinosaurs) {
    if(key) { // some MYA is one number or none at all so you must got through the MYA array with mya.length-1
      if(dino.mya.length === 1 && dino.mya[0] - 1 === mya) {
        dinoMatchArr.push(dino[key]);
      } else if (dino.mya[0]>= mya && dino.mya[dino.mya.length-1] <= mya) {
        dinoMatchArr.push(dino[key])
      }
    
    } else {
      if (dino.mya.length === 1 && dino.mya[0] - 1 === mya) {
        dinoMatchArr.push(dino.dinosaurId);
      } else if (dino.mya[0] >= mya && dino.mya[dino.mya.length - 1] <= mya) {
        dinoMatchArr.push(dino.dinosaurId);
      }
    }
   }
  return dinoMatchArr;
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
