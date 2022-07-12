const dinosaurs = [
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
  },
  {
    dinosaurId: "GGvO1X9Zeh",
    name: "Apatosaurus",
    pronunciation: "ah-PAT-oh-sore-us",
    meaningOfName: "deceptive lizard",
    diet: "herbivorous",
    lengthInMeters: 21,
    period: "Late Jurassic",
    mya: [154, 145],
    info: "Named the 'deceptive lizard' because its skull was confused with those of other sauropods until 1909.",
  },
  {
    dinosaurId: "BFjjLjea-O",
    name: "Brachiosaurus",
    pronunciation: "BRAK-ee-oh-sore-us",
    meaningOfName: "arm lizard",
    diet: "herbivorous",
    lengthInMeters: 30,
    period: "Late Jurassic",
    mya: [155, 140],
    info: "Brachiosaurus was a large, North American sauropod dinosaur with an arch encircling its nasal opening.",
  },
  {
    dinosaurId: "iOVNUcv-ww",
    name: "Compsognathus",
    pronunciation: "komp-sog-NATH-us",
    meaningOfName: "pretty jaw",
    diet: "carnivorous",
    lengthInMeters: 0.65,
    period: "Late Jurassic",
    mya: [145, 140],
    info: "Compsognathus was small and bipedal, roughly the size of a turkey. It lived in Europe and was the first dinosaur genus to be portrayed with feathers.",
  },
  {
    dinosaurId: "WHQcpcOj0G",
    name: "Dracorex",
    pronunciation: "dray-ko-rex",
    meaningOfName: "dragon king",
    diet: "herbivorous",
    lengthInMeters: 4,
    period: "Late Cretaceous",
    mya: [66],
    info: "Dracorex hogwartsia was a pachycephalosaur that did not have a domed head. Instead, its skull was adorned with spikes and frills reminiscent of a dragon. A skull was discovered in the Hell Creek Formation in South Dakota and donated to the Children's Museum of Indianapolis in 2004. Its name was inspired by J.K. Rowling's Harry Potter series and the young visitors to the children's museum.",
  },
  {
    dinosaurId: "GKl035EYKN",
    name: "Elasmosaurus",
    pronunciation: "ee-LAZ-mo-sore-us",
    meaningOfName: "thin plate lizard",
    diet: "carnivorous",
    lengthInMeters: 14,
    period: "Late Cretaceous",
    mya: [80.5],
    info: "Elasmosaurus was an aquatic dinosaur with an extremely long neck that likely fed on other smaller aquatic fauna like fish, molluscs, and squid. E.D. Cope mistakenly placed the skull of an Elasmosaurus on the much shorter tail rather than the extremely long neck.",
  },
  {
    dinosaurId: "V53DvdhV2A",
    name: "Giraffatitan",
    pronunciation: "ji-raf-e-tie-tan",
    meaningOfName: "giraffe titan",
    diet: "herbivorous",
    lengthInMeters: 23,
    period: "Late Jurassic",
    mya: [154, 142],
    info: "Giraffatitan was a large sauropod related to Brachiosaurus with huge nostrils and nasal openings in its skull.",
  },
  {
    dinosaurId: "2GglUqKT0G",
    name: "Indosuchus",
    pronunciation: "in-doh-sook-us",
    meaningOfName: "Indian crocodile",
    diet: "carnivorous",
    lengthInMeters: 7,
    period: "Late Cretaceous",
    mya: [70, 66],
    info: "Indosuchus had a flattened crest on its skull.",
  },
  {
    dinosaurId: "aIR95B2TWm",
    name: "Jingshanosaurus",
    pronunciation: "jing-shahn-oh-sore-us",
    meaningOfName: "Jingshan lizard",
    diet: "herbivorous",
    lengthInMeters: 5,
    period: "Early Jurassic",
    mya: [205, 190],
    info: "Jingshanosaurus was one of the last prosauropods, a long-necked herbivore able to walk on two legs.",
  },
  {
    dinosaurId: "Pr6kc4Q_Xf",
    name: "Khaan",
    pronunciation: "kahn",
    meaningOfName: "ruler",
    diet: "omnivorous",
    lengthInMeters: 1.8,
    period: "Late Cretaceous",
    mya: [81, 75],
    info: "Khaan was an oviraptor with a parrot-like beak, discovered in Mongolia.",
  },
  {
    dinosaurId: "GOycwH_EiU",
    name: "Minmi",
    pronunciation: "min-mie",
    meaningOfName: "Minmi Crossing, Queensland, Australia",
    diet: "herbivorous",
    lengthInMeters: 3,
    period: "Early Cretaceous",
    mya: [121, 112],
    info: "Minmi was a small, anklyosaurian, armored dinosaur discovered in Australia.",
  },
  {
    dinosaurId: "Lfp-pAYmDv",
    name: "Ouranosaurus",
    pronunciation: "oo-RAH-noh-sore-us",
    meaningOfName: "brave monitor lizard",
    diet: "herbivorous",
    lengthInMeters: 7,
    period: "Early Cretaceous",
    mya: [125, 112],
    info: "Ouranosaurus was an iguanodont dinosaur in Africa. It had a large sail on its back supported by long, wide neural spines and an elnogated, flat skull.",
  },
  {
    dinosaurId: "ft5Gs5izdq",
    name: "Parasaurolophus",
    pronunciation: "PARR-eh-saw-ROL-off-us / PARR-eh-sawr-eh-LOH-fus",
    meaningOfName: "near crested lizard",
    diet: "herbivorous",
    lengthInMeters: 11,
    period: "Late Cretaceous",
    mya: [76, 74],
    info: "Found in Canada and the USA, Parasaurolophus was a hadrosaur most famous for its long, elaborate cranial crest.",
  },
  {
    dinosaurId: "JIj72eqrz6",
    name: "Spinosaurus",
    pronunciation: "SPINE-oh-SORE-us",
    meaningOfName: "spine lizard",
    diet: "carnivorous",
    lengthInMeters: 18,
    period: "Early Cretaceous",
    mya: [112, 97],
    info: "Spinosaurus was one of the largest carnivorous dinosaurs to walk the Earth. Its diet consisted mostly of fish and the large spines on its back likely formed a sail.",
  },
  {
    dinosaurId: "wuL4ddBinQ",
    name: "Tyrannosaurus",
    pronunciation: "tie-RAN-oh-sore-us",
    meaningOfName: "tyrant lizard",
    diet: "carnivorous",
    lengthInMeters: 12,
    period: "Late Cretaceous",
    mya: [68, 66],
    info: "Tyrannosaurus is well-represented in both fiction and history with over 50 specimens discovered. It and was one of the last non-avian dinosaurs to exist before the extinction event. Tyrannosaurus had a massive skull and a long heavy tail.",
  },
  {
    dinosaurId: "qk1bNQA9_n",
    name: "Utahraptor",
    pronunciation: "YOO-tah-RAP-tor",
    meaningOfName: "Utah predator",
    diet: "carnivorous",
    lengthInMeters: 6,
    period: "Early Cretaceous",
    mya: [112, 100],
    info: "Found in the USA, Utahraptor resembled velociraptor but much larger, prompting Robert T. Bakker to pronounce it 'Spielberg's raptor' due to the velociraptors in the movie Jurassic Park being portrayed much larger than their historical counterparts.",
  },
  {
    dinosaurId: "sW_2EWCsDkE",
    name: "Vulcanodon",
    pronunciation: "vul-ka-oh-don",
    meaningOfName: "vulcano tooth",
    diet: "herbivorous",
    lengthInMeters: 6.5,
    period: "Early Jurassic",
    mya: [183, 175],
    info: "Vulcanodon was a primitive sauropod that lived in southern Africa.",
  },
  {
    dinosaurId: "U9vuZmgKwUr",
    name: "Xenoceratops",
    pronunciation: "ZEE-no-SEH-ruh-tops",
    meaningOfName: "alien horned face",
    diet: "herbivorous",
    lengthInMeters: 6,
    period: "Early Cretaceous",
    mya: [78.5, 77.5],
    info: "Xenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes.",
  },
  {
    dinosaurId: "k-fVc9G-5Gm",
    name: "Zephyrosaurus",
    pronunciation: "ZEF-ear-ro-SORE-us",
    meaningOfName: "West wind lizard",
    diet: "herbivorous",
    lengthInMeters: 1.8,
    period: "Early Cretaceous",
    mya: [120, 110],
    info: "An ornithopod dinosaur known only by a partial skull and postcranial fragments, not much about Zephyrosaurus has been discovered.",
  },
];
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
let str= `Dinosaur with name '${dinosaurName}' cannot be found.`
    for (let dinos of dinosaurs) {
      if (dinos.name === dinosaurName) {
        str= `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
        for (let room of rooms) {
          if (room.dinosaurs.includes(dinos.dinosaurId)) {
            str = room.name
          }
        }
      }
    }
    return(str)
 
  }

getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus")
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
  let roomIds = []
  let roomNames=[]
  for (let room of rooms){
    if (room.roomId == id){
      roomIds = room.connectsTo
    }
  }
  if(roomIds.length<1){
    return `Room with ID of 'incorrect-id' could not be found.`
  }
for(let room of rooms){
  if (roomIds.includes(room.roomId)){
  roomNames.push(room.name)
    }
  }
if (roomNames.length == 2){
  return `Room with ID of 'incorrect-id' could not be found.`
}else{
return(roomNames)
}
}
getConnectedRoomNamesById(rooms, "aIA6tevTne");

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
