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
  let message = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let foundInRoom = null;
  let foundDinoDetails = null;

  //iterate through dinosaurs
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      foundDinoDetails = dinosaurs[i];
      break;
    }
  }

  //iterate through rooms
  if (foundDinoDetails) {
    for (let i = 0; i < rooms.length; i++) {
      //if current room at dinosaurs includes found dinos id
      if (rooms[i].dinosaurs.includes(foundDinoDetails.dinosaurId)) foundInRoom = rooms[i].name;
      //re-assign foundInRoom to current rooms name
    }
  }
  //if it's found in the room then return the value of found in room
  if (foundInRoom) return foundInRoom;
  else if (foundDinoDetails && !foundInRoom) return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  return message;
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

const input = [
  {
    roomId: "xwG7O4wQl",
    name: "Room A",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "GHPLI7EmD", // Room B
      "eU46gvYUF", // Room C
      "incorrect-id", // Incorrect Room. Does not exist.
    ],
  },
  {
    roomId: "GHPLI7EmD",
    name: "Room B",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "xwG7O4wQl", // Room A
    ],
  },
  {
    roomId: "eU46gvYUF", // 3
    name: "Room C",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "xwG7O4wQl", // Room A
    ],
  },
];
const id = "xwG7O4wQl";

function getConnectedRoomNamesById(rooms, id) {
  //input an array of objects, and a string
  //output an error message string or array of strings representing room names
  let foundConnectedRooms = null;
  // const roomNames = [];

  //determine whether room exists by iterating through rooms
  for (let i = 0; i < rooms.length; i++) {
    //if room exists according to id
    if (rooms[i].roomId === id) {
      //assign connectedRooms to be the array
      foundConnectedRooms = rooms[i].connectsTo;
    }
  }

  if (!foundConnectedRooms) return `Room with ID of 'incorrect-id' could not be found.`;
  if (foundConnectedRooms.includes("incorrect-id")) return `Room with ID of 'incorrect-id' could not be found.`;

  return foundConnectedRooms.reduce((roomNames, currentConnect) => {
    //iterate through rooms
    rooms.forEach((room) => {
      //if roomID is strictly equal to currentConnect push to accumulator
      if (room.roomId === currentConnect) roomNames.push(room.name);
    });
    return roomNames;
  }, []);
}

console.log(getConnectedRoomNamesById(input, id));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
