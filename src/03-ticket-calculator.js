/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below
  to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

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
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside 
 * of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file 
 * for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. 
 * All strings should be keys under the `extras` key in `ticketData`.
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
  // Variable holding the price for each ticket.
  let ticketPrice = 0;
  // Return an error message if the ticketType does not exist as an object name inside of ticketData.
  if (ticketInfo.ticketType !== "membership" && ticketInfo.ticketType !== "general"){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } // end of if statement

  // Return an error message if the ticketEntrant doesn't exist as a key inside PriceInCents inside the outer object name of ticketData.
  if (!Object.keys(ticketData.general.priceInCents).includes(ticketInfo.entrantType)){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  } // end of if statement 
  
  // Create a switch case to calculate general admission and membership admission ticket prices for child, adult, & senior without any addons.
  switch (ticketInfo.ticketType){
    case 'general':
      switch (ticketInfo.entrantType){
      case 'child':
   ticketPrice += ticketData.general.priceInCents.child;
    break;
    case 'adult':
      ticketPrice += ticketData.general.priceInCents.adult;
      break;
      case 'senior':
        ticketPrice += ticketData.general.priceInCents.senior;
        break;
      }
        break;
    case 'membership':
      switch (ticketInfo.entrantType){
        case 'child':
       ticketPrice += ticketData.membership.priceInCents.child;
        break;
        case 'adult':
          ticketPrice += ticketData.membership.priceInCents.adult;
          break;
          case 'senior':
            ticketPrice += ticketData.membership.priceInCents.senior;
            break;
      }
            break;
      } // end of switch case 
      
      
  for (let i= 0; i <ticketInfo.extras.length; i++){
     // Create a switch case to calculate ticket prices for child, adult, & senior with extras (movie, education, & terrrace).
    switch(ticketInfo.extras[i]){
      case 'movie':
    switch (ticketInfo.entrantType) {
      case 'child':
         ticketPrice += ticketData.extras.movie.priceInCents.child;
          break;
      case 'adult':
            ticketPrice += ticketData.extras.movie.priceInCents.adult;
          break;
      case 'senior':
              ticketPrice += ticketData.extras.movie.priceInCents.senior;
          break;
        }
          break;
      case 'education':
    switch (ticketInfo.entrantType){
      case 'child':
           ticketPrice += ticketData.extras.education.priceInCents.child;
          break;
      case 'adult':
              ticketPrice += ticketData.extras.education.priceInCents.adult;
          break;
      case 'senior':
                ticketPrice += ticketData.extras.education.priceInCents.senior;
          break;
        }
          break;
      case 'terrace':
    switch (ticketInfo.entrantType){
     case 'child':
             ticketPrice += ticketData.extras.terrace.priceInCents.child;
          break;
      case 'adult':
                ticketPrice += ticketData.extras.terrace.priceInCents.adult;
          break;
      case 'senior':
                  ticketPrice += ticketData.extras.terrace.priceInCents.senior;
          break;
        }
          break;
            default:
              return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
              
     } // end of switch case
   } 
  return ticketPrice;
} // end of function!
  

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket.
 *  All strings should be keys under the `extras` key in `ticketData`.
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
    let totalPrice = 0
    // Returns the general reciept without any addons.
    let result = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"
    for (let purchase of purchases) {

      // Variable that holds the price for each ticket.
      let ticketPrice = calculateTicketPrice(ticketData, purchase)

      // If ticketPrice is a string, return ticketPrice.
      if (typeof ticketPrice === "string"){
        return ticketPrice
      } // end of if statement

    let extraArr = []
    let extras = ""

      // Create a new loop to push the description into the array.
      for (let extra of purchase.extras) {
        extraArr.push(ticketData.extras[extra].description)
      } // end of second for loop

      // Checking for multiple extras and then combining them.
      if (purchase.extras.length){
        extras = ` (${extraArr.join(", ")})`
      }// end of if statement 

      totalPrice += ticketPrice
      
      //Template literal for what will be returned as the result.
      result += `${purchase.entrantType[0].toUpperCase()+(purchase.entrantType.slice(1))} ${ticketData[purchase.ticketType].description}: $${(ticketPrice/100).toFixed(2)}${extras}\n`
    
    }// end of for loop
       // End result of reciept.
      result += `-------------------------------------------\nTOTAL: $${(totalPrice/100).toFixed(2)}`
    return result;
  }// end of function!

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
