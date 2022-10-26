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
  //creates variable to hold final result (an object) and to accumulator var for longest dinosaurs name and length
  let result = {};
  let name = ""
  let count = 0

  //loops through the array, if the current dinosaur has a longer length than the count accumulator, that dino's name and length are saved as the accumulators new value
  dinosaurs.forEach(dino => {
    if(dino.lengthInMeters > count){
      name = dino.name
      count = dino.lengthInMeters;
    }
  })
  
  //adds name key to result object with the length of the dino converted to feet as the value if there was a longest dino found in the for loop. 
 if(name != ""){
  result[name] = count*3.281
  }

  return result
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
  //declares valiables that will need to be changed per dinosuar in the result string
  let name, pronounciation, info, period, mya;

  //loops through dinosaure array, if the current dinosuar's id matches id param, the loop assigns each variable to its respective key
  dinosaurs.forEach (dino => {
    if(dino.dinosaurId == id){
      name = dino.name
      pronounciation = dino.pronunciation
      info = dino.info
      period = dino.period
      mya = dino.mya[dino.mya.length-1] //this grabs the last number in the mya array since some dinosaurs have one year and others have two
    }
  })

  //if a dino could not be found and nothing was saved to the name varaible returns error
  if(!name){
    return `A dinosaur with an ID of '${id}' cannot be found.`
  }

  return `${name} (${pronounciation})\n${info} It lived in the ${period} period, over ${mya} million years ago.`
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
  let result = []

  //function that takes in a dinosuar object as well as the end of their mya range, 
  //and pushes the dinosaurs id to the result array if mya parm is within the dinosaurs range created by the first mya value in the dinos mya arryay. 
  //**all dinosaurs have at least one mya value. Dinos that only have one value are accounted for later
  //If a key was proveded and the key exsists in the dinosaurs object it will push the information from only that key
  const loopFilterbyMIA = (currentDino, myaEnd) => {
  if (dino.mya[0] >= mya && myaEnd <= mya ) {
      if (dinosaurs[0].hasOwnProperty(key)){
          result.push(dinoObject[key])
      } else {
        result.push(dinoObject['dinosaurId'])
      } 
    }
  }

  //loops through array. if dino hace two mya value the filter funtion will run with that dinos second value otherwise it will run with one year less
  dinosaursdino.forEach(dino => {
    if (dino.mya.length == 2){
      loopFilterbyMIA(dino, dino.mya[1])
    } else {
      loopFilterbyMIA(dino, dino.mya[0]-1)
    }
  })

  return result
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
