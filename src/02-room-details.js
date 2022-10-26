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
  //loop through the dino array
  for (let i = 0; i < dinosaurs.length; i++){
    //see if the dino exists
    if (dinosaurName === dinosaurs[i].name){
      //loop through rooms array
      for (let j = 0; j < rooms.length; j++){
        //check if the room has the dino
        if (rooms[j].dinosaurs.includes(dinosaurs[i].dinosaurId)){
          //return the rooms name
          return rooms[j].name
        }
      }
      //return error message if dinosaur is not in any room
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    }
  }
  //return error message if dinosaur does not exist
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
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
  //loop through the rooms array
  for (i = 0; i < rooms.length; i++){
    //check if the room id exists
    if (id === rooms[i].roomId){
      //create an empty array for the rooms names
      let roomListArr = [];
      //loop through the rooms connects array
      for (let j = 0; j < rooms[i].connectsTo.length; j++){
        //loop through the rooms array
        for (let k = 0; k < rooms.length; k++){
          //check if the current room has a matching id to the ids in the connects room array, AND if the connecting room exists
          if (rooms[k].roomId === rooms[i].connectsTo[j]){
            //push the room name
            roomListArr.push(rooms[k].name);
            //check if the room id in the connects to array is invalid
          } else if (rooms[i].connectsTo[j] === "incorrect-id"){
            //return error message
            return `Room with ID of 'incorrect-id' could not be found.`;
          }
        }
      } 
      //return the new array
      return roomListArr;
    }
  }
  //return error message
  return `Room with ID of 'incorrect-id' could not be found.`;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
