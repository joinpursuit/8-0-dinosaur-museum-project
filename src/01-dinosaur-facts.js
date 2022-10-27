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
  let longestDinosaur = {};
  let longestDinosaurLengthInMeters = 0;
  for (let dinosaur of dinosaurs) {
    /*
    If the tested dinosaur's length is greater than the longest dinosaur previously measured, then the conditional triggers.  The tested dinosaur is set as the longest dinosaur and its length is set as the length of the dinosaur with the longest length.
    */
    if (dinosaur.lengthInMeters > longestDinosaurLengthInMeters) {
      longestDinosaurLengthInMeters = dinosaur.lengthInMeters;
      /*
      If a new key : value were added to the object, the return object would have multiple key : values.  The desired output is an object with a single key : value pair.  So the object is reassigned each time, rather than a new key : value added.  This way there's only one key : value at most.  (If no dinosaur objects in array then "if" conditional doesn't trigger and returned object returns an empty object.)  Value multiplies by 3.281 to convert meters to feet.
      */
      longestDinosaur = { [dinosaur.name] : dinosaur.lengthInMeters*3.281 };
    }
  }
  return longestDinosaur;
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
  /*
  sets default return value to a string dinosaur not found message.
  */
  let dinoDescriptionOrIDNotFoundMessage = `A dinosaur with an ID of '${id}' cannot be found.`
  /*
  iterates through dinosaurs array matching each dinosaur's ID against the ID sought.  If a match is found, puts some of that dinosaur's data as a string literal into the return value and sends return value immediately so unneeded iterations are not run.
  */
  for (let dinosaur of dinosaurs) {
    if (dinosaur.dinosaurId === id) {
      dinoDescriptionOrIDNotFoundMessage = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${dinosaur.mya[dinosaur.mya.length-1]} million years ago.`
      return dinoDescriptionOrIDNotFoundMessage;
    }
  }
  return dinoDescriptionOrIDNotFoundMessage;
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
/*
A default value of "dinosaurId" is set for the "key" parameter.  This is not necessary for the current implementation, but if the code was changed to check validation differently (i.e. no "unknown-key" in the data), then runtime of the function could be decreased by removing the if() section near the end of the function and simply executing dinosaurValuesArray.push(dinosaur[key]) which would then always successfully enter a correct and desired value into the array.
*/
function getDinosaursAliveMya(dinosaurs, mya, key = "dinosaurId") {
  let dinosaurValuesArray = [];
  for (let dinosaur of dinosaurs) {
    let dinosaurInMYARange = false;
     /*
     dinosaurInMYARange evaluates whether the currently evaluated dinosaur lived during the "mya" argument passed in.  The "mya" array sometimes contains only a single value; the first "if" conditional evalutes this case.
    
    The first part of the statement with && looks at the truthy/falsy of dinosaur.mya[1]; if undefined or 0 then returns falsy, not operator changes to true.  So for the first if to execute, we know dinosaur.mya[1] must be undefined or 0.
    
    The second part of the statement with && compares the value of dinosaur.mya[1] to 0.  If they are equal, then true is returned; the not operator changes to false.

    For the entire expression (!dinosaur.mya[1] && !(dinosaur.mya[1] === 0)) to be true, then, dinosaur.mya[1] must be undefined or 0, and must also not be 0.

    The "if" inside the first "if" conditional executes only if mya[1] is undefined.  The instructions for this function stated if only mya has only one parameter, to use the range inclusive from mya to 1 less.
    */
    if (!dinosaur.mya[1] && !(dinosaur.mya[1] === 0)) {
      if (dinosaur.mya[0] >= mya && dinosaur.mya[0] - 1 <= mya) {
        dinosaurInMYARange = true;
      }
         /*
    If the initial "if" is false, then the following "else if" is tested, checking to see if the mya passed into the function is in the range of the current dinosaur's mya two-element array.
    */
     } else if (dinosaur.mya[1] <= mya && dinosaur.mya[0] >= mya) {
        dinosaurInMYARange = true;
      }
      if (dinosaurInMYARange) {
        /*
        A key may exist for some dinosaurs but not others (e.g. "finLength".  The currently evaluated dinosaur is checked to see if the "key" passed in exists, if not then the value corresponding to dinosaur.dinosaurId is added to the array.  If the key does exist, then the value corresponding to dinosaur[key] is added to the array.)
        */
        if (!dinosaur[key]) {
          dinosaurValuesArray.push(dinosaur.dinosaurId);
        } else {
          dinosaurValuesArray.push(dinosaur[key])
        }
      }
    }
    return dinosaurValuesArray;
  }

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
