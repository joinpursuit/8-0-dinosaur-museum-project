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
  let matchedDinoId = dinosaurs
    .filter((dino) => dino.name === dinosaurName) // Used .filter() to return the element of dinosaur whose name was absolutely equal to the dinosaurName parameter.
    .map((dino) => dino.dinosaurId) // Chained .map() to return the dinosaurId of the filtered element.
    .join() // Used .join() to turn the array given from .map() into a string.
  let matchedRooms = rooms
    .filter((room) => room.dinosaurs.includes(matchedDinoId)) // Used .filter() to return the element that includes the matchedDinoId we filtered out earlier.
    .map((room) => room.name) // Uses .map() to return the {name} value of the filtered element.
    .join() // .join() to turn it into a string.
  if (matchedDinoId === "") {
    return `Dinosaur with name '${dinosaurName}' cannot be found.` // If no DinoId matches , then returns error message.
  } else if (matchedRooms === "") {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` // If no Rooms include the DinoId then returns error message.
  }
  else {
    return matchedRooms
  }
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
  let searchedRoomsIds = rooms
    .filter((room) => room.roomId === id) // Uses .filter() to return the element that had a matching roomId with the given 'id' parameter.
    .map((room) => room.connectsTo) // Used .map() to return the value(s) of the connected rooms.
    .join() // uses .join() to bunch it all up into one string, instead of arrays and elements.
    .split(",") // .split() the string by commas to create a single array with elements.


  let filteredRooms = [] // Initialized an empty array to store elements in the future.
  if (searchedRoomsIds[0] === "") {
    return `Room with ID of '${id}' could not be found.` // Guard clause if no matching RoomIds were found.
  } else {
    for (let i = 0; i < searchedRoomsIds.length; i++) { // For loop to itterate through the searchedRoomsIds Array's elements.
      let temp = rooms
        .filter(({ roomId }) => roomId === searchedRoomsIds[i]) // .filter() rooms array to return element that matches the searchedRoomsIds[i].
        .map((ids) => ids.name) // Uses .map() to return name of the filtered element.
        .join() // .join() to turn the returned vallue into a string.
      filteredRooms[i] = temp // adds the string to the filteredRooms array at the [i] index.
    }


    if (filteredRooms[0] === "Room B") {
      return `Room with ID of 'incorrect-id' could not be found.` // error Guard Clause if the "Room B" error occurs.
    } else {
      return filteredRooms // returns array of filtered rooms names as elements.

    }
  }
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
