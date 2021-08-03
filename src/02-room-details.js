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
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list 
 * OR cannot be found in any room, return an error message that says so.
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
 * //WHAT KEY PIECE OF INFO ARE WE GIVEN?
 * WHAT KEY PIECE OF INFODO WE NEED TO REVEAL WHICH DINOS ARE IN WHICH ROOMS ->
 * HOW CAN WE 
 * 
 * 
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 * 
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let message = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  let dinoToFind = {};// empty object
  
  for (let dino of dinosaurs){ //loop thr
    if(dino.name === dinosaurName){
      dinoToFind = dino;
    }
  }

  if(!dinoToFind.name){ 
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  for (let singleRoom of rooms) {
    if(singleRoom.dinosaurs.includes(dinoToFind.dinosaurId)) {
      return singleRoom.name;
    }
  }
  
  return message;
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
  let newObj = {};
  let roomIdArray;
  let answer= [];

  for(let room of rooms){
   if(room.roomId === id){
      //return an array of strings where each string is the name of a room connected to a given room
        roomIdArray = room.connectsTo;
    } 
    newObj[room.roomId] = room.name; //
  } 
    if (!newObj[id]) {
    return `Room with ID of '${id}' could not be found.`
  } 

  for(let i=0; i<roomIdArray.length; i++){
    for(let j=0; j < rooms.length; j++){
      //if we find id match then push room name into ans
      if(rooms[j].roomId === roomIdArray[i]){ //invalid ID OUT
      answer.push(rooms[j].name);
      }
    }
 console.log('roomIdArray', roomIdArray);
 console.log('answer', answer);
  }
  
    if(answer.length !== roomIdArray.length) {
      return `Room with ID of 'incorrect-id' could not be found.`
    }
  
  
  return answer;
}
getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra");

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
