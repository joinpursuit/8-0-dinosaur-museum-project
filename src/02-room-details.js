/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/* LOGIC: the structure of the following two functions is similar to those on page 01,
however these problems have two LOOP and ERROR sections.
Both of these start with the ACCUMULATOR variable(s), followed by a FUNCTION if possible,
Then LOOP1 checks for one piece of data, ERROR1 throws back an error if that data can not be found,
LOOP2 checks for the final piece of data, and ERROR2 throws back an error if that data can not be found */

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
  //ACCUMULATORS
  let dinoId,roomName;

  //FUNCTIONS
  const findDinoId = dinoObject => {if(dinoObject.name == dinosaurName) dinoId = dinoObject.dinosaurId}
  const findRoomName = roomObject => {if (roomObject.dinosaurs.includes(dinoId)) roomName = roomObject.name;}
  
  //LOOP1
  dinosaurs.forEach(dino => {findDinoId(dino)})

  //ERROR1
  if(!dinoId){ 
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } 

  //LOOP2
  rooms.forEach(rm => findRoomName(rm))

  //ERROR2
  if(!roomName){
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
  
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
function getConnectedRoomNamesById(rooms, id) {
  //ACCUMULATORS
  let connectsToList = [];
  let result = [];

  //FUNCTIONS
  const addToConnectsToList = roomObj => {if (roomObj.roomId == id) connectsToList = roomObj.connectsTo};
  const pushToResult = (roomObj, index) => {if (roomObj.roomId == connectsToList[index]) result.push(roomObj.name)}

  //LOOP1
  rooms.forEach(room => addToConnectsToList(room));

  //ERROR1
  if(connectsToList.length == 0){
    return `Room with ID of '${id}' could not be found.`;
  }

  //LOOP2
  for (let i = 0; i < connectsToList.length; i++){
    rooms. forEach(room => pushToResult(room, i))
    //ERROR2: if no name was pushed for the current connectsToList entry, an error is returned. (This error happens inside the loop so the correct room is put in the error message)
    if (i != result.length-1){
      return `Room with ID of '${connectsToList[i]}' could not be found.`;
    }
  }

  //RETURN
  return result;
}



module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
