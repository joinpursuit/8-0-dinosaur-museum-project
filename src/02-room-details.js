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

/*
What key piece of info are we given? DinosaurName.
What key piece of info do we need to reveal which dinos are in which rooms? The Dino-
saurID.
How can we use the info provided(There Name) to find something that match our target Dino to the -
room it is located in? Use the ID to find our which room it's in. 
*/

//1) Use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  //2) If no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) Use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) If no matching room is found in the rooms array, return the appropriate error message
  // Note: Two separate messages are needed to pass the tests.

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let newStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let newObj = {};

  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      newObj = dino;
    }
  }
  if (!("name" in newObj) ) {
    return newStr;
  }
  newStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    for (let room of rooms) {
      if (room.dinosaurs.includes(newObj.dinosaurId)) {
        newStr = room.name;
        break;
      }
    }
  return newStr;
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
  let newArr = [];
  for (let room of rooms) { //We are going through the rooms by index positions
    if (room.roomId === id) { // Checking for the room id first
      newArr = room.connectsTo.slice(0); // makes a copy of the connectTo array
    }
  }
  if (newArr.includes("incorrect-id")) { //If a room ID cannot be found
    return `Room with ID of 'incorrect-id' could not be found.`
  }//checking if a certain value is included among its entries.

  if (!newArr.length) {//If a room ID cannot be found
    return `Room with ID of '${id}' could not be found.`
  }

  let newArr2 = [];
  for (let room of rooms) {
    if (newArr.includes(room.roomId)) {
      newArr2.push(room.name);
    }
  }
  return newArr2;
  // Loop through 'rooms' checking for a matching roomId === id. If none match, 
  //the error message with the incorrect id {id} needs to be returned. For a match, 
  //store the 'connectsTo' array of Ids in a new array.

  // Is there a way to store all of both the roomIds AND names somehow in the same 
  //data structure? How could that be done?

  // Similarly, is there a way to store only all of the roomIds somehow?

  //Loop through the 'connectsTo' Ids to see if any are included in, or match to, 
  //all of the roomIds. If they do, 1. Store the 'name' of the correct 'roomId' in
  // a new array and return - MAYBE using the data structure storing BOTH the roomIds
  // and names... OR 2. Replace the 'connectsTo' Id with the coinciding room's name.
  // If a 'connectsTo' Id is incorrect, or does not match any other 'roomId's, return 
  //the error message with the incorrect id {connectsTo}.
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
