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
  let tallestDino = {}; //Create empty object to store dino

  //Check if dinosaurs actually contains dinosaurs to compare.
  if (dinosaurs.length !== 0){

    //Intialize empty object as the first dino for comparison
    tallestDino[dinosaurs[0].name] = dinosaurs[0].lengthInMeters * 3.281;

    //Iterate through dinosaurs
    for (dino of dinosaurs){
      if (tallestDino[Object.keys(tallestDino)[0]] < dino.lengthInMeters * 3.281){

        tallestDino = {}; //Reinitalizes the object whenever a taller dino is found
        
        //Set up new information for taller dino.
        tallestDino[dino.name] = dino.lengthInMeters * 3.281;
      }
    }
  }
  return tallestDino;
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
  //Iterate through dinosaurs to search for match.
  for (let dino of dinosaurs){
    if (dino.dinosaurId === id){

      //Format time string for a bit more readability of the template literal
      let time = dino.mya[dino.mya.length-1];

      //Return remplate literal result according to format.
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${time} million years ago.`
    }
  }

  //Return error message if dinosaur can't be found.
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
function getDinosaursAliveMya(dinosaurs, mya, key) {

  //Create empty array to store living dinos.
  let datapoints = [];

  //Iterate through dinosaur array.
  for (let dino of dinosaurs){

    //Check if mya is 1, or 2 values
    if (dino.mya.length===2){

      //Check if the dinosaur's mya value matches the search.
      if (mya <= dino.mya[0] && mya >= dino.mya[1]){

        //Check if the last argument is usable for data.
        if (Object.keys(dino).includes(key)){
          datapoints.push(dino[key]);
        }
        else{
          datapoints.push(dino.dinosaurId);
        }
      }
    }
    else{

      //Check if the dinosaur's mya value matches the search.
      if (mya === dino.mya[0] || mya === dino.mya[0]-1){

        //Check if the last argument is usable for data.
        if (Object.keys(dino).includes(key)){
          datapoints.push(dino[key]);
        }
        else{
          datapoints.push(dino.dinosaurId);
        }
      }
    }
  }
  return datapoints;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
