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
 * Returns the ticket price based on the ticket information supplied to the function. The `ticket` will be in the following shape. See below for more details on each key.
 * const ticket = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticket.ticketType` value or `ticket.entrantType` value is incorrect, or any of the values inside of the `ticket.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketType - An object representing data for a single ticket.
 * @param {string} ticket.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticket.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticket.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticket = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticket);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticket = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticket);
    //> 2500

 * EXAMPLE:
 *  const ticket = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticket);
    //> "Entrant type 'kid' cannot be found."
 */

    // rename parameters if needed (e.g. from ticketInfo to ticket)
function calculateTicketPrice(ticketData, ticket) {
  // 1. Default value and output

//USE DESTRUCTURING INSTEAD 
  const [ticketType, entrantType, extraInfo] = [ticket.ticketType, ticket.entrantType, ticket.extras]

  //ERROS
  // This next line is called walking the object. (it's more dynamic)
  if (ticketData[ticketType] === undefined) { //|| typeof ticketType !== 'string') {
    return `Ticket type '${ticketType}' cannot be found.`
  }   

  if (ticketData[ticketType].priceInCents[entrantType] === undefined) {
    return `Entrant type '${entrantType}' cannot be found.`
  }


  // GENERAL/MEMBERSHIP ADMIN
  let result = ticketData[ticketType].priceInCents[entrantType]


//2. Define the loop and accumulate (extras)
for (let extra of extraInfo) {
    if (ticketData.extras[extra] === undefined) {
      return `Extra type '${extra}' cannot be found.`
    } else { 
      // NOTE: combine to get one line code vs declare new variables - or not production app/level code) 
      // Though it's easier to read, when it's broken down 
      result += ticketData.extras[extra].priceInCents[entrantType]
    }

  }

  return result
}

// To debug, call - 
// const ticket = {...etc.}
// calculateTicketPrice(exampleTicketData, ticket)

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
//CREATE JSDoc comments for the Helper Functions

// Helper Functions
function capitalize (element) {
  return element[0].toUpperCase() + element.slice(1).toLowerCase()
}

function formatPrice(number) {
  return `$${(number/100).toFixed(2)}`
}

function addExtrasString(ticketData, extraInfo) {
  let receipt = ""
  let newArray = [];
  if (extraInfo.length) {
    for (let info of extraInfo) {
      newArray.push(ticketData.extras[info].description)
    }
    receipt += `(${newArray.join(", ")})`
    newArray = [] 
  }
  return receipt  
}


function purchaseTickets(ticketData, purchases) {
  //1. Default value and output
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"
  let total = 0

  // 2. Define the loop and Accumulate 
  // Each ticket has to be printed out in the receipt in a separate line item
  for (let ticket of purchases) {
    let price = calculateTicketPrice(ticketData, ticket)
    
  //ERRORS
    if (typeof price === 'string') {
      return price
    }
  //Add Entrant, ticket type, description, price and extra info, if any
    let newEntrant = capitalize(ticket.entrantType)
    let newTicket = ticketData[ticket.ticketType].description    

    if (!ticket.extras.length) {
      // DRY Don't repeat yourself 
      // WET write everything twice (it's fine to write a logic twice ) 
      // anything more, put it in helper functions 
      // Example - create a Helper function for formatting things and other logic
      receipt += `${newEntrant} ${newTicket}: ${formatPrice(price)}\n`
    } else {
      receipt += `${newEntrant} ${newTicket}: ${formatPrice(price)} ${addExtrasString(ticketData, ticket.extras)}\n`
    }
    
    total += price
    
  }

  receipt += `-------------------------------------------\nTOTAL: ${formatPrice(total)}`
  
  return receipt

}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
