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

//input : dinosaur array
//output = object with the key 'name' abd pointing to height in feet
//creatge a variable for first dino
//loop through the array - compar dino.length in meter to the tallestSo fat =if it is larger dinio[i] = tallest so far
// return an object {tallestSoFar.name  : takkestSoFar.lengthInMeters} converted to feet


//creates a function called getTallestDinosaur with the parameter dinosaurs which is an array of dinosaur objects
function getTallestDinosaur(dinosaurs) {
  //conditional statement if the length of the dinosaurs array is 0(no dinosaurs); return an empty object
  if(dinosaurs.length === 0) {
    return {};
  }
  //creates a variable with let called obj to equal in empty object
  let obj = {} 
  //creates a variable with let called dino_name
  let dino_name;
  //creates a statemet let the tallestDino variable equal the dinosaurs array at it's first element (index 0)
  let tallestDino = dinosaurs[0];//lengthInMeter;
  //creates a for loop that iterates through the dinosaurs array 
  for(let i = 1; i < dinosaurs.length; i++) {
    //conditional statement if the iteration through the dinosaurs array hits the lengthInMeters key and the value is greater than the lengthInMeters of the tallestDino (which is equal to 12 right now -dinosaurs[0])
    if(dinosaurs[i].lengthInMeters > tallestDino.lengthInMeters){

      //then replace the tallestDino at dinosaurs[0] with the dinosaur iteration
    tallestDino = dinosaurs[i];
  }
}
//create a variable with let called heightInFeeet to convert the tallestDino.lengthInMeter to feet by multiplying by 3.281
let heightInFeet = tallestDino.lengthInMeters * 3.281;
//create a variable with let called diino to equal the new tallestDino.name (which is the name attached to the new tallestDino)
let dino = tallestDino.name    // var obj={this.name= height}
//assigns the object obj with the key of [dino] which is now the tallestDino name and the value of heightInFeet 
 obj[dino] = heightInFeet;
 //return that newly created object called obj
      return obj; 
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
//creates a fundtion called getDinosaurDescription with the parameters dinosaurs which is an array of dinosaur objects and if a d unique identifier
function getDinosaurDescription(dinosaurs, id) {
  //creates a for loop through the dinosaurs array to find unique iid)
  for(let i = 0; i < dinosaurs.length; i++){
    //conditional statement as i iterates through the dinosaurs array and reaches the key dinosaurId if it is equal to id (unique identifier)
if(dinosaurs[i].dinosaurId === id){
  //return formatted description of the dinosaur as an inerpolated string with back ticks 
  return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length -1]} million years ago.`;
} 
  }
  //conditional statement if dinosaurs[i]dinosaurId doesn't match id the unique identifer return the interpolated error message with back ticks 
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
  //creates a function called getDinosaursAliveMya with the parameters dinosaurs which is an array of dinosaur objects, mya which is a key in the object and key optional for mya given value
function getDinosaursAliveMya(dinosaurs, mya, key) {
  //conditional statement if the key give is blank key is given the default value of dinosaurId
  if(key === undefined){
    key = 'dinosaurId';
    //conditional statement  else if dinosaurs first element doensn't (!) have the given key (dinosaurColor) within (.hasOwnProperty - checks if key is listed) the give key is given default value of dinosaurId
  } else if (!dinosaurs[0].hasOwnProperty(key)){
    key = "dinosaurId";
  }
  //creates an empty array called aliveMya
  let aliveMya = [];
  
  
  //creates a for loop that iterates through the dinosaurs array
  for (let i = 0; i < dinosaurs.length; i++){
    //conditional statment as i iterates through the dinosaurs array if it reaches the key mya length is greater than 1 ([154, 145]) and mya first element is greater than the given mya parameter and the mya at the second element is less than (given mya is in between 1st and 2nd element of the mya array) or equal to give mya push that dinosaur into the empty array called aliveMya
    if(dinosaurs[i].mya.length > 1 && dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya ){
      aliveMya.push(dinosaurs[i][key])

      ///conditional statment as i iterates through the dinosaurs array else if it reaches the key mya length is 1 ([154]) and mya first element is greater than or equal to the given mya parameter and the mya at the element minus 1(given mya is in between element# and element# minus 1) less than or  equal to give mya push that dinosaur into the empty array called aliveMya
    } else if (dinosaurs[i].mya.length === 1 && dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[0] - 1 <= mya){
      aliveMya.push(dinosaurs[i][key])
      console.log(dinosaurs[i][key]);
    }
      
  }
  //return the aliveMya array with the pushed dinosaurs inside
  return aliveMya;

      
    // if(dinosaurs[i].mya === mya.length -1){
    //   aliveMya.push(dinosaurs[i].dinosaurId);
    // //} else{
    //   return aliveMya;
    // }
  //}//f (dinosaurs[i].name === ""){
    //aliveMya.push(dinosaurs[i].dinosaurId)
  
    //return dinosaurs[i].dinosaurId
  //return aliveMya;
}//else if(dinosaurs[i].name === dinosaurs)
  


module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
