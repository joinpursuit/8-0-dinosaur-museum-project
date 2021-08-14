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

  //this coverts my metters to length
  function convertToFeet(n) {
    return n * 3.281
  }
  
  function getTallestDinosaur(dinosaurs) {
    
    //if the array is empty return a falsey value
    if (!dinosaurs.length) return {}
    
    let tallest = {}
    //have to make my currentDino the first dino because i need something to compare the other dinos too
    let currentDino = dinosaurs[0]
    
    //creating a loop to go thought all the dinos legthInMeters
    for (let i = 1; i < dinosaurs.length; i++) {
      
      //if the hight is taller tha my currentDino then assign the dinosaurs[i].lengthInMeters to my current dino
      if (dinosaurs[i].lengthInMeters > currentDino.lengthInMeters) {
        currentDino = dinosaurs[i]
      }
    }
    //converting my current dino from meters to feet.
    tallest[currentDino.name] = convertToFeet(currentDino.lengthInMeters)
    return tallest
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

  //looping throuht the dinososaurs array that was given
 for (let dino of dinosaurs) {

  //if the dino.dinosaurId is equal to the id that was given
  if (dino.dinosaurId === id) {
    //if the id was found return this string
    return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1] } million years ago.`
  }
 }
// If the id was not founf return this error message.
return `A dinosaur with an ID of '${id}' cannot be found.`
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

//creating a helper cuntion just to check if the dino is alive during the year that was given
function isItAlive(dino, year) {

  //creating my default value with the value false
  let alive = false
  //checking if the year that wsas given to us is in between the years that the dino was alive
  if (dino[0] >= year && dino[1] <= year) {//if he is alive assignt true to alive
    alive = true
    //checking if the year that wsas given to us is equal to the year that the dino was seen or 1 year before
  } else if (dino[0] === year || (dino[0] - 1) === year) { ////if he is alive assignt true to alive
    alive = true
  } //returns alive
  return alive
}

function getDinosaursAliveMya(dinosaurs, mya, key) {
  //creating my default value to push my dinosaurs who are alive in.
  let arr = []

  //looping through every dino in the dinosaurs array
  for (const dino of dinosaurs) {

    //calling for my helper function to check if the dino was alive or not. Its also checking if a key
    //was give to us.
    if (isItAlive(dino.mya, mya) && key) { 
      //if the dino was alive and a key was given push a i want to push the key that was give for that dino
      arr.push(dino[key])
      ////calling for my helper function to check if the dino was alive or not
    } else if (isItAlive(dino.mya , mya)) { 
      //if the dino was alive I want to push the dinosaurId into my array.
      arr.push(dino.dinosaurId)
      }
  }
  return arr
}



module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
