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
 if (ticketData[ticketInfo['ticketType']] === undefined) 
 //if ticket data has the key ticketInfo with an key position value of ticketType, and it does not exist, its value will be undefined.
 {
  return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  // return string error message
 }
 if (ticketData[ticketInfo['ticketType']].priceInCents[ticketInfo.entrantType] === undefined) 
 // checks to see if the entrant type ticket is correct or not 
 {
  return `Entrant type 'incorrect-entrant' cannot be found.`;
  // if entrant type is incorrect return error message.
 }
 let extraPrices = 0;
 if (ticketInfo['extras'].length > 0)
 // checks to see if key ticketInfo with the arr extra isn't a an empty arr
 {
  for (a of ticketInfo['extras']) 
  // For of loop will loop thru all the data in extras
  {
    if (ticketData['extras'][a] === undefined) 
    // if any values within extras is found it will be found as undefined
    {
      return "Extra type 'incorrect-extra' cannot be found.";
      // return error message 
    }
    extraPrices += ticketData['extras'][a].priceInCents[ticketInfo.entrantType];
    // 
  }
 }
 return ticketData[ticketInfo['ticketType']].priceInCents[ticketInfo.entrantType]+ extraPrices; 
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
  
  function capitalizeFirstLetter(str) // capitalizes the first letters in necessary positions
  {
    const lower = str.toLowerCase();
    return  str.charAt(0).toUpperCase()+lower.slice(1)

  }

// errors
  let receipt = ""; // declare empty str 4 receipts
  let totalReceiptCost = 0 // declare variable 4 totalReceoptCost with value of 0

  for (let i of purchases) {
    let cost = calculateTicketPrice(ticketData, i); // declare variable with prior function  and incorpate loop data
    if (typeof cost === "string") { // if the vari cost is strictly equal to the data type string 
      return cost; 
    }
totalReceiptCost += cost; // adds all tickets when purchased all at once

let extraTickets = []; // declare empty arr
for (let rcpt = 0; rcpt < i.extras.length; rcpt++) { // loop thru
  extraTickets.push(ticketData["extras"][i.extras[rcpt]].description)
}
if (extraTickets.length > 0){
  extraTickets = (` (${extraTickets.join(", ")})`);
}
receipt += `${capitalizeFirstLetter(i.entrantType)} ${capitalizeFirstLetter(i.ticketType)} Admission: $${(cost/100).toFixed(2)}${extraTickets}\n`
  }
return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(totalReceiptCost/100).toFixed(2)}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
