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
// initialized a variable as an accumulator that values will be added to 
  let totalCost = 0;

  // returns error message if ticket type cannot be found
  if(!ticketData[ticketInfo.ticketType]){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }

  // searching if ticket type exists within the ticket data
  if(ticketInfo.ticketType in ticketData){
    // if ticket type exists, look for entrant type and find the price in cents
    if(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents){
      // add the value to the accumulator
      totalCost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
    //othersie, if entrant type does not exist, return error message
    } else if (!ticketData[ticketInfo.entrantType]) {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.` 
    }
  }
// loop that accounts for extras
  for (let xtra of ticketInfo.extras){
    if(xtra in ticketData.extras){
      // if extras exists, then add the price of cents of the extras to the accumulator
      totalCost += ticketData.extras[xtra].priceInCents[ticketInfo.entrantType]
    } else {
      // otherwise, if extras do not exist, return error message.
      return `Extra type '${xtra}' cannot be found.`
    }
  }
  // return final cost of ticket
  return totalCost
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
  // initializing variables; creating a variable 'receipt' for the first part of the returned string; set a variable as an accumulator for the final price. 
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
  let totalPrice = 0
  
  // looping through purchases and calling the previous function into the loop; this should account for the error messages since we already did them in the previous function
  for (let p of purchases) {
    let ticket = calculateTicketPrice(ticketData, p)
    // if the variable we set equal to the previous function is a string, it will return the ticket data from the previous function (including price)
    if (typeof ticket === `string`){
      return ticket
    }
  // creating a new variable set to an empty array for the ticket 'extras' part of the receipt.  
  let receipt2 = []
  //if extras exists, push the extras description into the second part of the returned string of the receipt
  for (let xtra of p.extras){
    receipt2.push(ticketData.extras[xtra].description)
  }
  // if ticket extras exists, and there are multiple ticket extras, use join method to connect them using a comma
  if (p.extras.length){
    receipt2 = ` (${receipt2.join(`, `)})`
  }
  // adding ticket info (entrant, type and description), the price of the ticket converted from cents to dollars (rounded to 2 decimal points), and adding the 'extras' part to the initial receipt as a string
    receipt += `${p.entrantType[0].toUpperCase() + p.entrantType.slice(1)} ${ticketData[p.ticketType].description}: $${(ticket/100).toFixed(2)}${receipt2}\n`
    // get total price by adding price in cents of the ticket(set equal to the previous function) converted to dollars
    totalPrice += ticket/100
  }
  // last part of receipt string; combining all the strings (like concat, but using template literals) and adding the final price to the end of the receipt 
  receipt += `-------------------------------------------\nTOTAL: $${totalPrice.toFixed(2)}`
  // returning final receipt with all necessary information of the ticket
  return receipt
}  

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
