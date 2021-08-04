const exampleDinosaurData = require("../data/dinosaurs");
const exampleTicketData = require("../data/tickets");
const exampleRoomData = require("../data/rooms");

/*
Write a function that will organize all of the dinosaurs by their period key. 
The function should return an object where the keys are the period values, and 
the values are an array of IDs.
*/

/* Expected Result
  {
    "Late Jurassic": [
      "YLtkN9R37",
      "GGvO1X9Zeh",
      "BFjjLjea-O",
      "iOVNUcv-ww",
      "V53DvdhV2A",
    ],
    "Late Cretaceous": [
      "WHQcpcOj0G",
      "GKl035EYKN",
      "2GglUqKT0G",
      "Pr6kc4Q_Xf",
      "ft5Gs5izdq",
      "wuL4ddBinQ",
    ],
    // ...
  }
*/

function organizeDinosaursByPeriod(dinos, key) {
  //input an array of objects
  //output an object where key represents period and value reps an array of dinoIDs

  //create helper function to camelCase
  function camelCaseKey(keyString) {
    //create an array that contains all valid keys
    const validKeys = ["name", "pronunciation", "meaningOfName", "diet", "lengthInMeters", "mya", "info"];

    //iterate through validKeys and if the keyString is included in array then assign it
    for (let i = 0; i < validKeys.length; i++) {
      if (validKeys[i].toLowerCase() === keyString.toLowerCase()) {
        keyString = validKeys[i];
        break;
      }
    }

    return keyString;
  }

  //if key is undefined assign it the string dinosaurId
  if (key === undefined) key = "dinosaurId";
  else key = camelCaseKey(key);
  //edgecase - all dinos share same keys, so check whether key exists in object
  if (!dinos[0][key] || key === "period") return "please provide a valid key: (name,pronunciation,meaningOfName,diet,lengthInMeters,mya, or info)";

  //initialie an empty object
  const result = {};

  //iterate through dinosaurs
  dinos.forEach((dino) => {
    //if period already exists in object, push dinoID to object at key
    if (result[dino.period]) result[dino.period].push(dino[key]);
    //otherwise create key in object and assign it array with current dinoID in it
    else result[dino.period] = [dino[key]];
  });

  return result;
}

const result = organizeDinosaursByPeriod(exampleDinosaurData, "mya");
// console.log(result);

//--SPACING

/*
Write a function that takes in an array of strings, where each string is a roomId. Assume that someone is attempting to go from room to 
room, starting with the room at index 0 and then preceding to the room at index 1, and so on.
Return true if the path the person is trying to follow is possible. Otherwise, return false.
*/

const valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
const invalid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];

function validateMuseumPath(selectedPath, showPath) {
  //input: array of strings that represents roomIDs and specific order a user wishes to go room to room
  //output: a boolean value indicating whether the path is possible or not

  //edge-case: empty array
  if (selectedPath.length === 0) return "array cannot be empty";

  //declare a lastRoom variable and set to null originally
  let lastRoom = null;
  //make copy of exampleRoomData
  remainingRooms = exampleRoomData.slice();

  //make sure they start off at coat check room
  if (selectedPath[0] !== remainingRooms[2].roomId) {
    return "path must start at 'aIA6tevTne' a.k.a Coat Check Room";
  } else {
    lastRoom = exampleRoomData[2].roomId;
    selectedPath.slice(1);
  }

  //declare a variable to chop off remaining room options to prevent repeats, and path variable
  let indexToChopOffRemainingRooms;
  let gottenPath = "";

  //iterate through path until we are out of bounds
  for (let i = 0; i < selectedPath.length; i++) {
    //if next index is out of bounds return true cause we've hit the end of path successfully
    if (selectedPath[i + 1] === undefined) break;
    //declare flag variable which will decide if we proceed so long as next room is valid
    let nextRoomIsValid = false;

    for (let j = 0; j < remainingRooms.length; j++) {
      if (remainingRooms[j].roomId === lastRoom) {
        if (remainingRooms[j].connectsTo.includes(selectedPath[i + 1])) {
          //set next room is valid to true
          nextRoomIsValid = true;
          //re-assign index to chop off to current index post-iteration
          indexToChopOffRemainingRooms = j;
          lastRoom = selectedPath[i + 1];
          if (i === selectedPath.length - 2) {
            gottenPath += `${remainingRooms[j].name} -> `;
            gottenPath += `${remainingRooms[j + 1].name} -> `;
            break;
          } else {
            gottenPath += `${remainingRooms[j].name} -> `;
            break;
          }
        }
      }
    }
    if (!nextRoomIsValid) return false;
    remainingRooms.splice(indexToChopOffRemainingRooms, 1);
  }
  if (showPath) return gottenPath.slice(0, -3);
  return true;
}
// console.log(validateMuseumPath(valid, true));

/*
ticketExtraDetails()
Write a new function called ticketExtraDetails() that takes a string as its argument. If that string matches 
one of the ticket "extras", provide information about what someone would be able to do based on purchasing 
that ticket. The format is up to you.
*/

function ticketExtraDetails(extras) {
  //edge case - if the extra is not movie education or terrace return error message
  const validExtras = ["movie", "education", "terrace"];

  if (!Array.isArray(extras) && !validExtras.includes(extras.toLowerCase())) {
    return "must be a valid extra: 'movie', 'education', or 'terrace'";
  } else {
    extras = extras.toLowerCase();
  }

  //if argument is not an array and data type is string
  if (!Array.isArray(extras) && typeof extras === "string") {
    if (extras === "education") return "If you purchase this ticket extra you will gain access to 2 more rooms and see 2 more dinosaurs!";
    if (extras === "terrace") return "If you purchase this ticket extra you will gain access to 1 more room!";
    if (extras === "movie") return "If you purchase this ticket extra you will gain access to 3 more rooms and see 2 more dinosaurs and see 1 jurassic park movie!";
  }

  //purpose of creating object is to create reusable code for if we ever want to add extras to extras
  const extrasObj = {
    //ordered list represents access to x more rooms, see x more dinos, and see 1 jurassic park movie
    education: [2, 2, 0],
    terrace: [1, 0, 0],
    movie: [3, 2, 1],
  };

  //iterate through our array of strings called extras with reduce method
  const result = extras.reduce(
    (acc, cVal) => {
      //if the current element is education
      if (cVal === "education") {
        //iterate through accumulator
        acc.map((el, index) => {
          //add and then re-assign element to evaluated result of adding extrasObject at education at index
          acc[index] += extrasObj["education"][index];
          return el;
        });
      } else if (cVal === "terrace") {
        //iterate through accumulator
        acc.map((el, index) => {
          //add and then re-assign element to evaluated result of adding extrasObject at education at index
          acc[index] += extrasObj["terrace"][index];
          return el;
        });
      } else if (cVal === "movie") {
        //iterate through accumulator
        acc.map((el, index) => {
          //add and then re-assign element to evaluated result of adding extrasObject at education at index
          acc[index] += extrasObj["movie"][index];
          return el;
        });
      }
      return acc;
      //get array there and add manually each index to empty array
    },
    [0, 0, 0]
  );
  //if last index is 0 ignore that index
  if (result[result.length - 1] === 0) return `If you purchase this ticket extra you will gain access to ${result[0]} more rooms and see ${result[1]} more dinosaurs!`;
  return `If you purchase this ticket extra you will gain access to ${result[0]} more rooms, see ${result[1]} more dinosaurs and see 1 jurassic park movie!`;
}

// console.log(ticketExtraDetails("MOVIE"));
