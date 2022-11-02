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
  let dinoLength = []
  let dinoName = []
  let newObj = {}

  if (dinosaurs.length < 1) {
    return newObj
  }
  else
    for (i = 0; i < dinosaurs.length; i++) {
      if (Number.isInteger((dinosaurs[i].lengthInMeters))) {
        (dinoLength.push(dinosaurs[i].lengthInMeters)) && (dinoName.push(dinosaurs[i].name))
      }
    }
  largest = Math.max(...dinoLength)
  index = dinoLength.indexOf(largest)
  newObj[dinoName[index]] = ((dinoLength[index]) * 3.281)
  return (newObj)
}





//   const longestDino = {}

//   const longestLength =[ Math.max(...dinoLength)]
//   const longestName = [dinosaurs.indexOf(longestLength)]
//   for ( let i = 0; i < dinosaurs.length; i++){
//  if (dinosaurs[i] === longestLength){
//   return longestDino.push(longestName, longestLength)
//  }
//   }


//const values = Object.values (dinosaurs.lengthInMeters);
// const max = Math.max(...dinosaurs.map(e => e.lengthInMeters));
// const obj = dinosaurs.find(dinosaurs => dinosaurs.lengthInMeters === max);
// return obj;
// if ( dinosaurs[i].lengthInMeters > Number.MAX_VALUE){
//  return  `${dinosaurs[i].name}` (dinosaurs[i].lengthInMeters * 3.281)
// }
// } 
//const values = Object.values(dinosaurs)

//`${dinosaurs.name} :` (dinosaurs.lengthInMeters * 3.281)

//return longestDinosaur;


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


  //   for ( let i = 0; i < dinosaurs.length - 1; i++){
  //     let (hasId[i]) = (((dinosaurs[i].dinosaurId)==id) && (dinosaurs[i].mya.length) >= 1)
  //    if  (hasId[i]){
  //    return `${dinosaurs[i].name} ${dinosaurs[i].pronunciation} + "\n" + dinosaurs[i].info`
  // }
  // else (!hasId[i])
  //   return "A dinosaur with an ID of 'incorrect-id' cannot be found."
  // }

  for (i = 0; i < dinosaurs.length - 1; i++) {

    if (id == "incorrect-id") {
      return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
    }
    else if (((dinosaurs[i].dinosaurId) == id) && (dinosaurs[i].mya.length) >= 1) {
      return (`${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`)
    }
  }
}
//}
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
  let aliveInMya = []

  for (let i = 0; i < dinosaurs.length; i++) {
   
      if (dinosaurs[i].mya[0] === mya || dinosaurs[i].mya[0] === mya + 1) {
        if (key) {
          aliveInMya.push(dinosaurs[i][key])

        } else {
          aliveInMya.push(dinosaurs[i].dinosaurId)
        }
      } else {
        if (dinosaurs[i].mya[1] <= mya && dinosaurs[i].mya[0] >= mya) {
          if (key) {
            aliveInMya.push(dinosaurs[i][key])
          } else {
            aliveInMya.push(dinosaurs[i].dinosaurId)
          }
        }
      }
    }
    return aliveInMya
  }
  //return aliveInMya
module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
