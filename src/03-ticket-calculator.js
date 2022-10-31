/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/* LOGIC: Becuase these functions take data from an object, the logic will be slightly differnt than in the previous two pages.
The functions will start with accumulators, same as the first five functions,
Then there will be a general ticket section and an extras section.
If the values of the ticketInfo/Purchases param match key names in the ticketData we can access that keys values using bracket notation, without needing a loop
if we can't and the values dont match, we can throw back the corresponding error message
The extras section of the ticketData is nested and because multiple extras can be listed per ticket, is best delt with in its own loop */

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
  //ACCUMULATOR VARIABLES = the ticketType, entrantType, and extras of ticket info are saved to variables that will be used access the values in the ticketData object. 
  const {ticketType: type, entrantType: age, extras: extrasArray} = ticketInfo;
  let priceInCents;

  //GENERAL TICKET
  if (ticketData.hasOwnProperty(type)){
    if(ticketData[type]['priceInCents'].hasOwnProperty(age)){
      priceInCents = ticketData[type]['priceInCents'][age]
    } else return `Entrant type '${age}' cannot be found.`
  } else return `Ticket type '${type}' cannot be found.`

  //EXTRAS
  if(extrasArray.length > 0){
    for (let extraType of extrasArray){
      if(ticketData.extras.hasOwnProperty(extraType)){
        priceInCents += ticketData.extras[extraType].priceInCents[age]
      } else return `Extra type '${extraType}' cannot be found.`
    }
  }

  return priceInCents
}

/*LOGIC: Because the purchases param is an array of objects each structured the same as the ticketInfo param in calculateTicketPrice,
the logic of this will take from the logic of the first two pages as well as the logic of the above function
There are accumulators to track the reciprt and price across all purchases, helper functions and a loop and a return statment (Errors will be handled inside the loop)
Within that loop there are accumulators for the current purchase, a genreal ticket section and an extras section .
 */
/**
 * 
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
  //ACCUMULATOR
  let fullReceipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
  let totalPrice = 0;

  //FUNCTION
  const UpperCase = string => string[0].toUpperCase() + string.slice(1); //Function that will capitalize the first letter of a string

  //LOOP
  for(let purchase of purchases){
    //ACCUMULATOR
    const {ticketType: type, entrantType: age, extras: extraArr} = purchase; 
    let priceInDollars, purchaseReceipt;
  
    //GENERAL TICKET
    if (ticketData.hasOwnProperty(type)){ 
      if(ticketData[type]['priceInCents'].hasOwnProperty(age)){  

        priceInDollars = ticketData[type]['priceInCents'][age]/100;
        purchaseReceipt = `${UpperCase(age)} ${UpperCase(type)} Admission: `;

      } else return `Entrant type '${age}' cannot be found.`
    } else return `Ticket type '${type}' cannot be found.`
  
    //EXTRAS
    if(extraArr.length > 0){
      for (let extra of extraArr){
        if(ticketData.extras.hasOwnProperty(extra)){
          priceInDollars += (ticketData.extras[extra].priceInCents[age])/100
        } else {
          return `Extra type '${extra}' cannot be found.`
        }
      }
      let captArr = extraArr.map(extra => UpperCase(extra)) //This was set to its own variable for readability sake
      purchaseReceipt += `$${priceInDollars.toFixed(2)} (${captArr.join(" Access, ")} Access)\n`
    } else {
     purchaseReceipt += `$${priceInDollars.toFixed(2)}\n`
    }

    //(Adds this purchase to total accumulators)
    fullReceipt += purchaseReceipt
    totalPrice += priceInDollars;
  }
  
  //return
  return fullReceipt += `-------------------------------------------\nTOTAL: $${(totalPrice).toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
