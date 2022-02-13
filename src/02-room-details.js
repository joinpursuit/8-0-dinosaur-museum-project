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
  let givenDinosaurRoom = []

// I need to loop through all of the rooms, check to see if they have a dinosaur
  for (let i = 0; i < dinosaurs.length; i++) { // for the length of the dinosaurs array, go up by 1
    if (dinosaurs[i].name === dinosaurName) {//if the dinosaur listed from that looped index's name is equal to the given dinosaurs name
      for (let d = 0; d < rooms.length; d++) {//...then we loop through the length of the rooms array
        if (rooms[d].dinosaurs.includes(dinosaurs[i].dinosaurId)) {//if the indexed room's dinosaur includes a dinosaur listed from our dinosaurs array
        return rooms[d].name //we are to return the room with the name listed
        }
      } return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` // should the dinosaur given not exist within any of the existing rooms this message is returned
  } 
  

 }  return `Dinosaur with name '${dinosaurName}' cannot be found.` //should the given dinosaur not be in the database whatsoever, this message is returned
  


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

    /**getConnectedRoomNamesById()
    ✕ should return the names of all rooms connected to the given room by ID (1 ms)
    ✕ should work for other rooms
    ✕ if initial room ID is incorrect, should return an error message
    ✕ if connected room ID is incorrect, should return an error message**/
function getConnectedRoomNamesById(rooms, id) {
  let connectedRoom = []; //creating a blank array with which to return our room connection
  for (let room of rooms) { //establishing a loop to go through each room of the rooms object
    if (room.roomId.includes(id)) {//if one of the iterated rooms includes the given ID is true
      for (let next of room.connectsTo) {//we then loop through the iterated room to match the ID given in the connectsTo key:value pair
        let found = true //creating a variable for if there is a connection
        for (let room of rooms) { // looping through each room of the rooms object
          if (next.includes(room.roomId)) {//if the room thats next to the given room's ID matches the listed room ID of the object
            connectedRoom.push(room.name) //push that room name into our array
            found = false//creating a variable should the connected room not be established
          }
        }
        if (found) { //if found is true from our for loop, this return statement will log
          return `Room with ID of '${next}' could not be found.`
        }
      }
      return connectedRoom; //should there be a connected room, the name will return from this line
    }
  }
  return `Room with ID of '${id}' could not be found.` // if the given ID does not exist at all
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
