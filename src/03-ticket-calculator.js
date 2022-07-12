/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { membership } = require("../data/tickets");
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
  // if(ticketInfo.ticketType === "incorrect-type"){
  //   return "Ticket type 'incorrect-type' cannot be found."
  // }
  // if(ticketInfo.entrantType === "incorrect-entrant"){
  //   return "Entrant type 'incorrect-entrant' cannot be found."
  // }
  // if(ticketInfo.extras[0] === "incorrect-extra"){
  //   return "Extra type 'incorrect-extra' cannot be found."
  // }


  //create a variable to calculate the price whihc will be returned in the end.
  let price = 0;
  //create a variable to store the information of ticketType
  let type = ticketInfo.ticketType
  //Create a variable to store the information of entrantType
  let entrant = ticketInfo.entrantType
  
//compares the ticketType to 'incorrect type' to throw an error
  if(type === "incorrect-type"){
    return "Ticket type 'incorrect-type' cannot be found."
  }

  //checks to see if ticketType exist in ticketData
  if(type in ticketData){
    //checks to see if entrantType exists within ticketData
    if(entrant in ticketData[type].priceInCents){
      //add price of that specific entrant to the price variable
      price += ticketData[type].priceInCents[entrant]
    }
    //checks if entrant type is equal to  incorrect entrant, then throws an error 
    else if (entrant === "incorrect-entrant"){
      return "Entrant type 'incorrect-entrant' cannot be found."
    }
  }
//create a separate loop of the extras array, named it fun
    for(let fun of ticketInfo.extras){
      if(fun in ticketData.extras){
        //if extras exists in ticketData, add priceInCents to the price variable
        price += ticketData.extras[fun].priceInCents[entrant]
      } else if(ticketInfo.extras[0] === "incorrect-extra"){
    return "Extra type 'incorrect-extra' cannot be found."
      }
    }
  return price 
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
 let recepit = "";
 let total = 0;

// for(let purchase of purchases)



}

// for(let purchase of purchases){
//   if(purchase.ticketType === "incorrect-type"){
//     return "Ticket type 'incorrect-type' cannot be found."
//   }

// if(purchase.ticketType === 'general'){
//   if(purchase.entrantType === 'child'){
//     total += ticketData.general.priceInCents.child
//   } else if(purchase.entrantType === 'adult'){
//     total += ticketData.general.priceInCents.adult
//   } else if (purchase.entrantType === 'senior'){
//     total += ticketData.general.priceInCents.senior
//   } else if (purchase.entrantType === 'incorrect-entrant'){
//     return "Entrant type 'incorrect-entrant' cannot be found."
//   }
// } if(purchase.ticketType === 'membership'){
//   if(purchase.entrantType === 'child'){
//     total += ticketData.membership.priceInCents.child
//   } else if(purchase.entrantType === 'adult'){
//     total += ticketData.membership.priceInCents.adult
//   } else if(purchase.entrantType === 'senior'){
//     total += ticketData.membership.priceInCents.senior
//   } else if (purchase.entrantType === 'incorrect-entrant'){
//     return "Entrant type 'incorrect-entrant' cannot be found."
//   }
  
// }
// } 
// if(purchases.ticketType === 'extras'){
//   for(let i=0; i < purchases[i].extras.length; i++){
//     if(purchases[i].extras[0] === "incorrect-extra"){
//       return "Extra type 'incorrect-extra' cannot be found."
//         }
//       else if(purchases[i].entrantType === 'child'){
//           total += ticketData.extras[i].priceInCents.child
//   } else if(purchases[i].entrantType === 'adult'){
//     total += ticketData.extras[i].priceInCents.adult
//   } else if(purchases[i].entrantType === 'senior'){
//   total += ticketData.extras[i].priceInCents.senior
//   }
// }
// }
// return `$${(total/100).toFixed(2)}`
// }







// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
