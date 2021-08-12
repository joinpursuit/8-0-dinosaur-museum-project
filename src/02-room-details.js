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

//return the name of the room where the dinosaur can be found
//if the dinosaur does not exist in the dinosaur list - return an error message
//if the dinosaur can't be found in any room
//we have a dinosaur array - an array of different dinos and their deets
//we have a list of different rooms in an array and the array ha a list of objects which lists the roomId
//we  have the dinosaur name that's given which exists in the dinosaur array but not the rooms array - the connection is the dinosaur id

//should there be an else if to do something if the dino is not included at all - the default value should it be not existing
function getTheID (dinosaurs, dinosaurName) {
  let dinoId = ''
  //loop through the dinosaur array and look through the object to find out if the given name matches any name in the array
  for (const eachDino of dinosaurs) {
    if (eachDino.name === dinosaurName) {
      //if true give me an the dinoID
      dinoId = eachDino.dinosaurId;
    }
  }  
  return dinoId
}

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let roomStatus = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  if (!getTheID(dinosaurs, dinosaurName)) { //if the falsy statement is true, then run the code
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //loop through the rooms
  for (const eachRoom of rooms) {
  // in each room you wan to look at the dinosaurs array and see if the dinosaur found in the getID function exists there - use includes function
    if (eachRoom.dinosaurs.includes(getTheID(dinosaurs, dinosaurName))) {
      return eachRoom.name
    }
  }
  return roomStatus
}


  

  const chambres = [
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
    
  ]
        const dino = [
          {
            dinosaurId: "YLtkN9R37",
            name: "Allosaurus",
            pronunciation: "AL-oh-sore-us",
            meaningOfName: "other lizard",
            diet: "carnivorous",
            lengthInMeters: 12,
            period: "Late Jurassic",
            mya: [156, 144],
            info: "Allosaurus was an apex predator in the Late Jurassic in North America.",
          }
        ]

        getTheID (dino, `Allosaurus`)
        console.log(getRoomByDinosaurName(dino, chambres, `Allosaurus`))



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

//getting a string of all the rooms that a room is connected to
//the room id has to exist in the connects to array in order for you to find the roomId, once you find it, add at the room name to the string
//loop through the rooms
//should there be a helper function that will say if this is true(including the id value), will just say push the value or nah
//if the room id is not right then the error message is `Room with ID of 'incorrect-id' could not be found.

function getConnectedRoomNamesById(rooms, id) {
  //have an array to determine to accumulate all the actual room IDs on the list
  let allTheRoomIDs = []
  //loop through an push each room Id into a room
  for (let i = 0; i < rooms.length; i++) {
    let eachRoom = rooms[i];
    allTheRoomIDs.push(eachRoom.roomId)
  }
  //create an empty array so that if there are values dump the value in there
  let listOfConnectingRooms = [];
  // loop through each room on the list roons
  for (let i = 0; i < rooms.length; i++) {
    let eachRoom = rooms[i];
    allTheRoomIDs.push(eachRoom.roomId)
    //in each room loop through the connects to array
    for (const connectingRoom of eachRoom.connectsTo) {
      //check if the connect to array has the given id
      if (connectingRoom.includes(id)) {
        //if it does then push the value into the given array
        listOfConnectingRooms.push(eachRoom.name)
      }
      if (!allTheRoomIDs.includes(connectingRoom)) {
        //if it does then push the value into the given array
         return `Room with ID of 'incorrect-id' could not be found.`
      }
    } 
  }
  //if no rooms were found, then the array will be empty. if empty that means that there wasn't a room to push
    if (listOfConnectingRooms.length === 0) {
      return `Room with ID of '${id}' could not be found.`
    }

    //if (listOfConnectingRooms.includes //(an index that does not exist in the room id then it returns as false))
  return listOfConnectingRooms;

}
//create a loop that compares collected rooms against the values that exist as a room id.
//the last test says if the connected room id was in correct then there is an error message
const testingRooms = [
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


console.log(getConnectedRoomNamesById(testingRooms, "Gp6nCN1JGT"));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
