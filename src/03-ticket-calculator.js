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
// default ticket price value
  let ticketPrice = 0
// first if checks if the ticketInfo ticketType keypair is false. second if checks for if the entrant's type cost is false using priceInCents. The ticketprice will then be determined by the entrant type.
if (!(ticketInfo.ticketType in ticketData)) {
  return `Ticket type 'incorrect-type' cannot be found.`
}
if ( !(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents)) {
  return `Entrant type 'incorrect-entrant' cannot be found.`
}  
 ticketPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]

// last if checks for the condition for the elements in the array. this for loop iterates thrugh the array of ticketInfo. the ticketPrice will be based of the type of extras in each iteration
if (ticketInfo.extras.length) {
  for (const extra of ticketInfo.extras) {
    if (extra in ticketData.extras) { 
      ticketPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType]
    }
    else {
      return `Extra type 'incorrect-extra' cannot be found.`
    }
  }
}
return ticketPrice
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
// default values
let total = 0 
let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"

// outer loop to iterate
for(let purchase of purchases){

// default value  
let costOfTicket = calculateTicketPrice(ticketData, purchase);
  
// first if checks if the cost of the ticket isnt a numbeer
  if(typeof costOfTicket === 'string'){
    return costOfTicket
  }

// array for description for extras  
let extraInfo = []

// inner loop to iterate through extras in purchase array for description key
for(let extra of purchase.extras){

// pushed into array extraInfo  
  extraInfo.push(ticketData.extras[extra].description)
}

// second if checks if the length is true. then will formart entrant type, access, and the cost of the ticket in a receipt. finally, the receipt with total price will be formatted
if(purchase.extras.length){
  extraInfo = ` (${extraInfo.join(', ')})`
}
receipt += `${purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(costOfTicket/100).toFixed(2)}${extraInfo}\n`
total += costOfTicket/100
}
receipt += `-------------------------------------------\nTOTAL: $${total.toFixed(2)}`
return receipt
}
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
