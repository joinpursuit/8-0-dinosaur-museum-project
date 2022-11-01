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
  const { ticketType, entrantType, extras } = ticketInfo;

  console.log('ticketInfo:', ticketInfo);

  const admission = ticketData[ticketType];
  if (typeof admission !== 'object') return `Ticket type 'incorrect-type' cannot be found.`;
  console.log('admission:', admission);
  const admissionPrice = admission.priceInCents[entrantType];
  if (typeof admissionPrice !== 'number')
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  let extrasPrice = 0;
  for (const extra of extras) {
    const extraPrice = ticketData.extras[extra]?.priceInCents[entrantType];
    if (typeof extraPrice !== 'number') return `Extra type 'incorrect-extra' cannot be found.`;
    extrasPrice += extraPrice;
  }

  return admissionPrice + extrasPrice;
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
// capitalize first letter
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

// format price in cents into price in dollars with double digits
function priceToStr(price) {
  return `$${(price / 100).toFixed(2)}`;
}

// get purchase price and purchase description string from ticketInfo object
// if invalid purchase return null and error string correspondingly
function getPurchaseDescription(ticketData, ticketInfo) {
  // convert extras array of strings into string of extras descriptions
  function extrasToStr(extras) {
    return extras.length
      ? ` (${extras.map(extra => ticketData.extras[extra].description).join(', ')})`: '';
  }

  // pull out useful constants from ticketInfo object
  const { ticketType, entrantType, extras } = ticketInfo;

  // get the purchase "price", which can suddenly become an error string
  const price = calculateTicketPrice(ticketData, ticketInfo);
  // so we need to check that strange behavior of 'calculateTicketPrice' function
  const isValidPurchase = typeof price === 'number';
  // if the purchase is invalid set the actual price to null
  const purchasePrice = isValidPurchase ? price : null;
  // if the purchase is valid - format purchase string as required
  // otherwise it becomes the error message
  const purchaseString = isValidPurchase
    ? `\n${capitalize(entrantType)} ${ticketData[ticketType].description}: ${priceToStr(
        price
      )}${extrasToStr(extras)}`
    : price;
  // return an array containing the purchase price (null if the purchase is invalid)
  // and purchase description string (or error message)
  return [purchasePrice, purchaseString];
}

function purchaseTickets(ticketData, purchases) {
  let totalPrice = 0;
  let purchasesStr = '';

  for (const purchase of purchases) {
    // pull out constants from returned by the function array
    const [purchasePrice, purchaseString] = getPurchaseDescription(ticketData, purchase);
    if (purchasePrice === null) {
      // the purchase is invalid
      totalPrice = null;
      purchasesStr = purchaseString;
    } else {
      // the purchase is valid
      // add the price to total, concatenate purchase description strings
      totalPrice += purchasePrice;
      purchasesStr += purchaseString;
    }
  }

  // if a purchase is invalid return the error message
  // otherwise return receipt string

  return totalPrice === null
    ? purchasesStr
    : `Thank you for visiting the Dinosaur Museum!
-------------------------------------------${purchasesStr}
-------------------------------------------
TOTAL: ${priceToStr(totalPrice)}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};