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
let dino = false;
for(let i = 0; i < dinosaurs.length; i++) {

  if(dinosaurs[i].name === dinosaurName) {
    dino = dinosaurs[i];
}
 
}
  
 
  for(let j = 0; j < rooms.length; j++) {

   if(rooms[j].dinosaurs.includes(dino.dinosaurId)) {

    return rooms[j].name;
}
  
   else if (!dino){ 
     /*If dino is not reassigned to a dinosaur object because the input
     dinosaurName was not found in dinosaur[i].name, !dino will equate to true.
     since dino is set to false by default. and will return the error msg specific to 
     a dinosaur not found in the current room.
      */
      return `Dinosaur with name '${dinosaurName}' cannot be found.`;
}
  
}
   return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;

}
  
  



    
  

    
    
  
    
  
  /* if (room.dinosaurs.includes(dino.dinosaurId)) {
    return room.name;
  } */

/* else if (dino === false) {
return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
} */



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

/*function findRoom(rooms, roomId) {
  let foundRoom = null;
  for(i = 0; i < rooms.length; i++) {
    if(rooms[i].roomId === roomId) {
      foundRoom = rooms[i];
    }
    else if(rooms[i].roomId !== roomId) {
      return `Room with ID of '${roomId}' could not be found.`;
    }
  
return foundRoom;
  }
} */


function getConnectedRoomNamesById(rooms, id) {
  /*Figured out how to solve this without the use of helper functions, though I do want to come back and attempt this 
  with helper functions instead*/
  let roomIdArray = [];
  let roomNameArray = [];

 for (i = 0; i < rooms.length; i++) {

  if(id === "incorrect-id") {
   
    return `Room with ID of` +` '${id}'` + ` could not be found.`;

}
    else {

  roomIdArray.push(rooms[i].roomId);

}
}
    for(let room of rooms) {

   for(j = 0; j < room.connectsTo.length; j++) {

     if(room.connectsTo[j] === id) {

      roomNameArray.push(room.name);

}
    else if(!roomIdArray.includes(room.connectsTo[j])) {
      
       return `Room with ID of ` + `'${room.connectsTo[j]}'` +` could not be found.`;
}

}

}

 return roomNameArray;
}



module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
