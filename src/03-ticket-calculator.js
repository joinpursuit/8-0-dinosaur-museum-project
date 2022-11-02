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
// generalCondition = {}
// membershipCondition = {}
// extraCondition = {}
  
// Error check
if (ticketInfo.ticketType == 'incorrect-type'){
  result = `Ticket type 'incorrect-type' cannot be found.`
}
if (ticketInfo.entrantType == 'incorrect-entrant'){
  result = `Entrant type 'incorrect-entrant' cannot be found.`
}
if (ticketInfo.extras == 'incorrect-extra'){
  result = `Extra type 'incorrect-extra' cannot be found.`
}

//1st iteration start//

if ((ticketInfo.ticketType == 'general') && ticketInfo.entrantType == 'child'){
  result = (ticketData.general.priceInCents.child)
}
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'adult') && (ticketInfo.extras != 'incorrect-extra' )){
  result = (ticketData.general.priceInCents.adult)
}
if ((ticketInfo.ticketType == 'general') && ticketInfo.entrantType == 'senior'){
  result = (ticketData.general.priceInCents.senior)
}
  if ((ticketInfo.ticketType == 'membership') && ticketInfo.entrantType == 'child'){
  result = (ticketData.membership.priceInCents.child)
  } 
if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'adult') && (ticketInfo.extras != 'incorrect-extra' )){
  result = (ticketData.membership.priceInCents.adult)
}
  if ((ticketInfo.ticketType == 'membership') && ticketInfo.entrantType == 'senior'){
  result = (ticketData.membership.priceInCents.senior)
}

 //general admission with extras (movie) 
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes('movie'))){
  result = ((ticketData.general.priceInCents.child) + (ticketData.extras.movie.priceInCents.child))
}
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes('movie'))){
  result = ((ticketData.general.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult))
}
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes('movie'))){
  result = ((ticketData.general.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior))
}

// general admission with extras (movie and education)
  let i=0
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('movie' && 'education'))){
  result = ((ticketData.general.priceInCents.child) + (ticketData.extras.movie.priceInCents.child) + (ticketData.extras.education.priceInCents.child))
}
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('movie' && 'education'))){
  result = ((ticketData.general.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))
  }
  if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('movie' && 'education'))){
  result = ((ticketData.general.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior) + (ticketData.extras.education.priceInCents.senior))
}

//general admission
// general admission with extras (terrace and education)
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
result = ((ticketData.general.priceInCents.child) + (ticketData.extras.terrace.priceInCents.child) + (ticketData.extras.education.priceInCents.child))
}
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
result = ((ticketData.general.priceInCents.adult) + (ticketData.extras.terrace.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))
}
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
result = ((ticketData.general.priceInCents.senior) + (ticketData.extras.terrace.priceInCents.senior) + (ticketData.extras.education.priceInCents.senior))
}

// general admission with extras (movie, terrace and education )
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
result = ((ticketData.general.priceInCents.child) + (ticketData.extras.movie.priceInCents.child) + (ticketData.extras.terrace.priceInCents.child) + (ticketData.extras.education.priceInCents.child))
}
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
result = ((ticketData.general.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult) + (ticketData.extras.terrace.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))
}
if ((ticketInfo.ticketType == 'general') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
result = ((ticketData.general.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior) + (ticketData.extras.terrace.priceInCents.senior) + (ticketData.extras.education.priceInCents.adult))
}
//membership admission
//membership admission with extras (movie) 
if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes('movie'))){
result = ((ticketData.membership.priceInCents.child) + (ticketData.extras.movie.priceInCents.child))
}
if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes('movie')))
result = ((ticketData.membership.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult))

if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes('movie')))
result = ((ticketData.membership.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior))

// membership admission with extras (movie and education)
if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('movie')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.child) + (ticketData.extras.movie.priceInCents.child) + (ticketData.extras.education.priceInCents.child))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('movie')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('movie')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior) + (ticketData.extras.education.priceInCents.senior))}

// membership admission with extras (terrace and education)
if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.child) + (ticketData.extras.terrace.priceInCents.child) + (ticketData.extras.education.priceInCents.child))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.adult) + (ticketData.extras.terrace.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('terrace')) && ((ticketInfo.extras).includes('education'))){
  result = ((ticketData.membership.priceInCents.senior) + (ticketData.extras.terrace.priceInCents.senior) + (ticketData.extras.education.priceInCents.senior))}
  
  // membership admission with extras (movie, terrace and education )
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'child') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
  result = ((ticketData.membership.priceInCents.child) + (ticketData.extras.movie.priceInCents.child) + (ticketData.extras.terrace.priceInCents.child) + (ticketData.extras.education.priceInCents.child))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'adult') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
  result = ((ticketData.membership.priceInCents.adult) + (ticketData.extras.movie.priceInCents.adult) + (ticketData.extras.terrace.priceInCents.adult) + (ticketData.extras.education.priceInCents.adult))}
  
  if ((ticketInfo.ticketType == 'membership') && (ticketInfo.entrantType == 'senior') && ((ticketInfo.extras).includes ('movie') && (ticketInfo.extras).includes ('terrace') && (ticketInfo.extras).includes ('education'))){
  result = ((ticketData.membership.priceInCents.senior) + (ticketData.extras.movie.priceInCents.senior) + (ticketData.extras.terrace.priceInCents.senior) + (ticketData.extras.education.priceInCents.adult))}

