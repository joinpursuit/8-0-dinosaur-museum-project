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
    if (!dinosaurs.length) {  //if there are no dinosaurs then return an empty object 
      return {};
    }
  let key ;
  let height = dinosaurs[0].lengthInMeters //set the base height 
    for (let dinosaur of dinosaurs){ 
      if (dinosaur.lengthInMeters > height){
        height = dinosaur.lengthInMeters; // revalue height as tallest one 
        key = dinosaur.name; //declare the new key value as dinosaur.name
      } 
    }
let lengthInFeet = height * 3.281;
return {[key]: lengthInFeet}// how 
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
  let detailedDescription = `A dinosaur with an ID of '${id}' cannot be found.` ;

  for (let dinosaur of dinosaurs){
    if (dinosaur.dinosaurId === id){
        detailedDescription = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`
      }
  }
  return detailedDescription;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive 
 * at the given `mya` (i.e. "millions of years ago") value. 
 * If a `key` is provided, returns the value of that key f
 * or each dinosaur alive at that time. 
 * Otherwise, returns the ID.
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
  let myaRange = [];
  // let mainKey = "dinosaurId"
  // if(Object.keys(dinosaurs[0]).includes(key)){
  //   mainKey = key;
  //   //keyArr.push(key);
  // }

  for(let dinosaur of dinosaurs){
    let dinosaurKey = dinosaur[key] ? key : "dinosaurId"
    // if(dinosaur[key]) {
    //   dinosaurKey = key
    // } else {
    //   dinosaurKey = "dinosaurId"
    // }
    if(dinosaur.mya.length === 2){
      if (mya <= dinosaur.mya[0] && mya >= dinosaur.mya[1] ){
        myaRange.push(dinosaur[dinosaurKey]);
    } 
  } else {
    if(mya === dinosaur.mya[0] || mya === (dinosaur.mya[0]-1)){
      myaRange.push(dinosaur[dinosaurKey]);
    }
  }
  }
  return myaRange;
}



//first it needs to return an ARRAY of dinosaur IDs that lived within mya range provided. If the mya !== any dino.mya any dino.mya's within range,
// return an empty array 

//next, if a dino only had one mya year provided, the logic has to allow for the given mya OR dino.mya-1 

//if the 'key; argument is provided 

//if the 'key' argument !== any dino[key], return the IDs as above.

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
