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
let total = 0 //make numerical accumulator -end function in number value
if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
  return `Ticket type '${ticketInfo.ticketType}' cannot be found.` //use negation `!`, to say if there is not, hasOwnProperty to see if the ticketData contains the ticketType like general/membership in the ticketinfo, if it does not, return ERROR message
}
if (!ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(ticketInfo.entrantType)) {
  return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
} //use negation `!`, to say if there is not, use hasOwnProperty to access the entrant type through ticketInfo than priceInCents, if that entrant type does not exist, return ERROR message
for (let i = 0; i < ticketInfo.extras.length; i++) {
  if (!ticketData.extras.hasOwnProperty(ticketInfo.extras[i])) {
    return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
  } //use negation `!`, to say if there is not, create for loop to go through the extras ticketData, use hasOwnProperty to look over the extras and if extra type does not exist in the ticketInfo, return ERROR message
   total += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]
} //bring back total, numerical value with priceInCents with extras to entrant type (child, adult, senior)
  total += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  //bring back total, numerical value with priceInCents to entrant type (general, membership)
  return total
  //return accumulator total

}


// ??ERRORS
// no existing ticket 'incorrect-type', entrant 'child', extras[]
// -- entrant
// 'general', entrant 'incorrect-entrant', extras []
// -- extra
// 'general', entrant 'adult', extra['incorrect-extra']

//ticketData = $$
//ticketType = general/membership; 
//            entrant type; extras - movie, education, terrace
//ticketInfo.ticketType = general, membership
//ticketInfo.entrantType = child, adult, senior
//ticketInfo.extras = movie, education, terrace

//--NO EXTRAS
// child--'general', entrant 'child', extras [] 2000
// adult--'general', entrant 'adult', extras [] 3000
// senior--'general', entrant 'senior', extras [] 2500

// --MEMBERSHIPS
// 'membership' child [] 1500
// 'membership' adult [] 2800
// 'membership' senior [] 2300

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
 let endPrice = 0 //set numerical accumulator, bring back at end of function
 let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------` //set written reciept which might change throughout the function
 for(let m = 0; m < purchases.length; m++){
   let extraArray = [] //extras end up in this array
   let bought = purchases[m] //simplify all purchases
   //create for loop to go through the purchases parameter
   if(!(ticketData.hasOwnProperty(bought.ticketType))){//use negation, `!`, check through if all ticketData has any of the ticketTypes(general, membership), if not return ERROR message
     return `Ticket type '${bought.ticketType}' cannot be found.`
 }
     if(!(ticketData[bought.ticketType].priceInCents.hasOwnProperty(bought.entrantType))){
       return `Entrant type '${bought.entrantType}' cannot be found.`
       //use negation, `!`, check through if all ticketData has any of the entrantTypes(child, adult, senior), if not return ERROR message
     }
     let price = calculateTicketPrice(ticketData, purchases[m])/100 //bring down the function from previous problem to create numerical calculation
     if(typeof price === 'string'){
       return price
     } //go through all the price function and determine all strings true, and return true
     let ticketType = bought.ticketType //ticket type (general, membership)
     let entrantType = bought.entrantType // entrant type (child, adult, senior)
     receipt += `\n${entrantType[0].toUpperCase()}${entrantType.slice(1)} ${ticketType[0].toUpperCase()}${ticketType.slice(1)} Admission: $${price.toFixed(2)}`//add reciept here to change it based on adjustment of ALL types changing, add toFixed method to add 2 digits and round after the decimal
     for (let b = 0; b < purchases[m].extras.length; b++){//create for loop to go through the extras
         if(ticketData.extras.hasOwnProperty(bought.extras[b])){ //use hasOwnProperty to go through if there aree extras in the ticketData
             extraArray.push(ticketData.extras[bought.extras[b]].description)//Bring down the extras empty Array and push the description into it if extra do exist
         } else {
           return `Extra type '${bought.extras[b]}' cannot be found.` //if extra type does not exist, return ERROR message
         }
     }
     if(extraArray.length !== 0){
       receipt += ` (${extraArray.join(', ')})`//if there are no extras return the receipt
     }
     endPrice += price
 }//bring down the endPrice and += to calculated ticket price function
 receipt += `\n-------------------------------------------\nTOTAL: $${endPrice.toFixed(2)}`
 return receipt
 }// return the receipt in its last form

//price = calculateTicketPrice(ticketData, purchases)
// let admitMessage =  `Thank you for visiting the Dinosaur Museum!\n
// -------------------------------------------\n
// ${ticketData.ticketInfo}Admission: $${40.00}
// -------------------------------------------
// \nTOTAL: $${40.00}`
// for (ticket of tickets) {
//   let
// }

//(purchases[i].extras.includes("'incorrect-extra'"))

//Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
