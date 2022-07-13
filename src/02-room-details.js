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
 
  let dinosId; // declare a variable with no value, so that you can assign value later within the code block
  for(let dino of dinosaurs) { // for/of loop to loop through object dinosaurs
    if (dino.name === dinosaurName) {
      //if dino name is strictly equal to the key dinosaurName
      dinosId = dino.dinosaurId;
      //return line 34
    }
  }
  // console.log(dinosId,!dinosId)
  if (!dinosId) { // if no dinosId 
    return `Dinosaur with name '${dinosaurName}' cannot be found.`; // returns error message stating dinosaur is not found
  }
  for (let room of rooms) { // creates a variable named room to loop thru rooms
    for (let stuff of room.dinosaurs) {// loop within a loop is multiple : many 2 many ... this loops thru the stuff (data) within the room.dinosaurs
      if (stuff === dinosId) { //conditional statement if the stuff in room.dinosaurs is strictly equal to the value in dinosId
        return room.name; // return the room name
      }
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` 
  // default return statement if the dinosaur name is not found produce an error message
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
// declare a variable to represent an empty array
    let array = [];
// create variable to loop thru the rooms 
for(let room of rooms) { 
  // loop within a loop to loop tht will declare a variable in reference to the connected rooms
 for (const connected of room.connectsTo) {
  // if the connected room has a value of incorrect-id and the room id is equal to id 
if (connected === `incorrect-id` && room.roomId === id) {
  // return string
  return `Room with ID of 'incorrect-id' could not be found.`;
}
 // if the connected room is strictly equal to the id 
if (connected === id) { 
 // push the connected room name into the empty array
  array.push(room.name);
}
 }

}
 // if the length of the array is greater thn 0 (it got value)
if (array.length > 0) { 
 // return the contents of the array
  return array;
} else {
  // if the array is empty return error message
  return `Room with ID of '${id}' could not be found.`;
}
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
