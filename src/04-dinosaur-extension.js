const exampleDinosaurData = require("../data/dinosaurs");

function organizeDinosaursByPeriod(dinosaurs) {
    let newObj = {};
    for(let i = 0;i < dinosaurs.length;i++){
       let dinoArray = dinosaurs[i];
        timePeriod = dinosaurs[i].period;
        ids = dinoArray.dinosaurId;
        newObj = {[timePeriod]: ids};
    }
  console.log(newObj);
    }
  
  console.log(organizeDinosaursByPeriod(exampleDinosaurData));
