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
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` 
 * will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, 
 * or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message 
 * should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string 
 * except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change 
 * depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent 
 * a different "extra" that can be added to the ticket. All strings should be keys under 
 * the `extras` key in `ticketData`.
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

    // Get ticket price based on ticket info
    //Return an error if either cases is incorrect 
    //Deal with edge cases where ticketType/entrantType/Extratype given is not available
    function calculateTicketPrice(ticketData, ticketInfo) {
      //total price to be returned
    let totalTicketPrice = 0;
    //ticket type
     let ticketType = ticketInfo.ticketType;
     //entrance  type  ticket
     let entrantType = ticketInfo.entrantType;
     //xtra services
     let extraType = ticketInfo.extras;
  
    //checks if ticket type is in tickets array
     if(ticketType in ticketData === false || ticketType === 'extras'){
        //returns if the conditon evaluates to true
        return `Ticket type '${ticketType}' cannot be found.`
      } 
    // checks if the entrance ticket type is avialable
      if(entrantType in ticketData[ticketType].priceInCents){
        //fetches the price if entrance type is found
        totalTicketPrice += ticketData[ticketType].priceInCents[entrantType]
      } else {
          // returns if the conditon evaluates to false
          return `Entrant type '${entrantType}' cannot be found.`
      } 
     
      //checks if the objects array has elements, "movie", "education", "terrace" && if it's not empty
       if((extraType.includes('movie') ||
      extraType.includes('education') ||
      extraType.includes('terrace')) && extraType.length >= 1){
           //loops through extraType array
      
        for (let extra of extraType){
          //fetches the price if entrance type is found
          totalTicketPrice += ticketData.extras[extra].priceInCents[entrantType]
        } 
      } 
      //checks if the objects array doesn't have elements, "movie", "education", "terrace" && if it's not empty
        else if(!extraType.includes("movie", "education", "terrace") && extraType.length >= 1) {
      //returns if the conditon evaluates to true
            return `Extra type '${extraType}' cannot be found.`;
          }
    
      return totalTicketPrice;
    }

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` 
 * in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same 
 * way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same 
 * format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file 
 * for an example of the input.
 * @param {Object[]} ticket - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} ticket[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticket[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticket[].extras - An array of strings where each string represent a different "extra" that can be 
 * added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const ticket = [
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
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------
    \nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 
    (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild 
    General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------
    \nTOTAL: $175.00"
*/
function createExtrasString(ticketData, extras){

if(extras.length === 0){
    return '';
  }
let result = ' ('
for (let i = 0; i < extras.length; i++){
    const extra = extras[i]
    if(i === extras.length - 1){
      result += ticketData.extras[extra].description + ')';
    } else {
      result += ticketData.extras[extra].description + ', ';
    }
}
return result
}


function createDollarString(dollar){
  return '$' + (dollar / 100).toFixed(2)
}


 function purchaseTickets(ticketData, purchases){
let total = 0;
let result = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'; 
  

  for (let i = 0; i < purchases.length; i++){
    const ticket = purchases[i]
    const price = calculateTicketPrice(ticketData, ticket)
    if(typeof price === 'string'){
      return price
    }

    const entrantTypeString = ticket.entrantType[0].toUpperCase() + ticket.entrantType.slice(1).toLowerCase()
    const ticketTypeString = ticketData[ticket.ticketType].description
    const dollarString = createDollarString(price)
    const extrasString = createExtrasString(ticketData, ticket.extras)

    result = result + entrantTypeString + ' ' + ticketTypeString + ': ' + dollarString +extrasString + '\n'
    total = total + price;

      }
      result = result + '-------------------------------------------\nTOTAL: '
      result = result + createDollarString(total)
    
  return result;
 }

module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
