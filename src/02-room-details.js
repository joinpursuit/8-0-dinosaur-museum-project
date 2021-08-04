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
 *  //> "Dinosaur with name 'Pterodactyl' cannot befound."
 */

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let message = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let dinoBy = ""
  //ITERATE THRU ARRAY OF DINOSAURS TO FIND DINOSAUR BY NAME
  for (let i = 0; i < dinosaurs.length; i++) {
    //IF DINOSAURS.NAME IS EQUAL TO GIVEN DINOSAUR NAME
    if(dinosaurs[i].name === dinosaurName) {
      //CREATED A VARIABLE TO HOLD DINOSAURID
       dinoBy = dinosaurs[i].dinosaurId
      //IS DINOSAURID FROM DINOSAUR ARRAY IN ROOMS ARRAY????
    }
  }  
  //IF DINOSAURID IS EQUAL TO AN EMPTY STRING, RETURN MESSAGE ABOVE
  if (dinoBy === "") {
    return message
  }
  //LOOPING THRU ROOMS ARRAY
 for (let k = 0; k < rooms.length; k++) {
   //LOOPING THRU NESTED DINOSAURS ARRAY
 for (let t = 0; t < rooms[k].dinosaurs.length; t++) {
   //IF DINOSAURID EQUAL TO NAME IN DINOSAURS ARRAY, RETURN NAME OF ROOM 
   if (dinoBy === rooms[k].dinosaurs[t]) {
     return rooms[k].name
   } 
  }
 }//IF DINOSAUR NAME IS CORRECT BUT NOT IN ANY ROOM, RETURN ERROR MESSAGE
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
  //Find out if ID given does exist, if it doesn't exist, return error message
  //If ID is not in any room, return error message
  //If given ID exists return name of room 
  //Loop thru rooms array then connectsTo array
  //Return
  //Error message: `Room with ID of 'incorrect-id' could not be found.`
  
  //Create default variable> [];
  let roomID = [];
  let allrooms = [];
//Loops thru rooms array searching for id given
  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i]         

    //if rooms.roomId equals given ID
    if(room.roomId === id) { 
      
      //save that roomId in rooms array with ids in connectsTo array into empty array
      roomID = room.connectsTo//an array of ids from .connectsTo
    }
  }//if previous if statement is true. Next if statement will be skipped
  //if no ID is found below if statement will run 
  //IF STATEMENTS ONLY RUN IF IT IS TRUE
  
  //if items in rooms.connectsTo array is zero, return message because statement is true
  if (roomID.length === 0) {
    return `Room with ID of '${id}' could not be found.`
  }
  
  //Using roomID > ID matched with given id < to loop thru rooms.connectsTo array 
  for (let k = 0; k < roomID.length; k++) {
    
    //if matched, save id from rooms.connectsTo array
    let roomTag = roomID[k]

    //Nested loop going thru whole rooms array again matching, roomID with roomTag 
    for (let t = 0; t < rooms.length; t++) {
     
      //save rooms.connectsTo id 
      let room = rooms[t]

      //if id from rooms.connectsTo array matches rooms.roomId, push all the names of those rooms into a second empty array
      if(roomTag === room.roomId) {
        
        //a new array of NAMES of ids that matches rooms.roomId and rooms.connectsTo
        allrooms.push(room.name)
      }
    }
  }
  //if items in rooms.connectsTo array is not the same length as names array, return message because statement is true
  if (roomID.length !== allrooms.length) {
    return `Room with ID of 'incorrect-id' could not be found.` 
  }
  //Otherwise return an array with the names of the room where the given id is located.
  return allrooms
} 
//getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra")




  


        
        

        
        
      
    
  


      

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
