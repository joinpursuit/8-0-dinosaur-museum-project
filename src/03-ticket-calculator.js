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
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be 
 * added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
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
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------
    \nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 
    (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild 
    General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------
    \nTOTAL: $175.00"

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
let totalTicketPrice = ''; 
let prize =  0;



for (let purchase of purchases){

  prize = calculateTicketPrice(ticketData, purchase)

}
  if(typeof prize === 'number'){

    const priceTotal = 0;
// checks if the entrance ticket type is avialable
if(entrantType in ticketData[ticketType].priceInCents){
  priceTotal += prize
  totalTicketPrice = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n-------------------------------------------\nTOTAL: ${priceTotal}`;
}

// checks if the entrance ticket type is avialable
if(entrantType in ticketData[ticketType].priceInCents === 2){
  priceTotal += prize
  totalTicketPrice = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n-------------------------------------------\nTOTAL:${priceTotal}`;
}


// checks if the entrance ticket type is avialable
if(entrantType in ticketData[ticketType].priceInCents > 2){
 priceTotal += prize; 
  totalTicketPrice = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n${purchase.entrantType} ${purchase.ticketType}  Admission: ${prize}\n-------------------------------------------\nTOTAL:${priceTotal}`
}




    //checks if the objects array has elements, "movie", "education", "terrace" && if it's not empty
    if((extraType.includes('movie') ||
    extraType.includes('education') ||
    extraType.includes('terrace')) && extraType.length >= 1){
      priceTotal += prize; 
        totalTicketPrice =`Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchase.entrantType} ${purchase.ticketType} Admission: ${prize} (${purchase.extras})\n-------------------------------------------\nTOTAL: ${priceTotal}`
       
    }

    if(extraType.length >= 1){
      priceTotal += prize;
    totalTicketPrice =`Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${purchase.entrantType} ${purchase.ticketType} Admission: ${prize} (${purchase.extras})\n${purchase.entrantType} ${purchase.ticketType} Admission: ${prize} ${purchase.extras}\n${purchase.entrantType} ${purchase.ticketType} Admission: ${prize}  (${purchase.extras})\n${purchase.entrantType} ${purchase.ticketType} Admission: ${prize}  (${purchase.extras}\n-------------------------------------------\nTOTAL: ${priceTotal}`
  }
 
  }

 return totalTicketPrice
  } 
 // purchaseTickets(exampleTicketData, purchases)
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
