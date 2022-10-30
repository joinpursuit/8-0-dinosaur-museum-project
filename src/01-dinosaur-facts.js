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
  let theeDinosaur = {}
  if (!dinosaurs.length) {
    return theeDinosaur 
  } 
  let tallDino = dinosaurs[0].lengthInMeters
  let tallDinoName = dinosaurs[0].name
  for (let i = 1; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > tallDino) {
      tallDino = dinosaurs[i].lengthInMeters
      tallDinoName = dinosaurs[i].name
    }
  }
  theeDinosaur[tallDinoName] = tallDino * 3.281
  return theeDinosaur

}
 // return `{ ${dinosaurs[3].name}: ${dinosaurs.[3].lengthInMeters * 3.281} feet }`
  
    
    //return `{${tallDino.name}: ${tallDino.lengthinMeters}}`
  //   dinosaurs[.lengthInMeters] =  .lengthInMeters * 3.281

 // {[tallDinoName] :tallDino * 3.281}
// let firstDino = dinosaurs[0].lengthInMeters
  // for (let i = 0; i < dinosaurs.length-1; i++) {
  // accessHeight = dinosaurs[i].lengthInMeters
  // accessHeight > firstDino
  // } return 

  //   dinosaurs.forEach((element) => {
// return element.name
//   });
  //return { longDino: feet }
  //for (let i = 0; i < dinosaurs.length; i++) {
  // if (dinosaurs[i].lengthInMeters < tallDino.lengthInMeters) {
  //   tallDino.lengthInMeters * 3.281
  //  }

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
  for(let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId == id) {
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length-1]} million years ago.`
    }
    }
return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
  }
//let dinoDescribe = `A dinosaur with an ID of '${id}' cannot be found.`
  
 //`${dNames} + (${dSound}) + \n${description}`
// const _ = require(`underscore`)
  // let dNames = _.pluck(dinosaurs, `name`)
  // let dSound = _.pluck(dinosaurs, `pronunciation`)
  // let description = _.pluck(dinosaurs, `info`)
  //`${dinosaurs[i].id}`
  // } else if (!dinosaurs.id) {
    //   return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
    //  for (let i = 0; i < dinosaurs.length; i++) {
    //   let dNames = dinosaurs[i].name
    //   let dSound = dinosaurs[i].pronunciation
    //   let description = dinosaurs[i].info
    //   let dinoId = dinosaurs[i].id
    //   Object.keys(dinosaurs[i].mya).length = milYears
    //   console.log(milYears)
// Object.keys(dinosaurs[i].mya).length >= 1)
  // for (let i = 0; i < dinosaurs.length; i++) {
  //   let dNames = dinosaurs[i].name
  //   let dSound = dinosaurs[i].pronunciation
  //   let description = dinosaurs[i].info
  // let compact = dNames + dSound + description
  // arr.push(compact) 
  // console.log(dNames)
  // return compact
  
  //   console.log(dNames, dSound, description)
  //  } return `${dNames} + (${dSound}) + \n${description}`
  // const pluck = (arr, key) => arr.map(i => i[key]);
  // return pluck(dinosaurs, `name`)
  
 //(dinosaurs[d].name + dinosaurs[d][(`${pronunciation}`)] + dinosaurs[d].info)

// dinosaurs.reduce((accumulator, dinosaurs) => {
// accumulator[dinosaurs.name] 
// console.log(accumulator)
// ;
//   return accumulator;
// }, {})
// }


// use id to get -> .name (.pronunciation) `\n` .info 
// --1 value of mya
//detailed description of dinosaur
//dinosaurs[0].info
//"A dinosaur with an ID of 'incorrect-id' cannot be found."
// let dinosaurCount = dinosaurs.length
  
//   for(let d = 0; d < dinosaurCount; d++) {
//   if (dinosaurs[d].id)
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
let dinoDataArr = []
for (let j = 0; j < dinosaurs.length; j++) {
  let dinoId = dinosaurs[j].dinosaurId
  let max = dinosaurs[j].mya[0] //156 is an example of the highest mya in the dino data
  let min = dinosaurs[j].mya[1] //144
  let firstArr = []
  while(min <= max) {
    firstArr.push(max--)
  }
if (Object.keys(dinosaurs[j]).includes(key)) {
  dinoId = dinosaurs[j][key]
}
if (firstArr.includes(mya)) {
  dinoDataArr.push(dinoId)
} else if (dinosaurs[j].mya[0] === mya || dinosaurs[j].mya[0] - 1 === mya) {
  dinoDataArr.push(dinoId)
}
}
return dinoDataArr
}

//for (let j = 0; j < dinosaurs.length; i++)
module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
