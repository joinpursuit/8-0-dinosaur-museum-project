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
      // declare variable for ticketType && entrantType && priceInCents && extras
    let type = ticketInfo.ticketType;
    let entrant = ticketInfo.entrantType;
    let price = 'priceInCents';
    let extras = ticketData.extras;
    
      // declare variable for totalCost to ticketData[type][price][entrant]
    let newArray = ['general', 'membership', 'adult', 'child', 'senior', 'movie', 'education', 'terrace']
      // conditional checking if type, entrant exists
      if (!newArray.includes(type)) return "Ticket type 'incorrect-type' cannot be found."
      // conditional checking if entrant, entrant exists
      if (!newArray.includes(entrant)) return "Entrant type 'incorrect-entrant' cannot be found."
    
      // iterate through ticketInfo.extras for error message
      for (let extra of ticketInfo.extras) {
        if (!newArray.includes(extra)) return "Extra type 'incorrect-extra' cannot be found."
        
      }
    let totalCost = ticketData[type][price][entrant]
    
        // iterate through ticketInfo.extras
      for (let extra of ticketInfo.extras) {
        // add totalCost += [extra][price][entrant]
        totalCost += extras[extra][price][entrant]
    }
      // return totalCost
    return totalCost;
     
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
// function purchaseTickets(ticketData, purchases) {}

function capital(entrantType) {
if (entrantType = entrantType.charAt(0).toUpperCase() + entrantType.slice(1)) return entrantType
  }

function purchaseTickets(ticketData, purchases) {
  // declare empty string
  let receipt = '';
  // declare variable for totalCost to 0
  let totalCost = 0;
  // iterate through purchases array
  for (ticketInfo of purchases) {
    // declare variable  currentCost = calculateTicketPrice(ticketData, ticketInfo)
    let currentCost = calculateTicketPrice(ticketData, ticketInfo);
    // conditional statement checking datatype('string')
    if (typeof currentCost === 'string') return currentCost
    
    // declare variable with helper function for entrantType
    let entrantType = capital(ticketInfo.entrantType);
    // redefine current cost dollars && 2 decimal places as a number
    currentCost = Number((currentCost/100).toFixed(2))
    // conditional statement checking if there are no extras
    if (ticketInfo.extras.length === 0) {
      receipt += `${entrantType} ${ticketData[ticketInfo.ticketType].description}: $${currentCost.toFixed(2)}\n`
    } else {
      //  declare empty array
      let emptyArray = [];
  // iterate through array of extras
    for (let extra of ticketInfo.extras) {
      emptyArray.push(ticketData.extras[extra].description)
    }
  // reassign empty string to ticketInfo.entrant ticketData.[ticketInfo.ticketType].description : $currentCost $ticketInfo.extras.toString() \n
    receipt += `${entrantType} ${ticketData[ticketInfo.ticketType].description}: $${currentCost.toFixed(2)} (${emptyArray.join(', ')})\n`
  }
  // reassign totalCost to += currentCost
  totalCost += currentCost
  }
  // declare variable receiptWords to Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n$receipt\n-------------------------------------------\nTOTAL: totalCost/100.toFixed(2)
  let receiptMessage = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${totalCost.toFixed(2)}`
  // return receiptWords
    return receiptMessage;
  }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
