const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
* organizeDinsoorganizeDinosaursByPeriod()
* ----------------------------------------
* @param {Object []} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
* @param {string} key - An optional parameter. If included, representing a key value from the dinasour object
* @returns {Object} An object where the keys are the period values, and the values are an array of IDs.
* 
* EXAMPLE:
*  organizeDinsoorganizeDinosaursByPeriod(dinosaurs);
*  //> { 
    "Late Cretaceous": [
      "WHQcpcOj0G",
      "GKl035EYKN",
      "2GglUqKT0G",
      "Pr6kc4Q_Xf",
      "ft5Gs5izdq",
      "wuL4ddBinQ"],
    // ...
    }
*/

function organizeDinsoorganizeDinosaursByPeriod(dinosaurs, key) {
  let defaultKey = "dinosaurId";
  if (Object.keys(dinosaurs[0]).includes(key)) {
    defaultKey = key;
  }

  let answer = {};

  dinosaurs.forEach((item) => {
    answer[item.period] = (answer[item.period] || "") + `${item[defaultKey]} `;
  });

  for (let key in answer) {
    let array = answer[key].split(" ");
    array.splice(-1);
    answer[key] = array;
  }
  return answer;
}

// console.log(
//   organizeDinsoorganizeDinosaursByPeriod(exampleDinosaurData, "name")
// );

/**
 * validateMuseumPath()
 * --------------------
 * @param {array} roomIds - An array of roomId strings
 * @param {boolean} param2 - When set to true, returns a string that describes the path if it is valid
 * @returns {boolean} Returns true if the path the person is trying to follow is possible. Otherwise, returns false
 *
 * EXAMPLE:
 * const valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
 * validateMuseumPath(valid); //> true
 * //> "Coat Check Room -> Ticket Center -> Kit Hopkins Education Wing -> Haley Hall"
 */

function validateMuseumPath(roomIds, param2) {
  let connections = [];
  let names = [];

  for (let trip of roomIds) {
    for (let room of exampleRoomData) {
      if (room.roomId == trip) {
        connections.push(room.connectsTo);
        names.push(room.name);
      }
    }
  }

  for (let i = 0; i < roomIds.length - 1; i++) {
    if (
      !connections
        .slice(0, connections.length - 1)
        [i].includes(roomIds.slice(1)[i])
    ) {
      return false;
    }
  }
  if (param2) {
    return names.join(" -> ");
  } else {
    return true;
  }
}

// let valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
// console.log(validateMuseumPath(valid, true));
// let invalid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];
// console.log(validateMuseumPath(invalid, true));

/**
 * ticketExtraDetails()
 *
 *  @param {string} extraString - A string that string matches one of the ticket "extras"
 *  @returns {string} Returns information about what someone would be able to do based on purchasing that ticket.
 *
 * * */

function ticketExtraDetails(extraString) {
  let extras = Object.keys(exampleTicketData.extras);

  if (!extras.includes(extraString.toLowerCase())) {
    return `Invalid Ticket Extra. Valid Extras include: ${extras.join(", ")}`;
  }

  switch (extraString.toLowerCase()) {
    case "movie":
      return "If you purchase this ticket extra you will gain access to a movie!";
      break;
    case "education":
      return "If you purchase this ticket extra you will gain access to 2 more rooms and see 2 more dinosaurs!";
      break;
    case "terrace":
      return "If you purchase this ticket extra you will gain access to 1 more room!";
      break;
  }
}
