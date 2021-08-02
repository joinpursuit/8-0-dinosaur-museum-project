/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
`*/
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
  let dinoId = "";
  //Declare result variable to accumulate to
  let result = "";
  //Declare loop to iterate through dinosaurs array,
  for (let dino of dinosaurs){ 
    //in loop, check for dinosaur name
    if (dino.name === dinosaurName){
      //if found, save that dino's Id in a variable for later
      dinoId = dino.dinosaurId;
    }
  }
  // if we didn't find the dinosaur in our first loop
  if (!dinoId){
    //return an error message
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //after that loop, declare another loop to go through the rooms
  for (let room of rooms){
    //check if the dinosaurs value includes our id
    if (room.dinosaurs.includes(dinoId)){
      //if it does, make our result the roomName
       result = room.name;
    }
  }
  //after loop, if we didn't find our dinosaur, return an error, else return our result``
  return !result ? `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` : result
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
  //connectedTo works viceversa, so if we find our givenid in the "connectedTo" array, we know THAT ROOM is also on our target room's "connectedTo" list.
  //Overall plan: loop through the rooms, see if their connectedTo array includes our given Id. if it does, push it's name into an empty array. After looping, return array.
  //Declare variable to accumulate to, make it an empty array
  const newArr = [];
  //Declare loop to iterate through rooms
  for (const room of rooms){
    //declare variable to represent the validity of the connected rooms
    const isValid = validityCheck(rooms, room.connectsTo);
    //in loop, check if it's connected room is valid
    if (isValid !== true){
      //if it isn't, return error msg
      return isValid;
      //if not
    } else if (room.connectsTo.includes(id)){
      //if it is, push room name to empty array
      newArr.push(room.name)
    }
  }
  //check if the key wasn't found in our loop
  if (!newArr[0]){
    //if it wasn't, it's invalid, return error
    return `Room with ID of '${id}' could not be found.`
  }
  //after loop, return array
  return newArr;
}

function validityCheck(listOfRooms, givenIds){ //created this helper function to help check if our list of room IDs are valid.
  //Declare loop to iterate through list of Ids
  for (const currentId of givenIds){
    //Declare variable to show if Id was valid
    let idCheck = false;
    //Declare loop to iterate through list of rooms
    for (const currentRoom of listOfRooms){
      //in loop check if the currentId = givenId
      if (currentRoom.roomId === currentId){
        //if it is, change idCheck to true
        idCheck = true;
      }
    }
    //check if we didn't find that Id in the listOfRooms
    if (idCheck === false){
      //if we didn't find it, give error a value
      return `Room with ID of '${currentId}' could not be found.`
    }
  }
  //after loop, return result
  return true;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
