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
//return a string
//the string will indicate if a specific dinosaur is in that room
//if the specific dinosaur can't be found the message will state that
//create a loop 
//the loop is to check if the name given matches any dinosaur from the array of dinosaur objects
//if it doesn't match return error message //> string
//create a loop
//the loop is to check if the array of room objects has the dinosaur
//return a message stating what room the dinosaur is in //> string


function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`

  for (let dinosaur of dinosaurs){
    if (dinosaur.name === dinosaurName){
      dinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
      for (let room of rooms){
        if(room.dinosaurs.includes(dinosaur.dinosaurId)){
          dinoRoom = room.name
        }
      }
    }
  }
  return dinoRoom;
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
//returns an array 
//the array will be a string or multiple strings
//create a loop
//the loop is to check if the id matches any room 
//create a loop
//the loop is to check if the room id matches any room in the connectsTo room 
//if it does add it to an array
//return that array of string/strings
//if not return error message //> string

function getConnectedRoomNamesById(rooms, id){
  
  let result = `Room with ID of 'incorrect-id' could not be found.`
  let arr = [];
  let numOfCons = 0
  
  for (room of rooms){
    
    if (id === room.roomId){
      
      let connections = room.connectsTo

      numOfCons = connections.length
      
      for (let connection of connections){
        
        for(room of rooms){
        
        
          if (room.roomId === connection){
           
            arr.push(room.name)
            result = arr;
          }
        }
      }
    }
  } if(arr.length === numOfCons && arr.length > 0){
    return result;
  }else { 
    result = `Room with ID of 'incorrect-id' could not be found.`
    return result;
  }
}
 
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
