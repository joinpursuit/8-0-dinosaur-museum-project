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
  let dinosaurIDLookup;
  let roomWithDinosaur;
  let returnRoomOrCannotFindMessage;
  /*
  If a dinosaur with the same name as dinosaurName is found in the dinosaurs array, that dinosaur's dinosaurId is put into the dinosaurIDLookup variable that was declared outside the loop so the value can later be accessed outside the loop.  The loop is then broken so unneeded iterations are not run.

  If no match is found, the loop runs through all the dinosaurs in the dinosaurs array without ever running the code in the "if" conditional so dinosaurIDLookup remains undefined.
  */
  LoopDinosaurTest:
  for (let dinosaur of dinosaurs) {
    if (dinosaur.name === dinosaurName) {
      dinosaurIDLookup = dinosaur.dinosaurId
      break LoopDinosaurTest;
    }
  }
  /*
  If a dinosaur was successfully found in the previous loop (LoopDinosaurTest), we have an ID to look up.
  
  The dinosaurIDs in each room are checked; if a match to the ID lookup is found, that room's name is put in the roomWithDinosaur variable that was declared outside the loop, so the value may be accessed outside the loop.  The loop is then broken so unneeded iterations are not run.

  If no match is found, the loop runs through all the rooms in the rooms array without ever running the code in the "if" conditional so roomWithDinosaur remains undefined.
  */
  LoopRoomTest:
  for (let room of rooms) {
    for (let dinoID of room.dinosaurs) {
      if (dinoID === dinosaurIDLookup) {
        roomWithDinosaur = room.name;
        break LoopRoomTest;
      }
    }
  }
 /*
 Truthy/falsy and control flow elements are used to determine the return string.

 roomWithDinosaur will be truthy if a non-empty string.  Truthy evaluates to true in the conditional; if the conditional is true the variable eventually used for the return string set to the non-empty string.

 roomWithDinosaur will be falsy if an empty string.  A room may have an empty string as a name, so a logical "or" is used to compare roomWithDinosaur with an empty string.

 (roomWithDinosaur || roomWithDinosaur === "") evaluates to true if a non-empty string or an empty string, but false if undefined (the default unless roomWithDinosaur was assigned a value in LoopRoomTest.)

 Falsy values from non-empty strings such as 0, false, and undefined are not accounted for.  It is assumed that a room may legitimately not have a name and be assigned an empty string "" as a placeholder that will not trigger odd-looking results.  However, room names of 0, false, or undefined are probably outright errors and should be eliminated by validation at time of entry.

 "Else if" statements are used so the return value is only changed once, and evaluations earlier in the list are performed first.  For example, if dinosaurIDLookup is undefined, roomWithDinosaur will also be undefined, but we don't want to return the message stating the dinosaur can't be found in any rooms in that case.  In that case, we want to state the dinosaur can't be found (at all).
 */
if (roomWithDinosaur || roomWithDinosaur === "") {
  returnRoomOrCannotFindMessage = roomWithDinosaur;
} else if (!dinosaurIDLookup){
  returnRoomOrCannotFindMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`
} else if (!roomWithDinosaur) {
  returnRoomOrCannotFindMessage = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}
return returnRoomOrCannotFindMessage;
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
  /*
  Creates function createRoomIDToNameObject to create RoomIDToNameObject.  RoomIDToNameObject created to (theoretically) avoid iterating through loops, decreasing runtime of program.

  If object creation does cut run time, additional object creation with different key : value pairings may be considered for decreased run time.  All such object creation functions may be run separately in an initialization function that runs when data is updated and/or the system is started.

  All that is speculative depending on the particulars, though.  Possibly object creation functions would be prohibitively complex.
  */
  let RoomIDToNameObject = createRoomIDToNameObject(rooms);
  let returnArrayRoomNames = [];
  function createRoomIDToNameObject(rooms) {
    let returnRoomIDToNameObject = {};
    /*
    Iterates through rooms, creating key : value of roomID : name.
    */
    for (let room of rooms) {
      returnRoomIDToNameObject[room.roomId] = room.name;
    }
    return returnRoomIDToNameObject;
  }
  /*
  If a key that matches id cannot be found in the RoomIDToNameObject, then there aren't any rooms with that id in the rooms array.  We know this because we just created RoomIDToNameObject corresponding to the rooms argument passed into the function.
  */
  if (!RoomIDToNameObject[id]) {
    return `Room with ID of '${id}' could not be found.`
  } else {
    /*
    If a key that matches id is found in the RoomIDToNameObject, then the preceding "if" conditional does not execute and the code in the "else" following executes instead.

    A loop is created that goes through the rooms array, looking for a room that matches the id.

    If a room to id match is found, for each individual room ID in the room's "connectsTo" array, the individual room ID is checked against RoomIDToNameObject.  If there is a corresponding non-empty string value then that value is pushed onto the returnArrayRoomNames stack that will eventually be returned.

    The conditional checks separately to see if the string value is empty, as an room with an ID may exist that has an empty string for a name.

    Falsy values from non-empty strings such as 0, false, and undefined are not accounted for.  It is assumed that a room may legitimately not have a name and be assigned an empty string "" as a placeholder that will not trigger odd-looking results.  However, room names of 0, false, or undefined are probably outright errors and should be eliminated by validation at time of entry.
    
    If a corresponding value is not found, then RoomIDToNameObject[individualRoomID] is undefined.  This causes the code in the "else" statement to trigger, returning a message stating the individual room ID could not be found.

    At the end of the code that runs if the "if" conditional that checks if a room to id match is found, a loop break prevents unneeded iterations.
    */
    LoopIDCheck:
    for (let room of rooms) {
      if (room.roomId === id) {
        for (let individualRoomID of room.connectsTo) {
          if (RoomIDToNameObject[individualRoomID] || RoomIDToNameObject[individualRoomID] === "") {
            returnArrayRoomNames.push(RoomIDToNameObject[individualRoomID])
          } else {
            return `Room with ID of '${individualRoomID}' could not be found.`
          }
        }
        break LoopIDCheck;
      }
    }
  }
  return returnArrayRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
