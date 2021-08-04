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

//return room where dino is found
// look for dino in dinosaur objects


function getDinoIdFromName (dinosaurs, name) {
  for (let i = 0; i < dinosaurs.length; i++){
    // if we have a match between id and dinosaurId return dino name.
    if (dinosaurs[i].name === name){
      return dinosaurs[i].dinosaurId;
    }
  
  
  }
}

//let proper = getDinoIdFromName;
//const id = convert(dinosaurs, dinosaurName);
//convert (exampleDinosaurData, 'WHQcpcOj0G');
//function getDinoIdFromName(dinosaurs, name)
//get dinoId from name
//loop through the room and
//4. if any of the ids in the dinosaurs array matched the Dino id we’re looking for, return the room's name
//console.log(convert(exampleDinosaurData, ‘Compsognathus’))
//console.log(getDinoIdFromName(exampleDinosaurData, dinosaurName));

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let expectedRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`; //created so that if condition doesn't hit the condition
  let proper = getDinoIdFromName(dinosaurs, dinosaurName); //will convert dinosaurName variable to dinosaurId
  if (proper === undefined){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
//looping through rooms array 
  for (let room of rooms){
    //looping through each object key "dinosaurs";
    for (let dinoId of room.dinosaurs){
     //convert dinosaurName to dinosaurId 
    // look for a match in array of dinosaur key 
       if (dinoId === proper){ 
          expectedRoom = room.name
    } 
  }
}
    return expectedRoom;
   
}
//getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, "Allosaurus");

//if (dinoId !== proper) {
 // expectedRoom = `Dinosaur with name 'Pterodactyl' cannot be found.`;
//} 

//getRoomByDinosaurName(exampleDinosaurData);
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


    function getRoomNameById (rooms, id) {
      for (let i = 0; i < rooms.length; i++){
        //if we have a match between roomId and id return room name
        if (rooms[i].roomId === id){
          return rooms[i].name;
        }
      }
    }

//console.log(getRoomNameById(exampleRoomData, "aIA6tevTne"));


function getConnectedRoomNamesById(rooms, id) {
   let arr = [];
   let roomNames = getRoomNameById(rooms, id);
    if (roomNames === undefined){
      return `Room with ID of 'incorrect-id' could not be found.`;
    }
  
    let connectingRoomIds = []
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].roomId === id) {
            connectingRoomIds = rooms[i].connectsTo;
            break;
        }
    } 
    for (let i = 0; i < connectingRoomIds.length; i++){
        let connectingRoomId = connectingRoomIds[i]
       let connectingRoomName = getRoomNameById(rooms, connectingRoomId)
        if (connectingRoomName === undefined){
          return "Room with ID of 'incorrect-id' could not be found.";
        // print the name associated with this id
        } arr.push(connectingRoomName);
    } 
    
    // [ 'zwfsfPU5u', 'aIA6tevTne', 'dpQnu5wgaN', 'L72moIRcrX' ]
    
  return arr;
}
  
getConnectedRoomNamesById (exampleRoomData, "dpQnu5wgaN");

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
