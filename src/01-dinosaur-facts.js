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
  // if the dinoonjects contains a falsy value, this will return
  if(!dinosaurs.length){
    return {}
  }
  // biggest dinosaur default values
  let biggestDinosaur = {}
  let nameDinosaur = ''
  let num = 0
  // this loop will iterate through the dinosaur objects. Everytime a dinosaur is greater than the num, the dinosaurs length in meters will be assignedto the num
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].lengthInMeters > num){
      num = dinosaurs[i].lengthInMeters
      nameDinosaur = dinosaurs[i].name
    }
  // the dinosaur's name and length in meters will be assigned to the default value
  }
  biggestDinosaur[nameDinosaur] = num *= 3.281
  return biggestDinosaur
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
  // undefined default value
  let dinosaurDescription
  
  // this loop will iterate through dinosaurs. if the dinosaurs name value is eqaul to the given id value, the dinosaurDescription is assigned a dinosaur fact with a string
  for (let dino of dinosaurs){
    if(dino.dinosaurId === id){
      dinosaurDescription = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length-1]} million years ago.`
      return dinosaurDescription
    }
  // if the id is incorrect, this message in the form of a string will be assigned as an error message
  }
  dinosaurDescription = "A dinosaur with an ID of 'incorrect-id' cannot be found."
  return dinosaurDescription
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
  // default value assigned as an array
  let duringMya = []

  // this loop will iterate through the dinosaurs object. if the first eleement of the array is greater than the given value of mya AND mya is greater than the second element, as well as if the given value for the dino key is not falsy, it will contain the key. Otherwise, either key in the dinosaur mya's array is equal to the given value mya.
  for(let dino of dinosaurs){
    if(dino.mya[0] >= mya && mya >= dino.mya[1]){
      if(dino[key] !== undefined){
       duringMya.push(dino[key])
      } else{
        duringMya.push(dino.dinosaurId)
      } 
    } else if(dino.mya[0] === mya || dino.mya[0] -1 === mya){
        if(dino[key] !== undefined){
          duringMya.push(dino[key])
        }
        else{
          duringMya.push(dino.dinosaurId)
        }
      }
    }
    return duringMya
  }

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
