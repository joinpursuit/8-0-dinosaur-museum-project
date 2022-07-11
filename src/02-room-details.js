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
/**

 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  //outer loop to iterate dinosaurs
for(let dinosaur of dinosaurs){

  //condition if a name for a dinosaur is equal to given value
  if(dinosaur.name === dinosaurName){

    //inner loop iterating though given value for rooms 
    for(let room of rooms){

      //if the dinosaur in a room has the dinosaurs id 
      if(room.dinosaurs.includes(dinosaur.dinosaurId)){
        return room.name //returning the name of that room 
      }
    }
    //error message if the dinosaur isn't found in a room
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
} //error message if the dinosaur isn't found in dinosaur object
 return `Dinosaur with name '${dinosaurName}' cannot be found.`
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

let arrOfRooms = []


for(let room of rooms){
  
  //if a room includes the given value of id.
  if(room.roomId.includes(id)){

    //inner loop iterate through connectsTo array inside of rooms.
for(let connection of room.connectsTo){

  //a varible set to true if there is a connection for rooms.
  let present = true;
  for(let room of rooms){

    //if statment for rooms that have connection by room id.
    if(connection.includes(room.roomId)){
      arrOfRooms.push(room.name);
      present = false;
    }
}// if statment (if the connection is true foor the room. With an incorrect id)
  if(present){
    return `Room with ID of '${connection}' could not be found.`
  }
}
return arrOfRooms
  }
}
return `Room with ID of '${id}' could not be found.`
}
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
