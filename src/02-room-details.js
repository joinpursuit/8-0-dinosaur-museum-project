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
  let roomName = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  let dinosaur = `Dinosaur with name '${dinosaurName}' cannot be found.`;

  for(let dino of dinosaurs){ 
    if(dino.name.includes(dinosaurName)){ // checks if a valid dinosaur name has been given, and then finds its ID if valid
      dinosaur = dino.dinosaurId;
    }
  }
  
if(dinosaur === `Dinosaur with name '${dinosaurName}' cannot be found.`){ //if dinosaur name is invalid, then an error message is returned
  return dinosaur;
}

  for(let room of rooms){
    if(room.dinosaurs.includes(dinosaur)){ // Finds room that includes the dinosaur ID, or returns error message 
      roomName = room.name;
    }

  }

  return roomName;

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
  const errorTest = []; // tests if connected rooms has an invalid ID
  let connectedRooms; // array of connnected rooms
  
  for(let room of rooms){
    if(room.roomId.includes(id)){ // checks if given room ID is valid. If so, stores all connected rooms 
      connectedRooms = room.connectsTo; 
      }
    }
  
  if(!connectedRooms){ // if nothing is stored in connected rooms, then ID is invalid
    return `Room with ID of '${id}' could not be found.`
  }

  // Changes room ID with the correct room name for reach connected room
  for(let i = 0; i < connectedRooms.length; i++){
    for(let room of rooms){
      if(room.roomId.includes(connectedRooms[i])){ // searches room data for the room name of each room ID
        connectedRooms[i] = room.name; 
        errorTest[i] = true;
        break;
        }
        else{
          errorTest[i] = false;
        }
      }
    
  }

  if(errorTest.includes(false)){ // Error message will return if there is a false value in the error test array. Indicating the invalid ID index and the index of the false value respectfully
    return `Room with ID of '${connectedRooms[errorTest.indexOf(false)]}' could not be found.`
  }


  return connectedRooms;

}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
