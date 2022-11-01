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
  let dinosaurIds = ''
  for (let i = 0; i < dinosaurs.length; i++) {
if(dinosaurs[i].name === dinosaurName ) {//If dinosaur name === the looped dinosaur assign the dinosaurs id

  dinosaurIds = dinosaurs[i].dinosaurId
} 
  }
if(dinosaurIds === '') {// If previous conditon is not met, there will be an empty string with an error message
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
}
  
  for(let j = 0; j < rooms.length; j++){
    if(rooms[j].dinosaurs.includes(dinosaurIds)) { //If room contains dinosaur id, return the name of the room that it was in
      return rooms[j].name
    }
    
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` //If condition is not met, return error message
}
 
 //   for(let j = 0; i < dinosaurs.length; j++) {
// for(let i = 0; i < rooms.length; i++) {
//   if(rooms[i].dinosaurs.includes(dinosaurName)) {
//     console.log(rooms.name)
//     return rooms.name
//   } else if (!rooms[i].dinosaurs.includes(dinosaurName)) {
//     return `Dinosaur with name '${dinosaurName}' cannot be found.`
//   } else if (!rooms[i].dinosaurs.includes(dinosaurName)) {
//     `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
//   }   

// }
// }

  

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
      let connectedIds = []
      let correctRoomIds = []
      let foundIds = false // flag to check if the room id matches the given id
        for(let i = 0; i < rooms.length; i++) {//Loop for the room
          if(rooms[i].roomId === id){
            foundIds = true
            for(let j = 0; j < rooms[i].connectsTo.length; j++) { //Loop for the ids in connected to rooms
              connectedIds.push(rooms[i].connectsTo[j]) 
            }
             
    
            //console.log(connectedIds)       
    }
        }
        if(!foundIds) {// error message
          return `Room with ID of '${id}' could not be found.`
        }
      let connectedNames = []
      //let connectedIds = [].concat.apply([],connectedIds)
    
      for(let j = 0; j < connectedIds.length; j++) {
        
        for(let k = 0; k < rooms.length; k++) {
          if(connectedIds[j] === rooms[k].roomId) { //checks if connected ids === room id, if so push the name of the room and the ids
            connectedNames.push(rooms[k].name)
            correctRoomIds.push(connectedIds[j]) 
          } 
          
          
        }
      }
      
      let wrongIds = connectedIds.filter(id => !correctRoomIds.includes(id) )//compares the all of the ids to the correct ids. The ids remaining are the incorrect ones
      // console.log(connectedIds)
      // console.log(wrongIds)
      if(connectedIds.length !== correctRoomIds.length) {// error message
        return `Room with ID of '${wrongIds[0]}' could not be found.`
      }
      //console.log(connectedNames)
      return connectedNames
    }
    //console.log(connectedNames)
    

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
