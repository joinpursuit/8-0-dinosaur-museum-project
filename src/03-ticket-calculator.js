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

    // Looking for the cost of ticket .  The cost of ticket is determined by two inputs, ticketData, and TicketInfo which are objects.
    // We will have to compare each object.  the ticketInfo will determine the output of the ticketData.  
    const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [], };
    
function calculateTicketPrice(ticketData, ticketInfo) {
  
  let givenType = ticketInfo.ticketType; // givenType varible is set to the value of ticketInfo.ticketType 
  let givenEntrant = ticketInfo.entrantType;// declaring a variable for ticketInfo.entrantType 
  let givenExtras = ticketInfo.extras; // setting a variable for ticketInfo.extras which are given as arrays to loop through later .. 
  let ticketTypeObj = ticketData[givenType]; // varible set to the object that matches ticketInfo.givenType
  
  

      if (!ticketData[givenType]){ // checking to see if tickettype is valid. if invalid, return error message
        return `Ticket type '${givenType}' cannot be found.`;
      } 
      let costInCents = ticketTypeObj.priceInCents[givenEntrant]; // cost of basic ticket according to ticket.type and entrant 
      if (!costInCents) {
        return `Entrant type '${givenEntrant}' cannot be found.`;  
      } 
      let sumOfExtras = 0;
      for (let extra of givenExtras){ // looping through given Extras 
        let ticketExtrasObj = ticketData.extras[extra];
        if(!ticketExtrasObj){
          return `Extra type '${extra}' cannot be found.`
        } 
        let extraCost = ticketExtrasObj.priceInCents[givenEntrant]; 
        sumOfExtras += extraCost;
      }
      return sumOfExtras + costInCents;
      

}

console.log(calculateTicketPrice(exampleTicketData,ticketInfo));

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
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n
    Adult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

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

    //let capitlizedEntrantType = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)// capitilizes only the first letter of the entranttype, adding second portion to give full word
function purchaseTickets(ticketData, purchases) { // double accumulator pattern
  let summaryReceipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  let totalPurchases = 0;

  for (let purchase of purchases){
    let resultOfCalcPrice = calculateTicketPrice(ticketData, ticketInfo);

    if (typeof resultOfCalcPrice === "string")
      return resultOfCalcPrice;
    }
  let extrasSummary = "";
  let extras = purchase.extras;
  for(let i = 0; i < extras.length;i++){
    extrasSummary += ticketData.extras[extras[i]].description ;
    if (i !== purchase.extras.length -1){
      extrasSummary += ", ";// (Movie Access, Terrace Access)
    }
  } if (extras.length > 0){
    summaryReceipt += (extras)



  }
  //let  = ``; 
  //  purchase.entrantType , ticketData[purchase.ticketType].description , resultOfCalcPrice
}
//    Adult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\n
//Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
//Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\n
//TOTAL: $175.00"


// loop through purchases and use calculateTicketPrice to determine totl of purchase
// if return type is a string return iut .. 
// nested accumulator to determine extra cost total number and summeray string for the receipt
// format the receipt with totals and receipt sumaries






// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
