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
  //guard statement: if arr is empty, return empty object
  if (dinosaurs.length === 0) {
    return {}
  }

  //setting empty object for the result to fill
  let obj = {}
  //declaring the name on the 'key' in the object
  let key = ""
  //declaring the value of the object
  let value = 0

  //looping through array, starting @ first element
  for (let i = 0; i < dinosaurs.length; i++) {
    //if the value in 'lim' of the first element is > 0
    if (dinosaurs[i].lengthInMeters > value) {
      //reassign that name to key
      key = dinosaurs[i].name
      //reassig that length to value
      value = dinosaurs[i].lengthInMeters

    }

  }

  //add the key value pair into the object
  obj[`${key}`] = value * 3.281
  //return object
  return obj

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

// return `A Dinoaur with an ID of '${id} cannot be found.`


function getDinosaurDescription(dinosaurs, id) {
  //some place to hold the returned string
  let answer = ''
  //looping through dinosaurs array
  for (let i = 0; i < dinosaurs.length; i++) {
      //checking if value in dinoid of the first object of the arr is the same as inputted value
      if(dinosaurs[i].dinosaurId === id){
      //if true, assign string to the 'answer' variable *DON'T RETURN YET, CHECKING ANOTHER CONDITION*
      answer = dinosaurs[i].name + " " + "(" + dinosaurs[i].pronunciation + ")" + "\n" + dinosaurs[i].info + " " + 'It lived in the Early Cretaceous period, over 77.5 million years ago.'
        //If the above condition is true & there's only 1 value in 'mya'
        if(dinosaurs[i].mya.length === 1){
          //reassign answer to new string with the obj value pairs with length of 1
          answer = dinosaurs[i].name + " " + "(" + dinosaurs[i].pronunciation + ")" + "\n" + dinosaurs[i].info + " " + 'It lived in the' + " " + dinosaurs[i].period + " " + 'period, over' + " " + dinosaurs[i].mya + " " + 'million years ago.'
          //if both statements are true
          return answer 
        }//if closing tag`
        //if only the initial condition is true
        return answer
    } //if closing tag`
  }//for closing tag

//edge case: if id not found
return answer = `A dinosaur with an ID of '${id}' cannot be found.`

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
  let arr = []
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].mya.includes(mya) || dinosaurs[i].mya-1 === mya || dinosaurs[i].mya[0] > mya && dinosaurs[i].mya[1] < mya){
      if(!key){
        arr.push(dinosaurs[i].dinosaurId)
      } else {
        arr.push(dinosaurs[i][key])
      }
    }//if closing tag
  }
  return arr
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
