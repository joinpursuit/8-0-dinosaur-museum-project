
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
  let dinoId, roomName;
  
  //get the dino id if dinosaurs.name === dinosaurname
  //if rooms includes the id string stored in dinoId return the room name
  // else if cannot be found return error
  // if (dinosaurName.length === 0 || typeof dinosaurName !== 'string') {
  //   return `input a string`
  // }

  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      dinoId = dino.dinosaurId
    }
    //console.log(dinoId)
  }
  for (let room of rooms) {
    if (room.dinosaurs.includes(dinoId)) {
      roomName = room.name
      return roomName
    }
  }
  if (dinoId === undefined) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (roomName === undefined) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
  }

// console.log(getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, 'Tyrannosaurus' ))
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
  let accumulator = []
  let testvar = 0

  // testvar += 1
  // console.log(testvar)

  for (let room of rooms) { 
    if (room.connectsTo.includes(id)) {
      accumulator.push(room.name)
    }
  }
  // for (let room of rooms) {
  //   if (!room.connectsTo.includes(id)) {
  //     accumulator.push(`Room with ID of 'incorrect-id' could not be found.`)
  //   }
  // } 
 
  
  return accumulator
}

// for (let room of rooms) {
  //   if (!id) {
  //     accumulator.push(`Room with ID of 'incorrect-id' could not be found.`)
  //   }
  // }
  // for (let room of rooms) {
  //   if (!room.connectsTo.includes(id)) {
  //     accumulator.push(`Room with ID of 'incorrect-id' could not be found.`)
  //   }
    
  // }





// else if (!room.connectsTo.includes(id)) {
      //   return `Room with ID of 'incorrect-id' could not be found.`
      // }



 // if (room.roomId !== id) {
    //   return `Room with ID of '${id}' could not be found.`
    // }




   
      
    
  
  
  
  


  // console.log(getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra"))
  // console.log('typeof&&& '+ typeof accumulator2)
  

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
