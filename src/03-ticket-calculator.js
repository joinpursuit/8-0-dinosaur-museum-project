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
  // Checks if the ticket type exists in the ticketData object, if not return it cannot be found
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  
  // Checks if the entrant type exists for the given ticket type, if not return it cannot be found
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  
  // Initialize the costOfTicket variable with the base price for the ticket type and entrant type
  let costOfTicket = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  
  // Iterate through the extras array and add the price for each extra if it exists
  for (const extras of ticketInfo.extras) {
    // Check if the extra type exists in the ticketData object, if not return it cannot be found
    if (!ticketData.extras[extras]) {
      return `Extra type '${extras}' cannot be found.`;
    }
  
    // Add the price for the extra based on the entrant type
    costOfTicket += ticketData.extras[extras].priceInCents[ticketInfo.entrantType];
  }
  
  // Return the final cost of the ticket
  return costOfTicket;
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
// Initialize the cost of the ticket to 0
let costOfTicket = 0; 
// Create an array to store the lines of the receipt
let receiptLines = [
  `Thank you for visiting the Dinosaur Museum!`,
  `-------------------------------------------` 
];

// Loop through each purchase in the 'purchases' array
for (const purchase of purchases) { 
  // Calculate the price of the ticket for the purchase using the calculateTicketPrice() function above
  let ticketPrice = calculateTicketPrice(ticketData, purchase); 

  // If the 'ticketPrice' is a string, it means there was an error calculating the price
  // Return the error message
  if (typeof ticketPrice === "string") { 
    return ticketPrice; 
  } 

  // Adds the 'ticketPrice' to the total cost of the ticket
  costOfTicket += ticketPrice; 

  // Get the entrant type for the purchase and capitalize the first letter
  let entrantType = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1); 

  // Create a string representing the purchase with the entrant type, ticket description, and price in dollars
  let purchaseEntry = `${entrantType} ${ticketData[purchase.ticketType].description}: $${(ticketPrice / 100).toFixed(2)}`; 

  // If there are extras in the purchase, add them to the purchase entry
  if (purchase.extras.length) { 
    // Map over each extra in the 'extras' array and get the description from 'ticketData.extras'
    // Join the descriptions with a comma and add them to the purchase entry
    purchaseEntry += ` (${purchase.extras.map(addExtra =>ticketData.extras[addExtra].description).join(", ")})`; 
  }

  // Add the purchase entry to the receipt lines array
  receiptLines.push(purchaseEntry); 
}

// Add line to the receipt to match the expected output
receiptLines.push(`-------------------------------------------`); 

// Add the total cost of the ticket to the receipt
receiptLines.push(`TOTAL: $${(costOfTicket / 100).toFixed(2)}`); 

// Join all the receipt lines with a newline and return the resulting string
return receiptLines.join("\n");
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
