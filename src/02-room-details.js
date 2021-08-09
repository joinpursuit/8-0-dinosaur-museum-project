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

//returning a string
let dinoCheck = "";

//Creating error Messages
let errorOne = `Dinosaur with name '${dinosaurName}' cannot be found.`;

let errorTwo = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;


//1) Use a loop on dinosaurs array to find dinosaurId that corresponds to the given dinosaurName

   for (let i = 0; i < dinosaurs.length; i++) 
   {
     if(dinosaurs[i].name === dinosaurName)
     {
      dinoCheck = dinosaurs[i]; 
     }
  }
  
//2) If no mathcing dinosaudId is found in the dinosaurs array, return the appriate error message

  if (!dinoCheck)
  {
    return errorOne;
  }

//3) use a loops on the rooms array to see which room the target dino is located in based on it's dinosaurID

  for (let i = 0; i < rooms.length; i++) 
  {
    if (rooms[i].dinosaurs.includes(dinoCheck.dinosuarId)) 
    {
     return rooms[i].name;
    } 
  }

//4) if no matching room is found in the rooms arrauy return the appropriate error message

return errorTwo /*reminder to look at test! Extra "of" Punctuation */

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

  roomNames = []

  for (let i = 0; i < rooms.length; i++) 
 {
  roomsId = room.name
 }
 if (!roomId) {
   return `Room with ID of '${id}' could not be found.`;
 }
 
 for(let i = 0; i < rooms.length; i++) {
   if (roomId = id) 
   {
     let connectingRoom = rooms.connectsTo
     roomNames.push(connectingRoom)
   }
   else
   {
return `Room with ID of '${connectingRoom}' could not be found.`
   }
 }


}




// Loop through 'rooms' checking for a matching roomId ===. If none match, the roor message with the incorrect id {id} needs to be returned
//For a match, store the 'connectsTo' array to Ids in a new array


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
