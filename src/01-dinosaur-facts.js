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
 * 
//  */

function getLongestDinosaur(dinosaurs) {
  let dinosaursLengthArray = []
  let finalObject = {}
  
  // Si el array de entrada esta vacio, entonces retornar un objeto vacio = {} ///mejor utilizar el lenght por q la otrea opcion evaluamos forma.
  if (dinosaurs.length === 0) {
    return { }
  }

  for(let i=0; i< dinosaurs.length; i++) {
    let dinosaurLength = (dinosaurs[i].lengthInMeters)
    dinosaursLengthArray.push(dinosaurLength)
  }

  let findTheMax =  Math.max(...dinosaursLengthArray) 

  for (let i = 0; i < dinosaurs.length; i++) {
  //let findthemax =  (Math.max(...myArray)) 
    let dinosaurName = dinosaurs[i].name
    if ((dinosaurs[i].lengthInMeters) === findTheMax) {
      // finalObject = {newKey,findthemax}
      finalObject[dinosaurName] = findTheMax * 3.281
      return finalObject
    }
  }
}


// let acumulator = {}
//      for (let i = 0; i < dinosaurs.length; i++) {
//       let dinosaurLong = dinosaurs[i].lengthInMeters
//       if (acumulator[dinosaurLong] === findthemax) {
//         acumulator[dinosaurLong] = (findthemax * 3.281)
//       }
//     }

  //  function getRollCounts(rolls) {
  //   let acumulator = {}
  //      for (let i = 0; i < rolls.length; i++) {
  //         let roll = rolls[i];
  //              if (!acumulator[roll]) { //:::if when the "for cycle" starts that "roll" had no value, then assign it one.
  //               acumulator[roll] = 1;
  //            } else { // when the "for cycle" and if it already had a value, then add one more.
  //               acumulator[roll] += 1
  //            }
  //          }
  //   return acumulator
  //    }
  //  *///const dinosaurs = [
//   {
//     dinosaurId: "YLtkN9R37",
//     name: "Allosaurus",
//     pronunciation: "AL-oh-sore-us",
//     meaningOfName: "other lizard",
//     diet: "carnivorous",
//     lengthInMeters: 12,
//     period: "Late Jurassic",
//     mya: [156, 144],
//     info: "Allosaurus was an apex predator in the Late Jurassic in North America.",
//   },
//   {
//     dinosaurId: "GGvO1X9Zeh",
//     name: "Apatosaurus",
//     pronunciation: "ah-PAT-oh-sore-us",
//     meaningOfName: "deceptive lizard",
//     diet: "herbivorous",
//     lengthInMeters: 21,
//     period: "Late Jurassic",
//     mya: [154, 145],
//     info: "Named the 'deceptive lizard' because its skull was confused with those of other sauropods until 1909.",
//   }]

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
 * //const dinosaurs = [
//    {
//     dinosaurId: "U9vuZmgKwUr",
//     name: "Xenoceratops",
//     pronunciation: "ZEE-no-SEH-ruh-tops",
//     meaningOfName: "alien horned face",
//     diet: "herbivorous",
//     lengthInMeters: 6,
//     period: "Early Cretaceous",
//     mya: [78.5, 77.5],
//     info: "Xenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes.",
//   }
// ]
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *   ###  ` ${name1} (${pronunciation1})\n${info1}. It lived in the ${period1}, over ${mya2} million years ago.'
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  
 
  for(let i=0; i< dinosaurs.length; i++) { 
    let identifier = dinosaurs[i].dinosaurId
    if (identifier === id) {
    let name1 = dinosaurs[i].name 
    let pronunciation1 = dinosaurs[i].pronunciation
    let info1 = dinosaurs[i].info
    let period1 = dinosaurs[i].period
    let mya1  = dinosaurs[i].mya
    let mya2 = mya1[mya1.length - 1]  // 
      return `${name1} (${pronunciation1})` + `\n${info1} It lived in the ${period1} period, over ${mya2} million years ago.`
    } 
   } 
   return "A dinosaur with an ID of 'incorrect-id' cannot be found."
  }




