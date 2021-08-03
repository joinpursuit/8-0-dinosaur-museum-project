const rooms = [
  {
    roomId: "zwfsfPU5u", // 1
    name: "Entrance Room",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "A6QaYdyKra", // Ticket Center
    ],
  },
  {
    roomId: "A6QaYdyKra", // 2
    name: "Ticket Center",
    requiredTicketPermissions: [],
    dinosaurs: [
      "iOVNUcv-ww", // Compsognathus
    ],
    connectsTo: [
      "zwfsfPU5u", // Entrance Room
      "aIA6tevTne", // Coat Check Room
      "dpQnu5wgaN", // Ellis Family Hall
      "L72moIRcrX", // Kit Hopkins Education Wing
    ],
  },
  {
    roomId: "aIA6tevTne", // 3
    name: "Coat Check Room",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "A6QaYdyKra", // Ticket Center
    ],
  },
  {
    roomId: "dpQnu5wgaN", // 4
    name: "Ellis Family Hall",
    requiredTicketPermissions: [],
    dinosaurs: [
      "GGvO1X9Zeh", // Apatosaurus
      "k-fVc9G-5Gm", // Zephyrosaurus
      "sW_2EWCsDkE", // Vulcanodon
    ],
    connectsTo: [
      "A6QaYdyKra", // Ticket Center
      "Ys2Trg-1OT", // Terrell Leon Lecture Room
    ],
  },
  {
    roomId: "L72moIRcrX", // 5
    name: "Kit Hopkins Education Wing",
    requiredTicketPermissions: ["education"],
    dinosaurs: [
      "YLtkN9R37", // Allosaurus
      "U9vuZmgKwUr", // Xenoceratops
    ],
    connectsTo: [
      "A6QaYdyKra", // Ticket Center
      "0eNtkY5WoA", // Haley Hall
      "Ys2Trg-1OT", // Terrell Leon Lecture Room
    ],
  },
  {
    roomId: "0eNtkY5WoA", // 6
    name: "Haley Hall",
    requiredTicketPermissions: [],
    dinosaurs: [
      "qk1bNQA9_n", // Utahraptor
      "JIj72eqrz6", // Spinosaurus
      "Pr6kc4Q_Xf", // Khaan
    ],
    connectsTo: [
      "L72moIRcrX", // Kit Hopkins Education Wing
      "dBZeK6vhpt", // Paxton Decker Terrace
    ],
  },
  {
    roomId: "Ys2Trg-1OT", // 7
    name: "Terrell Leon Lecture Room",
    requiredTicketPermissions: ["education"],
    dinosaurs: [],
    connectsTo: [
      "dpQnu5wgaN", // Ellis Family Hall
      "L72moIRcrX", // Kit Hopkins Education Wing
      "VEr3w2ca_v", // Cabrera Hall
    ],
  },
  {
    roomId: "VEr3w2ca_v", // 8
    name: "Cabrera Hall",
    requiredTicketPermissions: [],
    dinosaurs: [
      "GOycwH_EiU", // Minmi
      "Lfp-pAYmDv", // Ouranosaurus
    ],
    connectsTo: [
      "Ys2Trg-1OT", // Terrell Leon Lecture Room
      "Y707HL8uP9", // Roberts Room
    ],
  },
  {
    roomId: "Y707HL8uP9", // 9
    name: "Roberts Room",
    requiredTicketPermissions: [],
    dinosaurs: [
      "wuL4ddBinQ", // Tyrannosaurus
    ],
    connectsTo: [
      "VEr3w2ca_v", // Cabrera Hall
      "dBZeK6vhpt", // Paxton Decker Terrace
      "Gp6nCN1JGT", // Reyes Hall
    ],
  },
  {
    roomId: "dBZeK6vhpt", // 10
    name: "Paxton Decker Terrace",
    requiredTicketPermissions: ["terrace"],
    dinosaurs: [],
    connectsTo: [
      "0eNtkY5WoA", // Haley Hall
      "Y707HL8uP9", // Roberts Room
      "1FMoeqQxFk", // Blackwell Amphitheater
    ],
  },
  {
    roomId: "1FMoeqQxFk", // 11
    name: "Blackwell Amphitheater",
    requiredTicketPermissions: ["movie"],
    dinosaurs: [],
    connectsTo: [
      "dBZeK6vhpt", // Paxton Decker Terrace
      "Gp6nCN1JGT", // Reyes Hall
    ],
  },
  {
    roomId: "Gp6nCN1JGT", // 12
    name: "Reyes Hall",
    requiredTicketPermissions: [],
    dinosaurs: [
      "ft5Gs5izdq", // Parasaurolophus
      "aIR95B2TWm", // Jingshanosaurus
      "2GglUqKT0G", // Indosuchus
      "WHQcpcOj0G", // Dracorex
      "V53DvdhV2A", // Giraffatitan
    ],
    connectsTo: [
      "Y707HL8uP9", // Roberts Room
      "1FMoeqQxFk", // Blackwell Amphitheater
      "qi5e4IFDby", // Bryan Decker Hall
      "nt85di9a1V", // Owen Family Room
    ],
  },
  {
    roomId: "qi5e4IFDby", // 13
    name: "Bryan Decker Hall",
    requiredTicketPermissions: [],
    dinosaurs: [
      "GKl035EYKN", // Elasmosaurus
      "BFjjLjea-O", // Brachiosaurus
    ],
    connectsTo: [
      "Gp6nCN1JGT", // Reyes Hall
    ],
  },
  {
    roomId: "nt85di9a1V", // 14
    name: "Owen Family Room",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "Gp6nCN1JGT", // Reyes Hall
    ],
  },
];


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
  let dinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`

  for (let dinosaur of dinosaurs){
    if (dinosaur.name === dinosaurName){
      dinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
      for (let room of rooms){
        if(room.dinosaurs.includes(dinosaur.dinosaurId)){
          dinoRoom = room.name
        }
      }
    }
  }
  return dinoRoom;
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
//create an empty array
//returns error message if rooms.roomId === id 

//create a loop rooms array
//if ID === room.roomId
//loop through connectsTo
//loop through rooms 
//checking to see if roomId === connection
//push room.name into the array 

function getConnectedRoomNamesById(rooms, id){
  
  let result = `Room with ID of 'incorrect-id' could not be found.`
  let arr = [];
  let numOfCons = 0
  
  for (room of rooms){
    
    if (id === room.roomId){
      
      let connections = room.connectsTo

      numOfCons = connections.length
      
      for (let connection of connections){
        
        for(room of rooms){
        
        
          if (room.roomId === connection){
           
            arr.push(room.name)
            result = arr;
          }
        }
      }
    }
  } if(arr.length === numOfCons && arr.length > 0){
    return result;
  }else { 
    result = `Room with ID of 'incorrect-id' could not be found.`
    return result;
  }
}
 


// function getConnectionsRoomId(rooms, i ){
//        let arr = [];
//        let connections = rooms[i].connectsTo 
//   {
//     for (room of rooms){
//       {
//        arr.push(room.name)  
//       }
//     }
//   }
//   return arr;
// }

        
      
  

 
  





module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
