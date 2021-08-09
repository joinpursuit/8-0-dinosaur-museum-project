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
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName){
  let dinoObj;
  let dinoErrorMsg = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let dinoRoomErrorMsg = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  for(let i = 0;i < dinosaurs.length;i++){
    if(dinosaurs[i].name === dinosaurName){
      dinoObj = dinosaurs[i];
    }
  }
  
  if(!dinoObj){
    return dinoErrorMsg;
  }
  
  for(let room of rooms){
    if(room.dinosaurs.includes(dinoObj.dinosaurId)){
      return room.name;
    }
  }
return dinoRoomErrorMsg;
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
let roomNamesAndIds = {};
  for (let room of rooms){
    roomNamesAndIds[room.roomId] = room.name;
  }




let connectToRoomsIds = [];

for (let room of rooms){
  if(room.roomId === id){
    for(let roomId of room.connectsTo){
      connectToRoomsIds.push(roomId)
    }
  }
  roomNamesAndIds[room.roomId] = room.name
}

/*
1. Loop through "rooms" checking for a matching roomID === id. 
2. If no match, the error message with the incorrect Id needs to be returned.
3. for a match, store the 'connectsTo' array of id's in a new array.
4. is there a way to store all of both the roomIDs AND names somehow in the same data structure?
how could that be done?
Similarly, is there a way to store only all of the roomID's somehow?
5. Loop through the 'connectsTo' Id's to see if any are included in, or match to, all of the roomIDs.
If they do, 1. Store the 'name' of the correct 'roomId' in a new array and return - 
Maybe using the data structure storing BOTH the roomID's and names... OR
2. Replace the 'connectsTo' ID with the coinciding room's name. If a "connectsTo" id is incorrect
or does not match any other 'roomId's, return the error message with the incorrect id {connectsTo}.





*/
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
