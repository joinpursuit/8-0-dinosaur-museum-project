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
  let output;
  let trueId;
    
    for (let dino of dinosaurs) {
      if (dinosaurName === dino.name) {
        trueId = dino.dinosaurId;
      }
    } 
      if (!trueId) {
        return `Dinosaur with name '${dinosaurName}' cannot be found.`;
      };

    for (let singleRoom of rooms) {
      if (singleRoom.dinosaurs.includes(trueId)) {
        output = singleRoom.name;
      }
    }
    if (!output) {
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
  return output;
}

// getRoomByDinosaurName(exampleDinosaurData,exampleRoomData,"Tyrannosaurus")
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
  
  let exactId;
  let output;
  let array = [];

  for (let singleRoom of rooms) {
    exactId = singleRoom.roomId
    
    // Compared the given id with the roomId in every single room.
    if (exactId === id) {
      output = singleRoom.connectsTo;
      //Here is the output (Ids in an array) is going to connect with the roomId of eachRoom in rooms. 

      // console.log(output) 
      // For example, given id is "A6QaYdyKra".
      //[ 'zwfsfPU5u', 'aIA6tevTne', 'dpQnu5wgaN', 'L72moIRcrX' ]

      for (let singleIdInArray of output) {
         
        for (let eachRoom of rooms) {
          // Compared singleIdInArray with roomId of eachRoom, if it's true, then push what is asking for into an array. 
          if (singleIdInArray === eachRoom.roomId) {
            // Push the room name  
            array.push(eachRoom.name);
          };
        };
      // if (singleIdInArray !== id) {
      //         return `Room with ID of ${singleIdInArray} could not be found.`
      //       }
      };
    return array;
    };
  };
return `Room with ID of '${id}' could not be found.`;
};

getRoomByDinosaurName(exampleRoomData,"A6QaYdyKra")
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
