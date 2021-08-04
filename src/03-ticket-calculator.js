/*
  Do not change the line below. If you'd like to run code from this file, 
  you may use the `exampleTicketData` variable below to gain access to tickets data. 
  This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the 
  data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter 
  for accepting all tickets.
*/
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
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` 
 * value is incorrect, or any of the values inside of the `ticketInfo.extras` 
 * key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. 
 * Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string 
 * represent a different "extra" that can be added to the ticket. All strings 
 * should be keys under the `extras` key in `ticketData`.
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
  // declare 'total' and assign 0
  let total = 0;

  // if (in) === .includes for objects 
  // note to self: don't have to loop through objects, compared to arrays
  // bc of how objects can point to their values through dot/bracket notation
  
  // Errors
  // If ticketData doesnt evaluate to 'general' or 'membership'
  if (!ticketData[ticketInfo.ticketType]) {
    // return an error message
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  
  // If ticketData's age description doesnt evaluate to 'child', 'adult', or 'senior'
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    // return an error message
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  // iterate throuch each 'extra' in 'extras' array
  for (const extra of ticketInfo.extras) {
    // If 'extra' isn't in ticketData's extras
    if (!(extra in ticketData.extras)) {
      // return an error message
      return `Extra type 'incorrect-extra' cannot be found.`;
    }
  }

  // 'total' is reassigned the 'priceInCents' value based on ticket type and entrant type
  total = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  // part 2, for a ticket with 'extras', extra costs added
  // iterate through each 'extra' in 'ticketInfo.extras'
  for (const extra of ticketInfo.extras) {
    // reassign total by adding 'extra' costs to it
    total += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
  }
  // return modifed total
  return total;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based of a number of purchases. 
 * Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information 
 * should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. 
 * You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter 
 * the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a 
 * single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. 
 * Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string 
 * represent a different "extra" that can be added to the ticket. All strings 
 * should be keys under the `extras` key in `ticketData`.
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

    //> "Thank you for visiting the Dinosaur Museum!\n------------------
    -------------------------\nAdult General Admission: $50.00 (Movie Access, 
    Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild 
    General Admission: $45.00 (Education Access, Movie Access, Terrace Access)
    \nChild General Admission: $45.00 (Education Access, Movie Access, Terrace 
    Access)\n-------------------------------------------\nTOTAL: $175.00"

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

// Helper function to semi-format the price
function toDollar(result) {
  return result / 100;
}

// Helper function to uppercase the first letter of entrant type 'adult' --> 'Adult'
function uppercase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function purchaseTickets(ticketData, purchases) {
  // declare 'eachTicketPrice' and assign an empty string
  let eachTicketPrice = true;
  // declare 'totalPrice' and assign 0
  let totalPrice = 0;
  // declare 'receipt' and assign an empty string
  let receipt = '';

  // iterate throuch each 'ticketInfo' in 'purchases'
  for (const ticketInfo of purchases) {
    // reassign 'ticketInfo' to the evaluated result of calling function
    // 'calculateTicketPrice' and passing 'ticketData', 'ticketInfo' as arguments
    eachTicketPrice = calculateTicketPrice(ticketData, ticketInfo);
      // if the type of 'eachTicketPrice' is a string (means it's the error messages)
      if (typeof eachTicketPrice === 'string') {
        // return 'eachTicketPrice'
        return eachTicketPrice;
      } 
    // in the case 'eachTicketPrice' is not a string, reassign & add it 'totalPrice' each iteration
    totalPrice += eachTicketPrice;

    // reassign receipt to each relative 'ticketInfo', with 'eachPriceTicket' and 'totalPrice'
    receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${uppercase(ticketInfo.entrantType)} ${ticketData[ticketInfo.ticketType].description}: $${toDollar(eachTicketPrice).toFixed(2)}\n-------------------------------------------\nTOTAL: $${toDollar(totalPrice).toFixed(2)}`;
  }









  
  // // iterate through 'eachPurchase' in 'purchases'
  // for (const eachPurchase of purchases) {
  //   //
  //   const admissionType = ticketData[eachPurchase.ticketType];
  //   //
  //   const ageType = ticketData[eachPurchase.ticketType].priceInCents[eachPurchase.entrantType];
  //   // if 'ticketData[eachPurchase.ticketType]' is truthy
  //   if (admissionType) {
  //     // if 'ticketData[eachPurchase.ticketType].priceInCents[eachPurchase.entrantType]' is truthy
  //     if (ageType) {
  //       // iterate through 'eachExtra' in 'eachPurchase.extras'
  //       for (const eachExtra of eachPurchase.extras) {
  //         // if 'ticketData[eachExtra]' is truthy
  //         if (ticketData[eachExtra]) {
  //           // reassign 'eachTicketPrice' to calling function 'calculateTicketPrice'
  //           // and passing 'ticketData', 'eachPurchase' as arguments
  //           eachTicketPrice = calculateTicketPrice(ticketData, eachPurchase);
  //           // reassign and add 'eachTicketPrice' to 'totalPrice', each function invocation
  //           totalPrice += eachTicketPrice;
  //           // reassign and format 'totalPrice' by invoking helper function 'toDollar'
  //           totalPrice = toDollar(totalPrice);

  //           // reassign 'receipt' to `Thank you for visiting the Dinosaur Museum!\n------------------
  //           // -------------------------\n${entrantType} ${ticketData[ticketType].description}: 
  //           // ${eachTicketPrice}\n-------------------------------------------\nTOTAL: ${totalPrice}`
  //           receipt = `Thank you for visiting the Dinosaur Museum!\n------------------
  //           -------------------------\n${ageType} ${admissionType.description}: 
  //           ${eachTicketPrice}\n-------------------------------------------\nTOTAL: ${totalPrice}`;
  //         }
  //       }
  //     }
  //   }    
  // }

  // return modified 'receipt'
  return receipt;
}

const purchases = [
  {
    ticketType: "general",
    entrantType: "adult",
    extras: ["movie", "terrace"],
  }
];

purchaseTickets(exampleTicketData, purchases);

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
