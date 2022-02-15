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
  // if ticketinfo.type with no extra-> general, membership, senior -> return price from ticketData.general.membership.priceInCent
  // if tickcetinfo.extra -> movie, education, terrance -> return priceInCent + ticketData.general.membership.priceInCent
  let price = 0

  if (ticketInfo.ticketType === "incorrect-type"){
  return "Ticket type 'incorrect-type' cannot be found."
}
  if (ticketInfo.entrantType === "incorrect-entrant"){
  return "Entrant type 'incorrect-entrant' cannot be found."
 }
  if (ticketInfo.extras.includes('incorrect-extra')) { //use includes because its a array
  return "Extra type 'incorrect-extra' cannot be found."
} 
  if (ticketInfo.ticketType === "general" || "membership") { // if the ticket.type is general or membership 
    price += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  } // ticketData[general,membership]priceincent[adult,child,senior] use brackets to grab from ticketInfo information 
 
  for (let ex of ticketInfo.extras) { // loop extras b/c array 
  if (ticketData.extras.hasOwnProperty(ex)){//if ticketData.extra exist in ticketInfo.extra use property(similar as includes) b/c its an object.
      price += ticketData.extras[ex].priceInCents[ticketInfo.entrantType]
    }// ticketData.extra[movie, terrence, education].priceInCent[adult,child, senior] use bracket to grab from ticketInfo 
   }return price
   
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

  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
   
  let total = 0
  
   for (let purchase of purchases) { 
    let calculate = calculateTicketPrice(ticketData, purchase) //use to calculate the receipt price need to grab fucntion above
      if (Number.isInteger(calculate)) { // to check if it have number can use typeof calculate === "number" or use Number.isInteger()
        total += calculate
        receipt += `${purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(calculate/100).toFixed(2)}`
        if (purchase.extras.length) { // if purchase.extra = movie, education, terrence then loop 
          receipt += ` (`
        for (let extra of purchase.extras) {
          
          receipt += `${ticketData.extras[extra].description}, ` 
          
        } receipt = receipt.slice(0,-2) //b/c need to remove the comma at the end of the second
        receipt += `)`
      }
      } else {
        return calculate 
      }
      receipt += `\n`
   }
   receipt += `-------------------------------------------\nTOTAL: $${(total/100).toFixed(2)}`
    return receipt 
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};

 
   
