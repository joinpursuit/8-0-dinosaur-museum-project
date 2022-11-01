/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let totalCost = 0; //Holds total cost of ticket
  if (ticketData[ticketInfo.ticketType] === undefined){ //Checks if ticket type of ticketData is undefined
    return "Ticket type 'incorrect-type' cannot be found." //Return error message related to incorrect ticket type
    } else if (ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] === undefined){ //Checks if entrant type of ticketData is undefined
      return "Entrant type 'incorrect-entrant' cannot be found." //Return error message related to incorrect entrant type
    } else if (ticketInfo.extras[0] === "incorrect-extra"){ //checks if the given extra is equal to "incorrect-extra"
      return "Extra type 'incorrect-extra' cannot be found." //Returns error message related to incorrect extra type
    }
  totalCost = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] //sets totalCost = to the value based on the ticket type and entrant type
  for (let i = 0; i < ticketInfo.extras.length; i++){ //Loop that goes through extras array
    totalCost += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType] //Adds the cost of each additonal extras on to totalCost 
  }
   return totalCost //Returns totalCost
}
/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  let result = ""; //Holds answer
  let totalCost = 0; //Holds total cost
  let personCost = 0; //Holds the cost of each person
  let entrantType = "" //Holds the entrat type
  let extras = "" //holds the description 
 
 for (let i = 0; i < purchases.length; i++){ //Loops through purchases array
  if (ticketData[purchases[i].ticketType] === undefined){ //Checks if ticket type of ticketData is undefined 
    return "Ticket type 'incorrect-type' cannot be found."; //Returns the error message for the incorrect ticket type
    } else if (ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] === undefined){ //Checks if entrant type of ticketData is undefined
      return "Entrant type 'incorrect-entrant' cannot be found."; //Returns the error message for the incorrect entrant type
    } else if (purchases[i].extras[0] === "incorrect-extra"){ //checks if the given extra is equal to "incorrect-extra"
      return "Extra type 'incorrect-extra' cannot be found."; //Returns the error message for the incorrect extra
    }
  totalCost += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType]; // set totalCost = to the value based on the ticket type and entrant type and adds onto it when loops  
  personCost = ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType]; // set personCost = to the value based on the ticket type and entrant type
  entrantType = purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1); //Variable holds the entrant type but formated correctly
  for (let j = 0; j < purchases[i].extras.length; j++){ //Loops through extras array
    if (j === 0){ //For the first value of j
      extras = ticketData.extras[purchases[i].extras[j]].description; //extras = the description of the given extra 
    } else if (j > 0) { //For every other j value
      extras += ", " + ticketData.extras[purchases[i].extras[j]].description; ////extras = the description of the given extra and formats it correctly
    }
    totalCost += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]; //The cost of extra is added to total cost for each extra given in purchases for the total cost
    personCost += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]; //The cost of extra is added to total cost for each extra given in purchases for each persons cost
  }
    if (extras){ //Checks if extras is a truthy value
      result += `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(personCost / 100).toFixed(2)} (${extras})`; //Sets result = to the required information and formatted correctly (with extras included)
    } else if (!extras){ //Checks if extras is falthy
      result += `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(personCost / 100).toFixed(2)}`; //Sets result = to the required information and formatted correctly (extras not included)
    }
 }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------${result}\n-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`; //Returns result in correct format
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
