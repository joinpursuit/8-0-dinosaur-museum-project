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
  let obj = {} // create an empty object to store final data in for return
  let length = null // variable to store updated lengths if they meet condtional in loop
  let dinoName = null // variable to store updated dino name if they meet condtional in loop
  let arrlength = false // boolean accumulator variable to check if inputted array has a length/ correct values inside

for(i = 0; i < dinosaurs.length; i++){ // looping through the array accessing .lengthinMeters key for comparison  
    if(dinosaurs[i].lengthInMeters > length){
        length = dinosaurs[i].lengthInMeters // if condition is met will update dinoName and length accordingly
        dinoName = dinosaurs[i].name
        arrlength = true // will signify that the inputted array has a length
    }
  }
  obj[dinoName] = length * 3.281 // creating a key : value in the empty object with the longest dino's name and length(now converted to feet) 
  return !arrlength ? {} : obj // if the arrlength variable is still false after my loop, return an empty object, else return the object storing the correct data
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
  let name = `` // string accum. variable to store dino name
  let sayIt = `` // string accum. variable to store pronunciation
  let info = `` // string accum. variable to store info
  let period = `` // string accum. variable to store the perid dino lived in 
  let yearsAgo = null // ultimatley will be a number value, but I have to first access the array [] associated with it
  let match = false // boolean accumulator intitalized to false, will only change if an id match is found

  for ( obj in dinosaurs){ // looping inside of the dinosaurs OBJECT with a FOR..IN loop
      if(id === dinosaurs[obj].dinosaurId){
          match = true // once the conditional (id matches) turns to true to signify that there was an id match.
          name = dinosaurs[obj].name 
          sayIt = dinosaurs[obj].pronunciation 
          info = dinosaurs[obj].info
          period = dinosaurs[obj].period
          yearsAgo = [...dinosaurs[obj].mya] //sets yearsAgo (null) to a shallow copy of the mya array. 
          yearsAgo = yearsAgo.sort(function(a,b){ // yearsAgo(currently an [] with # values), is sorted from least to greatest. 
              return a-b
          })
          yearsAgo = yearsAgo[0] // after sorting the area, the smallest number should be at index[0] so updating yearsAgo to that value (now a single #) 
        }
  }
  // if match is still false, after my loop has completed, signifies that the id number wasn't a proper match 
  return match === false ? `A dinosaur with an ID of '${id}' cannot be found.` : `${name} (${sayIt})\n${info} It lived in the ${period} period, over ${yearsAgo} million years ago.`
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
  let object = {} // empty object to store dinoId or param key as key and mya as value
  let finalArr = [] // empty array for the final return values

  for (obj in dinosaurs){
      if(dinosaurs[obj].mya.length === 1){ 
          dinosaurs[obj].mya.push(dinosaurs[obj].mya[0] - 1)
      } // if .mya array for dino = 1, to subtract one from the existing value and push it back to the array. creating an array with 2 values.
      else if(key){
          object[dinosaurs[obj][key]] = dinosaurs[obj].mya
      } //if param key is given create key in object called 'key' with the value of the .mya array
      else{
          object[dinosaurs[obj].dinosaurId] = dinosaurs[obj].mya
      } //if no key param is given create a key in object using dinoId with value of .mya array 
  }
  for(const val in object){
      if(object[val][0] >= mya && object[val][1] <= mya){
          finalArr.push(val)
      }// looping through the object {} comparing the 2 values in the .mya array to check if the mya param falls in between the two values. The keys that meet condition, will be pushed to finalArr[]. 
  }
 return finalArr
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
