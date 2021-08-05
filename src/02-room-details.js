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
      let dinoName = dinosaurs[i].name;

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
  // we are comparing the ** id ** argument to **rooms.roomId** , to produce matching **rooms.connectsTo** values
  //If there is a match between id & rooms.roomID , I will push the matching values of rooms[i].connectsTo , into the array 
  let connectedNames =[];
  let iDNameObj = {};
  let idArray = [];

  for (let i = 0 ; i < rooms.length; i++){
    let indexOfRooms = rooms[i];
    
      if (id === indexOfRooms.roomId){
        for (let k = 0; k < indexOfRooms.connectsTo.length; k++){ 
          connectedRooms.push(indexOfRooms.connectsTo[k]);
        }
           // I am creating an array with connects to rooms. 
          // the issue is converting them to names
      } // Object.keys() Object will go in () , return value gives an array of all keys as strings.
        iDNameObj[indexOfRooms.roomId] = indexOfRooms.name;
  }  
      if (connectedRooms.length < 1){

        return `Room with ID of '${id}' could not be found.`
      } 
        for (let j = 0 ; j < idArray.length; j++){
          
         if (id === idArray[j]){
            
          idArray = Object.keys(iDNameObj);
          connectedNames.push(iDNameObj[indexOfRooms.roomId]);
         }
         
          }
          
          return connectedNames;
        }
          
        
      // looop over connected rooms array , push name if matches 
  //   for (let j = 0; j < rooms.length; j++){
    
  //   let indexofIDs = rooms[j].roomId;

  //     if (connectedRooms.includes(indexofIDs)){
  //       connectedNames.push(rooms[j].name);
  //         return connectedNames;
  //     }
  // } 


console.log(getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra"));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