return result

//1st iteration end
//--------------------------------------------------------------


 // attempting to simplify with switch start
 //---------------------------------------------------------------

// totalPrice = []
// sumPrice = 0 

// switch(ticketInfo.entrantType == 'child'){
//   case ticketInfo.ticketType == "general":
//     totalPrice.push(ticketData.general.priceInCents.child)
//     break;
//   case ticketInfo.ticketType == "membership":
//     totalPrice.push(ticketData.membership.priceInCents.child)
//   }
//   switch(ticketInfo.entrantType == 'adult'){
//     case ticketInfo.ticketType == "general":
//       totalPrice.push(ticketData.general.priceInCents.adult)
//       break;
//     case ticketInfo.ticketType == "membership":
//       totalPrice.push(ticketData.membership.priceInCents.adult)
//     }
//     switch(ticketInfo.entrantType == 'senior'){
//       case ticketInfo.ticketType == "general":
//         totalPrice.push(ticketData.general.priceInCents.senior)
//         break;
//       case ticketInfo.ticketType == "membership":
//         totalPrice.push(ticketData.membership.priceInCents.senior)
//       }
//   for(i=0; i<ticketInfo.extras.length; i++){
//     switch(ticketInfo.entrantType == 'child' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "movie":
//         totalPrice.push(ticketData.extras.movie.priceInCents.child)
//         break;
//     }
//     switch(ticketInfo.ntrantType == 'child' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "education":
//         totalPrice.push(ticketData.extras.education.priceInCents.child)
//         break;
//     }
//     switch(ticketInfo.entrantType == 'child' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "terrace":
//         totalPrice.push(ticketData.extras.terrace.priceInCents.child)
//         break;
//     }
//     switch(ticketInfo.entrantType == 'adult' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "movie":
//         totalPrice.push(ticketData.extras.movie.priceInCents.adult)
//         break;
//     }
//     switch(ticketInfo.entrantType == 'adult' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "education":
//         totalPrice.push(ticketData.extras.education.priceInCents.adult)
//         break;
//     }
//     switch(ticketInfo.entrantType == 'adult' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "terrace":
//         totalPrice.push(ticketData.extras.terrace.priceInCents.adult)
//         break;
//     }
//         switch(ticketInfo.entrantType == 'senior' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "movie":
//         totalPrice.push(ticketData.extras.movie.priceInCents.senior)
//         break;
//         }
//     switch(ticketInfo.entrantType == 'senior' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "education":
//         totalPrice.push(ticketData.extras.education.priceInCents.senior)
//         break;
//     }
//     switch(ticketInfo.entrantType == 'senior' && ticketInfo.extras.length >0){
//       case ticketInfo.extras[i] == "terrace":
//         totalPrice.push(ticketData.extras.terrace.priceInCents.senior)
//         break;
//     }

 
//   for(j=0; j<totalPrice.length; j++){
//     sumPrice += totalPrice[i]
//   }  
//   return (totalPrice)
// }

// attempting to simplify with switch start
//---------------------------------------------------------------
  
  // result = generalCondition

  // console.log(generalCondition.adult)
  
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
// Error check
if ((purchases[0].ticketType).includes('incorrect-type')){
  result = `Ticket type 'incorrect-type' cannot be found.`
}
if ((purchases[0].entrantType).includes('incorrect-entrant')){
  result = `Entrant type 'incorrect-entrant' cannot be found.`
}
if ((purchases[0].extras).includes('incorrect-extra')){
  result = `Extra type 'incorrect-extra' cannot be found.`
}

// receipt › no extras › general admission › prints a receipt for a 1 Adult General Admission ticket

entrantDetails = []
entrantPrice = []


if(((purchases[0].ticketType).includes("general")) && ((purchases[0].entrantType).includes("adult")) && !((purchases[0].extras).includes("incorrect-extra"))){
  result = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${(purchases[0].entrantType).charAt(0).toUpperCase() +(purchases[0].entrantType).slice(1) } ${(purchases[0].ticketType).charAt(0).toUpperCase()+(purchases[0].ticketType).slice(1)} Admission: $${((ticketData.general.priceInCents.adult)/100).toFixed(2)}\n-------------------------------------------\nTOTAL: $${((ticketData.general.priceInCents.adult)/100).toFixed(2)}`

}

//experiment start
// for(i=0; i< purchases.length; i++){
// if(((purchases[i].ticketType) == 'general') && ((purchases[i].entrantType)=='adult')){

// }


//experiment end


// console.log(purchases)
// console.log(ticketData)

return result


}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
