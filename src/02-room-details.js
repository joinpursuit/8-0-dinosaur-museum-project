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
  // outer loop to iterate dinosaurs
  for (let dinosaur of dinosaurs){
    // condition if a name for a dinosaur is equal to the given value
    if(dinosaur.name === dinosaurName){
      // inner loop to iterate through given value for rooms
      for (let room of rooms){
        // if the dinosaur in a room has a dinosaurs id, it will return the name of that room. if not , it will return an error message notifying that the dinosaur isnt found in a room. if the dinosaur isnt found in the dinosaur object, the error message will print.
        if (room.dinosaurs.includes(dinosaur.dinosaurId)){
          return room.name
        }
      }
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    }
  }
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
  // default value assigned as an array
  let roomsName = []
  
  // outer loop will iterate through the rooms object.
  for(let room of rooms){
    
    // if a room includes the value of the id. inner loop iterates through and connectsTo array inside of rooms. The variable will be set to true if there is a connection for rooms. The second if statement is for rooms that have connection by the id room. the third if statement is for if the connection for the room is true, but the id is wrong
    if(room.roomId.includes(id)){
      for(let connection of room.connectsTo){
        let present = true
        for (let room of rooms){
          if(connection.includes(room.roomId)){
            roomsName.push(room.name)
            present = false
          }
        }
          if (present){
            return `Room with ID of '${connection}' could not be found.`
          }
        }
        return roomsName
      }
    }
    return `Room with ID of '${id}' could not be found.`
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
