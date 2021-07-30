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


//looking through an array of objects. Each object has a dinosaur and its deets
//grabbing the dinosaur name and its height
//convert height from meters to feet - this can be a function that can be called, but doesn't have to exist since the height can be converted at the end
// compare the current dinosaur to different dinosaurs to determine if its hight is higher or lower than the listed dinosaur
//create an empty object and dump the info into it
//loop through each index of the original dinosaur object and look at the height first


function getTallestDinosaur(dinosaurs) {
  let tallestDinosaur = {};
  let currentDino = dinosaurs[0];
  if (dinosaurs.length === 0) {
    return tallestDinosaur;
  }
  for (let i = 0; i < dinosaurs.length; i++) {
    let indexDino = dinosaurs[i];
    if (currentDino.lengthInMeters < indexDino.lengthInMeters) {
      currentDino = indexDino;
    }
  }
  let measurementsInFeet = currentDino.lengthInMeters * 3.281
  tallestDinosaur[currentDino.name] = measurementsInFeet;
  return tallestDinosaur;
}

// const stuff = []
// console.log(getTallestDinosaur(stuff));
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

//looks the array of objects- loop through each object
//return a line of text that incorporates the identified dinosaur(id of the dinosaur)
//if the dinosaur is not listed then the result in an error message
//if there are two values in the mya array it grabs the lowest numbers - automatically grab the second value - array.length - 1
function getDinosaurDescription(dinosaurs, id) {
  for (const eachDino of dinosaurs ) {
    if (eachDino.dinosaurId === id) {
      return `${eachDino.name} (${eachDino.pronunciation})\n${eachDino.info} It lived in the ${eachDino.period} period, over ${eachDino.mya[eachDino.mya.length-1]} million years ago.` 
    }
  }
  return `A dinosaur with an ID of '${id}' cannot be found.`
}

//  const stuff = [ 
//   {
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

// console.log(getDinosaurDescription(stuff,"U9vuZmgKwUr"))
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
//returns an array of dinosaurs who were alive at a given time
//the given time is mya
//if a key is provided, return the value of that key - can be any property listed within the object
//if there is no key, then return the dinosaur ID 
//create a function to determine if something is alive
//if the function rings as true, then things happens
//mya will be equal to to the value or 1 less.
//determine if the dinosaurs is alive

//create a function that determines if a dinosaur is alive or not during the time campared to it


function yesIAmAlive(eachDino, mya) {
  let iAmAlive = false
    // if the number given is bigger than the first number in mya, then the dinosaur doesn't exist and if the number given is smaller than the second number in mya it's still dead
    //if the given number exists in mya range (index number 2 to index number 1) then the dino is alive   
    if (eachDino.mya.length === 2 && (eachDino.mya[0]>= mya && eachDino.mya[1] <= mya) ) {
      iAmAlive = true
    }
    // if there's only 1 year element in mya, then the mya (listed in the array) has to match the given year or be one less than the given
    //if it doesn't meet then it's false
    if (eachDino.mya.length === 1 && (eachDino.mya[0] === mya || eachDino.mya[0]-1 === mya) ) {
      iAmAlive = true
    }
  return iAmAlive
}

function getDinosaursAliveMya(dinosaurs, mya, key = `dinosaurId`) {
  let aliveAtTheTime = [];
  for (const eachDino of dinosaurs) {
    if (yesIAmAlive(eachDino, mya) && key) {
      aliveAtTheTime.push(eachDino[key])
    }
    // else if (yesIAmAlive(eachDino, mya)) {
    //   aliveAtTheTime.push(eachDino.dinosaurId)
    // }
  }
  return aliveAtTheTime
} 


// let stuff = [
//   {
//   dinosaurId: "YLtkN9R37",
//   name: "Allosaurus",
//   pronunciation: "AL-oh-sore-us",
//   meaningOfName: "other lizard",
//   diet: "carnivorous",
//   lengthInMeters: 12,
//   period: "Late Jurassic",
//   mya: [156, 144],
//   info: "Allosaurus was an apex predator in the Late Jurassic in North America.",
// },
// {
//   dinosaurId: "WHQcpcOj0G",
//   name: "Dracorex",
//   pronunciation: "dray-ko-rex",
//   meaningOfName: "dragon king",
//   diet: "herbivorous",
//   lengthInMeters: 4,
//   period: "Late Cretaceous",
//   mya: [66],
//   info: "Dracorex hogwartsia was a pachycephalosaur that did not have a domed head. Instead, its skull was adorned with spikes and frills reminiscent of a dragon. A skull was discovered in the Hell Creek Formation in South Dakota and donated to the Children's Museum of Indianapolis in 2004. Its name was inspired by J.K. Rowling's Harry Potter series and the young visitors to the children's museum.",
// }
// ]

// getDinosaursAliveMya(stuff, 150, stuff.dinosaurId)


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
