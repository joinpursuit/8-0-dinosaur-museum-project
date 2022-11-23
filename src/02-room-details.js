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
  const obj = {};

  //assign to the "obj" with dinosaur names as keys and dinosaur Ids as values, so I can reference later.
  dinosaurs.forEach((value) => obj[value.name] = value.dinosaurId);

  //if in "obj" doesn't have a property of @dinosaurName, return an error message with @dinosaurName.
  if (!obj.hasOwnProperty(dinosaurName)) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  //loop through @rooms, array of objetcs.
  for (let room of rooms) {
    //if the array "dinosaurs" in the array of object @rooms has the @dinosaurName id, return the room name.
    if (room["dinosaurs"].includes(obj[dinosaurName])) {
      return room.name;
    }
  }
  //if there's no dinosaur in the array "dinosaurs" in the array of object @rooms, return an error message with @dinosaurName.
  if (!rooms.dinosaurs) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
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
  const obj = {};
  let result = [];
  
  //assign to the "obj" with room Ids as keys and room names as values, so I can reference later.
  rooms.forEach((value) => obj[value.roomId] = value.name);

  //if in "obj" doens't have the property of @id, return an error message with @id.
  if (!obj.hasOwnProperty(id)) {
    return `Room with ID of '${id}' could not be found.`;
  }
  //nested for loops. first, to loop through the array of objects. second, to loop through the array of strings.
  for (let room of rooms) {
    for (let connectTo of room.connectsTo) {
      //if in the "obj" doesn't have the "roomId" in the array of "connectsTo" or is undefined, return an error message.
      if (!obj.hasOwnProperty(connectTo) || connectTo === undefined) {
        return `Room with ID of 'incorrect-id' could not be found.`;
        //if @id is equal to "roomId", change the room id to the room name through "obj" and add to the end of the array "result".
      } else if (id === room.roomId) {
        result.push(obj[connectTo]);
      }
    }
  }
  return result;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
