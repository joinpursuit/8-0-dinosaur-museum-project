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
 * 
 */

//rooms is an array 
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoID ; // matching ID will be set to this value if first condition is met
  let roomName; // matching room name if second condition is met 
    
  for (let i = 0 ; i < dinosaurs.length; i++){ // looping through dinosaurs.name to determine if first condition is met 
      let dinoName = dinosaurs[i].name; // setting a variable for all index postionas of dinosaurs.name

    if (dinosaurName === dinoName){
        dinoID = dinosaurs[i].dinosaurId; // if dinosaurName argument matches dinoName , we are adding the dinosaurs.dinosaurID value to dinoID at [i]index postion
     } 
  } 
      if (!dinoID) { // if there is no matching name, there will be no dinoID value. if there is no value, we will return error statment.
        return `Dinosaur with name '${dinosaurName}' cannot be found.`;
      }
        for (let c = 0 ; c < rooms.length; c++){ // this is the second loop, used to iterate through rooms.dinosaurs arrays
        let roomDinosaurArray = rooms[c].dinosaurs; // we are setting this variable to compare to dinoID
     
          if (roomDinosaurArray.includes(dinoID)){ // . includes checks the Array within rooms[c].dinosaurs for matching dinoID
            roomName = rooms[c].name; // if dinoID is found within roomDinosaursArray , we will assign roomName with the rooms.name value at index positon[c]

            return roomName;     
          } 
        } 
        if (!roomName){  // if dinoID was not found, there is no roomName. It was set as empty right after function declaration
          return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
        }
  }

console.log(getRoomByDinosaurName(exampleDinosaurData, exampleRoomData,"Dracorex" ));

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
  let connectedRooms = []; // I am declaring an empty array to return the names of rooms connected to given room id. 
  let connectedNames =[]; // declaring an empty array to push in any names that match the connected rooms IDs
  let iDNameObj = {}; // creating an object that I can generate with ID's as keys, with the corresponding names as values
  let idArray = []; // creating an empty array to push in ID's, in order to iterate through later on in the function
  
  for (let room of rooms){ // looping through given rooms array
    iDNameObj[room.roomId] = room.name; // each loop allows me to generate a unique key value pair with roomIds as keys and corresponding rooms names as values.
    idArray.push(room.roomId);// pushing in roomIds into array to be iterated through

    if (room.roomId === id){ // checking to see if the id entered matches any of the roomIds in the rooms array
      for (let ID of room.connectsTo){ // if the id DOES match one of the roomIds within the rooms array, we will iterate through the connectsTo array to generate connectedRooms array
        connectedRooms.push(ID)
      } 
    } 
  } 

  if (!connectedRooms.length){// if the id entered does not match any the rooms.Ids that we iterate through above, connectedRooms array will not be generated, resulting in error msg
    return `Room with ID of '${id}' could not be found.`
  }
  for (let connected of connectedRooms){   // if the Id is found in the first loop above, we will loop through connectedRooms array that matches the roomId
    if(idArray.includes(connected)){ // idArray generated above is now checked to see if includes the ID's of index position of connectedRooms
      connectedNames.push(iDNameObj[connected]);// if any of the Id's within the array of connectedRooms match, the correspinding name is pushed into connectedNames array using iDNameObj
    } else { // if none of the connected ID's are found within the idArray, which corresponds with names , the error message is returned.
      return `Room with ID of '${connected}' could not be found.`
    }   
  }
  return connectedNames;
    
}

console.log(getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra"));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
