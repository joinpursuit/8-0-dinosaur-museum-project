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
  //check to see if ticket is valid
  let checkResult = ticketValidation(ticketData, ticketInfo);
  if (checkResult !== true) {
    return checkResult; //return the error message
  }

  //if the ticketInfo has correct ticketType, entrantType and extras, then we can
  //calculate the cost
  let cost = priceOfSingleTicket(ticketData, ticketInfo);

  return cost;
}

/**Calculate and return the cost of a single ticket
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} tiicketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} - the cost of a single ticket
 */
function priceOfSingleTicket(ticketData, ticketInfo) {
  let cost = 0;
  //calculate the cost of the given tickeType
  cost +=
    ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType];

  //calculate the cost of extras
  for (let extraType of ticketInfo.extras) {
    cost +=
      ticketData["extras"][extraType]["priceInCents"][ticketInfo.entrantType];
  }

  return cost;
}

/**
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {*} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {boolean|String} an error message or a true value
 */
function ticketValidation(ticketData, ticketInfo) {
  //if the ticketInfo.ticketType is invalid return error
  if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  //if the ticketInfo.entrantType is invalid return error
  if (
    !ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(
      ticketInfo.entrantType
    )
  ) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  //if the ticketInfo.extras is invalid return error
  const extraTypes = [];

  for (let key in ticketData.extras) {
    extraTypes.push(key);
  }

  if (ticketInfo.extras.length > 0) {
    for (let extra of ticketInfo.extras) {
      if (!extraTypes.includes(extra)) {
        return `Extra type '${extra}' cannot be found.`;
      }
    }
  }

  return true;
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
  //iterate through every tickets, if found any error, then return error message
  for (let i = 0; i < purchases.length; i++) {
    let checkResult = ticketValidation(ticketData, purchases[i]);
    if (checkResult !== true) {
      return checkResult; //return the error message
    }
  }

  let output =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  let costInTotal = 0;
  //add the message of each ticket into the output
  for (let purchase of purchases) {
    output += messageOfSingleTicket(ticketData, purchase);
    costInTotal += priceOfSingleTicket(ticketData, purchase);
  }

  output +=
    `-------------------------------------------\n` +
    `TOTAL: $${(costInTotal / 100).toFixed(2)}`;

  return output;
}

/**Return the formmated message of a single ticket
 *
 * Ex: 'Adult General Admission: $50.00 (Movie Access, Terrace Access)\n'
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} purchase - An object representing data for a single ticket.
 * @param {string} purchases.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {Stirng} - the formmated message of a single ticket
 */
function messageOfSingleTicket(ticketData, purchase) {
  let returnStr = "";
  let extraAccess = "";
  //capitlaize the first letter of the ticketType
  let ticketType =
    purchase.ticketType[0].toUpperCase() + purchase.ticketType.slice(1);
  //capitalize the first letter of the entrantType
  let entrantType =
    purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1);

  //if we have one or more extras, add it to the message
  if (purchase.extras.length > 0) {
    extraAccess += " ("; //opening of the extras
    //add each extras to the message, except for the last one
    for (let i = 0; i < purchase.extras.length - 1; i++) {
      extraAccess +=
        purchase.extras[i][0].toUpperCase() +
        purchase.extras[i].slice(1) +
        " Access, ";
    }
    //closing of the extras
    extraAccess +=
      purchase.extras[purchase.extras.length - 1][0].toUpperCase() +
      purchase.extras[purchase.extras.length - 1].slice(1) +
      " Access)";
  }

  let cost = priceOfSingleTicket(ticketData, purchase);

  //the return message format
  returnStr =
    `${entrantType} ${ticketType} Admission:` +
    ` $${(cost / 100).toFixed(2)}${extraAccess}\n`;

  return returnStr;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
