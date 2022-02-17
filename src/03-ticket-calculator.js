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

  if(!ticketData[ticketInfo.ticketType] || ticketInfo.ticketType === 'extras') {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } else if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.` 
  } else {
    for(let extra of ticketInfo.extras){
      if(!ticketData.extras[extra]){
        return `Extra type '${extra}' cannot be found.`
      }
    }
  }
  let baseTicket = 0;

  baseTicket += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] 

  for(let addOn of ticketInfo.extras){
    baseTicket += ticketData.extras[addOn].priceInCents[ticketInfo.entrantType]
  }

  return baseTicket;
}




  // let validEntrance = ['adult','child', 'senior'];
  // let validTicketType = ['general', 'membership'];
  // let validExtras = ['movie', 'education', 'terrace'];
  // let totalCost = 0;
  // let costWithExtras = 0;
  // if (validTicketType.includes(ticketInfo.ticketType)){
  //   if (validEntrance.includes(ticketInfo.entrantType)){
  //     totalCost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  //   }
  // }
  // for (let i = 0; i < ticketInfo.extras.length; i++){
  //   if (validExtras.includes(ticketInfo.extras[i])){
  //     if (validEntrance.includes(ticketInfo.entrantType)){
  //       costWithExtras += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]
  //     }
  //   }
  //   if (!validExtras.includes(ticketInfo.extras[i])){
  //     return "Extra type 'incorrect-extra' cannot be found.";
  //   }

  // }
  // if (!validTicketType.includes(ticketInfo.ticketType)){
  //   return "Ticket type 'incorrect-type' cannot be found.";
  // }
  // if (!validEntrance.includes(ticketInfo.entrantType)){
  //   return "Entrant type 'incorrect-entrant' cannot be found.";
  // }

  // return totalCost + costWithExtras;

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
let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------";
let totalReceiptPrice = 0;

for (let purchase of purchases){
  let purchasePrice = calculateTicketPrice(ticketData, purchase)

  if(typeof purchasePrice === 'string'){
    return purchasePrice
  } else {
    totalReceiptPrice += purchasePrice
    let entrant = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1).toLocaleLowerCase();
    let ticketType = ticketData[purchase.ticketType].description; 
    let priceInDollars = (purchasePrice / 100).toFixed(2)
    let ticketExtras = "";
    
    for(let i = 0; i < purchase.extras.length; i++){
      if(i ===0){
        ticketExtras += " ("
      }
      ticketExtras += ticketData.extras[purchase.extras[i]].description
      if (i === purchase.extras.length -1){
        ticketExtras +=  ")"
      } else {
        ticketExtras +=  ", "
      }
    }
    receipt += `\n${entrant} ${ticketType}: $${priceInDollars}${ticketExtras}`
  }
}
  totalReceiptPrice = (totalReceiptPrice / 100).toFixed(2)
  receipt += `\n-------------------------------------------\nTOTAL: $${totalReceiptPrice}`;
  return receipt;
  
}
//   let validEntrance = ['adult','child', 'senior'];
//   let validTicketType = ['general', 'membership'];
//   let validExtras = ['movie', 'education', 'terrace'];
//   let totalCost = [];
//   let extraCost = [];
//   let finalCost = [];
//   let admissionType = [];
//   let entranceType = [];
//   let extrasType = [];
//   let finalResult = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------";

// for(let i = 0; i < purchases.length; i++){
//   if(!validEntrance.includes(purchases[i].entrantType)){
//     return `Entrant type 'incorrect-entrant' cannot be found.`
//   }
//   if(!validTicketType.includes(purchases[i].ticketType)){
//     return `Ticket type 'incorrect-type' cannot be found.`
//   }
//   if(purchases[i].extras.includes("incorrect-extra")){
//     return "Extra type 'incorrect-extra' cannot be found."
//   }
// }
//   for(let i = 0; i < purchases.length; i++){
//     if (validTicketType.includes(purchases[i].ticketType)){
//       if (validEntrance.includes(purchases[i].entrantType)){
//         totalCost.push (ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType])
//       }
//   }
// }
//   for(let j = 0; j < purchases.length; j++){
//     if(purchases[j].extras.length < 1){
//       extraCost.push(0);
//     }
//     for(let k = 0; k < purchases[j].extras.length; k++){
//       for(let l = 0; l < validExtras.length; l++){
//       if(validExtras[l].includes(purchases[j].extras[k])){
//         //add loop to get sum??
//         extraCost.push(ticketData.extras[purchases[j].extras[k]].priceInCents[purchases[j].entrantType]);
//       }
//     }
//   }
// }
// console.log(totalCost)
// console.log(extraCost)
//   for(let i = 0; i < totalCost.length; i++){
//       finalCost.push(((totalCost[i] += extraCost[i]) / 100).toFixed(2));
//     }

//     for(let i = 0; i < purchases.length; i++){
//       if(purchases[i].extras.length < 1){
//         finalResult += `\n${purchases[i].entrantType} ${purchases[i].ticketType}: $${finalCost[i]}` 
//       }
//       else{
//       finalResult += `\n${purchases[i].entrantType} ${purchases[i].ticketType}: $${finalCost[i]} (${purchases[i].extras})`
//       }
//     }

    

//      return finalResult;
// }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
