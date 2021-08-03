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
  // 1. Default value and output 
  let lookUp = "Dinosaur with name '" + dinosaurName + "' cannot be found."
  // 2. Define the loop & Accumulate
  for (let dinosaur of dinosaurs) {
    if (dinosaurName === dinosaur.name) {
      for (let room of rooms) {
        if (room.dinosaurs.includes(dinosaur.dinosaurId)) {
          // the trick here is to return as soon as it's found. 
          // Otherwise it'll continue looping
          return lookUp = room.name 
        } else {
          lookUp = "Dinosaur with name '" + dinosaurName + "' cannot be found in any rooms."
        }
      }
    } 
  }
  return lookUp
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
   //1. Default value and output
   let nameArray = []
   let idArray = []
   let error = "Room with ID of 'incorrect-id' could not be found."
   
   //2. Define the Loop & Accumulate
   //Find the room and then the rooms connected to it. Break the loop once found. Otherwise, return error
   for (let i = 0; i < rooms.length; i++ ) {
     let room = rooms[i]
     if (room.roomId === id) {
       idArray.push(...room.connectsTo)
       break;
     } else {
       if (room.roomId !== id) {
         error
       }
     }
   }
   
   // Check if the room has no connected rooms 
   if (!idArray.length) {
     return error 
   } 

   //2. Define the loop and accumulate
   //Find the names of the rooms connected to the room by searching id's. Break the loop once it's complete
   if (idArray.length) {
     for (let i = 0; i < rooms.length; i++ ) {
       let room = rooms[i]
       if (nameArray.length < idArray.length) {
         if (idArray.includes(room.roomId)) {
           nameArray.push(room.name)
         }
       }
       if (nameArray.length === idArray.length) {
         break;
       }
     } 
   } 
   
   // Check if some connected rooms are not found to have names
   if (nameArray.length < idArray.length) {
     return error
   }
   
   return nameArray 
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
