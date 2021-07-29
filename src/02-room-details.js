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
  //Overall Plan: loop through the dinos to find corresponding id, if it's found, save it, if not error. loop through rooms and see if we can find the saved id, if not then error
  //Declare variable to store our id
  let dinoId = "Id not found";
  //Declare loop to iterate through dinosaurs array,
  for (let dino of dinosaurs){ 
    //in loop, check for dinosaur name
    if (dino.name === dinosaurName){
      //if found, copy that dinosaur's id to dinoID
      dinoId = dino.dinosaurId;
    }
  }
  // if we didn't find the dinosaur in our first loop
  if (dinoId === "Id not found"){
    //return error message
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //after that loop, declare another loop to go through the rooms
  for (let room of rooms){
    //check if the dinosaurs value includes our id
    if (room.dinosaurs.includes(dinoId)){
      //if it does, return roomName
      return room.name;
    }
  }
  //after loop, if we didn't find any rooms w/ our dino, return error msg
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
  //I know there were some tools to make this easier, made my own functions for the challenge
  //Declare variable to iterate to, empty array
  const result = [];
  //collect all the room ids for our validity check later
  const roomIds = roomIdCollector(rooms); //created roomIdCollector function on line 107
  //Declare loop to interate through rooms
  for (let currentRoom of rooms){
    //check if currentRoom id is our target id
    if (currentRoom.roomId === id){
      //if it is, loop through collectTo for our check
      for (let conId of currentRoom.connectsTo){
        //check if the connectedRoomId ISNT on our list of room ids
        if (!roomIds.includes(conId)){
          //if it isn't, return error
          return `Room with ID of '${conId}' could not be found.`
        } else {
          result.push(idConverter(rooms ,conId)) //created idConverter on line 119
        }
      }
      //after the check loop, if we made it through, return all connect rooms
      return result;
    }
  }
  //outside of our first loop if we didn't find a match, return error
  return `Room with ID of '${id}' could not be found.`
}

function roomIdCollector(rooms){
  //declare variable to accumulate to, make it an empty array
  const result = [];
  //declare a loop to iterate through the rooms
  for (room of rooms){
    //in loop, push room id to result
    result.push(room.roomId)
  }
  //return array
  return result;
}

function idConverter(rooms, id){
  //Declare loop to iterate through our rooms
  for (const currentRoom of rooms){
    //in loop, check if our id = currentRoom's id
    if (id === currentRoom.roomId)
    //if it is, return name of currentRoom
    return currentRoom.name;
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
