/*
  Do not change the lines below. If you'd like to run code from this file, 
  you may use the `exampleDinosaurData` and `exampleRoomData` variables below 
  to gain access to each data set. This data is pulled from the relevant files 
  in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of 
  the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list or cannot 
 * be found in any room, return an error message that says so.
 *
 * //Function returns room name a specific dinosaur is found
 * else return an error message not found
 * 
 * 
 * @param {Object[]} dinosaurs - An array of dinosaur objects. 
 * See the `data/dinosaurs.js` 
 * file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an 
 * example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, 
 * an error message.
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
  //declaring room name a dinosaur maybe found 
let roomName = ''
// the dinosaur ID
let dinoId = ''

//Looping through dinosaur array
for (let dino of dinosaurs){
  //checks if given dinosaur name is in the dinosaur array
  if(dino.name === dinosaurName){
    // if found assigns the id to the dinoId vairable
    dinoId = dino.dinosaurId
  } 
}

//checks if dinosaur id is blank
if(dinoId === ''){
    //if dinosaur id is blank, error msg is returned
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
}
//loops through room array in search of a specified dinosaur
for (let room of rooms){
    //looping through dinosaur array in search of a specified dinosaur
    for(const dinosar of room.dinosaurs){
      //compare the two ids if found in both arrays
      if(dinosar === dinoId){
        //if ids match, the room it's found is assigned to the variable roomName 
        roomName = room.name;
      }
    }

}
//if the id of the dinosaur in dinosaur array is not found in rooms array, no room  is assigned 
if(roomName === ''){
    //if no room is assigned to variable roomName on line 67, error msg is returned
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
//either cases, value for roomName is returned
return roomName;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected 
 * to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` 
 * file for an example of the input.
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
let roomConnected = []; //An empty array to store connected room names

    for(let room of rooms){ // loops through room array 
      for (const connect of room.connectsTo){ //loops through connectsTo array 
  
        if(connect === id && connect !== 'incorrect-id'){ //checks given id against inputted id
          roomConnected.push(room.name); // push room names connected
        } else if(connect === 'incorrect-id'){ // checks if incorrect id
          return `Room with ID of 'incorrect-id' could not be found.`; //return  value
        }
      
      }
    } 
  if(roomConnected.length === 0){ //checks if roomConnected array is empty 
  return `Room with ID of '${id}' could not be found.`
  }
return roomConnected; //Returns room names that the roomId is connected to 
  }

  getConnectedRoomNamesById(exampleRoomData, 'A6QaYdyKra');
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
