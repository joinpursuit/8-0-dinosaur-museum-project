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
  let dinoName = ""
  let dinoRoom = ""
  
  for(let i = 0; i < dinosaurs.length; i++){
    if((dinosaurName === dinosaurs[i].name)){
      dinoName = dinosaurs[i].dinosaurId
    }

    for(let d = 0; d < rooms.length; d++){
      if(rooms[d].dinosaurs.includes(dinoName)){
        dinoRoom = rooms[d].name
      }
    }
  }
   if(!dinoName){ 
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
   } else if(!dinoRoom){
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
   }else{
    return dinoRoom
   }

  
  }
 

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings,
 *  where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
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
let idArray = []
let returnNames = []
  for(let room of rooms){
      idArray.push(room.roomId)
  }
for(let i =0; i < idArray.length; i++){
  if(idArray[i] === id){
   let room = rooms[i]
   let connectedRooms = room.connectsTo
    for(let connectedRoom of connectedRooms){
      let roomFound = false;
      for(let room1 of rooms){
        if(room1.roomId === connectedRoom){
          roomFound = true;
          returnNames.push(room1.name)
        } 
      }
      if(!roomFound){
        return `Room with ID of 'incorrect-id' could not be found.`
      }
    }
    return returnNames
    } 
  }
  return `Room with ID of '${id}' could not be found.`
}

//   let emptyObj = {}

//   for(let room of rooms){
//     emptyObj[room.roomId] = room.name
//   } 
//   if (!emptyObj[id]){
//     return `Room with ID of '${id}' could not be found.`;
//   } 
//   let arrayNames = []
// let namesSearch = rooms.find()

// for(let room of rooms) {
//   if (roomId.includes(id))





module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
