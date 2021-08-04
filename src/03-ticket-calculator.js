/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
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
  //declare input/output
  let totalPrice = 0;
  let infoType = ticketInfo.ticketType;
  let entrantType = ticketInfo.entrantType;
  let extraType = ticketInfo.extras;

  //check if given ticket contains available admission and take care of edgecase
  if (infoType in ticketData === false || infoType === "extras") {
    return `Ticket type '${infoType}' cannot be found.`;
  }

  //Look for given entrant type in ticketdata
  //if given entrant type is included in ticketdata, calculate price.
  if (entrantType in ticketData[infoType].priceInCents) {
    totalPrice += ticketData[infoType].priceInCents[entrantType];
  } else {
    //otherwise, return error msg
    return `Entrant type '${entrantType}' cannot be found.`;
  }

  if (
    //look for given ticket activities purchased
    extraType.length > 0 &&
    (extraType.includes("movie") ||
      extraType.includes("education") ||
      extraType.includes("terrace"))
  ) {
    //if activity is available recalculate total
    for (let extra of extraType) {
      totalPrice += ticketData.extras[extra].priceInCents[entrantType];
    }
  } //account for unavailable activities edgecase
  else if (
    extraType.length > 0 &&
    !extraType.includes("movie", "education", "terrace")
  ) {
    return `Extra type '${extraType}' cannot be found.`;
  }
  //returns total price in cents
  return totalPrice;
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

function capitalize(str) {
  let first = str[0].toUpperCase();
  let newArr = str.split("");
  newArr.shift();
  return first + newArr.join("");
}

function purchaseTickets(ticketData, purchases) {
  //determine input/output
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;

  //for purchase of purchases to iterate each purchase thru array of purchases
  for (let purchase of purchases) {
    //save the result of calculateTicketprice to a var and use toFixed method to convert currency
    let total = calculateTicketPrice(ticketData, purchase);

    receipt += `${capitalize(purchase.entrantType)} ${
      ticketData[purchase.ticketType].description
    } : ${total} (${purchase.extras})\n`;
  }
  //helper function to capitalize first letter of adult and general (or assign purchase.entrantType & purchase.extras)

  //return
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
