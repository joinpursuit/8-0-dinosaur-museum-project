/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const dinosaurs = require("../data/dinosaurs");
const exampleDinosaurData = require("../data/dinosaurs");
const rooms = require("../data/rooms");
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

//1) use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  //2) if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) if no matching room is found in the rooms array, return the appropriate error message
//CLARIFYING NOTE:
//TWO SEPARATE ERROR MESSAGES ARE NEEDED TO PASS THE TESTS
 function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
 let dinoMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`
 let dinoIdNumber;
  
 for(let dino of dinosaurs){
   if(dino.name === dinosaurName){
    dinoIdNumber = dino.dinosaurId;
   }
  
 }
 //After the loop completes lets use an if statement to see if we can find a matching dino id number
   //if you did not find the matching id number return dinoMessage
   if(!dinoIdNumber){
    return dinoMessage;
  }
  //After you find the matching dino Id loop through rooms array to look for that dino id
//if room.dinosaurs includes dino id number we can return room.name
 for(let room of rooms){
   if(room.dinosaurs.includes(dinoIdNumber)){
    return room.name;
   }
  
  }
 return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}
getRoomByDinosaurName(exampleRoomData)



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
      let roomNamesAndIds = {}
      let connectedRoomsIds = []
      let errorMsg = `Room with ID of '${id}' could not be found.`
      // { zwfsfPU5u: "Entrance Room" }
      // let roomNamesAndIds = {};
      for (let room of rooms){
        //roomNamesAndIds[room.roomId] = room.name;
        if(room.roomId === id){
          connectedRoomsIds = room.connectsTo.slice(0);
        }
      }
      if(!connectedRoomsIds.length ){
        return errorMsg;
      }
      if(connectedRoomsIds.includes(id)){
        return errorMsg;
      }
      let connectedRoomName = [];
      for(let room of rooms){
        if(connectedRoomsIds.includes(room.roomId)){
          connectedRoomName.push(room.name);
    
        }
      }
    return connectedRoomName;
      
      // Loop through 'rooms' checking for a matching roomId === id. If none match, the error message with the incorrect id {id} needs to be returned. For a match, store the 'connectsTo' array of Ids in a new array.
      // Is there a way to store all of both the roomIds AND names somehow in the same data structure? How could that be done?
      // Similarly, is there a way to store only all of the roomIds somehow?
      //Loop through the 'connectsTo' Ids to see if any are included in, or match to, all of the roomIds. 
    //If they do, 1. Store the 'name' of the correct 'roomId' in a new array and return - MAYBE using the data structure storing BOTH the roomIds and names... OR 2. Replace the 'connectsTo' Id with the coinciding room's name. If a 'connectsTo' Id is incorrect, or does not match any other 'roomId's, return the error message with the incorrect id {connectsTo}.
    }
    getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra");

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
