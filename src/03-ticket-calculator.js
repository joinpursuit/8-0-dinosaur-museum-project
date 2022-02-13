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
 */


function calculateTicketPrice(ticketData, ticketInfo) {
  let ticType = ticketInfo.ticketType; //member or gen
  let entType = ticketInfo.entrantType; // child adult senior
  let addOns = ticketInfo.extras; // extras added sum

  let sum = 0;

  if (!ticketData[ticType]) {
    return `Ticket type '${ticType}' cannot be found.`;
  } else if (!ticketData[ticType].priceInCents[entType]) {
    return `Entrant type '${entType}' cannot be found.`;
  } else {
    sum += ticketData[ticType].priceInCents[entType];
  }

  for (let addOn of addOns) {
    if (!ticketData.extras[addOn]) {
      return `Extra type '${addOn}' cannot be found.`;
    } else {
      sum += ticketData.extras[addOn].priceInCents[entType];
    }
  }
  return sum;
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
 */

function itemLine(ticketData, ticketInfo) {
  // helper function. will return a line similar to the line below
// "\n Adult Membership Admission: $50.00 (Terrace Access, Education Access)"
  let ticType = ticketInfo.ticketType; //member or gen
  let entType = ticketInfo.entrantType; // child adult senior
  let addOns = ticketInfo.extras; // extras added []
  let price = (calculateTicketPrice(ticketData, ticketInfo) / 100).toFixed(2);
  let addOnsReceipt = [];
  for (let addOn of addOns) {
    if (ticketData.extras[addOn]) {
      addOnsReceipt.push(ticketData.extras[addOn].description);
    }
  } if (addOns.length === 0){
    return `\n${entType.charAt(0).toUpperCase() + entType.slice(1)} ${
      ticketData[ticType].description}: $${price}`
  } else {
    return `\n${entType.charAt(0).toUpperCase() + entType.slice(1)} ${
    ticketData[ticType].description}: $${price} (${addOnsReceipt.join(', ')})`;
  }
}

function purchaseTickets(ticketData, purchases) {
  let error = "error string from last problem";
  let fullTotal = 0;
  let receiptBody = ""
  for (let purchase of purchases) {
    if (typeof calculateTicketPrice(ticketData, purchase) === "string") {
      error = calculateTicketPrice(ticketData, purchase);
      return error;
    } else {
      fullTotal += calculateTicketPrice(ticketData, purchase);
    }
  }
  for (let line of purchases){
    receiptBody += itemLine(ticketData, line)
  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------${receiptBody}\n-------------------------------------------\nTOTAL: $${(fullTotal /100).toFixed(2)}`
}


// console.log(purchaseTickets(exampleTicketData, purchases))

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
