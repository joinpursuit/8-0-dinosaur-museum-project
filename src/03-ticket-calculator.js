/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
const tickets = require("../data/tickets");

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
  // Variable used to update the price of the ticket
  let ticketPrice = 0;
 
  // Return an error message if the ticketType does not exist as an object name inside of ticketData
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } 
  // Return an error message if the ticketEntrant does not exist as a key inside of priceInCents inside of the outer object name of ticketData
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  } 

  // Return an error message if extras does not contain a valid option, otherwise update ticketPrice using ticketData's info
  if (ticketInfo.extras.every(extra => ticketData.extras[extra])) {
    ticketInfo.extras.forEach(ele => ticketPrice += ticketData.extras[ele].priceInCents[ticketInfo.entrantType]);
  }  else {
    return `Extra type '${ticketInfo.extras[0]}' cannot be found.`;
  }

  return ticketPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
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

  // A string that will be used to return the full receipt
  let receiptDetails = "";
  let totalPrice = 0;

  // Loop through the purchases array to access each object element
  for (let i = 0; i < purchases.length; i++) {
    // Variable for holding the price for each ticket
    let ticketPrice = 0;
    // String that will contain the extras in the format of (Terrace Access, Education Access)
    let extraString = "";

    // Use calculateTicketPrice function to return error messages when needed
    if (typeof calculateTicketPrice(ticketData, purchases[i]) === 'string') {return calculateTicketPrice(ticketData, purchases[i]);}

    // Add the cost of admission to ticketPrice based on the type of ticket purchased and who(entrantType) the ticket is for
    ticketPrice += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType];
   

    // If extras array inside of every object is empty return the receipt without extras 
    if (purchases[i].extras.length === 0) {
      receiptDetails += `${capitalize(purchases[i].entrantType)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)}`;
      // Format spacing depending on how many elements are in the purchases array and whether or not the last object has been reached
      if (purchases.length > 1 && i <= purchases.length - 2) {receiptDetails += '\n';}

    } else {
      // Accumulator variable used to determine how to format the extras with spacing and commas 
      let extraCount = 0;
     
      // Return an error message if ticketData.extras does not contain any of the elements of the extras array within purchases object otherwise add ticketData.description to extraString variable
      for (let extra of purchases[i].extras) {
        // Update the ticketPrice to include the price of each extra in the array
        ticketPrice += ticketData.extras[extra].priceInCents[purchases[i].entrantType];
        // Format the extras string with comma and space and add current extra priceInCents to the ticketPrice and totalPrice
        if (extraCount === 0) { 
          extraString += `${ticketData.extras[extra].description}`;
        } else {
          extraString += `, ${ticketData.extras[extra].description}`;
        }
      
        extraCount++;
      }
     
      // Update the receiptDetails variable with the extras inside of parentheses
      receiptDetails += `${capitalize(purchases[i].entrantType)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)} (${extraString})`;
      if (purchases.length > 1 && i <= purchases.length - 2) { receiptDetails += '\n'; }
    }
    // Update the totalPrice with the current ticketPrice for every iteration 
    totalPrice += ticketPrice;
  }

  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receiptDetails}\n-------------------------------------------\nTOTAL: $${(totalPrice / 100).toFixed(2)}`;
}



function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}





// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};




