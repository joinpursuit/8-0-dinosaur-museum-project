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
  let ticketTypeObj = ticketData[ticketInfo.ticketType];

  // Is the ticket type valid?
  if (!ticketTypeObj) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }

  let ticketCost = ticketTypeObj["priceInCents"][ticketInfo.entrantType];
  if (!ticketCost) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  // Accumulator pattern to calulate all of the extras
  for (let addon of ticketInfo.extras) {
    // Inside of for loop of acculator pattern: Is the extra type valid?
    if (!Object.keys(ticketData.extras).includes(addon)) {
      return `Extra type '${addon}' cannot be found.`;
    }
  }
  for (let addon of ticketInfo.extras) {
    ticketCost +=
      ticketData["extras"][addon]["priceInCents"][ticketInfo.entrantType];
  }
  // return total of ticket cost and the cost of the extras
  return ticketCost;
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

// HELPER FUNCTION
// Returns every word with first charcater as uppercase letter
function capatalize(str) {
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

function purchaseTickets(ticketData, purchases) {
  // reciept variable to bring return at the end with all our purchases totaled
  let reciepts = [];
  let resultFromCalc;
  let entrant;
  let total = 0;

  for (let purchase of purchases) {
    resultFromCalc = calculateTicketPrice(ticketData, purchase);
    // If the return type is a String return it
    // Loop through purchases and use calculateTicketPrice to determine total of purchase
    if (typeof resultFromCalc === "string") {
      return resultFromCalc;
    }

    total += resultFromCalc;

    // use helper gunction to capatalize entrant type
    entrant = capatalize(purchase.entrantType);
    // since resultFromCal = cost format it using /100 & .toFixed(2)
    resultFromCalc = (resultFromCalc / 100).toFixed(2);
    addOnDescr = [];

    for (let addon of purchase.extras) {
      addOnDescr.push(ticketData.extras[addon].description);
    }
    // Adult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"
    if (addOnDescr.length) {
      addOnDescr = ` (${addOnDescr.join(`, `)})`;
    }
    reciepts.push(
      `${entrant} ${
        ticketData[purchase.ticketType].description
      }: $${resultFromCalc}${addOnDescr}\n`
    );
  }

  total = (total / 100).toFixed(2);
  reciepts = reciepts.join("");
  updatedReciept = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${reciepts}-------------------------------------------\nTOTAL: $${total}`;
  return updatedReciept;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
