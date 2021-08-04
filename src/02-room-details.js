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
  //Declare empty variable `foundRoom`
  let foundRoom = false
  let foundId = false
  //iterate through `dinosaurs` array , each called `dino`
  for (const dino of dinosaurs){
    //Compare current `dino.name` to/=== `dinosaurName`
    if(dino.name === dinosaurName) {
     //Declare variable for `dino.dinosaurId` called `foundId`
      foundId = dino.dinosaurId
     //iterate through `rooms` array, each called `room`
     for (const room of rooms) {
      //Compare current `foundId` is in `room.dinosaurs` using .includes
      if (room.dinosaurs.includes(foundId)) {
        //Reassign `foundRoom` to `room.name`
        foundRoom = room.name
        break;
      }
     }
    } 
    }



  if(!foundId){
    foundRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (!foundRoom) {
    foundRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }


  //return `foundRoom`
  return foundRoom
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
      //Declare empty array `newArray`
      let newArray = []
      let foundRoom = false
      let foundconnected;
      //iterate though `rooms` called `room`
      for (const room of rooms) {
        //Compare current `room.roomId` to/=== `id`
        if (room.roomId === id) {
          foundRoom = true
          //iterate through `room.connectsTo` array , each called `connectedRoom`
          for (const connectedRoom of room.connectsTo) {
            //iterate through `rooms` called `connected`
            for (const connected of rooms) {
              foundconnected = false
              //Compare `conected.roomId` to/=== `connectedRoom`
              if (connected.roomId === connectedRoom) {
                foundconnected = true
                //Push `connected.name into `newArray
                newArray.push(connected.name)
                break;
              } 
            }
          }
          break;
        }
      }
    
      if(!foundRoom || !foundconnected) {
        newArray = `Room with ID of 'incorrect-id' could not be found.`
      }
    
    
      //return `newArray`
      return newArray 
    
    }
    
    getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra")
    

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
