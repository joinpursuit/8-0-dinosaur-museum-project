/*
  Do not change the line below. 
  If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. 
  This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. 
  You may assume the shape of the data remains the same but that the values may change.

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
 * @param {Object[]} dinosaurs - An array of dinosaur objects.
 *  See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur 
 * and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */

//1. create a new obj
//2. create a var for meters to ft
//3. use loop because dinosaurs = array
// 4. return obj with tallest dinosaur
// use loop to determine what tallest dino is
//adding key/pair value to empty object

function convertToFeet(n){
  return n * 3.281;
}
function getTallestDinosaur(dinosaurs) {
let tallDino = {}; //created a new object
let currentdino = dinosaurs[0] // starting at index 0 to compare to other indexes
  if(dinosaurs.length === 0){
  return tallDino; //return empty object if array is empty
}
    for(let i = 1; i < dinosaurs.length; i++){ // loop starting at 1 since [0] is being compared
      let dino = dinosaurs[i];
      if(dino.lengthInMeters > currentdino.lengthInMeters){ //if dinosaurs[i] > index0
        currentdino = dino; // index0 is now dinosaurs[i]
      }
    }
    
    tallDino[currentdino.name] = convertToFeet(currentdino.lengthInMeters)
    return tallDino;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. 
 * If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` file for an example of the input.
 * 
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops --> NAME
 *  (ZEE-no-SEH-ruh-tops) --> PRONOUNCIATION
 * --> INFO \nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. 
 * It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //returning a description of the dinosaur by ID using params (string form)
// if statement if dinosaur cant be found returns error mssg (string form)

for(let i = 0; i < dinosaurs.length; i++){
// let name = dinosaurs.name
// let pronounce = dinosaurs.pronounciation
// let info = dinosaurs.info
// let period = dinosaurs.period
// let mya = dinosaurs.mya

if(dinosaurs[i].dinosaurId === id){
  return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`
}
}

if(dinosaurs.dinosaurId !== id){ // if dinosaur ID cant be found 
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`; //error message
}
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. 
 * If a `key` is provided, returns the value of that key for each dinosaur alive at that time. 
 * Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. 
 * If included, for dinosaurs that lived during the `mya` value given, 
 * will return the value of the supplied key. 
 * Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. 
 * The array should only include data of dinosaurs who lived during the given time period.
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

  //returning array of dinos that were alive based on mya
  // if key is provided, return key value
  //else, return ID if key is not provided
  //if dino has single value for mya, mya === value or -1 from the number in the array [mya]

  let newArr = [];
  
  for (let dino of dinosaurs) {
    if(dino.mya.length === 1){ // single value
      if((dino.mya[0] >= mya && dino.mya[0]-1 <= mya) && key){ // if value is equal to or one less
        newArr.push(dino[key]); //key is pushed if user types in one less
      } 
    } //two values//
      else if(dino.mya.length === 2 && dino.mya[0] >= mya && dino.mya[1] <= mya && key) // if key included
        newArr.push(dino[key]); // add key to array
      }
        // else if(dino.mya[0] >= mya && dino.mya[1] <= mya){
        // newArr.push(dino.dinosaurId);
    return newArr; 
    }

    
    
    
    
    
    
    // if(dino.mya[0] === mya || dino.mya[dino.mya.length-1] === mya ){
      //   if(key){
      //     newArr.push(dino.name)
      //   }
      //   else{
      //     return dino.dinosaurId;
      //   }
      // }
      //    if(key && dino.mya[0] - 1 === mya){
      //   newArr.push(dino.dinosaurId)
      //   } else if(dino.mya.length === 1 ){
      //     newArr.push(dino.dinosaurId)
      //   }
//   }
//   return newArr;
// 
console.log(getDinosaursAliveMya(exampleDinosaurData))

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
