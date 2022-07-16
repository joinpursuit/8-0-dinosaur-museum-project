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


 // Helper function to conver id to the name
//  function dinoNameToId (dinosaurs, dinosaurName) {
//   let dinoId = '';
//     for (dinos of dinosaurs) {
//       if (dinosaurName === dinos.name) {
//         dinoId = dinos.dinosaurId;
//       }
//     }
//     return dinoId;
//   }

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoId;
  let noDinoFound;
  for (let i= 0; i< dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinoId = dinosaurs[i].dinosaurId
    } 
  }
  for (let j =0; j< rooms.length; j++) {
    if (rooms[j].dinosaurs.includes(dinoId)) {
      return rooms[j].name;
    } else {
      noDinoFound = `Dinosaur with name \'${dinosaurName}\' cannot be found in any rooms.`
    }
    if (!dinoId) {
      noDinoFound = `Dinosaur with name \'${dinosaurName}\' cannot be found.`
    }
  }
  return noDinoFound;
}
// getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, "Pterodactyl");

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
// in first loop create new Array that takes all the room ids only, then in second loop cross checks the ids To parameter id and give error if not found. 
    // function formatArr(arrConnectedRooms, rooms) {
    //   formattedArr = [];
    //   for (i=0; i<arrConnectedRooms.length; i++) {
    //     for (j=0; j<rooms.length; j++) {
    //       if (arrConnectedRooms[i] === rooms[j].roomId) {
    //        formattedArr.push(rooms[j].name);
    //       }
    //     }
    //   }
    //   return formattedArr;
    // }
   // take array of strings (room Ids) and cross check each individual string to all the roomIds in our Array of Objects Rooms
   
    function getConnectedRoomNamesById(rooms, id) {
     let newArr =[];
     let  formatArr =[];
     for (let i =0; i<rooms.length; i++) {
        if (rooms[i].roomId === id) {
         newArr = rooms[i].connectsTo;
      }
    }
    for (let j=0; j<rooms.length; j++) {
      if (newArr.includes(rooms[j].roomId)) {
        formatArr.push(rooms[j].name)
      }
    }
    if (!newArr.length || newArr.includes('incorrect-id')) {
      return "Room with ID of 'incorrect-id' could not be found.";
    } 
    return formatArr;
  }
      
  // getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra");
      
      
    //   roomArrFormatted = [];
    //   for (room of rooms) {
    //     if (room.roomId === id) {
    //       for (let i=0; i<room['connectsTo'].length; i++) {
    //        roomArrFormatted.push(roomIdFormat(room.connectsTo[i]))
    //       }
    //     }
    //   }
    //   return roomArrFormatted;
    // }
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
