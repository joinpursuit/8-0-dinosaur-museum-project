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
  // 1. Default value and output
  let result = 0
  let error = "Ticket type 'incorrect-type' cannot be found."
  let dataTickets = Object.keys(ticketData)
  let dataEntrants = Object.keys(ticketData.general.priceInCents)
  let dataExtras = Object.keys(ticketData.extras)
  let ticket = ticketInfo.ticketType
  let entrant = ticketInfo.entrantType
  let extraInfo = ticketInfo.extras

//ERRORS
//1. Default Value and Output
  if (ticket === undefined || typeof ticket !== 'string' || !dataTickets.includes(ticket)) {
    return error 
  }

  if (entrant === undefined || typeof entrant !== 'string' || !dataEntrants.includes(entrant)) {
    error = "Entrant type 'incorrect-entrant' cannot be found." 
    return error
  }

  if (extraInfo === undefined || typeof extraInfo !== 'object') {
    error = "Extra type 'incorrect-extra' cannot be found." 
      return error
  }

// EXTRA ERRORS
//1. Default Value and Output
//2. Define the loop and accumulate 
  if (extraInfo.length) {
    for (let extra of extraInfo) {
      if (typeof extra !== 'string') {
        error = "Extra type 'incorrect-extra' cannot be found." 
        return error
      }
      if (!dataExtras.includes(extra)) {
        error = "Extra type 'incorrect-extra' cannot be found." 
        return error
      }
    } 
  }
    
// GENERAL/MEMBERSHIP ADMIN
  let ticketCost = ticketData[ticket].priceInCents
  result = ticketCost[entrant]

//2. Define the loop and accumulate  
// ADMIN WITH EXTRAS
  if (extraInfo.length) {
      for (let extra of extraInfo) {
          let extraCost = ticketData.extras[extra].priceInCents
          result += extraCost[entrant]
      } 
  }

  return result
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

// Helper Function
function capitalize (element) {
  return element[0].toUpperCase() + element.slice(1)
}

function purchaseTickets(ticketData, purchases) {
  //1. Default value and output
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"
  let total = 0
  let ticketPrice = 0
  let newArray = []

  // 2. Define the loop and Accumulate 
  // Each purchase has to be printed out in the receipt in a separate line item
  for (let purchase of purchases) {
    let priceFunction = calculateTicketPrice(ticketData, purchase)
    //ERRORS
    if (typeof priceFunction === 'string') {
      return priceFunction
    }
  //Add Entrant
    let newEntrant = capitalize(purchase.entrantType)
    receipt += newEntrant + " "

  //Add Ticket type and price
    let type = purchase.ticketType
    let newTicket = ticketData[type].description
    receipt += newTicket + ": "
    total += priceFunction/100
    ticketPrice = priceFunction/100
    if (!purchase.extras.length) {
        receipt += "$" + ticketPrice.toFixed(2) + "\n"
    } else {
        receipt += "$" + ticketPrice.toFixed(2) + " "
    }
    //Add extra info
    if (purchase.extras.length) {
        for (let info of purchase.extras) {
            let extraInfo = ticketData.extras[info].description
            newArray.push(extraInfo)
        }
        receipt += `(${newArray.join(", ")})\n` 
        newArray = [] 
    }
  }

  receipt += "-------------------------------------------\n" + "TOTAL: $" + total.toFixed(2)
  
  return receipt

}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
