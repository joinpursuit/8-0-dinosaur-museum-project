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
// Is the ticket type valid?
// Is the entrant type valid?
// Get the ticket cost without extras
// Accumulator pattern to calc all of the extras
// Inside of for loop of accumu paatter: is the extra type valid?
// Return the total: cost of ticket + extras. 
 
 let total = 0;

  if(!ticketData[ticketInfo.ticketType]){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
      }else if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
        return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
    total += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
    if(ticketInfo.extras){
    for(let i=0; i < ticketInfo.extras.length; i++){
      if(!ticketData.extras[ticketInfo.extras[i]]){
        return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      }
    total += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType];
      }
    }
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
// Psuedocode: two for loops --double accum pattern
// keep track of purchase total (number) and receipt purchase summary("String")
// loop through purchases and use calculateTicketPrice to determine total of purchase
// if return type is a styring then return it
// A nested accumulator to determine the extra cost total(Number)
// and a summary(String) for the 
// Format receipt with total and receipt summaries.
// return receipt, 

function purchaseTickets(ticketData, purchases) {}
/** 
* helper func grabbind purchas tix 
* return string of tix
* @param {*} ticketData - obj of tix @param {*} ticketInfo - info about tix
* @return {string} - formatted
*/
function formatted(ticketData, ticketInfo){
  let newArr = ticketInfo.extras.slice(0);
  let newStr = "";
  if(newArrlength){
    newStr += " (";
    for(let i=0;i<newArr.length;i++){
      if(i === newArr.length-1){
        newStr += ticketData.extras[newArr[i]].description + ")";
      }else newStr += ticketData.extras[newArr[i]].description + ", ";
    }
  }
  return newStr;
  }
/** helper func *///cap letter, returns string
// not really certain how to get helper functo apply...problem with code, not reading test for last func anymore
function upperCaseFirstLetter(str){
  let firstLetter = str[0].toUpperCase();
  let newArr = str.split("");
  newArr.shift();
  return firstLetter + newArr.join("");
}
function purchaseTickets(ticketData, purchases) {
  let newStr = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"; // track purchases
  let total = 0;                                               // track single tix

  let subTotal;
  for(let ticket of purchases){
    subTotal = 0;
    let check = calculateTicketPrice(ticketData, ticket);       // check using calctixprice func
      if(typeof check === "number"){
        subTotal = check;
        newStr += `${upperCaseFirstLetter(ticket.entrantType)} ${ticketData[ticket.ticketType].description}: $${(subTotal/100).toFixed(2)}${formatted(ticketData, ticket)}\n`;
        total += subTotal/100;
      }
      else return check;  
    }                                      // return error
      return newStr += "-------------------------------------------\nTOTAL: $" +total.toFixed(2); // return receipt
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
