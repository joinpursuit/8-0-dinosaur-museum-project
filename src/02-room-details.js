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
  // using the .find() method and get the dinoObj
  let dinoFound = dinosaurs.find( dino => dino.name === dinosaurName )

  // If undefined then no dinosaur was found under that name. The .find() method will return undefined thats why I used 
  if( !dinoFound )
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;

  // Using the forLoop to check the rooms[] to get the proper name of the room
  for( let i = 0; i < rooms.length; i++ ){
    if( rooms[i].dinosaurs.includes(dinoFound.dinosaurId) )
      return rooms[i].name
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`

} // ends getRoomByDinosaurName() 

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

  // will come back empty if the roomId does not match the 'id' provided 
  let roomByID = rooms.filter( room => room.roomId === id );
  
  // If rooms are not found return with error
  if( !roomByID.length )
    return `Room with ID of '${id}' could not be found.`;

  // this will return the array > connectsTo and put it inside another array
  let connRooms =  roomByID.map( room => room.connectsTo );

  // Mapping roomByID which was an object returned the connectedRooms as an array. Spreading the elements returned without the spread operator
  let spreadConnRooms = [].concat.apply([], connRooms);

  // converting the roomIds into roomNames 
  for( let i = 0; i < spreadConnRooms.length; i++ ){

    // checking the connected rooms which at this time are iDs => checking it with the rooms[] and getting the correct name based on the iD found in the spreadConnRoomsp[]
    let found = rooms.find( room => spreadConnRooms[i] === room.roomId )

    // If it is found the .find() method will return the first element in the provided array that satisfies the provided conditional. If no values satisfy the provided conditional, undefined is returned.
    if( found )
      spreadConnRooms[i] = found;
    else
      return `Room with ID of '${spreadConnRooms[i]}' could not be found.`;
    
  }

  // after making sure there are no `incorrect-id` thanks to the forLoop() 
  let finalResult = spreadConnRooms.map( roomNameOnly => roomNameOnly.name )

  return finalResult
 
} // ends getConnectedRoomNamesById

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
