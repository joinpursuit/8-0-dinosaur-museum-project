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
  //Overall plan: Declare variables to make navigating the problem easier, loop through the right ticket type and find the right ticket, and then add it to our total. Then loop though our extras and find their appropriate orices and add it to our total, then return total.
  //Declare variable to accumulate to, set to 0
  let total = 0;
  //Declare variable for type for clarity
  let type = ticketInfo.ticketType
  //Declare variable for age for clarity
  const age = ticketInfo.entrantType;
  //Declare switch statement to account for some edge statements
  switch (true){
    //check if we were given a valid ticketType
    case (!ticketData[type]):
      //if we weren't, return error msg
      return `Ticket type '${type}' cannot be found.`
      break;
    //check if we were given a valid entrantType
    case (!ticketData[type].priceInCents[age]):
      //if we weren't, return error msg
      return `Entrant type '${age}' cannot be found.`
      break;
  }
  //Declare a loop to iterate through the appropriate ticketType price
  for (const ticketAge in ticketData[type].priceInCents){
    //Check if our age is found in the ticketType price
    if (ticketAge === age){
      //If it is, add it's cost to our total
      total += ticketData[type].priceInCents[ticketAge];
    }
  }

  //Declare new loop to iterate through extras array
  for (const extra of ticketInfo.extras){
    //account for edgecase of invalid extras
    //check if we were given a valid extra
    if (!ticketData.extras[extra]){
      //if we weren't, return error
      return `Extra type '${extra}' cannot be found.`
    //else, add the valid extra to our total
    } else {
      //find the appropriate cost and add it to our total
      total += ticketData.extras[extra].priceInCents[age];
    }
    
  }
  //after loop, return total
  return total;
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
  //Overall plan: receit looks long, create helper function to help format. Use our previous function as a helper function to calculate cost. Loop through the purchases and use our helper functions to add to both our total and receipt, and when we're done, return our receipt w/ the total on it.
  //Declare variable to accumulate to, set to receipt header;
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  //Declare variable to accumulate to, set to 0;
  let totalInCents = 0;
  //Declare loop to iterathe through purchases
  for (const item of purchases){
    //create variable for clarity
    let itemPrice = calculateTicketPrice(ticketData, item)
    //check for error (string)
    if (typeof itemPrice === 'string'){
      //return the error msg
      return itemPrice;
    //if there are no errors
    } else {
    //add the cost to our totalInCents
    totalInCents += itemPrice
    //and add on to our receipt
    receipt += purchaseToReceipt(ticketData, item)
    }
  }
  //return receipt + footer
  return receipt + `-------------------------------------------\nTOTAL: $${(totalInCents/100).toFixed(2)}`
}

//function to format purchases to receipt format
function purchaseToReceipt(ticketData, purchase){
  //Declare variable to loop through
  let extraArr = [];
  let extraList = "";
  //loop through extras to get an array of extra discriptions
  for (const extra of purchase.extras){
    //push extra's discription into new array
    extraArr.push(ticketData.extras[extra].description);
  }
  //Check if we have extras
  if (extraArr[0]) {
    //if we do, add text to our formatted string to include it
    extraList = ` (${extraArr.join(', ')})`
  }
  //return formatted string
  return `${magneto(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${(calculateTicketPrice(ticketData, purchase) / 100).toFixed(2)}${extraList}\n`
}

//function to capitalize first letter of string
function magneto(string){ // (idk, name sounded cool)
  //return first letter uppercase, rest of the word lowercase
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};``