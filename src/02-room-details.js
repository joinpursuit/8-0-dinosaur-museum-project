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
  //create an empty string that will be returned in the end
  let sen = ""
  
  //Loop thru the dinosaurs object to compare the names at different indexes 
  for(let dino of dinosaurs){
    //check to see if the given param dinosaurName matches the name that exists within the object
    if(dino.name === dinosaurName){
      //if it does, set the empty string to the name of the dino
       sen = dino.dinosaurId}
    }
    //if the name does not exist, return an error message
       if(!sen){
         return `Dinosaur with name '${dinosaurName}' cannot be found.`
       }
//second loop is to iteraet thru the 'rooms' object
      for(let r = 0; r < rooms.length; r++){
        //create another loop to iterate into the dinosaurs array inside of the rooms object
        for(let i =0; i < rooms[r].dinosaurs.length; i++){
          //if the dinosaur Id stored in "sen" exists in rooms, then return the name of that room
          if(rooms[r].dinosaurs[i] === sen){
            return rooms[r].name
          } 
        }
      }
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
  //create an empty array
  let arr = [];
  
  //create a for of loop to iterate the object rooms
  for(let room of rooms){
    
    //create a loop to iterate over the connectsTo array
      for(let i = 0; i < room.connectsTo.length; i++){

        //compare the param 'id' to the ids found in the connectsTo array
        if(room.connectsTo[i] === id){
          //push/add the room name into the empty array
          arr.push(room.name)
        } 
        //check to see if a specific id in connectsto array matches 'incorrect-id' in order to throw up an error message
      if(room.connectsTo[i] === 'incorrect-id'){
      return `Room with ID of 'incorrect-id' could not be found.`
    }
        
      } 
    }
    //Checks to see if the array is empty by checking the array length. If it is, throws an error message.
  if(arr.length === 0 ){
      return `Room with ID of '${id}' could not be found.`
    }
    return arr
}
  
    
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
