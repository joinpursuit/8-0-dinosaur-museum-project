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
  
  let dinosthatLived = []; // Im declaring an empty array within local scope of this funtion. This will be my return value.
  
  for (let i = 0 ; i < dinosaurs.length; i ++){
      let dinoYearArr = dinosaurs[i].mya; // thie array will include looped through mya values.  using this variable to access it easier. 
      let dinoID = dinosaurs[i].dinosaurId; //  all the values for dinosaurs.dinosaurID looped through the dinosaurs array. These ID values will be pushed into Array if alive within given years.  
      
      let startYear; // we had to differentiate between the two values given in the dinoYearArr = dinosaurs[i].mya. this will give us a range to match the mya parameter.
      let endYear; // this was the greater of the two values as stated above.  we had a 1 year difference to account for. 
      
      if (dinoYearArr.length === 1){ // If the array length = 1 that means there is only one index position [0] for the assigned value of dinoYearArr. 
        //`dynoYearArr[0]`. 
        startYear = dinoYearArr[0] - 1; // Because we had to account for the year difference as stated in the instructions, - 1 was assigned to dynoYearArr[0] which was then set = startYear.
        endYear = dinoYearArr[0]; // So the endYear is = to the single value of the array given, dinoYear[0]. We determined there was only 1 index position within the conditional within () of the if statement above. 
      } else {
        startYear = dinoYearArr[1]; // here we have the lesser number set as the start year
        endYear = dinoYearArr[0]; // here we have the greater number set as the end year. we know the order of the numbers given by looking at the data test file.
      }
      if ((mya >= startYear && mya <= endYear) && key){ // here I want to account for all variables.  if key is involved, I push in names.
        let dinoKey = dinosaurs[i];
        dinosthatLived.push(dinoKey[key]); // I slipped up here .. Initially got it to pass using only the name key .. I made it dynamic by setting dynoKey. Now I can push into  any key wihin the object as long as it matches. 
        
      } else if (mya>= startYear & mya <= endYear){  // here I account for only two arguements passed.  in this case I push dinoID since thats the only value needed.

        dinosthatLived.push(dinoID); // pushing in the dinoID since key is not given. 
       
      }

  } return dinosthatLived;

} console.log(getDinosaursAliveMya(exampleDinosaurData, 65, "diet"));

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
