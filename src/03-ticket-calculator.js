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
  //create variable for the price
  let totalPrice = 0;
  //check if ticket is membership or general
  if (ticketInfo.ticketType === "general" || ticketInfo.ticketType === "membership"){
    //check if the entrant type exists
    if (ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
      //add the correct price
      totalPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
    } else {
      //return entrant error message
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    } 
  } else {
    //return ticket type error message
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }

  //loop through extras
  for (let ex of ticketInfo.extras){
    //checkif the extra type exists
    if (ticketData.extras[ex]){
      //add the price of the extra to the total price
      totalPrice += ticketData.extras[ex].priceInCents[ticketInfo.entrantType];
    } else {
      //extras error message
      return `Extra type '${ex}' cannot be found.`;
    }
  }
  //return the price in cents
  return totalPrice;
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
  //create total price variable
  let totalPrice = 0;
  //variable for the receipt message and set it equal to the beginning of the message
  let receiptMessage = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;
  //create extras empty string
  let extrasPurchased = "";
  //loop through tickets purchases
  for (ticket of purchases){
    //create a ticket price variable
    let ticketPrice = 0;
    //check if ticket is membership or general
    if (ticket.ticketType === "general" || ticket.ticketType === "membership"){
      //check if the entrant type exists
      if (ticketData[ticket.ticketType].priceInCents[ticket.entrantType]){
        //add the correct price
        totalPrice += ticketData[ticket.ticketType].priceInCents[ticket.entrantType];
        ticketPrice += ticketData[ticket.ticketType].priceInCents[ticket.entrantType];
        //put entrant type and ticket type on the receipt
        receiptMessage += `\n${ticket.entrantType[0].toUpperCase() + ticket.entrantType.substring(1)} ${ticket.ticketType[0].toUpperCase() + ticket.ticketType.substring(1)} Admission: `;
      } else {
        //return entrant error message
        return `Entrant type '${ticket.entrantType}' cannot be found.`;
      } 
    } else {
      //return ticket type error message
      return `Ticket type '${ticket.ticketType}' cannot be found.`;
    }
    //check if theres extras
    if (ticket.extras[0]){
      //create an array for the extras descriptions
      let extrasDescArr = [];
      //loop through extras
      for (let ex of ticket.extras){
        //checkif the extra type exists
        if (ticketData.extras[ex]){
          //add the price of the extra to the total price
          totalPrice += ticketData.extras[ex].priceInCents[ticket.entrantType];
          ticketPrice += ticketData.extras[ex].priceInCents[ticket.entrantType];
        } else {
          //extras error message
          return `Extra type '${ex}' cannot be found.`;
        }
        //push the descriptions
        extrasDescArr.push(ticketData.extras[ex].description);
      }  
      //put the extras array into a string
      extrasPurchased = extrasDescArr.join(", ");
      //add in the ticket price and extras  
      receiptMessage += `$${(ticketPrice/100).toFixed(2)} (${extrasPurchased})`;
    } else {
      //add in the ticket price
      receiptMessage += `$${(ticketPrice/100).toFixed(2)}`;
    }
  }

  //finally, add the total to the receipt
  receiptMessage += `\n-------------------------------------------\nTOTAL: $${(totalPrice/100).toFixed(2)}`;
  return receiptMessage;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
