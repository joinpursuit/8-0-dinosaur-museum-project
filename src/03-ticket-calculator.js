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
  let myTicket;
  let ticketTypeCheck = false; //checks if ticket type is valid using true or false
  let ticketEntrantTypeCheck = false; // checks if entrant type is valid using true or false
  let extraStuffCheck = false;
  let extraFeature = 0; // must set equal to 0; if variable is undefined, then undefine + 'number' = undefined or NaN
  
  //Checks if each ticket has a valid ticket type and entrant, and collects price of ticket.
  for(let ticket in ticketData){ // ticket = general, memebership, or extra
    if(ticketInfo.ticketType === ticket){
      ticketTypeCheck = true; 
      for(let type in ticketData[ticket].priceInCents){ // type = child, adult, or senior
        if(ticketInfo.entrantType === type){ 
          myTicket = ticketData[ticket].priceInCents[type];
          ticketEntrantTypeCheck = true 
          break;
        }
      }
    }
  }
  // Stops program if ticketTypeCheck is invalid (false), and returns error message. Identifying invalid ticket type input
  if(!ticketTypeCheck){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }

  // Stops program if entrantTypeCheck is invalid (false), and returns error message. Identifying invalid entrant input.
  if(!ticketEntrantTypeCheck){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  // Checks if each ticket has a valid extra feauture or features, and then collects pricing.
  for(let extra in ticketData.extras){ // extraTrype = movie, education, and/or terrace
    if(ticketInfo.extras.includes(extra)){
      for(let extraType in ticketData.extras[extra].priceInCents){ // extraType = child, adult, or senior
        if(ticketInfo.entrantType === extraType){
          extraFeature += ticketData.extras[extra].priceInCents[extraType]; // Stores pricing of extra feature or features
          extraStuffCheck = true;
        }
      }
    }
  }

  // Stops program if extraStuffCheck is invalid (false), and returns error message. Identifying invalid extra feature input.
  if(!(ticketInfo.extras.length === 0) && !extraStuffCheck){
    return `Extra type '${ticketInfo.extras}' cannot be found.`
  }

return myTicket + extraFeature; // adds ticket total and extra feature total 
}

// let ticketInformation = {
// ticketType: "general",
// entrantType: "child",
// extras: ["movie"]
// }

// calculateTicketPrice(exampleTicketData, ticketInformation)

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
  const items = [];
  const receipt = [];
  let total = 0;
  
  // checks if there are any invalid input values for each purchase before running program
  for(let purchase of purchases){
    if(typeof(calculateTicketPrice(ticketData, purchase)) === "string"){
      return calculateTicketPrice(ticketData, purchase);
    }
  }

  // stores necessary information to create receipt into object keys
  for(let i = 0; i < purchases.length; i++){
    items[i] = {
    description: ticketData[purchases[i].ticketType].description,
    entrantType: purchases[i].entrantType,
    extras: purchases[i].extras,
    ticketPrice: calculateTicketPrice(ticketData, purchases[i])
    }
  }

  //Changes each extra input value to the description in ticketData that resignates with it. i.e. 'movie' -> 'Movie Access'
  for(let item of items){
    for(let i = 0; i < item.extras.length; i++){
      item.extras[i] = ticketData.extras[item.extras[i]].description;
    }
  }

  // creates a string describing the ticket and the price for each purchase
  for(let item of items){
    let string = `${item.entrantType.charAt(0).toUpperCase() + item.entrantType.slice(1)} ${item.description}: $${((item.ticketPrice)/100).toFixed(2)}`
    if(item.extras.length === 0){
      receipt.push(string);
    }
    else { // Adds extra featues description in paranthesis if it was included with purchase
      string = string + ` (${item.extras.join(", ")})`
      receipt.push(string);
    }
    // adds all the tickets together 
    total += item["ticketPrice"];
    
  }

  // Adds the beginning and ending of receipt to receipt array and converts entire array to a string
  receipt.unshift(`Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`);
  receipt.push(`-------------------------------------------\nTOTAL: $${((total)/100).toFixed(2)}`);
  return receipt.join("\n");
  
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
