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

/* 
User can enter name of dinosaur in order to get the room where the dinosaur is. Return options:
1. Name of room where dino can be found. 
2. Dino name cannot be found
3. Dino cannot be found in any of the rooms

The room can be id'd through the dinosaur ID. So, if the user inputs a dino name, the program has to transfer the name to the dino ID and then the ID needs to be checked against the rooms' dino IDs.

*/
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  //dinosaurName is a parameter. Do not try to reassign it.
  
//guard clause(s)
if (!pickedId) {return noSuchDino};


let errorDinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any room.`;
let noSuchDino=`Dinosaur with name '${dinosaurName}' cannot be found.`;
let roomReturned = ""; 

//If user inputs name of a dinosaur, the name must be turned into the dino ID.
for (let i=0; i<dinosaurs.length; i++ ) {
    if (dinosaurs[i].name === dinosaurName); {
      let pickedId = dinosaurs[i].dinosaurId;
    }


    
//    } else return errorDinoRoom;   //what is wrong here?
if(!pickedId){
  return noSuchDino;
}

/* also check
for (const room of rooms)
  if (room.dinosaurs.includes(pickedId)){
    return room.name;
  }
*/



//choosing room
for (let j=0; j<rooms.length; j++) {
  if (rooms[j].dinosaurs.includes(pickedId)) {    
   return(rooms[j].name);
  } else return errorRoom;
}
}
return rooms.name
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
  for ( let i = 0; i<rooms.length; i++ ) {
 let roomArray=[]  //variable to hold all the rooms found
 let holdingArr=[]  // variable to hold room IDs

 for (const room of rooms)
 if (room.roomId === id){
  for (const connectorID in room.connectsTo){
    return room.name;  
  } 
 



    //if there isn't a room with the given ID, return error message
    //if there is a room with the given ID, return the connected rooms 
    if (rooms[i].roomId === id){
     holdingArr.push(rooms[i].connectsTo)

     //once this is done, we have to switch the connects to IDs into names.
  } else {
    return "Room with ID of 'incorrect-id' could not be found."
  }
}
// or if length of rooms = o, give the return
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
