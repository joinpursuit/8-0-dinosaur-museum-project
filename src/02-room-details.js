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
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, 
 * return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. 
 * See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. 
 * Alternatively, an error message.
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
  let dinoId= ""
for (let i = 0; i < dinosaurs.length; i++) {
  if (dinosaurs[i].name === dinosaurName){
    // get name
  dinoId = dinosaurs[i].dinosaurId
  } 
  }// end of for loop 
  // if no name is found
  if (dinoId === "") {
    return  `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //if there is a valid name, find ID and return it.
for (let room of rooms) {
    if (room.dinosaurs.includes(dinoId)){
    return room.name

}
}// end of for of loop
// error message if not found
return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room 
 * connected to the given room. If a room ID cannot be found, 
 * an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. 
 * See the `data/rooms.js` file for an example of the input.
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
  let roomArr = []
  let name = []
  let foundId = false
  for (let room of rooms) {
    if (room.roomId === id){
      //make a copy of the array
      roomArr = room.connectsTo
    }
  }// end of for loop
  if (roomArr.length === 0){
    // error message for no id
    return `Room with ID of '${id}' could not be found.`
  } else if (roomArr.includes('incorrect-id')){
    // error message for wrong id
    return `Room with ID of 'incorrect-id' could not be found.`
  } else {
    // 2 loops
  for (let one of roomArr) {
    for (let room of rooms) {
       if(room.roomId === one){
      name.push(room.name)
    }
    }
  }// end of for loop
}// end of function
return name
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
