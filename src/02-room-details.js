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
  // let dinosaursNameAndIdArray = [] //from dinosaurs object
  
  let dinosaurIdIdentifier = undefined
  let finalRoomName = undefined
  
  
  for(let n=0; n < dinosaurs.length; n++) {  //from dinosaurs array
    let namer = dinosaurs[n].name
    //dinosaursIdArray.push(dinosaurIdIdentifier)
    if (dinosaurName===namer) {
      dinosaurIdIdentifier = dinosaurs[n].dinosaurId
    }
  }

  if (!dinosaurIdIdentifier) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  
  
  //let idToLoooking = dinosaurIdIdentifier
  for(let i=0; i < rooms.length; i++) { //from rooms object
    let dinosaursLivinRoomArray = rooms[i].dinosaurs //per room
    
    for (let k=0;  k < dinosaursLivinRoomArray.length; k++) {
      let eachDinosaurLivinRoom = dinosaursLivinRoomArray[k]
    
      if (dinosaurIdIdentifier===eachDinosaurLivinRoom) {
        finalRoomName = rooms[i].name
      }
    }
  }

  if (!finalRoomName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` //changue
  }

  return finalRoomName
}

// let mya1  = dinosaurs[i].mya
//     let myaMin = mya1[mya1.length - 1]
//     let myaMax = mya1[0]
//     let namer = dinosaurs[i].name
//     let myaLess = myaMax-1

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

    ///1. buscar los roomId..... "aIA6tevTne",>>>>roomId.
    ///2. con el room id buscar los **connectsTo en ese mismo obejto**
    ///generara un array!

    ///3.EN ese array ...iterar sobre cada uno delos datos (nuevo var n)
      // para encontrar cual name le pertenece a cada una...
      //meter toda esta informacion en un nuevo array






function getConnectedRoomNamesById(rooms, id) {
  let arrayOfValidIds = []
  let arrayOfconnectsTo = []
  let arrayOfStrRooms = []
  let roomIdentifier = undefined
  let hasIntruder = false

  for(let j = 0; j < rooms.length; j++) {
    arrayOfValidIds.push(rooms[j].roomId)
  }

  for(let n=0; n < rooms.length; n++) {  
    let eachRoomId = rooms[n].roomId
    if (id === eachRoomId) {
      roomIdentifier = rooms[n].roomId
      arrayOfconnectsTo = rooms[n].connectsTo 
    }
  }

  if (!roomIdentifier) {
    return `Room with ID of '${id}' could not be found.`
  }

  for(let i=0; i < arrayOfconnectsTo.length; i++) { //
    let eachIdIntoArray = arrayOfconnectsTo[i]
    for (let k=0; k < rooms.length; k++) {
      let roomIdentifier2 = rooms[k].roomId 
      let nameIdentifier = rooms[k].name//

      if (!rooms.find(room => room.roomId === eachIdIntoArray)) { 
        return `Room with ID of '${eachIdIntoArray}' could not be found.`
      } 

      if ((eachIdIntoArray === roomIdentifier2)) {
         arrayOfStrRooms.push(nameIdentifier)
      }
    }
  }
  // map => transforma un array en otro
  // filter => filtra un array en base a una condicion
  // find => busca una propiedad de un array dentro otro ...
 
   return arrayOfStrRooms
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
