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
  // default value, keep track of the total price
  let aticketPrice = 0;
  // check if the ticket type is valid
  if (ticketInfo.ticketType in ticketData) {
    // if true, check if the ticket entrant type is valid
    if (ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents) {
      // if true, get the price in cents of the specific entrant type
      aticketPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
    }
    // if false return an error that entrant type cannot be found.
    else return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;

  }
  // if false return an error that ticket type is incorrect
  else return "Ticket type 'incorrect-type' cannot be found.";
  // check if the ticket has extras
  if (ticketInfo.extras.length) {
    // if true make a copy of the extras array
    let extrasArr = ticketInfo.extras.slice(0);
    // iterate over all elements in extras array
    for (let elem of extrasArr) {
      // check if extra type is valid
      if (elem in ticketData.extras) {
        // if yes, access the specific price
        aticketPrice += ticketData.extras[elem].priceInCents[ticketInfo.entrantType];
      }
      // if no return an error: etra type cannot be found
      else return `Extra type '${elem}' cannot be found.`;

    }

  }
  // return the total price in cents
  return aticketPrice;
 
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
 * used as function helper of the purchaseTickets function
 * returns a formatted string depending on the ticket
 * @param {*} ticketData - object of tickets
 * @param {*} ticketInfo - info about a ticket 
 * @returns {string} - returns a formatted string
 */
 function formatted(ticketData, ticketInfo) {
  let newArr = ticketInfo.extras.slice(0);
  let newStr ="";
  if (newArr.length) {
    newStr += " (";
    for(let i=0; i < newArr.length; i++) {
      if (i === newArr.length-1) {
        newStr += ticketData.extras[newArr[i]].description + ")"
      }
      else newStr += ticketData.extras[newArr[i]].description + ", "
    }
  }
  return newStr;
}
/**
 * used as function helper of the purchaseTickets function
 * @param {string} str
 * @returns {string} returns a string with the first letter in capital letter.
 */
function capitalize(str){
  let first  = str[0].toUpperCase();
  let newArr = str.split("");
  newArr.shift();
  return first + newArr.join("");
}


function purchaseTickets(ticketData, purchases) {
  // default value to this string
  let newStr = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  // need to keep track of all purchases total
  let total = 0;
  // keep track of a single ticket price
  let subTotal;
  // iterate over all purchases
  for (let ticket of purchases) {
    // always start the variable at zero for each purchase
    subTotal =0;
    // used the previous function to get a single ticket price
    // we will need to check the validation of the return from the calculateTicketPrice function
    let checkValidation = calculateTicketPrice(ticketData, ticket) ;
    // check if the return is valid
    if (typeof checkValidation === "number") {
      // if valid then assign the value subTotal
      subTotal = checkValidation;
      // construct the receipt in each iteration using helper functions
      newStr += `${capitalize(ticket.entrantType)} ${ticketData[ticket.ticketType].description}: $${(subTotal/100).toFixed(2)}${formatted(ticketData, ticket)}\n`;
      // assign the subtotal divided by 100 to total
      total += subTotal/100;
    }
    // if not returned the error
    else return checkValidation;
    
  }
  // return the final receipt
  return newStr += "-------------------------------------------\nTOTAL: $" +total.toFixed(2);
}
//purchaseTickets(exampleTicketData, purchases);
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
