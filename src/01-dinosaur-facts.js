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
// find the tallest lengthInMeters inside of dinosaurs return 
// an object w/ string of name and value converted to feet
// step 1 set tallest to dinosaurs[0]
// step 2 start up a loop 
// step 3 compare the tallest height of dino
// step 4 when tallest dino is found assume that new tallest dino
// step 5 return key of name and dino height converted to feet

function getTallestDinosaur(dinosaurs) {
  if(dinosaurs.length < 1){
    return {}
  }
  let dinoObject = {}; //created variable for the object 
  let tallestDino = dinosaurs[0]; //created variable for the first dino
  for(let i = 1; i < dinosaurs.length; i++){ //initiated a loop that look at the next dino
    if(tallestDino.lengthInMeters < dinosaurs[i].lengthInMeters){ //if first dino's height is less than the next dino
      tallestDino = dinosaurs[i]; // append that dino to this variable
      
    }
   }
   if (tallestDino){ //here's the tallest dino
    dinoObject[tallestDino.name] = tallestDino.lengthInMeters * 3.281 //
    // object name [key] = value <= assigning a key value pair to an objects
    } 

  return dinoObject
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
// 1. default error message if no dino found.
// 2. loop through the dino array of {} - search for id.
// 3. when id match set variable to dino[i].
// 4. return stings build w/ interpulation.
function getDinosaurDescription(dinosaurs, id) {
  let formatDino = `A dinosaur with an ID of '${id}' cannot be found.`
  for(let i = 0; i < dinosaurs.length; i++){
    if(id === dinosaurs[i].dinosaursId){
      formatDino = dinosaurs[i];

      return `${formatDino.name} (${formatDino.pronunciation})\n${formatDino.info} It lived in the ${formatDino.period} period, over ${formatDino.mya[formatDino.mya.length-1]} million years ago.`  
    }
  }
  return formatDino;
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
// 1. 
// 2.
// 3.
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let dinoString = key || "dinosaurId";
  let liveMya = [];
  for (let dino of dinosaurs){
    let high = dino.mya[0];
    let low = dino.mya[dino.mya.length -1];
    if (dino.mya.length > 1){
      if (mya <= high && mya >= low){
        liveMya.push(dino[dinoString]);
      }
    }else if (mya === high || mya === high -1){
      liveMya.push(dino[dinoString]);
    }
  }
  return liveMya;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
