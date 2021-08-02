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
  //let tallestDyno = {}; // to be determined.  looking for 1 object based on height comparison.
  //let dynoHeightInFt = {}; //the object I want to return with the key of dinosaurs.name & value of dinosaurs.lengthinmeters converted to feet 
  //let nameHeightArray = [] // I added this to push in the dinosaurs.lengthinmeters values to compare in another loop.  I may not need this.
   // value of of dynoheight eventually to be converted t feet,  I may use this variable to add as a value to the key value you dinosaurs.lenghtinmeters for tallest dyno object. 
  //let dynoName = dinosaurs.name;
  
  
  if (!dinosaurs.length){
    return {};
  }
  let dynoHeight = dinosaurs[0].lengthInMeters;
  
  
  for (let i = 0 ; i < dinosaurs.length; i++){
    let dino = dinosaurs[i];
   
    //let lengthinFeet = 0;

   if (dino.lengthInMeters > dynoHeight){
      //dynoName = dino.name;
      dynoHeight = dino.lengthInMeters;
      dynoName = dino.name
      lengthinFeet = dynoHeight * 3.281;
      //tallestDyno = dino; // I hope to get the tallest dyno object here through the loop
      
     //heightArray.push(dynoHeightInFt)  
    
   }  
  
  } 
  return {[dynoName]: lengthinFeet};
  

}
console.log(getTallestDinosaur(exampleDinosaurData));
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
 * 
 */
let idSearchResult = "";

function getDinosaurDescription(dinosaurs, id) {
  

  for (let i = 0 ; i < dinosaurs.length; i ++){
      let dyno = dinosaurs[i];
      //let myaArr = []; 
      //let lastElement = 0;

      if (id === dyno.dinosaurId){
        //myaArr.push(dyno.mya)
        //console.log("myaArr:", myaArr);

        //lastElement = myaArr.pop();

        idSearchResult = `${dyno.name} (${dyno.pronunciation})\n${dyno.info} It lived in the ${dyno.period} period, over ${dyno.mya[dyno.mya.length-1]} million years ago.`;
        
        //console.log("last" , lastElement);
      
        return idSearchResult;

        } else {
      idSearchResult = `A dinosaur with an ID of '${id}' cannot be found.`
      }
  } 
    return idSearchResult;
  }
  //console.log(getDinosaurDescription(exampleDinosaurData,"sW_2EWCsDkE" ));



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
  
  let dinosthatLived = [];
  let dinoNamesThatLived = [];
  
  for (let i = 0 ; i < dinosaurs.length; i ++){
      let dinoYearArr = dinosaurs[i].mya;
      let dinoID = dinosaurs[i].dinosaurId;
      let dinoName = dinosaurs[i].name;
      let startYear;
      let endYear;
      
      if (dinoYearArr.length === 1){
        startYear = dinoYearArr[0] - 1;
        endYear = dinoYearArr[0];
      } else {
        startYear = dinoYearArr[1];
        endYear = dinoYearArr[0];
      }
      if ((mya >= startYear && mya <= endYear) && key){
        
        dinosthatLived.push(dinoName);
        
      } else if (mya>= startYear & mya <= endYear){ 

        dinosthatLived.push(dinoID);
        //dinosthatLived = dynoName;
        //return dinosthatLived;
      }

  } return dinosthatLived;

} getDinosaursAliveMya(exampleDinosaurData, 65, "key")

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
