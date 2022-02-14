/*
  Do not change the lines below. If you'd like to run code from this file, you may use the 
  `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. 
  This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. 
  You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
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
  let id = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurName === dinosaurs[i].name){
      id = dinosaurs[i].dinosaurId; 
    } 
  }
  for(let j = 0; j < rooms.length; j++){
    for(let k = 0; k < rooms[j].dinosaurs.length; k++){
    if(id === rooms[j].dinosaurs[k]){
      id = rooms[j].name;
    } 
  }
} 
return id;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. 
 * If a room ID cannot be found, an error message is returned.
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
  let connnectedRooms = `Room with ID of '${id}' could not be found.`;
  let roomIdToName = {};
  for (let room of rooms){
    if (id === room.roomId){
      connnectedRooms = room.connectsTo;
    } 
    roomIdToName[room.roomId] = room.name;
  }
  if (typeof connnectedRooms === 'string'){
    return connnectedRooms;
  }
  let roomNamesArray = [];
  for (let connectedRoom of connnectedRooms){
    if(roomIdToName[connectedRoom]){
      roomNamesArray.push(roomIdToName[connectedRoom])
    } else {
      return `Room with ID of '${connectedRoom}' could not be found.`
    }
  }
  return roomNamesArray;
}



// create an empty array of room names that is connected to?? 
// iterate thru rooms and figure out if theres a room that matches the id. 
// if they match, we want the rooms connectsTo. if not, it returns an error message after no 
//rooms are found after the iteration is complete. 
// after getting connectsTo, we want to iterate thru that array to get each individual roomid. 
// if that id in connectedTo matches the id of a room, reassign the room name into the array. 
// returns an error essage if no id is found. 



module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
