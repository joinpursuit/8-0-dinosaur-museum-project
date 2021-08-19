/*
  Do not change the line below. If you'd like to run code from this file, 
  you may use the `exampleTicketData` variable below to gain access to tickets data. 
  This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. 
  You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. 
 * The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` 
 * value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, 
 * an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different 
 * "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
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


//first check for errors [if/else statements] || undefined, string, etc.
//returns an error mssg
//looping through extras, extras = array
//use info from Ticketinfo to get info from Ticketdata
//calculate price for each ticket
//returns a number
// variables for error message and numbers

function calculateTicketPrice(ticketData, ticketInfo) {
let total = 0; // default value

//entrant type is inside of ticketInfo

// * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` 
// * value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, 
// * an error message should be returned.

//error messages//
if(!ticketData[ticketInfo.ticketType]){ //if incorrect ticket type
  return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
} else if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) { //if entrant type is incorrect
  return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
}

total +=
ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]; //reassigned total because test was giving me undefined

// * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different 
//  * "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.

//looping through extras because extras is an array//
for(let i = 0; i < ticketInfo.extras.length; i++){
  if(!ticketData.extras[ticketInfo.extras[i]]){ //if extras is incorrect
    return `Extra type '${ticketInfo.extras[i]}' cannot be found.` //error message
  }
  total += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType];

}
return total;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. 
 * Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information, 
 * should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. 
 * You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. 
 * Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. 
 * Prices change depending on the entrant.
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
      let total = 0; 
      let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'
      for(let purchase of purchases){ //purchases[i] loop
        let entrantType = purchase.entrantType;
        let ticketType = purchase.ticketType;
        let ticketPriceInCents = calculateTicketPrice(ticketData, purchase); //amount from previous function
        let ticketPriceInDollars = ticketPriceInCents / 100; //convert to dollars by dividing by 100
        total += ticketPriceInDollars;
      
        if(typeof(calculateTicketPrice(ticketData, purchase)) === 'string'){
          return calculateTicketPrice(ticketData, purchase);
        };
        for(let i = 0; i < purchase.extras.length; i++){ // looping through extras
          purchase.extras[i] = purchase.extras[i].charAt(0).toUpperCase() + purchase.extras[i].slice(1) + ' Access';
        };
         if(purchase.extras.length){
          receipt += entrantType.charAt(0).toUpperCase() + entrantType.slice(1) + ' ' + ticketType.charAt(0).toUpperCase() + ticketType.slice(1) + ' Admission: $' + ticketPriceInDollars.toFixed(2) + ' (' + purchase.extras.join(', ') + `)\n`;
        }else{
          receipt += entrantType.charAt(0).toUpperCase() + entrantType.slice(1) + ' ' + ticketType.charAt(0).toUpperCase() + ticketType.slice(1) + ' Admission: $' + ticketPriceInDollars.toFixed(2) + `\n`;
        };
      };
      return receipt + `-------------------------------------------\nTOTAL: $${total.toFixed(2)}`;
    }



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
