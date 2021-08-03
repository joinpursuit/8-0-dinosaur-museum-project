/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
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
  let cost = 0;
//error for no matching ticket type
  if(!(ticketInfo.ticketType in ticketData)){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
//accumulator in the case that the entrant type is valid within the ticketData
  if(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents){
    cost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  } else{ //alternatively, return an error if there is no match
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    }

  let ticketExtras = ticketInfo.extras;// create an array to iterate through in next line
  for(let eachExtra of ticketExtras){
    //eachExtra used to reference between BOTH ticketData and the param's extras array then accumulate
    if(eachExtra in ticketData.extras){
      cost += ticketData.extras[eachExtra].priceInCents[ticketInfo.entrantType];
    } else{ //return error if there is no match with cross reference
      return `Extra type '${eachExtra}' cannot be found.`;
    }
  }
  return cost;
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
  let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n';
  let totalCost = 0;
  
  //helper function to capitalize first letters within a string
  function firstLetterCaps(string){
    return string[0].toUpperCase() + string.slice(1);
  }
  //isolates each purchase within the loop
  for(let purchase of purchases){
    let eachCost = 0;
    let extrasArr = [];//this array is used to grab descriptions
    let price = calculateTicketPrice(ticketData, purchase); //borrows logic from previous question 
    //returns price if it is an error, which would be a string
    if(typeof price === 'string'){
      return price;
    }
    let formattedExtras = '';
    //checks if extras array contains anything
    if(purchase.extras.length){
      //pushes the appropriate extras descriptions into the extrasArr to enter formattedExtras correctly
      for(let x of purchase.extras){
          extrasArr.push(ticketData.extras[x].description);   
      }
      //finishes any formatting left
      formattedExtras = ` (${extrasArr.join(', ')})`;
    }
    //changes to dollar amount from cents
    eachCost = price / 100;
    //.toFixed adds decimal point
    receipt += `${firstLetterCaps(purchase.entrantType)} ${firstLetterCaps(purchase.ticketType)} Admission: $${eachCost.toFixed(2)}${formattedExtras}\n`;
    //totalCost accumulates each cost as a final step in the loop
    totalCost += eachCost;
  }
 return `${receipt}-------------------------------------------\nTOTAL: $${totalCost.toFixed(2)}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
