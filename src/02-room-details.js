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

// Returning name of room where the given name of dinosaur can be found.
// if dino exist or can't be found in dino return error message
// if dino can't be foudn in any room return error message
// return string with name of the room where dino an be found. If can't be found error message.
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`
  let dinoIdNumber;
   
  for(let dino of dinosaurs){
    if(dino.name === dinosaurName){
     dinoIdNumber = dino.dinosaurId;
    }
   
  }
  //After the loop completes lets use an if statement to see if we can find a matching dino id number
    //if you did not find the matching id number return dinoMessage
    if(!dinoIdNumber){
     return dinoMessage;
   }
   //After you find the matching dino Id loop through rooms array to look for that dino id
 //if room.dinosaurs includes dino id number we can return room.name
  for(let room of rooms){
    if(room.dinosaurs.includes(dinoIdNumber)){
     return room.name;
    }
   
   }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
 }
 getRoomByDinosaurName(exampleRoomData)
  // for(let i = 0; i < dinosaurs.length;i++){
  //   allDinos = dinosaurs[i];
  //   allNames = allDinos.name;
  //   dinoIds = allDinos.dinosaurId;

  // }


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. 
 * If a room ID cannot be found, an error message is returned.
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

  //1) use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  //2) if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) if no matching room is found in the rooms array, return the appropriate error message
// }
//CLARIFYING NOTE:
//TWO SEPARATE ERROR MESSAGES ARE NEEDED TO PASS THE TESTS
function getConnectedRoomNamesById(rooms, id) {
 let roomNamesAndIds = {};
 for(let room of rooms){
   roomNamesAndIds[room.roomId] =room.name;
 }
 if(!roomNamesAndIds[id]){
    return `Room with ID of '${id}' could not be found.`;
 }
 let adjRoomNames = [];
 for(let room of rooms){
   if(room.roomId === id){
     for(let adjRoomId of room.connectsTo){
       let adjRoomName = roomNamesAndIds[adjRoomId];
       if(adjRoomName){
         adjRoomNames.push(adjRoomName);
       }else{
         return `Room with ID of '${adjRoomId}' could not be found.`;
       }
     }
   }
 }
 return adjRoomNames;

}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
