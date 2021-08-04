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
  // Guard Clauses - errors
    // if `ticketType` !== existing `ticketType`
    // if `entrantType` !== existing `entrantType`
    // if `extraType` !== existing `extraType`

  // Main Function - no extras:
    // Calculate `generalTicketCost` for `entrantType` without any addons
    // Calculate `membershipTicketCost` for `entrantType` without any addons

  // Edge Cases - with extras:
      // Calculate `generalTicketCost` (w/movie extra; movie/education extra; terrace/education extra; all extras)
      // Calculate `membershipTicketCost` (w/movie extra; movie/education extra; terrace/education extra; all extras)

  // Return `ticketPrice` based on ticket information supplied to the function.

  // write actual pseudocode:
  // Declare variable to track `totalPrice`
  // Create 
  // ticketData.membership.priceInCents.senior

  // take care of guard clauses first
  if (!(ticketInfo.ticketType in ticketData)) {
    return `Ticket type 'incorrect-type' cannot be found.`
  }
  if (!(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents)) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  // Iterate through each `extra` type to get to the `extraType`
  for (let extra of ticketInfo.extras) {
    if (!(extra in ticketData.extras)) {
      return `Extra type 'incorrect-extra' cannot be found.`
    }
  }

  // total price of any given ticket
  let totalPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  // extras
  // Iterate (loop) through the `ticketInfo.extras` array to find all the `extra`
  // Find `extra` price in the `ticketInfo.extras` array by accessing it from the `ticketData.extras[extra].priceInCents[ticketInfo.entrantType]`
  for (let extra of ticketInfo.extras) {
    // Add `extra` price to `totalPrice`
    totalPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
  }
  // Return `totalPrice`
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


/**
 * Helper Function #1
 * @param {*} ticketData - object of tickets
 * @param {*} ticketInfo - info about a ticket
 * @returns {string} - returns a formatted string
 * @description - if empty, should not return anything
// if has an input/multiple inputs, should return those inputs
 */
function formatted(ticketData, ticketInfo) {
  // makes a copy of extras
  let newArr = ticketInfo.extras.slice(0);
  let newStr = "";
  // if `newArr.length` is more than zero
  if (newArr.length) {
    // if we are sure its just 1
    newStr += " (";
    for (let i = 0; i < newArr.length; i++) {
      // if `i` equals last index element `newArr.length -1`
      if (i === newArr.length -1) {
        newStr += ticketData.extras[newArr[i]].description + ")";
      }
      // if more than 1 index element
      else newStr += ticketData.extras[newArr[i]].description + ", ";
    }
  }
  // if 0 in extras
  return newStr;
}
// check if helper function works
// console.log(formatted(ticketData, ticketInfo));

/**
 * Helper Function #2
 * @param {string} - str
 * @returns {string} - returns a string with the first letter in cap letter.
 */
 function capitalize(str){
  let first  = str[0].toUpperCase();
  let newArr = str.split("");
  newArr.shift();
  return first + newArr.join("");
}
// call the function from before with parameters
// check if it is a number
// use helper function to get multiple inputs for extras/ the string with parentheses, and call it here
// ticket.ticketType - to choose btwn membership or general, be dynamic

function purchaseTickets(ticketData, purchases) {
  // Declare variable `newStr` - beginning of receipt message
  let newStr = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  // keep track of `total`
  let total = 0;
  // iterate through `purchases`, each called `ticket` - Adult, Senior, Child
  for (let ticket of purchases) {
    let subTotal = 0;
    let check = calculateTicketPrice(ticketData, ticket);
    // you could check if it's not a number first, to see if theres an error & return the error right away
    // Compare if check is a `number`
    if (typeof check === "number") {
      subTotal = check;
      newStr += `${capitalize(ticket.entrantType)} ${ticketData[ticket.ticketType].description}: $${(subTotal/100).toFixed(2)}${formatted(ticketData, ticket)}\n`;
      // add `subTotal` to the `total`
      total += subTotal/100;
    }
    else return check;
  }
  // return `newStr` outside for loop - end of receipt message
  return newStr += "-------------------------------------------\nTOTAL: $" +total.toFixed(2);
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
