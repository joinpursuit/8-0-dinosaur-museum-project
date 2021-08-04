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
// create a helper function match the entry type to the keys in priceInCents to entry type
function matchPriceWithVisitorType (priceInCents, ticketInfo) {
  let cost = 0;
  for (const value in priceInCents) {
    if (value === ticketInfo.entrantType) {
      cost += priceInCents[value]
    };
  };
  return cost;
}

// create a helper function to match the key in ticketData.extra to key in ticketInfo.extras
function extras (extras, ticketData, ticketInfo) {
  for (const key in ticketData.extras) {
    const invoke = matchPriceWithVisitorType(ticketData.extras[key]['priceInCents'], ticketInfo)

    if (key === extras) {
      // return invoke to match the entry type to the keys in priceInCents to entry type
      return invoke;
    };
  };
}

function calculateTicketPrice(ticketData, ticketInfo) {
  // edge case: if ticket type is something other than `general` or `membership`
  if (ticketInfo.ticketType !== 'general' && ticketInfo.ticketType !== 'membership') {
    // return an error message
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  };
  // edge case: if the entrant type if someone other than `child`, `adult` or `senior`
  if (ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'senior') {
    // return an error message
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  };

  // declare a variable totalCost that will give you the final total depending on `ticketType`, `entrantType` and `extras`
  let totalCost = 0;
  
  // loop through keys in ticketData ie `general`, `membership` and `extras`
  for (const property in ticketData) {
    // declare a variable to store the arguments needed to invoke the helper function
    const invokeMatchPrice = matchPriceWithVisitorType(ticketData[property]['priceInCents'], ticketInfo)
  
    // if ticketType is strictly equal to ticketData keys ie `general` or `membership` since it will never be equal to `extra`
    if (property === ticketInfo.ticketType) {
      //  totalCost will be reassigned to the return value of the invoked helper function
      totalCost += invokeMatchPrice;
    }; 
  };
  
  // loop through strings in extras arr
  for (let i = 0; i < ticketInfo.extras.length; i++) {
    // declare a variable to store the arguements needed to invoke the helper function
    const invokeExtras = extras(ticketInfo.extras[i], ticketData, ticketInfo);

    // edge case: if extras include anything other than 'movie', 'education' and 'terrace'
    if (ticketInfo.extras[i] !== 'movie' && ticketInfo.extras[i] !== 'education' && ticketInfo.extras[i] !== 'terrace') {
      // return an error message
      return `Extra type '${ticketInfo.extras}' cannot be found.`;
    };
    //  totalCost will be reassigned to the return value of the invoked helper function
    totalCost += invokeExtras;
  }

  return totalCost;
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

// create a helper function to convert price in cents to price in dollars and format it to look like $28.90 
function formatCost (money) {
  return '$' + (money/100).toFixed(2);
}

// create a helper function to capitalize each word in a given string
function capitalize (string) {
  // access first char in my name .toUpperCase() && use string method slice
  return string[0].toUpperCase() + string.slice(1);
}

function extraTypes (ticketData, purchaseExtras) {
  let description = [];
  // loop through arr of str
  for (const purchase of purchaseExtras) {
    // loop through ticketData
    for (const key in ticketData.extras) {
      if (purchase === key) {
        // push description of purchase extras
        description.push(ticketData.extras[key]['description']);
      };
    };
  };
  return description.join(', ');
}

function purchaseTickets(ticketData, purchases) {

  let totalInCents = 0
  let ticket = [];
  const indent = `\n`;
  
  // loop through objects in purchases arr
  for (let i = 0; i < purchases.length; i++) {

    // invoking the function above to get the price one ticket at a time
    const centsOrError = calculateTicketPrice(ticketData, purchases[i]);
    
    // if the result of invoking the function is an error message 
    if (typeof centsOrError === 'string') {
      // return the error message
      return centsOrError;
    };
    
    // keep a running total of tickets for each iteration 
    totalInCents += centsOrError;
    
    const vistorType = capitalize(purchases[i].entrantType);
    const admissionType = capitalize(purchases[i].ticketType);
    
    // every ticket but the last one with no extras 
    if (i < purchases.length - 1 && purchases[i].extras.length === 0) {
      // push the body of the receipt to ticket
      ticket.push(`${vistorType} ${admissionType} Admission: ${formatCost(centsOrError)}${indent}`);
      
      // last tickets with no extras 
    } else if (i === purchases.length - 1 && purchases[i].extras.length === 0) {
      // push the body of the receipt to ticket
      ticket.push(`${vistorType} ${admissionType} Admission: ${formatCost(centsOrError)}`);
    };
    
    // purchases[i].extras is an array of strings and by invoking the function I want to format each extra 
    const formatExtras = extraTypes(ticketData, purchases[i].extras);
    
    // every ticket but the last one with extras 
    if (i < purchases.length - 1 && purchases[i].extras.length > 0) {
      // push the body of the receipt to ticket
      ticket.push(`${vistorType} ${admissionType} Admission: ${formatCost(centsOrError)} (${formatExtras})${indent}`);
      // last tickets with extras 
    } else if (i === purchases.length - 1 && purchases[i].extras.length > 0) {
      // push the body of the receipt to ticket
      ticket.push(`${vistorType} ${admissionType} Admission: ${formatCost(centsOrError)} (${formatExtras})`);
    };
  }
  
  const thankYou = `Thank you for visiting the Dinosaur Museum!`;
  const dash = `\n-------------------------------------------\n`;
  const total = `TOTAL: `;
  
  const receipt = thankYou + dash + ticket.join('') + dash + total + formatCost(totalInCents);
  return receipt;
}
// "Thank you for visiting the Dinosaur Museum!
// \n-------------------------------------------\n
// Adult General Admission: $50.00 (Movie Access, Terrace Access)\n
// Senior General Admission: $35.00 (Terrace Access)\n
// Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
// Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)
// \n-------------------------------------------\n
// TOTAL: $175.00";

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