// function getDinosaurDescription(dinosaurs, id) {
  
//   for(let i=0; i< dinosaurs.length; i++) {
//     let identifier = dinosaurs[i].dinosaurId
//     let name1 = dinosaurs[i].name 
//     let pronunciation1 = dinosaurs[i].pronunciation
//     let info1 = dinosaurs[i].info
//     let period1 = dinosaurs[i].period
//     let mya1  = dinosaurs[i].mya
//     let mya2 = Math.max(...mya1)
  
//     if (identifier === id ) { 
//       return  `${name1} (${pronunciation1})` + `\n${info1}. It lived in the ${period1}, over ${mya2} million years ago.`  
//    } else {
//     return "A dinosaur with an ID of 'incorrect-id' cannot be found."
//    }
//   }
// }

//const dinosaurs = [
  //    {
  //     dinosaurId: "U9vuZmgKwUr",
  //     name: "Xenoceratops",
  //     pronunciation: "ZEE-no-SEH-ruh-tops",
  //     meaningOfName: "alien horned face",
  //     diet: "herbivorous",
  //     lengthInMeters: 6,
  //     period: "Early Cretaceous",
  //     mya: [78.5, 77.5],
  //     info: "Xenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes.",
  //   }
  // ]
  
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
 * {
    dinosaurId: "WHQcpcOj0G",
    name: "Dracorex",
    pronunciation: "dray-ko-rex",
    meaningOfName: "dragon king",
    diet: "herbivorous",
    lengthInMeters: 4,
    period: "Late Cretaceous",
    mya: [66],
    info: "Dracorex hogwartsia was a pachycephalosaur that did not have a domed head. Instead, its skull was adorned with spikes and frills reminiscent of a dragon. A skull was discovered in the Hell Creek Formation in South Dakota and donated to the Children's Museum of Indianapolis in 2004. Its name was inspired by J.K. Rowling's Harry Potter series and the young visitors to the children's museum.",
  },
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 * //"if the `mya` key is an array of one number, should allow for 1 MYA less than the amount (66)" mya=65  y dinosaurs[i].mya===myaMax= 66 ===> aprueba
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
    let myArray = []
    
   for(let i=0; i< dinosaurs.length; i++) {  
    let identifier = dinosaurs[i].dinosaurId
    let mya1  = dinosaurs[i].mya
    let myaMin = mya1[mya1.length - 1]
    let myaMax = mya1[0]
    let keyFinder = dinosaurs[i][key]
    let myaLess = myaMax-1
    
     if (((mya >= myaMin) && (mya <=myaMax ) && (!key))  ) {
       myArray.push(identifier)
     } 
     else if (((mya===myaLess) && (!key)) ) {
      myArray.push(identifier)
     }
     else if (((mya >= myaMin) && (mya <=myaMax ) && (keyFinder)) || ((mya===myaLess) && (keyFinder))) {
     myArray.push(keyFinder)
    }
    
   }
   
 return myArray
}




// function getDinosaursAliveMya(dinosaurs, mya, key) {
//   let myArray = []
  
//  for(let i=0; i< dinosaurs.length; i++) {  
//   let identifier = dinosaurs[i].dinosaurId
//   let mya1  = dinosaurs[i].mya
//   let myaMin = mya1[mya1.length - 1]
//   let myaMax = mya1[0]
//   let namer = dinosaurs[i].name
//   let myaLess = myaMax-1
  
//    if ((mya >= myaMin) && (mya <=myaMax ) && (!key))  {
//      myArray.push(identifier)
//    } 
//   //  else if ((mya1.length === 1) && (mya <mya1) && (!key)){
//   //   myArray.push(identifier)
//   //  }
//    else if (mya===myaLess && (!key)) {
//     myArray.push(identifier)
//    }
//    else if (((mya >= myaMin) && (mya <=myaMax ) && (key===namer)) || ((mya===myaLess) && (key===namer))) {
//    myArray.push(namer)
//   }
//    ///cclo
//  }
// return myArray
// }

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
