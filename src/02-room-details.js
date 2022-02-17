/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const dinosaurs = require("../data/dinosaurs");
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

// My solution -
// function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
//   let dinoId = '';

//   // Iterate over the dinosaurs array to check for a particular id of a dinosaur.
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].name === dinosaurName) {
//       dinoId = dinosaurs[i].dinosaurId;
//     }
//   }
//   // If `dinoId` found, use nested for loop to find the room of the dinosaur.
//   for (let i = 0; i < rooms.length; i++) {
//     for (let j = 0; j < rooms[i].dinosaurs.length; j++) {
//       if(rooms[i].dinosaurs[j] === dinoId) {
//         return rooms[i].name;
//       } 
//     }
//   }
//   // If dinosaur isn't found, return appropriate error message.
//   let errorMessage = (!dinoId) ? `Dinosaur with name '${dinosaurName}' cannot be found.` : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
//   return errorMessage;
// }

// Tim McKiernan - 8.4nw instructor

// 1. set a variable to hold our returns;
// 1.5 loop through the dinosaur array to find the dinosaurId that matches our dinosaurName parameter; save this in a variable;
// IF there is no match - return an error message
// 2. we need to loop through the rooms array and check each .dinosaur for our dinosaurId variable;
// 3. return the room name if we have a match;

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoId;

  let result;
  // Check what we are passing in.
  // console.log(dinosaurName);
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinoId = dinosaurs[i].dinosaurId;
      break; // mini return; what if we have 100,000 to check
      //console.log('HEY YOU GOT A MATCH!', dinoId, dinosaurName);
    }
  }

  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for (let room of rooms) {
    if (room.dinosaurs.includes(dinoId)) {
      // console.log('we got another match', dinoId);
      // console.log(room.dinosaurs);
      result = room.name;
      return result;
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

// Gigi Scarborough's help - 8.4nw instructor

// function getConnectedRoomNamesById(rooms, id) {
//   // 

//   // Declare a variable to store an array of connected rooms connected to the room with correct room id passed in by the user. Else, this variable will remain `undefined` if the id is incorrect.
//   let connectedRooms;

//   // Create an empty object to store key/value pairs for the entire `rooms` array. The `keys` will be the `roomId`s and the matching values will be the `name`s of the rooms. Sometimes an object is a better choice to store data than an array depending on the situation and need. Here, we are extracting a smaller object from a larger object of just the key/value pairs we need to use.
//   let roomMap = {};

//   // `For loop` to loop over the `rooms` array, in order to see if the inputted `id` argument is valid and if it is, assign the array stored at the `rooms[i].connectsTo` key associated with the room object at the particular room id to the `connectedRooms` variable. Also, populate the empty object declared above `roomMap` in order to create a map of the room objects' id keys and name values.
//   for (let i = 0; i < rooms.length; i++) {
//     // If `id` is equal to one of the room ids, then assign the array stored at the `connectsTo` key for that room.
//     if (rooms[i].roomId === id) {
//       connectedRooms = rooms[i].connectsTo;   
//     }
//     // As we are looping over the array of room objects, add key/value pairs to the empty object. Since keys are strings, they go in brackets. The room ids (i.e. rooms[i].roomId) will become the keys in the new object. And the values assigned to each key will be the names associated with each id (i.e. rooms[i].name)
//     roomMap[rooms[i].roomId] = rooms[i].name;
//   }
//   //console.log(connectedRooms)
//   //console.log(roomMap)

//   // If `connectedRooms` is falsy, meaning it is empty and still undefined or in other words no id was found in the whole rooms array above in the `for loop`, then return the error message which is a template literal with a string interpolation of the `id` that was passed in as the argument to the function indicating that it couldn't be found and thus is not valid or correct.
//   if (!connectedRooms) {
//     return `Room with ID of '${id}' could not be found.`
//   }

//   // Iterate over the `connectedRooms` array.
//   for (let i = 0; i < connectedRooms.length; i++) {
//     // If the `key` in the roomMap object matches the connectedRooms room `id`, then...
//     if (roomMap[connectedRooms[i]]) {
//       // ...assign it to the `connectedRooms` array. The value will be a `name` since this is the value associatedd with the `id` keys of the roomMap object(i.e. roomMap[rooms[i].roomId] = rooms[i].name; from line 467)
//       connectedRooms[i] = roomMap[connectedRooms[i]];
//     } else {
//       return `Room with ID of '${connectedRooms[i]}' could not be found.`;
//     }
  
//   }
  
//   return connectedRooms;

// }

// Tim McKiernan - 8.4nw instructor

// 1. set our variable.
// 2. loop through rooms - find matching room by ID
// 3. save rooms connectsTo in a variable;
// 4. loop through connects to variable;
// 5. for each item in the connects to variable - we need to get its name
//  loop through the rooms array and match the roomId to the item in 
//  connectsTo - then push that items name into the return variable;

function getConnectedRoomNamesById(rooms, id) {
  let results = [];
  let connectsTo;
  
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      // console.log('match found', rooms[i].roomId, id);
      connectsTo = Array.from(rooms[i].connectsTo);
      // edit the new array without having a reference to the old array.
      // connectsTo[0] = 'what happened to my data?';
      // console.log(i, '<------- index')
      // console.log(connectsTo, '<-------- connectsTo');
      // console.log(rooms[i].connectsTo, '<-------- rooms[i]');
      break;
    }
    if (i === rooms.length - 1) {
      return `Room with ID of '${id}' could not be found.`;
    }
  }

  // outer loop - looping over our connectsTo array
  for (let i = 0; i < connectsTo.length; i++) {
    // inner loop - loop over the rooms array to find match 
    for (let j = 0; j < rooms.length; j++) {
      if (rooms[j].roomId === connectsTo[i]) {
        results.push(rooms[j].name);
        break;
      }
      if (j === rooms.length - 1) {

        console.log(connectsTo[i], '<------- this connects to at I at the last iteration');
        return `Room with ID of '${connectsTo[i]}' could not be found.`;
      }
    }
  }
  //console.log(results);
  return results;
}
    
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
}

// My solution -
//const connectedRoomsIds = [];
  // const connectedRoomsNames = [];
  // let result = '';
  // // Error message no. 1
  // if (!rooms[0].roomId.includes(id) ) {
  //   result = `Room with ID of '${id}' could not be found.`;
  // } 
  
  // // Error message no. 2
  // if (!connectedRoomsIds.includes(rooms[0].roomId)) {
  //   result = `Room with ID of '${id}' could not be found.`;
  // }

  // for (let i = 0; i < rooms.length; i++) {
  //   if (rooms[i].roomId === id) {
  //     for (let j = 0; j < rooms[i].connectsTo.length; j++) {
  //       connectedRoomsIds.push(rooms[i].connectsTo[j]);
  //     } 
  //   } 
  // }

  // for (let i = 0; i < rooms.length; i++) {
  //   for (let j = 0; j < connectedRoomsIds.length; j++) {
  //     if (connectedRoomsIds[j] === rooms[i].roomId) {
  //       connectedRoomsNames.push(rooms[i].name);
  //       result = connectedRoomsNames;
  //     } 
  //   }
  // }

  // return result;