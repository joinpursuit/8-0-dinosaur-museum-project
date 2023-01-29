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
 * Returns the ticket price based on the ticket information supplied to the function. 
 * The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, 
 * or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
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
function calculateTicketPrice(ticketData, ticketInfo) { // TODO - Refactor function into a switch statement if possible
  let cost = 0

  if (ticketInfo.ticketType === 'general') { //> General Admission
    if (ticketInfo.entrantType === 'child') {
      cost = ticketData.general.priceInCents.child
    } else if (ticketInfo.entrantType === 'adult') {
      cost = ticketData.general.priceInCents.adult
    } else if (ticketInfo.entrantType === 'senior') {
      cost = ticketData.general.priceInCents.senior
    } else {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
    }
   } else if (ticketInfo.ticketType === 'membership') { //> Membership Admission
    if (ticketInfo.entrantType === 'child') {
      cost = ticketData.membership.priceInCents.child
    } else if (ticketInfo.entrantType === 'adult') {
      cost = ticketData.membership.priceInCents.adult
    } else if (ticketInfo.entrantType === 'senior') {
      cost = ticketData.membership.priceInCents.senior
    } else {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
    }
  } else { //> Edge Case -- Invalid Ticket Type Information
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }

  // Extras
  if (ticketInfo.extras.length > 0) { //> If an incorrect extra is provided, returns an error
    if (ticketInfo.extras.includes('movie') === false && ticketInfo.extras.includes('education') === false && ticketInfo.extras.includes('terrace') === false) {
      return `Extra type '${ticketInfo.extras[0]}' cannot be found.`
    }
  }
  
  if (ticketInfo.extras.includes('movie')) {
    cost += 1000
  }

  if (ticketInfo.extras.includes('education')) {
    if (ticketInfo.entrantType === 'child') {
      cost += 1000
    } else {
      cost += 1200
    }
  }

  if (ticketInfo.extras.includes('terrace')) {
    if (ticketInfo.entrantType === 'child') {
      cost += 500
    } else {
      cost += 1000
    }
  }

  return cost
} 

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. 
 * Each "purchase" maintains the shape from `ticketInfo` in the previous function.
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
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n
    Adult General Admission: $50.00 (Movie Access, Terrace Access)\n
    Senior General Admission: $35.00 (Terrace Access)\n
    Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
    Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
    -------------------------------------------\n
    TOTAL: $175.00"

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
function purchaseTickets(ticketData, purchases) { //Consider refactoring into a switch statement or using multiple functions
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
  let total = 0
  let cost = 0
  let addonMovie = false
  let addonEdu = false
  let addonTer = false

  
  for (const element of purchases) {
    if (element.ticketType === 'general') {
      if (element.entrantType === 'child') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Child General Admission: $${(cost / 100).toFixed(2)}`
      } else if (element.entrantType === 'adult') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Adult General Admission: $${(cost / 100).toFixed(2)}`
      } else if (element.entrantType === 'senior') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Senior General Admission: $${(cost / 100).toFixed(2)}`
      } else {
        return `Entrant type '${element.entrantType}' cannot be found.`
      }
    } else if (element.ticketType === 'membership') {
      if (element.entrantType === 'child') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Child Membership Admission: $${(cost / 100).toFixed(2)}`
      } else if (element.entrantType === 'adult') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Adult Membership Admission: $${(cost / 100).toFixed(2)}`
      } else if (element.entrantType === 'senior') {
        cost = calculateTicketPrice(ticketData, element)
        receipt += `Senior Membership Admission: $${(cost / 100).toFixed(2)}`
      } else {
        return `Entrant type '${element.entrantType}' cannot be found.`
      }
    } else {
      return `Ticket type '${element.ticketType}' cannot be found.` //> Produces error if invalid ticketType is given
    }
    // Extras
    if (element.extras.length > 0) { //> If an incorrect extra is provided, returns an error
      if (element.extras.includes('movie') === false && element.extras.includes('education') === false && element.extras.includes('terrace') === false) {
        return `Extra type '${element.extras[0]}' cannot be found.`
      } else {
        if (element.extras.length === 1) {
          receipt += ` (${element.extras[0].charAt(0).toUpperCase() + element.extras[0].slice(1, element.extras[0].length)} Access)\n`
        } else if (element.extras.length > 1) {
          receipt += ` (`
          // for the length of the loop, add the name of the access with a comma after unless it is the last element
          let i = 0
          while (i < element.extras.length) {
            if (i === element.extras.length - 1) {
              receipt += `${element.extras[i].charAt(0).toUpperCase() + element.extras[i].slice(1, element.extras[i].length)} Access`
              i++
            } else {
              receipt += `${element.extras[i].charAt(0).toUpperCase() + element.extras[i].slice(1, element.extras[i].length)} Access, `
              i++
            }
          }
          receipt += ')\n'
        }
      }
    } else if (element.extras.length === 0) {
      receipt += '\n'
    }
    total += cost
  }

  // Error Handling - Should produce an error if an invalid extra is provided
  // - Should produce an error if an invalid entrantType is provided

  return receipt += `-------------------------------------------\nTOTAL: $${(total / 100).toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
