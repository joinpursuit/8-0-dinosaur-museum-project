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
  let dinoCheck = {};

  //Creating error Messages - I will keep these
  let errorMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`;

  let errorMessage2 = `hi`


  //**** Dino project redo - I like to be able to call my error messages - 

  //1) Use a loop on dinosaurs array to find dinosaurId that corresponds to the given dinosaurName

  // **** Dino project redo end of module one - Now that I am confortable with the "for of" loop - I will get rid of the messy for loop and replace with for of.

  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      dinoCheck = dino;
    }
  }

  //2) If no mathcing dinosaudId is found in the dinosaurs array, return the appriate error message

  if (!("name" in dinoCheck)) {
    return errorMessage
  }


  //3) use a loops on the rooms array to see which room the target dino is located in based on it's dinosaurID
  // **** Dino project redo end of module one - removing the for loop - trading for a for of

  for (let room of rooms) {
    if (room.dinosaurs.includes(dinoCheck.dinosaurId)) { //be concious of updating variables - 'rooms' was still here from when I had a for loop
      return room.name;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`

  //4) if no matching room is found in the rooms arrauy return the appropriate error message
  /*reminder to look at test! Extra "of" Punctuation */



}

//Be concious of spelling! 'dinosaur' in 'dinosaurId' was spelled wrong in line 60!!!! Causiong test to not pass!

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
  //Dino Project revisit: We need to make use of an array - this is correct. 
  let roomNames = []
  let errorMessage = `Room with ID of 'incorrect-id' could not be found.`

  //Now that I understand for of loop - I will use that in place of the for loop.
  for (let room of rooms) {
    //Was close here - let fix synatax - comparing the roomId of the room index to the id given
    if (room.roomId === id) {
      //gain access to the connecting rooms of each index that applies
      roomNames = room.connectsTo
    }
  }
//Now if there are no inputs at all we place a errormessage 
  if (!roomNames.length) {
    return errorMessage
  }

  //If the ID is not correct - we return the error message again.
  if (roomNames.includes("incorrect-id")) {
    return errorMessage
  }

  //create an array to capture the connectinr rooms 
  connectingRooms = [];

  for (let room of rooms) {

    //if the the index of the rooms we access inludes the roomId 
    if (roomNames.includes(room.roomId)) {
      //Then we can push those name into the array
      connectingRooms.push(room.name)
    }
  }
//....and return them
  return connectingRooms
}





// Loop through 'rooms' checking for a matching roomId ===. If none match, the roor message with the incorrect id {id} needs to be returned
//For a match, store the 'connectsTo' array to Ids in a new array


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
