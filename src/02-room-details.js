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
//create a function called getRoomByDinosaurName with the given parameters of dinosaur which is an [] of dinosaur objects, rooms which is an array [] of room objects and dinosaurName which is a string of dinosaur name
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  let dinosaurId //creates a variable with let called dinosaursId
  let roomName //creates a variable with let called roomName

  //create a loop through the array of dinosaur objects called [dinosaurs]
  for(let i = 0; i < dinosaurs.length; i++){
    //conditional statement while the loop runs, once it reached key name (dinosaurs[i].name check if that name is equal to the paramater give called dinosaurName)
    if(dinosaurs[i].name === dinosaurName){
      //If that specific dinosaurId is equal to the variable dinosaurId 
      dinosaurId = dinosaurs[i].dinosaurId
    }
  }
  //if the dinosaurId doesn't match the dinosaurId[i]
  if(!dinosaurId){
    //return error messaage concatenation 'Dinosaur with name given parameter '${dinosaurName}'cannot be found.`
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //create another loop through the array of room objects called [rooms]
  for(let i = 0; i < rooms.length; i++){
    //create a nested for loop through the array of dinosaur objects called [dinosaurs]
    for(let j =0; j < dinosaurs.length; j++){
      //conditional statment as you loop through the array of rooms[i] and the array of dinosaurs[j] if the dinosaurId match the paramater given 
      if(rooms[i].dinosaurs[j] === dinosaurId){
        //then let rooms[i] of the name key equal the roomName variable
        roomName = rooms[i].name
        //return that rooms name which is a string
         return roomName;
      }
      
    }
    
  }
  //if the given parameter of dinosaurName cannot be found it will returh the following concatenated error message with the ${dinosaurName} in the message
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
//creates a function called getConnectedRoomNamesById with the given parameters rooms which is array of room objects and id which a unique identifier in the form of a string
function getConnectedRoomNamesById(rooms, id) {

  let idRoom = 0
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].roomId === id){
      let idRoom = roomId[i];
    }
  }
}

  


  
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
