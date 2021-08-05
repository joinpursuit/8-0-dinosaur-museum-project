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

/*
Understanding:
* We are given an object called ticketInfo. From the ticketInfo object we have keys and values that we need to determine the ticket price. We use the ticketData, which have the information for how much the the price should be.
*/

function calculateTicketPrice(ticketData, ticketInfo) {
  // Error checking to see if ticket type is valid
  let ticketTypeObj = ticketData[ticketInfo['ticketType']];
  if (!ticketTypeObj){
    return `Ticket type '${ticketInfo['ticketType']}' cannot be found.`
  } 

  // Error checking to see if entrant type is valid
  let entrantTypeObj = ticketData[ticketInfo['ticketType']]['priceInCents'][[ticketInfo['entrantType']]];
  if (!entrantTypeObj){
    return `Entrant type '${ticketInfo['entrantType']}' cannot be found.`;
  }
  // Placeholder for total
  let totalTicketPrice = 0;
  // Placeholder for sub-total of ticket without any extras 
  let priceNoExtras = ticketData[ticketInfo['ticketType']]['priceInCents'][[ticketInfo['entrantType']]];

  // Default value to accumulate the price of extras 
  let priceOfExtras = 0;
  let extrasArr = ticketInfo['extras']; // Focusing on the extras array
  for (let i=0; i<extrasArr.length; i++){ //Looping and accumulating the cost of the extras
    if (extrasArr[i] === 'movie'){
      priceOfExtras += ticketData['extras']['movie']['priceInCents'][ticketInfo['entrantType']];
    } else if (extrasArr[i] === 'education'){
      priceOfExtras += ticketData['extras']['education']['priceInCents'][ticketInfo['entrantType']];
    } else if (extrasArr[i] === 'terrace'){
      priceOfExtras += ticketData['extras']['terrace']['priceInCents'][ticketInfo['entrantType']];
    } else if (extrasArr[i] !== 'movie' || 'education' || 'terrace'){
      return `Extra type '${extrasArr[i]}' cannot be found.`
    }
  }
  // Adding price of the ticket without extras and the price of all the extras
  totalTicketPrice = priceNoExtras + priceOfExtras;
  return totalTicketPrice;
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

/*
  Understanding: 
  * This function will output a receipt of each purchased ticket that is listed in the purchases array. 
  * The format of the receipt is very important. 
    -The receipt uses the entrantType with the first letter capitalized and ticketData description. 
    -It also has the ticket amount in dollars instead of in cents. 
    -The purchased extras are also included using the description for each respected extra description from the ticketData object. 
    -The last line in the receipt is the total of all purchased tickets from the purchases array.
  * If there are any errors within the tickets, such as ticketType, entrantType, or extras, an error should be outputted with the same message used in the calculateTicketPrice function. 
  * The difference between the array, purchases, and the object, ticketInfo, is the way to access each ticket, and there are more than one ticket in the purchases array.
  Planning:
  * // Double accumulator pattern
    // Keep track of purchase total(Number) and receipt purchase summary(String)
    // Loop through purchases and use calculateTicketPrice to determine total of purchase
      // If the return type is a String return it
    // A nested accumulator to determine the cost each ticket(Number) and a summary(String) for the receipt
    // Format the receipt with the totals and the receipt summaries
*/

function purchaseTickets(ticketData, purchases) {
  // Helper function to capitalize the entrantType within the receipt summary
  function capitalize(text){
  firstLetter = text[0].toUpperCase();
  split = text.split("");
  split.shift();
  remainder = split.join("").toLowerCase();
  return firstLetter + remainder;
}
  // Gets the total price within purchases using the previous function
  let purchaseTotal = 0;
  for (let i=0; i<purchases.length; i++){
    let purchasePriceOfEachTicket = calculateTicketPrice(ticketData, purchases[i]);
    if (typeof(purchasePriceOfEachTicket) === 'string'){
      return purchasePriceOfEachTicket;
    } else if (typeof(purchasePriceOfEachTicket) === 'number'){
        purchaseTotal += purchasePriceOfEachTicket/100;
    }
  }
  // Set default value for accumulator to get the receipt summary
  let receiptSummary = '';

  for (let i=0; i<purchases.length; i++){
    // If each purchase or TickcetInfo contains no extras
    if (purchases[i]['extras'].length === 0){
      receiptSummary += `${capitalize(purchases[i]['entrantType'])} ${ticketData[purchases[i]['ticketType']]['description']}: $${(calculateTicketPrice(ticketData, purchases[i]))/100}.00\n`;
    } // If each purchase or TicketInfo contains extras
      else if (purchases[i]['extras'].length !== 0){ 
        // Another accumulator to add the extra summary to the receipt summary
        let extrasArr = purchases[i]['extras'];
        let extrasSummary = '';
        for (let i=0; i<extrasArr.length; i++){
          if (i === extrasArr.length-1){
            extrasSummary += `${ticketData['extras'][extrasArr[i]]['description']}`;
          } else {
            extrasSummary += `${ticketData['extras'][extrasArr[i]]['description']}, `;
          }
        }
        receiptSummary += `${capitalize(purchases[i]['entrantType'])} ${ticketData[purchases[i]['ticketType']]['description']}: $${(calculateTicketPrice(ticketData, purchases[i]))/100}.00 (${extrasSummary})\n`
    }
  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receiptSummary}-------------------------------------------\nTOTAL: $${purchaseTotal}.00`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
