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
  let newString;
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].name === dinosaurName){
      newString = dinosaurs[i].dinosaurId
    }
    //Create a function to see if the dinosaur name can be found by looping through the array. 
    
  
    }
    if(!newString){
      return `Dinosaur with name '${dinosaurName}' cannot be found.`
      //Return string if the dinosaur can't be found
    }
    for(let j = 0; j < rooms.length; j++){
      //Looping through the rooms
      for(let k = 0; k < rooms[j].dinosaurs.length; k++){
        //Nesting another loop to itlerate through the dinosaurs array
        if(rooms[j].dinosaurs[k] === newString){
          //Checking if the dinosaur can be found in the room
          return rooms[j].name
        }
      }
    }
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    //Error message if the dinosaur is not in the room
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
  let newArray = []
  for(let i = 0; i < rooms.length; i++ ){
    //Looping and iterating through the room array
    for(let j = 0; j < rooms[i].connectsTo.length; j++){
      //Nested another loop to loop through the connecsTo array
      if(rooms[i].connectsTo[j] === id){
        newArray.push(rooms[i].name)
        //if the id matches with the connects then we push the rooms name into a new array
      }
      else if (rooms[i].connectsTo[j] === "incorrect-id"){
        return "Room with ID of 'incorrect-id' could not be found."
        //error message if can't find the rooms 
      }
     
    }
  

  }
  if(newArray.length === 0){
    return `Room with ID of '${id}' could not be found.`
    //error message if the room id can not be found
  }
  return newArray
  //New Array with all the connected rooms name
  }
 


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
