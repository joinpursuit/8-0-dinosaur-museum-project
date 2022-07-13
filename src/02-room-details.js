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
  let dinoTargetId = "";
  for(let x of dinosaurs)
  {
    if(x.name===dinosaurName)
    {
      dinoTargetId=x.dinosaurId;
      break; 
    }
  }
  if(dinoTargetId==="")
  {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for(let x of rooms)
  {
    if(x.dinosaurs.includes(dinoTargetId))
    {
      return x.name;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
  let roomsMirror ={};
  for(let x of rooms)
  {
    roomsMirror[x.roomId]=x.name;
  }
  for(let x of rooms)
  {
    if(x.roomId===id)
    {
      let roomsNameArr=[];
      for(let y of x.connectsTo)
      {
        if(roomsMirror[y]===undefined)
        {
          return `Room with ID of 'incorrect-id' could not be found.`
        }
        roomsNameArr.push(roomsMirror[y]);
      }
      return roomsNameArr;
    }
  }
  return `Room with ID of '${id}' could not be found.`
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
