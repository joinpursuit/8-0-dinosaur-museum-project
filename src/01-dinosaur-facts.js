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
function getTallestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0) {
    return {};
  }

  // understand the problem
  // what are the function inputs?
  // one input: dinosaurs an array of objects dinosaurs
  //             each element of the array is an object
  //             relevent properties: .lengthInMeters . name

  // What are the functions output?
  // an object with a single key value pair
  // the key should be the name of the tallest dinosaur
  // the value should be the length in feet of that dinosaur

  // devise plan
  // two pieces of info to remember:
  // name of the tallest dino
  // height of the tallest dino

  let tallestDino = {};
  let tallestName = "";
  let tallestHeight = 0;

  // scan/iterate through our array of dinosaurs
  for (let dino of dinosaurs) {
    // console.log('logging one dino:", dino"
    if (dino.lengthInMeters > tallestHeight) {
      // console.log('found a taller dino', dino.lengthInMeters, 'is the taller than', tallestHeight);

      //    if our current dino is taller than the tallest we've seen
      //      update tallest dino name and height
      tallestHeight = dino.lengthInMeters;
      tallestName = dino.name;

     
    }
  }

  // console.log(tallestName, 'is', tallestHeight, 'meters tall');

  // once we scan the full array of dinos we know we have the tallest dino's name and height written down

  // convert the dino heigth into feet
  tallestHeight = tallestHeight * 3.281;
  // create an object with a dino name as a key and length in feet as value

  tallestDino[tallestName] = tallestHeight;
  // return that object
  return tallestDino;
}


// console.log(dinosaurs[1].lengthInMeters) use it inside the function to test
// getTallestDinosaur(exampleDinosaurData);
// console.log(getTallestDinosaur(exampleDinosaurData));

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
  let message = '';
  

  for (let i = 0; i < dinosaurs.length; i++) {

    if (dinosaurs[i].dinosaurId === id) {

      
      message = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[dinosaurs[i].mya.length - 1]} million years ago.`;
     
    return message;
    }
    
  } 
  message = `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
  
  return message;
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
  let dinoId = [];
  for (let i = 0; i < dinosaurs.length; i++) {
 
    
    if (dinosaurs[i].mya.length === 2) {
      if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[1] <= mya) {
        if (key === undefined) {
          dinoId.push(dinosaurs[i].dinosaurId);
        }
        else {
          switch (key) {
            case 'dinosaurId':
              dinoId.push(dinosaurs[i].dinosaurId);
              break;
            case 'name':
              dinoId.push(dinosaurs[i].name);
              break;
            case 'pronunciation':
              dinoId.push(dinosaurs[i].pronunciation);
              break;
            case 'meaningOfName':
              dinoId.push(dinosaurs[i].meaningOfName);
              break;
            case 'diet':
              dinoId.push(dinosaurs[i].diet);
              break;
            case 'lengthInMeters':
              dinoId.push(dinosaurs[i].lengthInMeters);
              break;
            case 'period':
              dinoId.push(dinosaurs[i].period);
              break;
            case 'mya':
              dinoId.push(dinosaurs[i].mya);
              break;
            case 'info':
              dinoId.push(dinosaurs[i].info);
              break;
            default:
              dinoId.push(dinosaurs[i].dinosaurId);
          }
        }
        
        
      }
    }
    if (dinosaurs[i].mya.length === 1) {
      if (dinosaurs[i].mya[0] >= mya && dinosaurs[i].mya[0] - 1 <= mya) {
        if (key === undefined) {
          dinoId.push(dinosaurs[i].dinosaurId);
        }
        else {
          switch (key) {
            case 'dinosaurId':
              dinoId.push(dinosaurs[i].dinosaurId);
              break;
            case 'name':
              dinoId.push(dinosaurs[i].name);
              break;
            case 'pronunciation':
              dinoId.push(dinosaurs[i].pronunciation);
              break;
            case 'meaningOfName':
              dinoId.push(dinosaurs[i].meaningOfName);
              break;
            case 'diet':
              dinoId.push(dinosaurs[i].diet);
              break;
            case 'lengthInMeters':
              dinoId.push(dinosaurs[i].lengthInMeters);
              break;
            case 'period':
              dinoId.push(dinosaurs[i].period);
              break;
            case 'mya':
              dinoId.push(dinosaurs[i].mya);
              break;
            case 'info':
              dinoId.push(dinosaurs[i].info);
              break;
            default:
              dinoId.push(dinosaurs[i].dinosaurId);
          }
        }
      }
    }
  }
  return dinoId;

}




module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
