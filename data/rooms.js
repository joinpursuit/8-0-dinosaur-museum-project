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

module.exports = rooms;
