/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { membership, extras } = require("../data/tickets");
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
 */  const m = 'movie';
const e = 'education';
const t = 'terrace';
function calculateTicketPrice(ticketData, ticketInfo) {
  /*BEGINNING OF calculateTicketPrice() */
  /*-ERROR HANDLING-*/
//if ticket type is incorrect, return error message saying so
  if (ticketInfo.ticketType !== 'general' && ticketInfo.ticketType !== 'membership') {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  //ticket type does not match an existing ticket type
}
if (ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'senior'){
  return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  //entrant type does not match an existing entrant type
}
  if (ticketInfo.extras.length >= 1 && !ticketInfo.extras.includes(m) && !ticketInfo.extras.includes(e) && !ticketInfo.extras.includes(t)){
          return `Extra type '${ticketInfo.extras}' cannot be found.`
          //extras type does not match an existing extras type}
        }
     
  /*-END OF ERROR HANDLING-*/
  let ticketPrice = 0;
  // VARIABLES for extras

  /*-NO EXTRAS-*/
  /* GENERAL */
  //adult 
  if (ticketInfo.ticketType === 'general' && ticketInfo.extras.length === 0) {
    if (ticketInfo.entrantType === 'adult') {
      ticketPrice = tickets.general.priceInCents.adult;
    }
    //child 
    if (ticketInfo.entrantType === 'child') {
      ticketPrice = tickets.general.priceInCents.child;
    }
    //senior 
    if (ticketInfo.entrantType === 'senior') {
      ticketPrice = tickets.general.priceInCents.senior;

    }

  }
  /* MEMBERSHIP */
  // adult
  if (ticketInfo.ticketType === 'membership' && ticketInfo.extras.length === 0) {
    if (ticketInfo.entrantType === 'adult') {
      ticketPrice = tickets.membership.priceInCents.adult
    }//child
    if (ticketInfo.entrantType === 'child') {
      ticketPrice = tickets.membership.priceInCents.child;
    }//senior
    if (ticketInfo.entrantType === 'senior') {
      ticketPrice = tickets.membership.priceInCents.senior;
    }
    return ticketPrice
  }
  /*END OF NO EXTRAS */



  /*WITH EXTRAS*/
  //GENERAL 
  if (ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'adult' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.general.priceInCents.adult;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.adult;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.adult
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.adult
    }


  }
  if (ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'senior' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.general.priceInCents.senior;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.senior;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.senior
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.senior
    }
  }
  if (ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'child' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.general.priceInCents.child;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.child;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.child
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.child
    }
  }

  /*MEMBERSHIP*/
  if (ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'adult' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.membership.priceInCents.adult;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.adult;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.adult
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.adult
    }
  }
  if (ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'child' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.membership.priceInCents.child;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.child;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.child
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.child
    }
  }
  if (ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'senior' && ticketInfo.extras.length > 0) {
    ticketPrice = tickets.membership.priceInCents.senior;
    if (ticketInfo.extras.includes(m)) {
      ticketPrice += tickets.extras.movie.priceInCents.senior;
    }
    if (ticketInfo.extras.includes(e)) {
      ticketPrice += tickets.extras.education.priceInCents.senior
    }
    if (ticketInfo.extras.includes(t)) {
      ticketPrice += tickets.extras.terrace.priceInCents.senior
    }
  }
  return ticketPrice
}
/*END of MEMBERSHIP */
/*END of WITH EXTRAS*/
/*END OF calculateTicketPrice */

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
let ticketsArr = [];
 const heading = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
 const footer = '-------------------------------------------\nTOTAL: '
 let totalCost = 0; //must convert to dollar cents value
 let errMsg = ''
 let ticketsStr = ``
 let admissionStr = ``
 //let entrantFormatted;
 //let ticketTypeFormatted = `${purchases.ticketType[0].toUpperCase()}${purchases.ticketType.substring(1)}`; // 'Membership'


//extrasFormatted = purchases.extras.replace(/m/g, extras.movie.description) ;purchases.extras.replace(e, extras.education.description); purchases.extras.replace(t, extras.terrace.description)
// 'movie' is now "Movie Access", 'education' is now "Education Access", 'terrace' is now "Terrace Access"

/* 3: "Admission:" +
+ */
/*error handling */
for (let purchase of purchases) {
  let errMsg = calculateTicketPrice(ticketData, purchase);
  if(typeof errMsg === 'string'){
    return errMsg
    /*end of error handling */
  } else { 
totalCost += calculateTicketPrice(ticketData, purchase); //totalCost is accumulated sum of ticket purchases (and extras if any) 
admissionStr = `Admission: $${(calculateTicketPrice(ticketData, purchase)/100).toFixed(2)}`;
ticketsArr.push(`${purchase.entrantType[0].toUpperCase()}${purchase.entrantType.substring(1)} ${purchase.ticketType[0].toUpperCase()}${purchase.ticketType.substring(1)} ${admissionStr} (${purchase.extras})`)
  }
} //end of For Loop 
for (let ticket of ticketsArr){
  ticket = ticket.replaceAll('movie', tickets.extras.movie.description).replaceAll('education', tickets.extras.education.description).replaceAll('terrace', tickets.extras.terrace.description).replaceAll(` ()`,``).replaceAll(`s,`, `s, `);
  ticketsStr += `${ticket}\n`;
} return `${heading}${ticketsStr}${footer}$${(totalCost/100).toFixed(2)}`
}


//console.log(ticketsArr); //> 'Senior Membership Admission: $45.00 () (terrace,education)'. We want 'entrant.type ticket.type Admission: ticketPrice.00 (Terrace, Education)


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
