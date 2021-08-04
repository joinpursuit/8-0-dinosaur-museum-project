/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
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
  let ticketType = ticketInfo.ticketType;
  let entrantType = ticketInfo.entrantType;
  let totalPrice = 0;
  let extras = ticketInfo.extras;

  //the first thing is to ckeck if the ticket type that the gave us exist
  if (!(ticketType in ticketData)) {
    return `Ticket type '${ticketType}' cannot be found.`;
  }
  //if it does then if it does we are going to see what type of ticket they
  //are going to get.

  //we are checking to see if we have a ticket that we could sell in or tickets object,
  //that way we know if we have a matching entrantType
  if (entrantType in ticketData[ticketType].priceInCents) {
    totalPrice += ticketData[ticketType].priceInCents[entrantType];
  } else {
    //if we dont have a ticket to be sold if to that entrant type if because we couldnt find it.
    return `Entrant type '${entrantType}' cannot be found.`;
  }
  //Im going to check what add ons they got by looping throught the extras array.
  for (let adds of extras) {
    //Coparing the add ons to the tickets extras.
    if (adds in ticketData.extras) {
      //If it is then add the adds on price for there age
      totalPrice += ticketData.extras[adds].priceInCents[entrantType];
    } else {
      //If the add doesn't exist then return the add can not be found.
      return `Extra type '${adds}' cannot be found.`;
    }
  }
  //return my totoal price.
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
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General description  $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

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

function receiptPrinter(ticketData, person) {
  // making the First word of the entrant captalized
  let customer = person.entrantType[0].toUpperCase() + person.entrantType.slice(1);
  //This gets the description for the ticketType
  let description = ticketData[person.ticketType].description;
  //Gets the price for every ticket
  let ticketPrice = ticketData[person.ticketType].priceInCents[person.entrantType];
  let extras = [];
  let receipt = "";

  //this is checking to see if the person/ticket we are dealing with got extras
  if (person.extras.length > 0) {
    for (let adds of person.extras) {//if it does push there description to the empty array i created
      extras.push(ticketData.extras[adds].description);
    }
  }
  //if there are no extras then add that line to my receipt
  if (!person.extras.length)
    receipt += `${customer} ${description}: $${(ticketPrice / 100).toFixed(2)}\n`;
  //if they are extras then add those extras to the ticketPrice
  if (extras.length > 0) {
    for (let adds of person.extras) {
      ticketPrice += ticketData.extras[adds].priceInCents[person.entrantType];
    }//adding that line to my receipt
    receipt += `${customer} ${description}: $${(ticketPrice / 100).toFixed(2)} (${extras.join(", ")})\n`;
  }//returns the body of my recipt
  return `${receipt}`;
}


function purchaseTickets(ticketData, purchases) {
  let totalCost = 0;
  let receipt = "";
  let amount = 0;
  //header of my receipt.
  let templet = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  //this loop is just checking wheter or not we got an error message
  for (let purchase of purchases) {
    amount = calculateTicketPrice(ticketData, purchase);
    if (typeof amount === "string") {
      //from this helper functiowe are either getting a string with is an error message or a number.
      return amount;
    } else {
      //if we did not get an error message we are going to be adding the amount that we get back for every ticket.
      totalCost += amount;
    }
  }

  //We are transforming totalCost from cents to dollars.
  totalCost = (totalCost / 100).toFixed(2);

  //calling my helper function to print the body of my recipt
  for (let purchase of purchases) {
    receipt += receiptPrinter(ticketData, purchase);
  }
  //returns my full recipt
  return `${templet}${receipt}-------------------------------------------\nTOTAL: $${totalCost}`;
}



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
