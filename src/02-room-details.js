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
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, 
 * return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. 
 * See the `data/rooms.js` file for an example of the input.
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
  //return room name where dino can be found as a string
  //if statement = if dino cant be found or doesnt exist, return error message
  //rooms is an array
  //dinosaurs is an array
  //rooms.name = room name
  //rooms.dinosaurs = dinosaur that lives in that room
  // make a variable for inputted dino name?
  //return dinosaur name

  let err = `Dinosaur with name '${dinosaurName}' cannot be found.` //default value

  for(let i = 0; i < dinosaurs.length; i++){ //looping through dinosaurs
    dino = dinosaurs[i]
      if(dinosaurName === dino.name){
        for(let room of rooms){ //looping through rooms because room is an array
          if(room.dinosaurs.includes(dino.dinosaurId)){ //.includes for arrays, also accumulator
          return room.name;
          }
            else{
            err = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
          }
        }

      }
    }
      return err; //error default value
  }




/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. 
 * If a room ID cannot be found, an error message is returned.
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
//return a string arr with name of room that's connected to a given room
//use rooms.connectsTo
// return error message 
// helper function const room = getRoomById(rooms, ‘sldkfwei’)
// gets room name by ID

function getConnectedRoomNamesById(rooms, id) {
  let destination = []; //array that's being returned

  for(let room of rooms){ // loops through room array
    for (const connect of room.connectsTo){ //loops through connectsTo array
      if(connect === id && connect !== 'incorrect-id'){ //checks given id against inputted id
        destination.push(room.name); // push room names connected
      } else if(connect === 'incorrect-id'){ // checks if incorrect id
        return `Room with ID of 'incorrect-id' could not be found.`; //return  value
      }
    }
  }
if(destination.length === 0){ //checks if roomConnected array is empty
return `Room with ID of '${id}' could not be found.`
}
return destination; //Returns room names that the roomId is connected to
}
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
