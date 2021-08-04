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
// ticket info is a object 
// 


function calculateTicketPrice(ticketData, ticketInfo) {

  let priceInCents = 0;
  let extraArr = ticketInfo.extras.slice(0);

  if(ticketInfo.ticketType in ticketData) {
  if(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents) {
     priceInCents += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  } else {
   return "Entrant type 'incorrect-entrant' cannot be found.";
   }
  } else {
   return "Ticket type 'incorrect-type' cannot be found.";
  }
      
  if (ticketInfo.extras.length){
  for (let extra of extraArr){
  if(extra in ticketData.extras) {
    priceInCents += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
  }else {
  return "Extra type 'incorrect-extra' cannot be found.";
    }
   }
  }
   return priceInCents;
  }




// * const ticketInfo = {
//   ticketType: "general",
//   entrantType: "child",
//   extras: ["movie"],
// };

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

  function firstLetterCaps(string){
    return string[0].toUpperCase() + string.slice(1);
  }
// loop through purchases
  for(let purchase of purchases){
    let cost = 0;
    let extrasArr = [];
    let price = calculateTicketPrice(ticketData, purchase); 
    let formattedExtras = '';
// checking if it  is a string 
    if(typeof price === 'string'){
      return price;
    }
  
    if(purchase.extras.length){
      for(let i of purchase.extras){
          extrasArr.push(ticketData.extras[i].description);   
      }
      formattedExtras = ` (${extrasArr.join(', ')})`;
    }
    cost = price / 100;
    receipt += `${firstLetterCaps(purchase.entrantType)} ${firstLetterCaps(purchase.ticketType)} Admission: $${cost.toFixed(2)}${formattedExtras}\n`;
    totalCost += cost;
  }
  // fixing the decimals by adding to.Fixed(2)
 return `${receipt}-------------------------------------------\nTOTAL: $${totalCost.toFixed(2)}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
