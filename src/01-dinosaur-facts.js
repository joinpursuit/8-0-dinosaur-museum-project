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
  let tallCount = 0;

  let dinoNameKey;

  if(dinosaurs.length === 0) {

  return {};

}
  for (let i = 0; i < dinosaurs.length; i++) {
    
    if (dinosaurs[i].lengthInMeters > tallCount) {

      tallCount = dinosaurs[i].lengthInMeters;

      dinoNameKey = dinosaurs[i].name;

}
      
      feetConvert = tallCount * 3.281;

      tempObj = { [dinoNameKey] : feetConvert };

}
    
    return tempObj;
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
 
  for (i = 0; i < dinosaurs.length; i++) {
   
    if (id === dinosaurs[i].dinosaurId) {
  
      output = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length-1]} million years ago.`;
      /*I can't even begin to tell you how silly I felt when I realized I could have just done ${dinosaurs[i].mya[dinosaurs[i].mya.length-1]} here.
      i thought an algorithim would be necessary here.*/
      return output;
}
}

  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
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
  dinoDuration = [];

  for (i = 0; i < dinosaurs.length; i++) {
    
  let keyCheck = Object.hasOwnProperty(key) ? dinosaurs[i].name : dinosaurs[i].dinosaurId;
  /*Used a ternary operator here along with .hasOwnProperty(). set a variable keyCheck to equal true 
  if the dinosaurs object has a property that matches the inputted "name" key. keyCheck would equate to true and would push
  a dinosaur name into the dinoDuration array. if the dinosaurs object does not have a property that matches the input "name"
  key, keyCheck would equate to false and would push a dinosaurId into the dinoDuration array instead.*/
  if(dinosaurs[i].mya.length >= 1 ) {
  

   if (dinosaurs[i].mya[0] >= mya && mya >= dinosaurs[i].mya[1]) {

    dinoDuration.push(keyCheck);
}
else if (dinosaurs[i].mya[0] - 1 == mya || mya == dinosaurs[i].mya[0]) {

  dinoDuration.push(keyCheck);
}
 

}
}
  return dinoDuration;


}
module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
