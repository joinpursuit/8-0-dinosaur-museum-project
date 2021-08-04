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
 * Returns an object with the tallest dinosaur from the list.
 * Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects.
 * See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the
 * dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 *
 *
 */
// converts from meters to feet
function convertToFeet(value) {
  //returns the result
    return value * 3.281;
  }

function getTallestDinosaur(dinosaurs) {

  if (dinosaurs.length === 0) {// checks if dinosaurs array is empty
    //if the condition evaluates to truthy, empty object array return
    return {};
  }

  //declare the object to be returned
  let tallestArray = {};
  let tallestDino = dinosaurs[0]; //designated as the tallest

  //iterates through the array for the tallest
  for (let dino of dinosaurs) {
      if (tallestDino.lengthInMeters < dino.lengthInMeters) {
        tallestDino = dino;
      }
  }
  tallestArray[tallestDino.name] = convertToFeet(tallestDino.lengthInMeters);
  return tallestArray;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be
 * found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how
 * the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects.
 * See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops
 * had horns and a bony frill with elaborate ornamentation of projections,
 * knobs, and spikes. It lived in the Early Cretaceous period,
 * over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //looping through the dinosaurs array
  for (let i = 0; i < dinosaurs.length; i++) {

    //checks if any id in dinosaurs array matches with the given id
    if (dinosaurs[i].dinosaurId === id) {
      
      //if id match is found this line will be returned
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${
        dinosaurs[i].info
      } It lived in the ${dinosaurs[i].period} period, over ${
        dinosaurs[i].mya[dinosaurs[i].mya.length - 1]
      } million years ago.`;
    }
  }
  //returns an error message if no dinosaurs found
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya`
 * (i.e. "millions of years ago") value. If a `key` is provided,
 * returns the value of that key for each dinosaur alive at that time.
 * Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya`
 * value to be equal to the given value or one less. For example,
 * if a dinosaur has a `mya` value of `[29]`, the dinosaur's information
 * will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the
 * `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included,
 * for dinosaurs that lived during the `mya` value given, will return
 * the value of the supplied key. Otherwise, returns the ID.
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
 *
 *
 * Return an array of dinsaurs who were alive during a specific `mya`
 * (i.e. "millions of years ago") period
 * if a key is given return the value of that key for each else return th id
 * if mya given is single, dino info will be return if it;s that  # or less by 1
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let dinoArr = []; //declares an empty array

  for (let dino of dinosaurs) { //loops through dinosaurs array
    
    if(!key){ // if key is not given
      //and if mya given is one less than or equal to the mya given or the last element in nya array
         if(dino.mya[0] - 1 === mya || dino.mya[0] === mya ||
          dino.mya[dino.mya.length-1] === mya){
            //if either conditions is met, it will be pushed in the empty dinoArr declared above
          dinoArr.push(dino.dinosaurId)
        } //otherwise if checks the first element in mya array is greater or equal to given mya and the last element is less than or equal to given mya
        else if(dino.mya[0] >= mya && dino.mya[dino.mya.length-1] <= mya){
          //if the condition is true, the dinosaur is pushed in the dinoArr array
          dinoArr.push(dino.dinosaurId)
        }
        } 
        //otherwise checks if a key is given
      else if(key){
        //also //otherwise if checks the first element in mya array is greater or equal to given mya and the last element is less than or equal to given mya
        if(dino.mya[0] === mya || dino.mya[0]- 1 === mya || 
          dino.mya[dino.mya.length - 1] === mya){
            //if the condition is true, the dinosaur is pushed in the dinoArr array
          dinoArr.push(dino[key])
      } //otherwise if checks the first element in mya array is greater or equal to given mya and the last element is less than or equal to given mya
      else if(dino.mya[0] >= mya && dino.mya[dino.mya.length-1] <= mya){
        //if the condition is true, the dinosaur is pushed in the dinoArr array
        dinoArr.push(dino.key)
      }  
}
}
  return dinoArr
}

getDinosaursAliveMya(exampleDinosaurData, 150);


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
