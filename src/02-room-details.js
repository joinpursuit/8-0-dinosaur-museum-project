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


//1. set a variable to hold our return 
//2. loop thgough the dinosaurs array to find the dinosaurId that matches oyr dinosaurName parameter; save in variable
//3. loop through the rooms array and check each .dinosaur for our dinosaurId variable
//4. return the room name if we have a match 


//create a function called getRoomByDinosaurName with the given parameters of dinosaur which is an [] of dinosaur objects, rooms which is an array [] of room objects and dinosaurName which is a string of dinosaur name
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  let dinosaurId //creates a variable with let called dinosaursId to hold matching dinosaurId info
  let roomName //creates a variable with let called roomName to hold the return value 

  //create a loop through the array of dinosaur objects called [dinosaurs]
  for(let i = 0; i < dinosaurs.length; i++){

    //conditional statement while the loop runs, once it reached key name (dinosaurs[i].name check if that name is equal to the paramater given called dinosaurName)
    if(dinosaurs[i].name === dinosaurName){

      //Set dinosaurId at i through the loop to equal to the variable dinosaurId 
      dinosaurId = dinosaurs[i].dinosaurId
      console.log('HEY THIS IS MATCH ROCKIN!!!!!!!')
      break;
    }

  }
  //if the dinosaurId doesn't match the dinosaurId[i]
  if(!dinosaurId){
    
    //return error messaage concatenation 'Dinosaur with name given parameter '${dinosaurName}'cannot be found.`
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

//if(room.dinosaurs.includes(dinosaursId) - instead of double loop//

  //create another loop through the array of room objects called [rooms]
  for(let i = 0; i < rooms.length; i++){
    //create a nested for loop through the array of dinosaur objects called [dinosaurs]
    for(let j =0; j < dinosaurs.length; j++){
      //conditional statment as you loop through the array of rooms[i] and the array of dinosaurs[j] if the dinosaurId match the paramater given 
      if(rooms[i].dinosaurs[j] === dinosaurId){
        //then let rooms[i] of the name key equal the roomName variable
        roomName = rooms[i].name
        //return that rooms name which is a string
         return roomName;
      }
      
    }
    
  }
  //if the given parameter of dinosaurName cannot be found it will returh the following concatenated error message with the ${dinosaurName} in the message
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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

//1. set a variable to equal empty array - results

//2. loop through rooms array - find matching room by Id (roomId: "aIA6tevTne" )
// - creates another variable called connectsTo

//3. If rooms match 'id' (getConnectedRoomNamesById(rooms, "aIA6tevTne")save connectsTo rooms (connectsTo:A6QaYdyKra", // Ticket Center) to a variable called connectsTo 


//4. loop [i] through connectsTo variable - for each item in the connectsTo variable - we need to get just the name (// Ticket Center)


//loop [j] through the rooms array and match the roomId to the item in connectsTo _ then push the items names into the return variable

//if initial room ID is incorrect, should return an error message - line 136

// if connected room ID is incorrect, should return an error message - line 148





//creates a function called getConnectedRoomNamesById with the given parameters rooms which is array of room objects and id which a unique identifier in the form of a string
function getConnectedRoomNamesById(rooms, id) {

  let results = [];
  let connectsTo;
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].roomId === id){
      //Array.from creates a new array (instread of .push)called connectTo from the array rooms[i].connectsTo
      connectsTo = Array.from(rooms[i].connectsTo)
      console.log('MATCH FOUND',rooms[i].connectsTo)
      break;
    }
    if(i === rooms.length -1){
      return `Room with ID of '${id}' could not be found.`
    }
  }
  //outer loop - looping through connectsTo array
  for(let i = 0; i < connectsTo.length; i ++){
  //inner loop - looping over the rooms array to find a match
    for(let j = 0; j < rooms.length; j++){
      if(rooms[j].roomId === connectsTo[i]){
        results.push(rooms[j].name)
          break;
  }
  if(j === rooms.length -1) {
    return `Room with ID of '${connectsTo[i]}' could not be found.`
    }
  }
}
return results;
}



   


  
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
