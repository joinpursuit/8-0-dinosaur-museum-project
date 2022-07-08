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
  let nameOfAnimal = "";
 //check if dinosaur name matches at each index.
 for (let i =0; i < dinosaurs.length; i++){
  if(dinosaurs[i].name === dinosaurName){
    // reassign to variable nameOfAnimal as it loops through
    nameOfAnimal = dinosaurs[i].dinosaurId;
  }
 }
 // if name of animal is falsey then return error message.
 if (!nameOfAnimal){
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
 }
 // initialize for loop to check against dinosaurs array {}
  for (let r =0; r < rooms.length; r++){
    for (let j =0; j < rooms[r].dinosaurs.length; j++){
      // if rooms indexed at r matches name of animal return room name
      if(rooms[r].dinosaurs[j] === nameOfAnimal){
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
  // initialize empty array
  let newArr = []
// initialize for loop and nest another for loop to check if rooms are connected 
  for (let i = 0; i < rooms.length; i++){
    for (let j =0;j< rooms[i].connectsTo.length; j++){
      if (rooms[i].connectsTo[j] === id){
        // if connected push to array
        newArr.push(rooms[i].name)
        // if not connected return erorr message
      } else if (rooms[i].connectsTo[j] === `incorrect-id`){
          return `Room with ID of 'incorrect-id' could not be found.`
      }  
      }
    }
    // after running the loop if the array is still empty return an erro message for id not found
    if (newArr.length === 0){
      return `Room with ID of '${id}' could not be found.`
    }
    // return newArr after checking conditions 
    return newArr;
  }
  
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
