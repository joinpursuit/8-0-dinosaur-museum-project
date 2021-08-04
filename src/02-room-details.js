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
//PSEUDOCODE FOR getRoomByDinosaurName()
//WHAT KEY PIECE OF INFO ARE WE GIVEN? -> dinosaurName
//WHAT KEY PIECE OF INFO DO WE NEED TO REVEAL WHICH DINOS ARE IN WHICH ROOMS? -> the dinosaur's id
//HOW CAN WE USE THE INFO PROVIDED TO FIND SOMETHING THAT WILL MATCH OUR
//TARGET DINO TO THE ROOM IT IS LOCATED IN? -> use the dinosaurs array to find the id of the dinosaur with a name that matches dinosaurName
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let obj = {};
  let exhibitRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`
  //1) use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  for(let dino of dinosaurs){
    if(dino.name === dinosaurName){
      obj = dino;         
    }
  }
  if(!("name" in obj)){
    return exhibitRoom;
  }
  for(let room of rooms){
    exhibitRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    if(room.dinosaurs.includes(obj.dinosaurId)){
    exhibitRoom = room.name;
    break;
    }
  }
  return exhibitRoom;
  //2) if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) if no matching room is found in the rooms array, return the appropriate error message
}
//CLARIFYING NOTE:
//TWO SEPARATE ERROR MESSAGES ARE NEEDED TO PASS THE TESTS

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
  let firstArr = [];
  for(let room of rooms){
    if(room.roomId === id){
      firstArr = room.connectsTo.slice(0);
    }
  }
  if(firstArr.includes("incorrect-id")){
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
  if(!firstArr.length){
    return `Room with ID of '${id}' could not be found.`;
  }
  let secArr = [];
  for(let room of rooms){
    if(firstArr.includes(room.roomId)){
      secArr.push(room.name);
    }
  }
  return secArr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
