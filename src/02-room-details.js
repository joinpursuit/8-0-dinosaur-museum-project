/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const dinosaurs = require("../data/dinosaurs");
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
// Problem: How do I convert dinosaurName to dinosaurs.dinosaurId so I can match it to rooms.dinosaurs and return a string where dino can be found
function nameToId (dinosaurs, dinosaurName) {
  let id = '';
  // loop through dinosaurs, an array of obj
  for (let i = 0; i < dinosaurs.length; i++) {
    // if dinosaurName is stricly equal to a dinosaurs.name
    if (dinosaurName === dinosaurs[i].name) {
      // reassign id to dinosaurId
      id = dinosaurs[i].dinosaurId;
    }; 
  };
  return id; // convert(dinosaurs, "Elasmosaurus") //> "GKl035EYKN"
}

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  const invokeNameToId = nameToId(dinosaurs, dinosaurName);
  
  // edge case: when I invoke the function that does not include this dinosaur in dinosaurs arr of obj
  if (invokeNameToId === '') {
    // return: "Dinosaur with name 'Pterodactyl' cannot be found."
    return `Dinosaur with name '${dinosaurName}' cannot be found.`; 
  };
  
  let roomName = '';
  // loop through rooms an array of objects
  for (let i = 0; i < rooms.length; i++) {
    // if the dinosaur id is found in rooms.dinosaurs arr
    if (rooms[i].dinosaurs.includes(invokeNameToId)) {
      // reassign roomName to room name
      roomName = rooms[i].name;  
    }; 
  };

  // edge case: if the room is an empty string 
  if (roomName === '') {
    // return `Dinosaur with name 'Tyrannosaurus' cannot be found in any rooms.`
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  };

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
// problem: How do I convert the room id to room name in rooms.connectsTo
// solution: loop through rooms to get room id  to room name
function idToName (rooms, connectsTo) {
  let roomName = [];
  // loop through rooms 
  for (let i = 0; i < rooms.length; i++) {
    // if the rooms id we are looping through is included the array of str 
    if (connectsTo.includes(rooms[i].roomId)) {
      // push the room name to roomName
      roomName.push(rooms[i].name); 
    }; 
  };
  
  return roomName;
}

function getConnectedRoomNamesById(rooms, id) {

  let arrOfRooms = [];
  
  // loop through rooms 
  for (let i = 0; i < rooms.length; i++) {
    const invokeIdToName = idToName(rooms, rooms[i].connectsTo);

    // if the rooms id we are looping through is strictly equal to the id 
    if (rooms[i].roomId === id) {
      // invoke the helper function to convert room id to room name
      arrOfRooms = invokeIdToName
    };
    // if the length of the room Id array is not strictly equal to the length of the room names array returned by invoking the function
    if (rooms[i].connectsTo.length !== invokeIdToName.length) {
      // return an error message
      return "Room with ID of 'incorrect-id' could not be found.";
    };
  };

  // if arrOfRooms does not get reassigned 
  if (arrOfRooms.length === 0) {
    // return an error message
    return "Room with ID of 'incorrect-id' could not be found.";
  };

  return arrOfRooms;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
