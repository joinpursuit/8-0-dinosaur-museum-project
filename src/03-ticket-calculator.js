/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
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
//   let result = 0;
  
//   for (let i = 0; i < ticketInfo.length; i++){

//     let totalPrice = 0;

//     for (let j = 0; j < ticketInfo[i].extras.length; j++){
      
//       let extraPrice = 0;

//       if (ticketData.extras.hasOwnProperty(ticketInfo[i].extras[j])){

//         extraPrice += Number(ticketData.extras[ticketInfo[i].extras[j]])

//         } else {

//         return `Extra type '${ticketInfo[i].extras[j]}' cannot be found.`

//       }

//     totalPrice += extraPrice
  
//     }

//   if(ticketData.hasOwnProperty(ticketInfo[i].ticketType) && ticketData[ticketInfo[i].ticketType].priceInCents.hasOwnProperty(ticketInfo[i].entrantType)){

//     totalPrice += Number(ticketData[ticketInfo[i].ticketType].priceInCents[ticketInfo[i].entrantType])

//     } else if (!ticketData.hasOwnProperty(ticketInfo[i].ticketType)){

//       return `Ticket type '${ticketInfo[i].ticketType}' cannot be found.`

//     } else if (!ticketData[ticketInfo[i].ticketType].priceInCents.hasOwnProperty(ticketInfo[i].entrantType )){

//       return `Entrant type '${ticketInfo[i].entrantType}' cannot be found.`

//     }

//     result += totalPrice

//   }

//   return result

// }
  if (!Object.keys(ticketData).includes(ticketInfo.ticketType)){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  if (!Object.keys(ticketData.general.priceInCents).includes(ticketInfo.entrantType)){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  let ticketPrice = 0;
switch (ticketInfo.ticketType) {
  case 'general':
    switch (ticketInfo.entrantType) {
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
    switch (ticketInfo.entrantType) {
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
    }
for (let i = 0; i < ticketInfo.extras.length; i++){
  switch (ticketInfo.extras[i]){
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
      switch (ticketInfo.entrantType) {
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
      switch (ticketInfo.entrantType) {
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
  }
}
return ticketPrice
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
 
  let totalPrice = 0;
 
  let receiptOne = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n';

  let receiptExtra = '';

  for(let i = 0; i < purchases.length; i++){
    
    let initialTotal = 0;

    let extrasArr = [];

    for(let j = 0; j < purchases[i].extras.length; j++){

      let extraPrice = 0;

      if (ticketData.extras.hasOwnProperty(purchases[i].extras[j])){

        extraPrice += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]
       
        extrasArr.push(ticketData.extras[purchases[i].extras[j]].description)

      } else {

        return `Extra type '${purchases[i].extras[j]}' cannot be found.`
    
      }

      initialTotal += extraPrice
    
    }

  if(ticketData.hasOwnProperty(purchases[i].ticketType) && ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType)){

      initialTotal += Number(ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType])
  
   } else if (!ticketData.hasOwnProperty(purchases[i].ticketType)){

      return `Ticket type '${purchases[i].ticketType}' cannot be found.`

   } else if (!ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType )){

      return `Entrant type '${purchases[i].entrantType}' cannot be found.`

    }  
    
    // receiptExtra += `${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1).toLowerCase()} ${ticketData[purchases[i].ticketType].description}: $${(initialTotal/100).toFixed(2)}\n`
    if(purchases[i].extras.length !== 0){
      
      receiptExtra += `${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1).toLowerCase()} ${ticketData[purchases[i].ticketType].description}: $${(initialTotal/100).toFixed(2)} (${extrasArr.join(', ')})\n`
    
    }else{
      
      receiptExtra += `${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1).toLowerCase()} ${ticketData[purchases[i].ticketType].description}: $${(initialTotal/100).toFixed(2)}\n`
   
    }
   
    totalPrice += initialTotal

  }

  return `${receiptOne}${receiptExtra}-------------------------------------------\nTOTAL: $${((totalPrice)/100).toFixed(2)}`

}
 
 
 


 




// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
