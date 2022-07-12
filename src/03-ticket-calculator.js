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
  let num = 0; // because I am expected to return a number, this var will allow me to store those numbers.
  // return a string error message in case the key-values in the "ticketInfo" are incorrect.
      if (ticketInfo.ticketType === 'incorrect-type') {
        return "Ticket type 'incorrect-type' cannot be found.";
      }
      else if (ticketInfo.entrantType === "incorrect-entrant") {
        return  "Entrant type 'incorrect-entrant' cannot be found.";
      } else if (ticketInfo.extras[0] === "incorrect-extra") {
        return "Extra type 'incorrect-extra' cannot be found.";
      }
// check if the ticket type in ticket info exist in ticketdata.
// check the entrant type in ticket info and ticket data.
// check the price based on the entrant and ticket types.
// increment "num".
      if (ticketInfo.ticketType in ticketData) {
        if (ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents) {
          num += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
        }
      }
// check for extras in ticket info.
// if extras does exist, add its value to "num".
      for (let x of ticketInfo.extras) {
        if ( x in ticketData.extras) {
          num += ticketData.extras[x].priceInCents[ticketInfo.entrantType];
        }
      }
      // return num;
        return num;
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
  let totalPrice = 0;  // this var will store my totality of the prices.
  // the final string that I will return will have this string first, then more added later.
  let str = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  // looping through the array of object "purchases".
  // recalling the previous function "calculateTicketPrice".
  // this will allow to me to return all the prices that are typeof string instead of number.
  // this will allow me to return only the error messages from the previous function.
  for (let i of purchases) {
    let price = calculateTicketPrice(ticketData, i);
    if (typeof price === 'string') {
      return price;
    }
    let arr = []; // will push values of the "extras" here.
    // looping through the "extras".
    // if extra does exist, push the description to the empty arr.
    //  if many extras exist, join them.
    for (let x of i.extras) {
      arr.push(ticketData.extras[x].description);
    }
    if (i.extras.length) {
      arr = ` (${arr.join(", ")})`;
    }
    // adding ticket info to the str. 
    // use multiple methods() to get the correct formatting of the str.
    // convert from cents to dollars and fixed the price to 2 decimal places.
    // increments the totalPrice and convert from cents to dollars.
    str += `${i.entrantType[0].toUpperCase() + i.entrantType.slice(1)} ${ticketData[i.ticketType].description}: $${(price / 100).toFixed(2)}${arr}\n`;
    totalPrice += (price / 100);
    
  }
  // add a new line and fix the totalPrice to 2 decimal places
  // return the final str.
  str += `-------------------------------------------\nTOTAL: $${totalPrice.toFixed(2)}`;
  return str;
}
// DISCLAIMER: I COULD NOT HAVE DONE THIS WITHOUT A LOT OF SUPPORT AND WORK THROUGH!

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
