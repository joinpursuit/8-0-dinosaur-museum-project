/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
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
  //the return should be the cost of the ticket so we will start at 0
  let cost = 0;

  // check all cases of incorrect options entered
    if (ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership"){
      return `Ticket type \'${ticketInfo.ticketType}\' cannot be found.`;
    }
    if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior"){
      return `Entrant type \'${ticketInfo.entrantType}\' cannot be found.`;
    }
    if (ticketInfo.extras.includes("incorrect-extra")){
      return `Extra type \'${ticketInfo.extras}\' cannot be found.`;
    }
    // if the ticket type is valid
    if (ticketInfo.ticketType === "general" || "membership"){
      cost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
    } 
       //loop to add extras 
  for (let extras of ticketInfo.extras){ 
    //if the ticket data extra includes the extra from the ticket info
  if (ticketData.extras){
    cost += ticketData.extras[extras].priceInCents[ticketInfo.entrantType];
  }
}
  return cost;
}

// if (!ticketInfo.extras.includes("movies") && !ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")){
//   return `Extra type \'${ticketInfo.extras}\' cannot be found.`;
// }
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
  //starting point of the receipt 
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  //the total price should start 0
  let total = 0;
  //loop thru each purchase array
  for (let i = 0; i < purchases.length; i ++){
    //create variable for the previous function
    let currentTicket = calculateTicketPrice(ticketData, purchases[i]);
    //the price of each ticket calculates with each run of the loop
    total += currentTicket;
    //from the previous function, the output could be a string error message or a number so we will check if its a string
    if (typeof(currentTicket) === 'string') {
      //if it is a string, it will be an error message so return it
      return currentTicket;
    }
    //create a variable to store the extras array
    let extras = purchases[i].extras;
    //the extras receipt will be a separate receipt because some may not have any extras
    let extrasReceipt = '';
    //loop thru extras array
    for (let j = 0; j < extras.length; j++){
      //the extras description is added to the receipt
      extrasReceipt += ticketData.extras[extras[j]].description;
      /*if the extras array length - 1 isn't equal to index j (because we don't want a comma and space after the last element), add a comma and space. when the array length - 1 is equal to index j, the loop stops*/
      if (extras.length - 1 !== j) {
        extrasReceipt += ', ';
      }
    }
    //this is the receipt without any extras
    receipt += `${purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)} ${ticketData[purchases[i].ticketType].description}: $${(currentTicket / 100).toFixed(2)}`;
    //if there are any extras, add them and then a new line
    if (extras.length){
      receipt += ` (${extrasReceipt})\n` 
    } else {
      //if there are not any extras, just a new line
      receipt += `\n` 
    }
  }
    //return the receipt and add the total price with the total converted from cents and fixed 2 decimal places
  return `${receipt}-------------------------------------------\nTOTAL: $${(total / 100).toFixed(2)}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
