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
  // declaring variable to represent the value of the ticketType key in the ticketInfo parameter
  let ticketType = ticketInfo.ticketType;
  // declaring variable to represent the value of the entrantType key in the ticketInfo parameter
  let entrantType = ticketInfo.entrantType;
  // declaring variable to represent the basic ticket price to use as output for the function
  let ticketPrice = 0;
  // declaring variable to represent the added price with extras to use as output for the function 
  let extrasPrice = 0;
  // using an if/in statement and bang operator to determine if the value of the ticketType variable is not in the ticketData parameter
  if (!(ticketType in ticketData)) {
    // returning an error message as a template literal to reference the value of the ticketType variable 
    return `Ticket type '${ticketType}' cannot be found.`
  } 
  // if/in statement with bang operator to determine if the value of the entrantType variable cannot be found in the priceInCents key in the ticketData parameter
  // the value of the ticketType variable is being used to access a key within the ticketData parameter
  if (!(entrantType in ticketData[ticketType].priceInCents)) {
    // returning an error message as a template literal to reference the value of the entrantType variable has not been found
    return `Entrant type '${entrantType}' cannot be found.`
  }
  // using the value of the ticketType variable to reference a key within the ticketData parameter
  // using the value of the entrantType variable to reference a value of a the key priceIncents in the ticketData parameter
  ticketPrice = ticketData[ticketType].priceInCents[entrantType];
  // using for of loop to iterate through all the elements of the array in the extras key in the ticket info parameter
  for (let extra of ticketInfo.extras) {
    // if statement with bang operator inside of for loop to determine if the value of the extra variable is not found in the array inside of the extras key in the ticketData parameter
    if (!(extra in ticketData.extras)) {
      // returning an error message as a template literal to reference value of the extra variable
      return `Extra type '${extra}' cannot be found.`
      // else statement
    } else {
      // using value of entrantType variable to reference value of the priceInCents key
      // using value of extra variable to reference value of extras key in the ticketData parameter
      // adding the value of priceInCents key to extrasPrice variable
      extrasPrice += ticketData.extras[extra].priceInCents[entrantType]
    }
  }
  // returning value of ticketPrice variable plus the extrasPrice variable
  return ticketPrice + extrasPrice
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
function purchaseTickets(ticketData, purchases) {}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
