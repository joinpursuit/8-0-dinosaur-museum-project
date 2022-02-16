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
  //variable to be populated with the calculations based on ticket conditions
  let baseTicket = 0;

  //checks that the ticketType matches with only the 'general' or 'membership' keys within ticketData; 'extras' is not a ticketType; if none match return an error
 if(!ticketData[ticketInfo.ticketType] || ticketInfo.ticketType === 'extras'){
   return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
 }

 //checks that the entrantType (which is under 'priceInCents' under the 'ticketType') matches with the keys within ticketData; if none match return an error; if they do match calculate baseTicket
 if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
   return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
 } else{
   baseTicket += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
 }

 //checks the extras array within ticketInfo for matching keys within extras key in ticketData; if none of the values match the keys return an error; if they do match calculate the extra charges to baseTicket
 for(let i = 0; i < ticketInfo.extras.length; i++){
   if(!ticketData.extras[ticketInfo.extras[i]]){
     return `Extra type '${ticketInfo.extras}' cannot be found.`;
   } else{
     baseTicket += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType];
   }
 }
  return baseTicket;
}

//Gigi's example
//1. return errors if ticket types, entrant types, extras not included
//2. start with a base price - 0
//3. accumulate each portion of the ticket fees

// if(!ticketData[ticketInfo.ticketType] || ticketInfo.ticketType === 'extras'){
//   return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
// } else if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
//   return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
// } else{
//   for(let extra of ticketInfo.extras){
//     if(!ticketData.extras[extra]){
//       return `Extra type '${extra}' cannot be found.`;
//     }
//   }
// }
// let baseTicket = 0;
// baseTicket += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

// for(let addOn of ticketInfo.extras){
//   baseTicket += ticketData.extras[addOn].priceInCents[ticketInfo.entrantType];
// }

// return baseTicket;


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
  //start with basic receipt format
  let formattedReceipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"
  //create variable to hold the total cost of all purchases
  let total = 0;
  
  for(let i = 0; i < purchases.length; i++){
    //use the previous function which has the error messages set up and price of one ticket already calculated
    let ticketPrice = calculateTicketPrice(ticketData, purchases[i])
    //the error messages in the previous function are strings so you can use that to check the type of data being passed through and return the error message
    if(typeof ticketPrice === 'string'){
      return ticketPrice;
    } else{
      //while looping through the purchases array, the price of each ticket is being summed and saved to total
      total += ticketPrice / 100;
      //create a placeholder variable for the type of 'extras' added; if none are added it will be an empty string
      let extraPurchases = ''
      //use a nested loop to check the extras array of each purchase in the purchases array
      for(let j = 0; j < purchases[i].extras.length; j++){
        if(j !== 0){
          //excluding the element at index 0, add a comma and space in front of each element pulled from 'extras'
          extraPurchases += ", "
        }
        extraPurchases += ticketData.extras[purchases[i].extras[j]].description
      }
      formattedReceipt += `${purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)}${extraPurchases ? " (" + extraPurchases + ")" : extraPurchases}\n`
      //the ternary condition will check if extraPurchases is truthy or falsy; if truthy it will add the description of each 'extras' in () otherwise it will return the empty string
    }
   
  }
  formattedReceipt += `-------------------------------------------\nTOTAL: $${total.toFixed(2)}`
  return formattedReceipt;
}

//////
// let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;
// let totalReceiptPrice = 0;

// for(let purchase of purchases){
//   let purchasePrice = calculateTicketPrice(ticketData, purchase);

//   if(typeof purchasePrice === 'string'){
//     return purchasePrice;
//   } else{
//     totalReceiptPrice += purchasePrice;
//     let entrant = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1).toLowerCase();
//     let ticketType = ticketData[purchase.ticketType].description;
//     let priceInDollars = (purchasePrice / 100).toFixed(2);
//     let ticketExtras = '';
//     for(let i = 0; i < purchase.extras.length; i++){
//       if(i === 0){
//         ticketExtras += ' ('
//       }
//       ticketExtras += ticketData.extras[purchase.extras[i]].description
//       if(i === purchase.extras.length -1){
//           ticketExtras += ')';
//         }else{
//           ticketExtras += ", ";
//         }
//       }
//       receipt += `\n${entrant} ${ticketType}: $${priceInDollars}${ticketExtras}`
//     }
//   }
//   totalReceiptPrice = (totalReceiptPrice / 100).toFixed(2);
//   receipt += `\n-------------------------------------------\nTOTAL: $${totalReceiptPrice}`;
//   return receipt;


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
