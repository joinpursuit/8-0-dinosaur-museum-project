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
  //Declare a variable `tallest` and set it equal to the first dino/height `dinosaurs[0]`
  let tallest = dinosaurs[0]
  
  //Declare empty object `newObject`
  let newObject = {}

  if(dinosaurs.length){
    
    //Iterate through array of dinosaurs `dinosaurs`
    for (const dino of dinosaurs) {
      
      //Compare `tallest.lengthInMeters` to/< `dinosaurs[i].lengthInMeters`-> (the current dinosaur)
      if (tallest.lengthInMeters < dino.lengthInMeters) {
        
        //if `dinosaurs[i].lengthInMeter` is taller reassgin tallest to `dinosaurs[i]`
        tallest = dino
      } 
    }
    
    //Declare variable `heightInFeet` = `tallest.heightInMeters` * 3.281
    const lengthInFeet = tallest.lengthInMeters * 3.281

    //ADD key `tallest.name` and value `heightInFeet` to `newObject`
    newObject[tallest.name] = lengthInFeet
  }
  
  //return newObject
  return newObject

}

//getTallestDinosaur(exampleDinosaurData)

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
  //Declare empty variable `foundDino`
  let foundDino;

  //iterate through `dinosaurs` array
  for (const dino of dinosaurs) {
    //Compare current `dino.dinosaurId` to/=== `id`
    if (dino.dinosaurId === id) {
      //if equal reassign `foundDino` to equal `dino`
      foundDino = dino
      //Break loop
      break;
    }
  }

  let dinoInfo;

  if(!!foundDino) {
    //Declare const variable `dinoInfo` equal to `${foundDino.name} (${foundDino.pronuncaition})\n${funodDino.info}. It liveed in the ${foundDino.period}, over ${foundDino.mya[foundDino.mya.length - 1]} million years ago.`
    dinoInfo = `${foundDino.name} (${foundDino.pronunciation})\n${foundDino.info} It lived in the ${foundDino.period} period, over ${foundDino.mya[foundDino.mya.length - 1]} million years ago.`
  } else {
    dinoInfo = `A dinosaur with an ID of '${id}' cannot be found.`
  }

  //return dinoInfo
  return dinoInfo

}

//getDinosaurDescription(exampleDinosaurData, "U9vuZmgKwU")

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
  //Declare variable empty array `dinoArr`
  let dinoArr = []
  //iterate through `dinosaurs` array, each element `dino`
  for (const dino of dinosaurs) {
    //Check if `dino.mya.length` === 2, Compare `dino.mya[0]` to/>= `mya` and `dino.mya[1]` to/<= `mya`
    if (dino.mya.length === 2 && dino.mya[0] >= mya && dino.mya[1] <= mya) {
      //Is there a `key`
      if(key) {
        //if there is a `key` push `dino[key]` into `dinoArr`
        dinoArr.push(dino[key])
      } else {
        //if there is no `key push `dino.dinosaurId` into `dinoArr` array
        dinoArr.push(dino.dinosaurId)
      }
      //Check if `dino.mya[0]` === `mya or (`dino.mya[0]`)-1 === `mya
    } else if (dino.mya[0] === mya || (dino.mya[0])-1 === mya) {
      //Is there a `key`
      if (key) {
        //if there is a `key` push `dino[key]` into `dinoArr`
        dinoArr.push(dino[key])
      } else {
        //if true push `dino.dinosaurId` into `dinoArr` array
        dinoArr.push(dino.dinosaurId)
      }
      
    }
    
  }

  //return `dinoArr`
  return dinoArr
}

getDinosaursAliveMya(exampleDinosaurData, 66)

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
