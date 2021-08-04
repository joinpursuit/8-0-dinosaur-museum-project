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
  if(!dinosaurs.length){
    return{};
  }
let height = dinosaurs[0].lengthInMeters; // first dinosaur
let key;
  for (let i = 1; i < dinosaurs.length; i++){
    let dino = dinosaurs[i];
    if (dino.lengthInMeters > height){
      key = dino.name;
      height = dino.lengthInMeters; // height of tallest danosaur
    }
  }
  let lengthInFeet = height * 3.281;// convert to feet
  return {[key]: lengthInFeet};
}
// let heighestDino = dinosArr [0];
//  for( let i = 1; i < dinosArr.length;i++){
//     let dino = dinosArr[i];
//     if(dino.lengthInMeters > heighestDino.lengthInMeters){
//      heighestDino = dino;
//     }
//   }
//   return heighestDino;
// }
// function convertMetersToFeet(meters){
//   return meters * 3.281;
// }
// function getTallestDinosaur(dinosaurs) {
//   //Guard clause (for empty object)
//   if(!dinosaurs.length){
//       return {};
//   }
//   //Accumulator pattern to determine the biggest dino
//   let foundDino = searchForTallestDinosaur(dinosaurs);

//   //Convert lengthInMeters to Feet
//   let lengthInFeet = convertMetersToFeet(foundDino.lengthInMeters);

//   //Create a newObj with name of dino as key 
//   return {[foundDino.name]:lengthInFeet};
// }

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
  //to loop through dinosauars array
for(let dino of dinosaurs){

  //use if statement to comapare each dinosaur object to the target id
    if(dino.dinosaurId === id){
  
  //if target dino is found, return a formatted description of that dino
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`
    }
  }
  //if target is not found, return error message
  return `A dinosaur with an ID of '${id}' cannot be found.`
  }
//   let dinoDescription = `A dinosaur with an ID of '${id}' cannot be found.`;
//   for (let dinosaur of dinosaurs) {
//     if(dinosaur.dinosaurId === id) {
//       dinoDescription = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`;
//     }
//   }
//   return dinoDescription;
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
  let newArr = [];
  for(let dino of dinosaurs){ 
    if(dino.mya.length === 1){ //if mya has single value 
      if(dino.mya[0] === mya || dino.mya[0]-1 === mya){ //mya corresponds to a given mya or 1 less
        if(key){ //if has a key
          newArr.push(dino[key]); //return with dino with a key
        }else{
          newArr.push(dino.dinosaurId);
        }
      }
    }else {
      if(dino.mya[0] >= mya && mya >= dino.mya[1]){ //checking mya range 
        if(key){
          newArr.push(dino[key]);
        }else{
          newArr.push(dino.dinosaurId);// if no key provided
        }
      }
    }
  } 
  return newArr;
}
//   let newArr = [];
//   for(let dino of dinosaurs){
//     if(dino.mya.length === 1){
//       if (dino.mya[0] === mya || dino.mya[0] -1 === mya){
//         if (key in dino){
//           newArr.push(dino[key]);
//         } else {
//           newArr.push(dino.dinosaurId)
//         }
//       }
//     } else {
//       if (dino.mya[1] <= mya && mya <= dino.mya[0]){
//         if (key in dino){
//           newArr.push(dino[key]);
//         } else {
//           newArr.push(dino.dinosaurId);
//         }
//       }
//     }

//   }
//   return newArr;
// }
//first, needs to return an Array of dinosaurs ID that lived withing mya range provided, if mya!==any dino's within range, return the empty arr

//next, if a dino only has one mya year provided, the logic has to allow for the given mya or dino.mya-1
//if the "key" argument is PROVIDED, it needs to return the value of that key for each dino alive at that time in at ARRAY
//if the "key" argument !==any dino(key), return the IDs as above
//console.log (getDinosaursAliveMya(exampleDinosaurData, 150, "name")


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
