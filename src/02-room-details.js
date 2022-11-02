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
  //set variable to ERROR message if dinosuar name can't be found, will be changed over time
  let roomName = `Dinosaur with name '${dinosaurName}' cannot be found.`
  //set for of loop to go through loop of dinosaur in elements of dinosaurs
for (let dinosaur of dinosaurs) {
  //go through each dinosaur name  strictly equal to parameter dinosaur name to see if dinosaur name exists
  if (dinosaur.name === dinosaurName) {
    //if dinosaur name does not exist in any of the rooms, change roomName variable to ERROR message
    roomName = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    //make another for of loop to go through each room
for (let room of rooms) {
  //if the room is listed under the dinosaur, check with its dinosaur Id is included with the room
  if (room.dinosaurs.includes(dinosaur.dinosaurId)) {
    //bring back variable roomName to show the given room dinosaur was found
    roomName = room.name;
      }
    }
  }
}//roomName variable results in name of room, the dinosaur was found
return roomName
}



//return `if dino exists return ${rooms.name}`
 // dinosaurs are code ids in room folder

// return error messages `Dinosaur with name ${dinosaurName} cannot be found.`
// `Dinosaur with name ${dinosaurName} cannot be found in any rooms.`

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
  //set 2 arrays, one with connected room and other with Dinosaur Name array that
let connectedRoom = []
let dinoNamesArr = []
//create for loop to go through each of the rooms
for (let x = 0; x < rooms.length; x++) {
  //set variable of room to go through all the rooms
  let room = rooms[x]
  if (room.roomId === id) { //if statement to have roomId strictly equal to Id parameter to see if room actually is within the array
    connectedRoom.push(...room.connectsTo)
    //have the connectedRoom array push all rooms it is connected to within it. Break the loop when it is found
    for (let id of connectedRoom) {//go through the ids of each connected room with for of loop
      for (let room of rooms) { //then go through each room of all rooms
        if (id === room.roomId) { //if there is an id existent, strictly equal it to the roomId
          dinoNamesArr.push(room.name)
          //then with the dinoNames array, push all rooms into the dinoNamesArray
        }
      }
    }
  }
}//put ERROR messages, go through the dinosaur name Array, and there is no connected Room to any, return error message
if (dinoNamesArr.length !== connectedRoom.length) { 
  return `Room with ID of 'incorrect-id' could not be found.`
} //if go through dinosaur name array and there is no ID, return error message
if (dinoNamesArr.length === 0) {
  return `Room with ID of '${id}' could not be found.`
}
return dinoNamesArr//return all names of rooms connected to room by dinosaur ID
}
// return [`stringofroom`,`stringofroom`,]
//return if no room === error message
//if first room found is not correct == `Room with ID of '${id}' could not be found.`
//if NO ROOM = `Room with ID of 'incorrect-id' could not be found.`


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
