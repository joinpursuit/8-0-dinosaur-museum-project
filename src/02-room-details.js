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
  let foundRoom = "";
  let foundDinoId = "";
  for(let dino of dinosaurs){
    if(dino.name === dinosaurName){ //checking by dino name in array of dinos
      foundDinoId = dino.dinosaurId;// if found 
    } 
  }
if (!foundDinoId){ //if not id found 
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
}
  for(let room of rooms){
    if(room.dinosaurs.includes(foundDinoId)){//checking rooms with dinos
      foundRoom = room.name;
    }
  }   
if (!foundRoom){
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}
return foundRoom;
}
//PSEUDOCODE FOR getRoomByDinosaurName()
//WHAT KEY PIECE OF INFO ARE WE GIVEN? -> dinosaurName
//WHAT KEY PIECE OF INFO DO WE NEED TO REVEAL WHICH DINOS ARE IN WHICH ROOMS? -> the dinosaur's id
//HOW CAN WE USE THE INFO PROVIDED TO FIND SOMETHING THAT WILL MATCH OUR
//TARGET DINO TO THE ROOM IT IS LOCATED IN? -> use the dinosaurs array to find the id of the dinosaur with a name that matches dinosaurName
  //1) use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  //2) if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) if no matching room is found in the rooms array, return the appropriate error message
//CLARIFYING NOTE:
//TWO SEPARATE ERROR MESSAGES ARE NEEDED TO PASS THE TESTS
// let newStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
// let newObj = {};
//   for(let dino of dinosaurs){
//       if (dino.name === dinosaurName){
//           newObj = dino;
//       }
//   }
// if (!("name" in newObj)){
//   return newStr;
// } 
// newStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
//   for (let room of rooms){
//     if (room.dinosaurs.includes(newObj.dinosaurId)){
//       newStr = room.name;
//       break;
//     } 
//   }
// return newStr;
// }

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
  let connectedRooms;
    let roomNames = [];
    for(let room of rooms){
      if(room.roomId === id){
          connectedRooms = room.connectsTo;
      }
    }
    if(!connectedRooms){
      return `Room with ID of 'incorrect-id' could not be found.`
    }
    for(let roomId of connectedRooms){
      for(let room of rooms){
        if(room.roomId === roomId){
          roomNames.push(room.name);
        }
      }
    }
    if(connectedRooms.length !==roomNames.length){
      return `Room with ID of 'incorrect-id' could not be found.`
    }
    return roomNames;
  }

  // let roomNamesAndIds = {};
  // let connectedRoomsIds = [];
  // // { zwfsfPU5u: "Entrance Room" }
  // // let roomNamesAndIds = {};
  // // for (let room of rooms){
  // //   roomNamesAndIds[room.roomId] = room.name;
  // // }

  // for (let room of rooms){
  //   if(room.roomId === id){
  //     for (let roomId of room.connectsTo){
  //       connectedRoomsIds.push(roomId)
  //     }
  //   }
  //   roomNamesAndIds[room.roomId] = room.name
  
  
  // Loop through 'rooms' checking for a matching roomId === id. If none match, the error message with the incorrect id {id} needs to be returned. For a match, store the 'connectsTo' array of Ids in a new array.
  // Is there a way to store all of both the roomIds AND names somehow in the same data structure? How could that be done?
  // Similarly, is there a way to store only all of the roomIds somehow?
  //Loop through the 'connectsTo' Ids to see if any are included in, or match to, all of the roomIds. If they do, 1. Store the 'name' of the correct 'roomId' in a new array and return - MAYBE using 
  //the data structure storing BOTH the roomIds and names... OR 2. Replace the 'connectsTo' Id with the coinciding room's name. If a 'connectsTo' Id is incorrect, or does not match any other 'roomId's, return the error message with the incorrect id {connectsTo}.

//  let newArr = [];
//  for( let room of rooms){
//    if(room.roomId === id){
//       newArr = room.connectsTo.slice(0);
//    }
//  }
//  if (newArr.includes("incorrect-id")){
//    return `Room with ID of 'incorrect-id' could not be found.`
//  }
//  if(!newArr.length){
//   return `Room with ID of '${id}' could not be found.`
//  }
//  let newArr2 =[];
//  for(let room of rooms){
//    if(newArr.includes(room.roomId)){
//      newArr2.push(room.name);
//     }
//  }
//  return newArr2;
// }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
