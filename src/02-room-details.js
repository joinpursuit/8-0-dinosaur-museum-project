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
  let dinoId = '';
  let dinoRoom = '';
  
  for (let i = 0; i < dinosaurs.length; i++){ 
    if (dinosaurs[i].name === dinosaurName){
      dinoId = dinosaurs[i].dinosaurId;
    }
  }

  for (let j = 0; j < rooms.length; j++){
    if (rooms[j].dinosaurs.includes(dinoId)){
      dinoRoom = rooms[j].name;
    }
  }

  if (!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (!dinoRoom){
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  } else {
    return dinoRoom;
  }
}

/**
 * TIM'S CODE / CLASS NOTES
 * 
 * Pseudo Code:
 * Step 1. Set a var to hold our returns;
 * Step 1.5. loop through the dinosaur array to find the dinosaurID that matches our dinosaurName parameter; save this in var;
 * 
 * Step 2. We need to loop through the rooms array and check each .dinsaur for our dinosaurID var;
 * Step 3. Return the room name if we have a match


function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoId;
  let result;
  for(let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name = dinosaurName) { 
      dinoId = dinosaurs[i].dinosaurId;
      break;
    }; 
  }
  if (!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  for (let room of rooms){
    if (rooms.dinosaurs.includes(dinoId)){
      result = room.name;
      return result;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}
*/

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
  let roomsConnected = [];
  let roomNames = [];
  
  for (let i = 0; i < rooms.length; i++){ 
    let currentRoom = rooms[i];
    if (currentRoom.roomId === id){ 
      roomsConnected = currentRoom.connectsTo;
      break;
    }
  }
  
  for (let j = 0; j < roomsConnected.length; j++){
    for (let k = 0; k < rooms.length; k++){
      if(roomsConnected[j] === rooms[k].roomId){
        roomNames.push(rooms[k].name);
        break;
      } else if(roomsConnected[j] === "incorrect-id"){
        return "Room with ID of 'incorrect-id' could not be found.";
      }
    }
  }

  if (!roomsConnected.length){
    return "Room with ID of 'incorrect-id' could not be found.";
  } else {
    return roomNames;
  }
}


/**
 * TIM'S CODE / CLASS NOTES
 * 
 * Pseudo Code:
 * 1. Set our var;
 * 2. Loop through rooms - find matching room by ID;
 * 3. Save rooms connectsTo in a var;
 * 4. Loop through connects to var;
 * 5. For each item in the connects to variable - we need to get its name loop through the rooms array and match the roomId to the item in connectsTo - then push that item name into the return variables;


function getConnectedRoomNamesById(rooms, id) {
  let results = [];
  let connectsTo;

  for (let i = 0; i < rooms.length; i++){
    if (rooms[i].roomId === id){
      connectsTo = Array.from(rooms[i].connectsTo);//makes our own array, without changing the original array being referenced inside the parentheses
      break;
    } 
    if (i === rooms.length - 1){
      return `Room with ID of '${id}' could not be found.` //does not run unless we reach the last item in the array.
    }
  }
  //outer loop - looping over our connectTo array
  for (let i = 0; i < connectsTo.length; i++){
    //inner loop, looping over the rooms array to find match
    for (let j = 0; j < rooms.length; j++){
      if(rooms[j].roomId === connectsTo[i]){
        results.push(rooms[j].name);
        break; //breaks inner loop
      }
      if (j === rooms.length - 1){
        return "Room with ID of 'incorrect-id' could not be found." //does not run unless we reach the last item in the array.
        // return `Room with ID of '${connectsTo[i]}' could not be found.` - works too!
      }
    }
  }
  return results;
}
*/

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
