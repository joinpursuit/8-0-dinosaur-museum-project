/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const { general } = require("../data/tickets");
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
  let totalCost = 0; //total cost of ticket accumulator 
  if (ticketData[ticketInfo.ticketType] === undefined) { //if ticket type is undefined should return error 
    return "Ticket type 'incorrect-type' cannot be found." //Returns error message related to incorrect ticket type
  } else if (ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] === undefined) { //Checks if entrant type is undefined
    return "Entrant type 'incorrect-entrant' cannot be found." //Return error message related to incorrect entrant type
  } else if (ticketInfo.extras[0] === "incorrect-extra") { //checks if the extra is equal to "incorrect-extra"
    return "Extra type 'incorrect-extra' cannot be found." //Returns error message for incorrect extra type
  }
  totalCost = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] //totalCost of the ticket type and entrant type combined 
  for (let i = 0; i < ticketInfo.extras.length; i++) { //Loop that goes through extras array
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
  let result = "";// result accumulator 
  let totalCost = 0;//total cost accumulator 
  let extrasCost = 0;//extras cost accumulator 
  let entrantType = "";//place holder for entrant type 
  let error = "";//place holder for error message to be returned 
  let extras = "";//extras strings accumulator 

  for (let i = 0; i < purchases.length; i++) {//loop going through an array of purchases 
    // first we define all possible error messages in case ticket type, entrant type or extras type are not found within ticketData
    if (ticketData[purchases[i].ticketType] === undefined) { // when that value is  not found it will return as 'undefined' 
      return "Ticket type 'incorrect-type' cannot be found.";
    } else if (ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] === undefined) {
      return "Entrant type 'incorrect-entrant' cannot be found.";
    } else if (purchases[i].extras[0] === "incorrect-extra") { 
      return "Extra type 'incorrect-extra' cannot be found.";
    }
    totalCost += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType]//starting to accumulate value of price  by pulling it from ticketData
    extrasCost = ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType]// same for extras
    entrantType = purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1)// assigning value to entrantType variable, and formatting to first capital letter 
    for (let j = 0; j < purchases[i].extras.length; j++) {//loop going through an array of extras within purchases 
      if (j === 0) {// if extras array has only one element 
        extras = ticketData.extras[purchases[i].extras[j]].description// extras variable is reassigned to new value of a string 
      } else if (j > 0) {// if array of extras has more than one element 
        extras += ", " + ticketData.extras[purchases[i].extras[j]].description // strings of extras concatenate in extras variable accumulator 
      }
      totalCost += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]; // adding up the cost of extras in total cost variable accumulator 
      extrasCost += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]; // accumulating extras cost into extras cost variable 
    }
    if (extras) { // if extras is truethy, exsisting value within extras array 
      if (i === 0) { // and if there is only one purchase within purhases array 
        result = `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(extrasCost / 100).toFixed(2)} (${extras})`// result will equel to a single line of a string 
      } else { // if there is more than one purchases within purchases array 
        result += `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(extrasCost / 100).toFixed(2)} (${extras})`// concatinating multiple lines of strings, each correlating to each purchase within array 
      }
    } else if (!extras) {// if extras are falsey or non-existent within purchases 
      if (i === 0) {// and if there is only one purhase within purchases array 
        result = `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] / 100).toFixed(2)}`//result will equel to a single line of a string with no extras 
      } else {//if there is more than one purchases within purchases array 
        result += `\n${entrantType} ${ticketData[purchases[i].ticketType].description}: $${(ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] / 100).toFixed(2)}`//concatinating multiple lines of strings, each correlating to each purchase within array with no extras 
      }
    }
  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------${result}\n-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`// insterting result in final format to be returned 

}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
