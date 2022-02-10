/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { membership } = require("../data/tickets");
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
  const tickTypeArr = ['general', 'membership']
  const tickEntrantArr = ['child', 'adult', 'senior']
  const tickExtrasArr = ['movie', 'education', 'terrace']
  
  let error = false
  let typeError = ''
  let entrantError = ''
  let extraError = ''
  let total = 0

        // ERROR CHECKER \\
  error = ticketErrorChecker(ticketInfo, error)

  function ticketErrorChecker(ticketInfo, error) {

    if (!tickTypeArr.includes(ticketInfo.ticketType)) {
      typeError = `Ticket type '${ticketInfo.ticketType}' cannot be found.`
      error = true
    } else if (!tickEntrantArr.includes(ticketInfo.entrantType)) {
      entrantError = `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      error = true
    }
    for (const extra of ticketInfo.extras) {
      if (!tickExtrasArr.includes(extra)) {
        extraError = `Extra type '${ticketInfo.extras}' cannot be found.`
        error = true
      }
    }
    return error
  }
  
        //  MAIN SOLUTION \\
  total = ticketsTotal(ticketData, ticketInfo, total)

  function ticketsTotal(ticketData, ticketInfo, total) {
    const type = ticketInfo.ticketType
    const entrant = ticketInfo.entrantType
    const extras = ticketInfo.extras

    if (type in ticketData) {
      if (entrant in ticketData[type].priceInCents) {
        total += ticketData[type].priceInCents[entrant]
      }
    }
    if (extras.length > 0) {
      for (const extra of extras) {
        if (extra in ticketData.extras) {
          total += ticketData.extras[extra].priceInCents[entrant]
        }
      }
    }
    return total
  }

        // CHECK ERROR \\
  if (error === false) {
    return total
  } else {
    if (typeError !== '') {
      return typeError
    } else if (entrantError !== '') {
      return entrantError
    } else if (extraError !== '') {
      return extraError
    }
  }
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

  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
  let totalPrice = 0

  for (const purchase of purchases) {
    let total = calculateTicketPrice(ticketData, purchase)

    if (typeof total !== 'number') {
      return total
    } else {
      if (purchase.extras.length > 0) {
        receipt += `${capitalizeFirstLetter(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${(total/100).toFixed(2)}${ticketExtras(ticketData, purchase)}\n`
      } else {
        receipt += `${capitalizeFirstLetter(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${(total/100).toFixed(2)}\n`
      }
      totalPrice += total / 100
    }
  }

  function capitalizeFirstLetter(str) {
    let letter = str.charAt(0).toUpperCase()
    let word = str.slice(1)

    return str = letter + word
  }

  function ticketExtras(ticketData, purchase) {
    let str = ' ('
    let arr = purchase.extras

    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        str += `${ticketData.extras[arr[i]].description})`
      } else {
        str += `${ticketData.extras[arr[i]].description}, `
      }
    }
    
    return str
  }

  return receipt + `-------------------------------------------\nTOTAL: $${totalPrice.toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
