/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { membership, extras } = require("../data/tickets");
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
  let ticketPrice = 0
  // return meddage if ticket type is not found run false
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  // return message if if ticket entrant type does not exist in the price in cennts
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  
  // the entrance ticket is checking for every extra 
  for (let i = 0; i < ticketInfo.extras.length; i++){
    // extra will include the ticket information
    let extra = ticketInfo.extras[i]
    //ticketPrice should be added to the ticket information i.e. genral and membership 
    if (ticketData.extras[extra]) {
      ticketPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType]
    
    } else {

      return `Extra type '${ticketInfo.extras}' cannot be found.`
  
    } 
  }
 
  return ticketPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
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
// input: 
// process: purchases is an array of single tickets so we need to loop to access purchases, array of objects and check every ticket 
//output:
function purchaseTickets(ticketData, purchases) { 
  let dinoReciept = ""
  let totalPrice = 0
  for (let i = 0; i < purchases.length; i++){
    let ticketPrice = 0
   if (typeof calculateTicketPrice(ticketData, purchases[i]) === "string" ){
    return calculateTicketPrice(ticketData, purchases[i])
   } 
   ticketPrice += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType]
   if (purchases[i].extras.length === 0) {
    // needs to access general, membership using purchases[i].ticketType
    dinoReciept += `${capitalize(purchases[i].entrantType)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)}`
    if (purchases.length > 1 && i <= purchases.length - 2){
      dinoReciept += "\n"

    } 
   } else{
    let countExtras = 0
    let extraReciept = ""
    let extra = purchases[i].extras
    for (let i = 0;  i < extra.length; i++) {

      ticketPrice += ticketData.extras[extra[i]].priceInCents[purchases[i].entrantType]

      if (countExtras === 0) {
        extraReciept += `${ticketData.extras[extra[i]].description}`
      } else {
        extraReciept += `, ${ticketData.extras[extra[i]].description}`

      } 
      countExtras++
    }
    dinoReciept += `${capitalize(purchases[i].entrantType)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)} (${extraReciept})`
    }

   
   totalPrice += ticketPrice
  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${dinoReciept}\n-------------------------------------------\nTOTAL: $${(totalPrice / 100).toFixed(2)}`

}
// helper function to capitalize a single string
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
