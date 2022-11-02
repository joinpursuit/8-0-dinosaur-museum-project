/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const rooms = require("../data/rooms");
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

/* 
User can enter name of dinosaur in order to get the room where the dinosaur is. Return options:
1. Name of room where dino can be found. 
2. Dino name cannot be found
3. Dino cannot be found in any of the rooms

1) User input name into find box.
2) computer takes the name and compares it to all the names in the dinosaur array.
3) if it successfully find the name, it stays at that dinosaur and gets the dino ID#.
3.5) if no dinosaur with that ID is found, return a specific error message 
4) The computer then accesses the rooms array with the dino id# and, if any of the rooms have that ID#, the room will be returned.
4.5) if no room is found with the chosen dinosaur, return the other error message

The room can be id'd through the dinosaur ID. So, if the user inputs a dino name, the program has to transfer the name to the dino ID and then the ID needs to be checked against the rooms' dino IDs.

*/
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoPicked=""

  let errorDinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;  //error message A 
  let noSuchDino=`Dinosaur with name '${dinosaurName}' cannot be found.`; //error message B

//If user inputs name of a dinosaur, the name must be turned into the dino ID.
for (const element of dinosaurs) {  
  if ( element.name === dinosaurName ){
    dinoPicked = element.dinosaurId
  }
}

if(!dinoPicked){
  return noSuchDino
}


for (const aRoom of rooms){   //check if the dino is in any of the rooms
  if (aRoom.dinosaurs.includes(dinoPicked)){
    return aRoom.name
  }
  }

 return errorDinoRoom;
}

 /*
 Attempts 1 - a lot 
//dinosaurName is a parameter. Do not try to reassign it.
  
/*guard clause(s)
if (!pickedId) {return noSuchDino};
let roomReturned = ""; 

//If user inputs name of a dinosaur, the name must be turned into the dino ID.
for (let i=0; i<dinosaurs.length; i++ ) {
  let indexNumber =  dinosaurs.find(dinosaurName);

  console.log(dinosaurs.indexOf(dinosaurName))
  console.log(dinosaurs.dinosaurId[indexNumber])


    // if (dinosaurs[i].name === dinosaurName); {
    //   let pickedId = dinosaurs[i].dinosaurId;
    // }


    
//    } else return errorDinoRoom;   //what is wrong here?
if(!pickedId){
  return noSuchDino;
}

dinosaurs.find(function(dinosaurName))

/* also check
for (const room of rooms)
  if (room.dinosaurs.includes(pickedId)){
    return room.name;
  }


//from dinosaurIds
let index = dinosaurs.dinosaurId.findIndex(pickedID)



//choosing room
for (let j=0; j<rooms.length; j++) {
  if (rooms[j].dinosaurs.includes(pickedId)) {    
   return(rooms[j].name);
  } else return errorRoom;
}
}
return rooms.name
}
*/

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
 


note: The information is in the array "rooms"
1) Take the given ID
2) compare it to all of the rooms in the array
3) if you get a hit, save all the roomIDs in "connected to" of the room with the given id.
3a) If there is no hit, return specified error message.
4) translate the names of the rooms from the ids. Each individual ID must each be looked at in the connected array
*/

function getConnectedRoomNamesById(rooms, id) {
  let roomArray=[]  //variable to hold all the rooms found
  let anotherArray=[]
  let found = false

  for ( let i = 0; i<rooms.length; i++ ){
    if (id === rooms[i].roomId) {
      roomArray = rooms[i].connectsTo;   //how does this work?
      found = true;
    }
  }

  if (roomArray === 0 || !found || !roomArray || roomArray.includes("incorrect-id")){
    return `Room with ID of 'incorrect-id' could not be found.`
  }

  

    for(let j=0; j<rooms.length; j++) {
      if (roomArray.includes(rooms[j].roomId)){
        anotherArray.push(rooms[j].name)
      }
      
    } return anotherArray
  }





  /*
 {
  roomArray.push(rooms.roomId)  //needs the index
  }


  for (const room of rooms){
  if (room.roomId === id) {
    correctRoom = 

  }
  

  {
  for (const connectorID in room.connectsTo){
    return room.name;  
  } 
}
 }


    //if there isn't a room with the given ID, return error message
    //if there is a room with the given ID, return the connected rooms 
    if (rooms[i].roomId === id){
     holdingArr.push(rooms[i].connectsTo)

     //once this is done, we have to switch the connects to IDs into names.
  } else {
    return "Room with ID of 'incorrect-id' could not be found."
  }
}
// or if length of rooms = o, give the return
}
*/

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
