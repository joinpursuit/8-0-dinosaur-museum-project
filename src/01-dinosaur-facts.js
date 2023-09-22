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
  // Initialize variables to store the longest dinosaur's height in feet, name, and an empty object to store the result
  let longestDinoInFt = 0;
  let longestDinoName = "";
  let longestDino = {};
  
  // Check if the array of dinosaurs is empty, if so, return the empty longestDino object
  if (!dinosaurs.length) {
    return longestDino;
  }
  // Loop through each dinosaur in the dinosaurs array
  for (const dino of dinosaurs) {
    // Convert the length of the dinosaur from meters to feet
    let heightFt = dino.lengthInMeters * 3.281;
  
    // Check if the current dinosaur's height is greater than the longestDinoInFt
    if (heightFt > longestDinoInFt) {
      // If so, update the longestDinoName and longestDinoInFt variables with the current dinosaur's name and height
      longestDinoName = dino.name;
      longestDinoInFt = heightFt;
    }
  }
  
  // Create a new object with the longest dinosaur's name as the key and the longest dinosaur's height as the value
  longestDino = {[longestDinoName]: longestDinoInFt};
  
  // Return the longestDino object
  return longestDino;
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
  // Initialize an empty string to store the dinosaur description
  let dinoDesc = "";

  // Iterate through the dinosaurs array
  for (const dino of dinosaurs) {
    // Check if the current dinosaur id matches the input id
    if (dino.dinosaurId === id) {
      // Create the formatted dinosaur description using template literals
      dinoDesc = `${dino.name} (${dino.pronunciation})\n${dino.info}`;

      // Check the length of the mya (million years ago) array
      if (dino.mya.length === 1) {
        // Append the information about the dinosaur's period and age to the description
        dinoDesc += ` It lived in the ${dino.period} period, over ${dino.mya[0]} million years ago.`;
      } else if (dino.mya.length === 2) {
        // Append the information about the dinosaur's period and age to the description
        dinoDesc += ` It lived in the ${dino.period} period, over ${dino.mya[1]} million years ago.`;
      }
      // Return the completed dinosaur description
      return dinoDesc;
    }
  }
  // If no matching dinosaur id is found, return an error message
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
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
// Create an empty array to store the dinosaurs that are alive based on the given criteria
const dinoAliveByMya = [];

// Iterate through each dinosaur in the 'dinosaurs' array
dinosaurs.forEach(dino => {
  // Check if the dinosaur's 'mya' property includes the given 'mya' value
  // or if the difference between the first element of the 'mya' property and the 'mya' value is 1
  // or if the second element of the 'mya' property is less than or equal to the 'mya' value
  // and the first element of the 'mya' property is greater than or equal to the 'mya' value
  if (dino.mya.includes(mya) || (dino.mya[0] - mya === 1) || (dino.mya[1] <= mya) && (dino.mya[0] >= mya)){
    // If the above condition is true, add the 'key' property value of the dinosaur to the 'dinoAliveByMya' array
    // If 'key' is not provided, add the 'dinosaurId' property value of the dinosaur to the array
    key ? dinoAliveByMya.push(dino[key]) : dinoAliveByMya.push(dino.dinosaurId);
  }
});

// Return the 'dinoAliveByMya' array containing the dinosaurs that are alive based on the given criteria
return dinoAliveByMya;
}
 



/**
 * Retrieves fun dinosaur facts based on the given dinosaurs and name.
 *
 * @param {array} dinosaurs - An array of dinosaurs.
 * @param {string} name - The name of the dinosaur.
 * @return {string} A string representing the fun fact.
 */
function getFunDinosaurFacts (dinosaurs, name) {
  const factOptions = ["meaningOfName", "diet", "lengthInMeters"];
  const randomFact = Math.floor(Math.random() * factOptions.length);
  const dinosaur = dinosaurs.find((dino) => dino.name === name);

  if (!dinosaur) {
    return "No name was given or it's an invalid name";
  }

  switch (randomFact) {
    case "diet":
      return `The ${name} is ${dinosaur.diet}.`;
    case "lengthInMeters":
      return `The ${name} is ${dinosaur.lengthInMeters} meter(s) long.`;
    case "meaningOfName":
      return `The ${name} name means ${dinosaur.meaningOfName}.`;
    default:
      return `The ${name} is an awesome dino!`;
  }

}


module.exports = {
  getFunDinosaurFacts,
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
