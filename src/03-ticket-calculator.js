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
// check ticket type
  if (ticketData[ticketInfo['ticketType']] === undefined) 
  //undefined if type of ticket is not in data. If the key does not exist.  If ticket data has the key ticketInfo, position ticketType, if this data exists it will be undefined. So then return error message.
  {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } 
  // check entrant type
  if (ticketData[ticketInfo['ticketType']].priceInCents[ticketInfo.entrantType] === undefined)
  /* can also code: 
  let basePrice = (ticketData[ticketInfo['ticketType']].priceInCents[ticketInfo.entrantType] === undefined)
  if (basePrice === undefined) 
  */
  {
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  }
  // check extra types 
    let extrasPrice = 0;
  if (ticketInfo['extras'].length > 0) 
  // if ticketInfo key with array of extra, checking if it's an array
  {
    for(let x of ticketInfo['extras'])  // the loop will run through all data of extras 
    {
      if(ticketData['extras'][x] === undefined)  // if any array of extras within ticketData is found it will be undefined.
      {
        return "Extra type 'incorrect-extra' cannot be found.";
      }
      
      extrasPrice += ticketData['extras'][x].priceInCents[ticketInfo.entrantType]; // accumulate: add extrasPrices to ticket price according to the type of entrant
    }
  }
  // console.log (ticketData, ticketInfo);
  return ticketData[ticketInfo['ticketType']].priceInCents[ticketInfo.entrantType] + extrasPrice;
  // If using basePrice return basePrice + extrasPrice.
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
  // console.log (ticketData, purchases);
  
  // Below function capitalizes necessary words
  function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase()+lower.slice(1)
  }

  // errors
let receipts = "";  // declare empty string for receipt
let totalCost = 0 //declare variable for totalCost to 0

for (let i of purchases)  // iterate through purchases 
{
  let costs = calculateTicketPrice(ticketData, i);  // declare variable using prior function data and incorporating loop data
  if (typeof costs === 'string') {  // checks to see if variable is a string. If so, then it's an error.
    return costs // output of 'if' statement 
  }
  totalCost += costs;  // adds up all tickets when purchased simultaneously

  // extras
  let ticketExtras = [];  // declare empty array
  for (let r = 0; r < i.extras.length; r++ )  //loop through extras to see if there are extras purchased
  {
    ticketExtras.push (ticketData["extras"][i.extras[r]].description)     // running through loop and pushes each extra to end
  }
  if (ticketExtras.length > 0) {
    ticketExtras = (` (${ticketExtras.join(", ")})`);
  }  // prints out extras in correct format if it is true (>0 letters)
   receipts += `${capitalize(i.entrantType)} ${capitalize(i.ticketType)} Admission: $${(costs/100).toFixed(2)}${ticketExtras}\n`
  // sets up receipts with correct output format for final return
}
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipts}-------------------------------------------\nTOTAL: $${(totalCost/100).toFixed(2)}`;
  
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
