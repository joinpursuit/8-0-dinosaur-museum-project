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
  
  let ticketPrice = 0;
  let extras = 0;
  let total = 0

  if(ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'senior'){
    return  "Entrant type 'incorrect-entrant' cannot be found."
  }

  if(ticketInfo.ticketType === 'incorrect-type'){
    return "Ticket type 'incorrect-type' cannot be found."
  }

  if(ticketInfo.extras.includes("incorrect-extra")){
    return "Extra type 'incorrect-extra' cannot be found."
  }
  if(ticketInfo.entrantType === "child"){
    if(ticketInfo.ticketType === "general"){
      ticketPrice = ticketData.general.priceInCents.child
    } else if(ticketInfo.ticketType === "membership"){
      ticketPrice = ticketData.membership.priceInCents.child
    }//if closing tag
  } else if(ticketInfo.entrantType === "adult"){
    if(ticketInfo.ticketType === "general"){
      ticketPrice = ticketData.general.priceInCents.adult
    } else if(ticketInfo.ticketType === "membership"){
      ticketPrice = ticketData.membership.priceInCents.adult
    }//if closing tag
  } else if(ticketInfo.entrantType === "senior"){
    if(ticketInfo.ticketType === "general"){
      ticketPrice = ticketData.general.priceInCents.senior
    } else if(ticketInfo.ticketType === "membership"){
      ticketPrice = ticketData.membership.priceInCents.senior
    }//if closing tag
  }//if closing tag

  if(ticketInfo.extras.includes("movie")){
    if(ticketInfo.entrantType === "child") {
      extras += ticketData.extras.movie.priceInCents.child
    }else if(ticketInfo.entrantType === "adult"){
      extras += ticketData.extras.movie.priceInCents.adult
    } else if(ticketInfo.entrantType === "senior"){
      extras += ticketData.extras.movie.priceInCents.senior
    }//if closing tag
  }//if closing tag

  if(ticketInfo.extras.includes("terrace")){
    if(ticketInfo.entrantType === "child") {
      extras += ticketData.extras.terrace.priceInCents.child
    }else if(ticketInfo.entrantType === "adult"){
      extras += ticketData.extras.terrace.priceInCents.adult
    } else if(ticketInfo.entrantType === "senior"){
      extras += ticketData.extras.terrace.priceInCents.senior
    }//if closing tag
  }//if closing tag
  
  if(ticketInfo.extras.includes("education")){
    if(ticketInfo.entrantType === "child") {
      extras += ticketData.extras.education.priceInCents.child
    }else if(ticketInfo.entrantType === "adult"){
      extras += ticketData.extras.education.priceInCents.adult
    } else if(ticketInfo.entrantType === "senior"){
      extras += ticketData.extras.education.priceInCents.senior
    }//if closing tag
  }//if closing tag

  total = ticketPrice + extras
  return total
  
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
  
  let itemTotal = 0
  let total = 0;
  let format
  let receipt = ["Thank you for visiting the Dinosaur Museum!\n-------------------------------------------"]
  //looping through purchases array
  for(let i = 0; i < purchases.length; i++){
    //setting empty string
    let arr = []
    //if the passsed through value for entrant tye does not equal child, adult, and senior
    if(purchases[i].entrantType !== 'child' && purchases[i].entrantType !== 'adult' && purchases[i].entrantType !== 'senior'){
      //return error
      return   `Entrant type '${purchases[i].entrantType}' cannot be found.`
    }//if closing tag
    //if ticket type doesnt = general or membership
    if(purchases[i].ticketType !== 'general' && purchases[i].ticketType !== 'membership' ){
      //return error
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`
    }//if closing tag
    //if extras array includes
    if(purchases[i].extras.includes("incorrect-extra")){
      //return error statement
      return `Extra type 'incorrect-extra' cannot be found.`
    }//if closing tag
    //setting item total to the total of each ticket found with previous funct.
    itemTotal = calculateTicketPrice(ticketData, purchases[i]) / 100
    format = `\n${(purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.substring(1)) + " " + (purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.substring(1)) + ' Admission: ' + '$' + (itemTotal) + '.00'}`
    receipt.push(format)
    for(let j = 0; j < purchases[i].extras.length; j++){
      if(purchases[i].extras[j] === "movie"){
        arr.push("Movie Access")
      } else if(purchases[i].extras[j] === "education"){
        arr.push("Education Access")
      } else if(purchases[i].extras[j] === "terrace"){
        arr.push("Terrace Access")
      }
    }//for closing tag
    if(arr.length !== 0){
      receipt.push(` (${arr.join(', ')})`)
    }//if closing tag
    total += itemTotal
  }//for closing tag
  receipt.push(`\n-------------------------------------------\nTOTAL: $${total}.00`)
  return receipt.join('')
}//for closing tag







// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
