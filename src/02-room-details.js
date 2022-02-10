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
         // console.log(dinosaurs,rooms,dinosaurName)
     
         // variables to hold the value if the dinosaur and the room exists intitalized to false
         let dinoFound = false
         let roomFound = false
     
         //object to hold the results
         //let dinoInfo = null
     
         //variables to hold inidividual properties of the objects
         let dinoId = ''
         let roomName = ''
         //let roomId = ''
         
     
         // iterate through the array of dinosaur objects
         for(let dinosaur of dinosaurs){
           
                //check if the name  provided by user exists in the array of objects
                if(dinosaur.name === dinosaurName){
        
                  //change the value to indicate that the dinosaur exsists
                  dinoFound = true
        
                  //assign the properties of the dinosaur object
                  // dinoInfo = dinosaur
                  dinoId = dinosaur.dinosaurId
                }
        
         }
     
         //if the dinosaur not found then dipslay the error message
         if(!dinoFound ) return `Dinosaur with name '${dinosaurName}' cannot be found.`
     
                 //iterate through the roooms array of objects
                 for(let i = 0;i < rooms.length;i++){
                   
                       //iterate through the dinosaurs array of objects
                       for(let j = 0;j < dinosaurs.length;j++){
                 
                              //if the rooms object has the property dinosaurs and the value of the dinosaur ID
                              //matches with value of the id entered by the user
                                if(rooms[i].dinosaurs[j] === dinoId){
                      
                                         //change the value of the variable to indicate that the dinosaurs 
                                         roomFound = true     
                                         
                                         //assign the individual properties of the rooms object to respective variables
                                         //roomId = rooms[i].roomId
                                         roomName = rooms[i].name
                                         //dinoId=rooms[i].dinosaurs[j]
                                         break
                                }
                       }     
                   
             
                 }
                
         // if the room is found return the roomname else return the message that the dinosaur cannot be found       
         if(roomFound){
           return roomName
         } else{
           return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
         } 
}     


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room.
 *  If a room ID cannot be found, an error message is returned.
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
 */// Test Messages
    // ✕ should return the names of all rooms connected to the given room by ID
    // ✕ should work for other rooms
    // ✕ if initial room ID is incorrect, should return an error message
    // ✕ if connected room ID is incorrect, should return an error message


    function getConnectedRoomNamesById(rooms, id) {

              //declare the individual property variables for the object
              let roomName = ''
               //let roomId = ''

              //variable to indicate if the room and the connectto rooms exists or not
              let roomFound = false
              let connectionNotFound = false
        
              //array to hold the values of the connected rooms if they are valid rooms
              let connectedToRoomArr = []
              
              //iterate through the rooms array of objects
              for(let room of rooms){
                 
                    // check if the rooms object id matches with id provided by the user
                   if(room.roomId === id){
              
                          //change the value to indicate the room exists
                          roomFound = true
               
                          // assign the values of the individual property of the room object
                          //roomId = room.roomId
                          //roomName = room.name
                          //console.log("room id matched",roomId)
                          
                          roomConnected = room.connectsTo
                          
            
                          // iterate through the connectsto array to check if it contains valid id values
                          for(let connection of roomConnected){
                            // console.log("connected",connection)
                            
                               //iterate through the rooms to find the name of the room associated with the valid id values
                               for(let element of rooms){
                              
                                //console.log("ele=",ele)
            
                                     //assign the values of roomid and roomname to the variables
                                     roomIdMatch=element.roomId
                                     roomNameMatch=element.name
                   
                                      // if the id in the connectsto array matches the id in the room object 
                                      if(connection === roomIdMatch){
                   
                                       //add the roomname to the array connectedToRoomArr to store the result
                                        connectedToRoomArr.push(roomNameMatch) 
                   
                                       // if the id is an incorrect-id 
                                       }else if(connection ==='incorrect-id'){
                   
                                             //assign the value to indicate the value is an invalid entry in the rooms object
                                             connectionNotFound = true
                                             break
                                       }
                               }
                          }  
                  
                     }    
            }         
            //  console.log(roomFound,connectionNotFound)
        
            // check if room is found 
            if(roomFound===true){
        
                 // check if the value in the connectsto array is not invalid 
                  if(!connectionNotFound){
                      //  console.log("itis")
        
                      // return the names of the rooms connected stored in the array 
                       return connectedToRoomArr
                  }
            }
        
    //return error message if it is an invalid roomId or invalid connected room id
     return `Room with ID of 'incorrect-id' could not be found.`
     
  }



module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
