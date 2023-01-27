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
  let total;
  //lines 60 - 65 are guard checking for errors by checking if ticketData has the properties given.
  if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  else if (!ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty([ticketInfo.entrantType])) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  //looping through tickeData checking for a match with ticketType
  for (let ticket in ticketData) {
    if (ticket === ticketInfo.ticketType) {
      //if theres a match return the price of that ticket
      total = ticketData[ticket].priceInCents[ticketInfo.entrantType];
    }
  }
  //checking for extras in ticket
  if (!ticketInfo.extras.length) {
    return total;
  }
  //if theres extras then add prices of extras to total
  for (let i = 0; i < ticketInfo.extras.length; i++) {
    let extra = ticketInfo.extras[i];
    if (!ticketData.extras.hasOwnProperty(extra)) {
      return `Extra type '${extra}' cannot be found.`;
    }
    for (let priceOfExtra in ticketData.extras) {
      if (priceOfExtra === extra) {
        total += ticketData.extras[priceOfExtra].priceInCents[ticketInfo.entrantType];
      }
    }
  }
  return total;
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
  //declaring and initializing variables to be used
  let ticketPurchase;
  let receipt = "Thank you for visiting the Dinosaur Museum!\n";
  let divider = "-------------------------------------------\n";
  let total = 0;
  let priceOfTicket;
  receipt += divider;
  //looping through tickets array
  for (let i = 0; i < purchases.length; i++) {
    ticketPurchase = purchases[i];
    //return the price of each ticket by calling the calculateTicketPrice function
    priceOfTicket = calculateTicketPrice(ticketData, ticketPurchase);
    //if priceOfTicket is not a number - then it is an error message, return error message
    if (typeof priceOfTicket !== "number") {
      return priceOfTicket;
    }
    priceOfTicket /= 100;
    //adding the price of each ticket to the total
    total += priceOfTicket;
    //checking if each tickets has any extras
    if (!ticketPurchase.extras.length) {
      receipt += `${ticketPurchase.entrantType[0].toUpperCase() + ticketPurchase.entrantType.substring(1)} ${ticketData[ticketPurchase.ticketType].description}: $${priceOfTicket.toFixed(2)}\n`;
    } 
    //if tickets has extras add them to receipt
    else {
      receipt += `${ticketPurchase.entrantType[0].toUpperCase() + ticketPurchase.entrantType.substring(1)} ${ticketData[ticketPurchase.ticketType].description}: $${priceOfTicket.toFixed(2)} (`;
      //looping through extras
      for (let j = 0; j < purchases[i].extras.length; j++) {
        //to circumvent for the commas when there is more than one extra - the loop is adding a comma to each extra except the last one
        if (j !== purchases[i].extras.length - 1) {
          receipt += `${purchases[i].extras[j][0].toUpperCase()}${purchases[i].extras[j].substring(1)} Access, `;
        } else {
          receipt += `${purchases[i].extras[j][0].toUpperCase()}${purchases[i].extras[j].substring(1)} Access`;
        }
      }
      //pretty printing the receipt
      receipt += ")";
      receipt += "\n";
    }
  }
  receipt += divider;
  receipt += `TOTAL: $${total.toFixed(2)}`;
//after pretty printing the receipt return it
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};