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
  // Guard Clause if dinosaurs return empty object
  // Accumulator Pattern to determine tallest
  // Convert lengthInMeters to feet
  // Return the newly created object with name of the dinosaur as the key and height as the value 

function getTallestDinosaur(dinosaurs) {
  //created a guard clause 
  if(!dinosaurs.length){
    return {};
  }
  let highestDino = dinosaurs[0];
  for (let i = 1; i < dinosaurs.length; i ++){
    let dino = dinosaurs[i];
    if(dino.lengthInMeters > highestDino.lengthInMeters){
     highestDino = dino;
    }
  }
  // converted meter to feet
 let lengthInFeet = highestDino.lengthInMeters * 3.281;
 //returned the object 
 return {[highestDino.name]: lengthInFeet};
}


getTallestDinosaur(exampleDinosaurData );

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

  //loop through the dinosaurs array
  //use an if statement to compare each element (each dinosaur object) to the target id
  //if target dino is found, return a formatted description of that dinosaur
  // if target is not found after loop completes return the error message.

function getDinosaurDescription(dinosaurs, id) {

  let dinoAnswer = `A dinosaur with an ID of '${id}' cannot be found.`;
 
  dinosaurs.forEach((dino) => {
    if (dino.dinosaurId === id) {
      let dinoMya = null;
      if (dino.mya.length > 1) dinoMya = dino.mya[dino.mya.length - 1];
      else dinoMya = dino.mya[0];
      dinoAnswer = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dinoMya} million years ago.`;
    }
  });
  return dinoAnswer;

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
 // first, needs to return an ARRAY of dinosaur IDs that lived within the mya range provided. if the mya !== any dino.mya's within range, return an empty array.
  // next, if a dino only has one mya year provided, the logic has to allow for the given mya OR dino.mya - 1
  // if the 'key' argument IS PROVIDED (i.e. truthy), it needs to return the value of that key for each dinosaur alive at that time, in an ARRAY
  // if the 'key' argument !== any dino[key], return the IDs as above.

  
    function getDinosaursAliveMya(dinosaurs, mya, key) {

      // Not working for some reason ...

      let dinoArr = [];
      //created a for od loop 
      for (let dino of dinosaurs){
        // if only 1 mya = given or - 1
        if(dino.mya.length === 1){
          if(mya === dino.mya[0] || mya === (dino.mya[0] - 1) ){
            if(key in dino ){
              dinoArr.push(dino[key]);
            }else {
              dinoArr.push(dino.dinosaurId);
            }
          }
        }else {
          // if 2 mya  = too
          if(dino.mya[0] >= mya && dino.mya[1] <= mya ){
            if(key in dino ){
              dinoArr.push(dino[key]);
            }else {
              dinoArr.push(dino.dinosaurId);
            }
          }
        }
      }
      //Then return the arr;
      return dinoArr;
    }


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
