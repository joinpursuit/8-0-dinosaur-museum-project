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
  let dinoId = null // initialized accum. variable to null, this will represent the matching dinoId
  let location = null // initialized to null, this will represent the room in which the dino can be found
  let match = false // boolean accum. variable initialized to false, will only change to true if there is a room match
  for(obj in dinosaurs){
      if(dinosaurs[obj].name === dinosaurName){
          dinoId = dinosaurs[obj].dinosaurId
      }//looping though dinosaurs [] to match param dinosaurName with existing .name keys in each {} dinosaurs object. If there is a match, assign the dinoId accum. variable to the .dinosaurId key value of that object
  }
  if(!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } // if after my initial loop, dinoId accum. variable is still null (falsy), return error message about dinosaurName
  
  for(val in rooms){
      if(rooms[val].dinosaurs.includes(dinoId)){
          match = true
          location = rooms[val].name
      }// looping through the rooms [], at each object checks if the .dinosaurs key (which is an []), inlcudes a value matching that of dinoId. If true match turns to true and a match was found. Then sets the location accum. variable to the .name key value of the room match.
  }
  return match ? `${location}` : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
      let nameRoom = [] //empty array accum. variable to store connecting room names 
      
      for(let obj in rooms){
          if(rooms[obj].roomId === id){
              for(const val of rooms[obj].connectsTo)
              nameRoom.push(val) 
          }
      }// looping through room array (obj reprsents each index -> {}'s), checking for a match of the param id with the obj identifying .roomId key. If a match is found, I loop through the .connectsTo key ->[] of that obj, and push all values to the nameRoom [].

      let codeRoom = [...nameRoom] // make a shallow copy of the nameRooms [] 
      
      for(let i = 0; i < rooms.length; i++){
          if(nameRoom.includes(rooms[i].roomId)){
              nameRoom[nameRoom.indexOf(rooms[i].roomId)] = rooms[i].name
          }
      }// looping through rooms [] again this time checking if the values of my nameRoom [], include values the .roomId keys [], if true, the index of the nameRoom will be updated to its corresponding .name key value. (leaving me with an [] of room names, no longer id #'s)

      for(let val of codeRoom){
          if(nameRoom.includes(val)){
             return  `Room with ID of '${val}' could not be found.`
          }
      }// this loop checks to see if any values(id #'s) of the nameRoom were left behind (didn't match) by comparing its values to the shallow copy of its previous self codeRooms. If any value inside the nameRoom (should now be room names not id #'s) still matches that of the codeRoom values (all room id's), then that value (id) was left behind an couldn't find a match, thus returning an error message. 

      return nameRoom.length === 0 ? `Room with ID of '${id}' could not be found.` : nameRoom
  }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
