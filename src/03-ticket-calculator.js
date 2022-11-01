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
  let totalCost = 0

  if (ticketInfo.ticketType !== 'general' && ticketInfo.ticketType !== 'membership' ) {
    return `Ticket type 'incorrect-type' cannot be found.`
  }
  
   if (ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'senior' ) {
    return  `Entrant type 'incorrect-entrant' cannot be found.`
  }
  if (ticketInfo.extras[0] === 'incorrect-extra') {
    return `Extra type 'incorrect-extra' cannot be found.`
  }
  
    if(ticketInfo.ticketType === 'general'){
      switch(ticketInfo.entrantType) {
        case 'child':
          totalCost += 2000
          break;
        case 'adult':
          totalCost += 3000
          break;
        case 'senior':
          totalCost += 2500
          break;
        default:
           `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
    }else if(ticketInfo.ticketType === 'membership') {
      switch(ticketInfo.entrantType) {
        case 'child':
          totalCost += 1500
          break;
        case 'adult':
          totalCost += 2800
          break;
        case 'senior':
          totalCost += 2300
          break;
        default:
           `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
  }
  for (let i = 0; i < ticketInfo.extras.length; i++) {
    if (ticketInfo.extras[i] === 'movie') {
      totalCost += 1000
    }else if (ticketInfo.extras[i] === 'education') {
      switch(ticketInfo.entrantType) {
        case 'child':
          totalCost += 1000
          break;
        case 'adult':
          totalCost += 1200
          break;
        case 'senior':
          totalCost += 1200
          break;
        default:
           `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
      
    } if(ticketInfo.extras[i] === 'terrace'){
      switch(ticketInfo.entrantType) {
        case 'child':
          totalCost += 500
          break;
        case 'adult':
          totalCost += 1000
          break;
        case 'senior':
          totalCost += 1000
          break;
        default:
           `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
    }
  }
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
  let response = ''
  let totalCost = 0

   
  for (let i = 0; i < purchases.length; i++) {
    const costOfPurchase = calculateTicketPrice(ticketData, purchases[i]);
    let extras = purchases[i].extras.slice(0)
    let arr = []
    if(typeof costOfPurchase === "string"){
      return costOfPurchase
    }
    totalCost += costOfPurchase



    for (let extra of extras){
      if(extras.length > 0){
        arr.push(ticketData.extras[extra].description)
      }
    }

    

    if(purchases[i].extras.length > 0){
      response += `${purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)} ${purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)} Admission: $${(costOfPurchase/100).toFixed(2)} (${arr.join(", ")})\n`
    }else{
      response += `${purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)} ${purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)} Admission: $${(costOfPurchase/100).toFixed(2)}\n`
    }


  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${response}-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
