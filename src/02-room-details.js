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
 * 
 * Input: obj array, obj array, string
 * Output: string
 * Checks for if dino exists
 *  >Checks for rooms including the dino
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let result = ''
  let dinoId = ''
  for (let dino of dinosaurs){
    if (dino.name === dinosaurName){
      dinoId = dino.dinosaurId
      break;
    }
  }
  if (!dinoId){return `Dinosaur with name '${dinosaurName}' cannot be found.`}
  for (let room of rooms){
    if (room.dinosaurs.includes(dinoId)){
      result = room.name
    }
  }
  if (!result) {return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`}
  return result
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
 
Input: array of room objects, id string
Output: either an array of the adjacent room names, or an error message


 */
// //Version 1
// function getConnectedRoomNamesById(rooms, id) {
//   let result = []
//   for (let room of rooms){
//     if (room.roomId === id){//check for matching id of base room
//       for (let adjacent of room.connectsTo){//loop through the connected room id's
//         let flag = true //a way to check if the adjacent room hits in the lower loop
//         for (let rm of rooms){//checking back to main array for the id's
//           if (adjacent === rm.roomId){//checks if id exists, if not flag goes through
//             result.push(rm.name)
//             flag = false
//           }
//         }
//         if (flag){return `Room with ID of '${adjacent}' could not be found.`}
//       }
//       return result
//     }
//   }
//   return `Room with ID of '${id}' could not be found.`
// }


function getRoom(rooms, id){//Helper function for room search by id
  for (let room of rooms){
    if (room.roomId === id){
      return room
    }
  }
  return false
}
// Version 2 with an id reference helper
function getConnectedRoomNamesById(rooms, id) {
  let result = []
  let startingRoom = getRoom(rooms, id)
  if (startingRoom){
    for (let adjacent of startingRoom.connectsTo){//loop through the connected room id's
      if (getRoom(rooms, adjacent)){
        result.push(getRoom(rooms, adjacent).name)
      }else{
        return `Room with ID of '${adjacent}' could not be found.`;
      }
    }
    return result
  }
  return `Room with ID of '${id}' could not be found.`
}





module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
