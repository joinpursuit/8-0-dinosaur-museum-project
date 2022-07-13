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
 
  for ( let oneDino of dinosaurs) {
    if(dinosaurName === oneDino.name){
      for ( let room of rooms ) {
        for(i = 0; i < room.dinosaurs.length; i++){
           if(room.dinosaurs[i] === oneDino.dinosaurId){
            console.log(room.name)
            return(room.name)
           }
        }
      }
     // after For loop - dinosaur id in room search is completed and dinosaurName is still not found, print error message 
     return "Dinosaur with name '" + dinosaurName + "' cannot be found in any rooms."
    }
  }
  //After conditional check if dinosaurName exists in array of dinosaur bjects is completed and none is found, print error message
  return "Dinosaur with name '" + dinosaurName + "' cannot be found."
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
      let cRoomNames = []
      let cRoomNameIds = []
      let roomIs = false
      let croomIs = false
      let tempRoom

      for (let room of rooms) {
        //console.log(room) // yields list of rooms
        if(room["roomId"] === id){
          //console.log(room["roomId"] )
          roomIs = true
          cRoomNameIds = room.connectsTo
        }
      } 
      if(roomIs === false)

      return  "Room with ID of 'incorrect-id' could not be found."

        for (let cNameId of cRoomNameIds){  //not filtering based on if statement
          tempRoom = 0
          for (let rm of rooms){
          if(cNameId === rm.roomId) {
           cRoomNames.push(rm.name)
           tempRoom++
          } 
        }
      }   
        if(tempRoom === 0){
          return  "Room with ID of 'incorrect-id' could not be found."
        }
        return cRoomNames
    }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};




/*  
 
     //ID of Connected Rooms - attempt 1
     } else {
     if(cNameId !== rm.roomId) 
     return  "Room with ID of 'incorrect-id' could not be found."
    
    // ID of Connected Rooms - attempt 2
    if(cNameId !== rm.roomId) {
    return  "Room with ID of 'incorrect-id' could not be found." 
    } else {
      return cRoomNames
    }



     //Initial ID of Rooms -
     if(room["roomId"] !== id)
     return  "Room with ID of 'incorrect-id' could not be found."


*/