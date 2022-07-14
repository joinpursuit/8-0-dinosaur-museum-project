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
let roomsArray = []
let dinoID = []
dinoName = []

//Makes two different arrays where indexes match with dinosaur name and dinosaur ID
for (let y=0;y<dinosaurs.length;y++){
  dinoName.push(dinosaurs[y].name)
  dinoID.push(dinosaurs[y].dinosaurId)
}

if(!dinoName.includes(dinosaurName)){
return `Dinosaur with name '${dinosaurName}' cannot be found.`
}

//Will loop through created array so that if the dinosaur name is equal to dinonosaur name at a certain index, we can easily pull ID from DinoID array and use it since indexes corresponds to same dinosaur
for (let z=0; z<dinoName.length;z++){
if(dinosaurName ===dinoName[z]){

//The Loops below will iterate through the rooms array for the dinosaur ID that corresponds with an actual Dinosaur ID in the dinosaurs Array.
for (let i=0;i<rooms.length;i++){//will iterate through rooms array
  for (let x=0;x<rooms[i].dinosaurs.length;x++){//will iterate through the dinosaur IDs from the rooms array
  if(dinoID[z] ===rooms[i].dinosaurs[x]){

    roomsArray.push(rooms[i].name)
  } 


}
}
}
// if(roomsArray.length ===0)
}



if (roomsArray.length===0){
  {return`Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`}
}else{
for(j=0;j<roomsArray.length;j++){
return roomsArray[j]}
}
}
// 



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
connectedROOMSID = []
let roomsArray = []//dinosaurs name array
let roomsIDArray = []//dinosaurs ID array
let connectedROOMS = []
for(i=0;i<rooms.length;i++){
  roomsArray.push(rooms[i].name)
  roomsIDArray.push(rooms[i].roomId)
}


for(i=0;i<rooms.length;i++){//will iterate through the rooms array

  if(!roomsIDArray.includes(id)){
    return `Room with ID of '${id}' could not be found.`
  }
  for(x=0;x<rooms[i].connectsTo.length;x++){
  if (!roomsIDArray.includes(rooms[i].connectsTo[x])){
     return `Room with ID of 'incorrect-id' could not be found.`
       }}

if(rooms[i].roomId ===id){
  for(x=0;x<rooms[i].connectsTo.length;x++){//will iterate through connected rooms by ID
    connectedROOMSID.push(rooms[i].connectsTo[x])
 }

}
}

for (y=0;y<roomsArray.length;y++){//will iterate through the entire dinosaurs name array/ID array
  for(i=0;i<connectedROOMSID.length;i++){
if (roomsIDArray[y] === connectedROOMSID[i]){
  connectedROOMS.push(roomsArray[y])
 }
}}

return connectedROOMS}





module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
