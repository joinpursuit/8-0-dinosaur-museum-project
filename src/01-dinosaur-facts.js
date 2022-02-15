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
// Sorry this looks so ugly ! if I can think of a way to fix this this probably wont be here!
function getTallestDinosaur(dinosaurs) {
  // Empty Obj.
  let obj = {}
  // The first index of Dinosaurs = Save
  let save = dinosaurs[0]
  // We set DinoName to an empty string.
  let DinoName = ''
  // length In feet too 0 since we'll add to it later. 
  let lengthInFeet = 0
  // if there is no length return the empty obj.
    if (!dinosaurs.length){
      return obj
    } // Otherwise loop through dinosaurs
    for (let index = 1; index < dinosaurs.length; index++){
      // Here we basically make save our lengthInMeter we'll use to access.
      if (save.lengthInMeters < dinosaurs[index].lengthInMeters){
        save = dinosaurs[index]
      }
    }
    // Math to make it feet
  lengthInFeet = save.lengthInMeters * 3.281
  // Setting DinoName to the Save.Name 
  DinoName = save.name
  // Now we change our obj to give us the values we want and return.
  obj[DinoName] = lengthInFeet
  return obj
};

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
  // Error Return :
  let str = `A dinosaur with an ID of 'incorrect-id' cannot be found.`
    for (elm of dinosaurs){
      // If the id === that elm
    if (elm.dinosaurId === id){
      // We''l simply update the string & use string interpilation to format it the way we need to.
      // So : name, pronunciation |new line| 
      // info, period and then the last mya or only mya there is.
      str = `${elm.name} (${elm.pronunciation})\n${elm.info} It lived in the ${elm.period} period, over ${elm.mya[elm.mya.length -1]} million years ago.`
    }
    // In the condition it's false we just return the first verison of str we have otherwise we return our updated str.
    }return str
};


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
// I recived help from Pratima on this Function, please let me know if you'd like me to explain.
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let arr = []
  for (elm of dinosaurs){
    // If the Indexes.mya has 2 myas AND that Index.mya[First index] is Greater than or equal to mya AND Indexs.mya[Second index (index 1)]
    // is less than or equal to mya : create a nester if. This was basically Written to get the range.
    if (elm.mya.length === 2 && elm.mya[0] >= mya && elm.mya[1] <= mya){
    // if Key is in our params.
      if (key){
        // Push the value into arr.
        arr.push(elm[key])
      } else {
        // Otherwise push the Dinos ID.
        arr.push(elm.dinosaurId)
      }
      // Back into our starting condtion
      // If current Index.mya[Index 0] === mya OR The last index of the current elm === mya, Prefrom our next condtional.
    } else if (elm.mya[0] === mya || (elm.mya[0]) - 1 === mya){
      // If there is a key
      if (key){
        // Push the key.
        arr.push(elm[key])
        // Otherwise
      } else {
        // Push the Dinos Id.
        arr.push(elm.dinosaurId)
      }
    }
  } return arr
};

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
