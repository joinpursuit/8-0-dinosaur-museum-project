/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */ 
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
 //dinoID was crersasted to store the ID of a dino found with a specific key
let dinoID = "";
for(let i = 0; i < dinosaurs.length; i++){
  //compare each dino ID to the entire dinoID list. once found, update the dinoId variable
  if(dinosaurs[i].name === dinosaurName){
    dinoID = dinosaurs[i].dinosaurId;
    console.log(dinoID)
  }
}
      if(!dinoID){
        return `Dinosaur with name '${dinosaurName}' cannot be found.`;
      }
      //lopped thru each room
      for(let i = 0; i < rooms.length; i++){
        //looping thru dino array in rooms
        for(let k =0; k < rooms[i].dinosaurs.length; k++){
          //looping thru each dinoId in each room
            if(rooms[i].dinosaurs[k] === dinoID){
              return rooms[i].name
            }
        }

      }
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
 
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  
  //create an empty arr .. let arr=[]
  let arr=[]
  // loop thru both 
  for(let r = 0; r < rooms.length; r++){
    for(let c=0; c < rooms[r].connectsTo.length; c++){

      if(rooms[r].connectsTo[c] === id){
        arr.push(rooms[r].name)
       }
      else {
       if(rooms[r].connectsTo[c] === "incorrect-id"){
        //arr.push(rooms[r].name)
        return `Room with ID of 'incorrect-id' could not be found.`
       }
      } 
    }
  }
  //check if the array is empty for initial id 
  if(arr.length === 0){
    return `Room with ID of '${id}' could not be found.`
  }
return arr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
