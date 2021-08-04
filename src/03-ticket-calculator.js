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
  //Get into ticket type and entrant type.
  //ticketData.general.priceInCents.adult, standard way to get to 3000 ticket
  //ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType] = basePrice > gives us one ticket at a time
  
  if (ticketInfo.ticketType in ticketData === false) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } else if (ticketInfo.entrantType in ticketData.general.priceInCents === false) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  } 
  
  //extra represents each item in ticketInfo.extras array
  for (const extra of ticketInfo.extras) {
    if (extra in ticketData.extras === false) {
      return `Extra type '${extra}' cannot be found.`
    }

  }
  //Declare a variable to store basePrice
  let basePrice = ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType]

  //how to get extra cost into basePrice
  //If length of ticketInfo.extras array is not equal to 0
  if (ticketInfo.extras.length !== 0) { 
    //Iterate thru ticketInfo.extras array with For of loop
    for(const extra of ticketInfo.extras) {
      basePrice += ticketData.extras[extra]["priceInCents"][ticketInfo.entrantType]
    }
  }
  return basePrice
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


    // HELPER FUNCTION to convert price in cents to price in dollars 
function formatCost (money) {
  return '$' + (money/100).toFixed(2);
}

// HELPER FUNCTION to capitalize each word in a given string
function capitalize (string) {
  // Capitalize first letter in word && used slice method to remove first letter
  return string[0].toUpperCase() + string.slice(1);
}

//HELPER FUNCTION to 
function extraTypes (ticketData, purchaseExtras) {
  let description = [];
  
  // Loops thru purchases array
  for (const purchase of purchaseExtras) {
    
    // loop through ticketData.extras array
    for (const key in ticketData.extras) {
      if (purchase === key) {
        // Push ticketData with extras key and a description into empty array
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

  // Loops thru objects in purchases array
  for (let i = 0; i < purchases.length; i++) {

    // Calling previous function above to get price one ticket at a time
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


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
