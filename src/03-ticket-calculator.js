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
//return errors if ticket types, entrants, extras not included
//start with a base price of 0
//accumulate each portion of the ticket fees








function calculateTicketPrice(ticketData, tickeInfo) {
  //if ticketInfo at ticketType doesn't match the key in ticketDta or ticketInfo at ticketType equals extra return error message
      if(!ticketData[tickeInfo.ticketType] || tickeInfo.ticketType === 'extras'){
        return `Ticket type '${tickeInfo.ticketType}' cannot be found.`

      } else if (!ticketData[tickeInfo.ticketType].priceInCents[tickeInfo.entrantType]) {
        return `Entrant type '${tickeInfo.entrantType}' cannot be found.`
      } else {
        for(let extra of tickeInfo.extras){
          if(!ticketData.extras[extra]){
            return `Extra type '${extra}' cannot be found.`;
          }
        }
      }
      let baseTicket = 0;
   
      //ticketInfo.ticketType  - 'membership'
      //ticketInfo.entrantType - 'child'
      baseTicket += ticketData[tickeInfo.ticketType].priceInCents[tickeInfo.entrantType]
   
   
      //looping through ticket.Info.extras array - {'movies', 'terrace'}
      for(let addOn of tickeInfo.extras){
        baseTicket += ticketData.extras[addOn].priceInCents[tickeInfo.entrantType]
   }
   return baseTicket;
   
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


//start our receipt template
//create a variable for the total
//iterate through out purchaces
//call our function from above 
//based on it's return value decide how we want to handle the data 
//return the error message from above function 
//price (for a ticket)from above function could be added to a string and return a total






function purchaseTickets(ticketData, purchases) {
  //creates a receipt variable(template) to add purchased information to
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`
  
  //creates a variable for total receipt price before the purchaces are added
  let totalReceiptPrice = 0;

  //creates a loop throught the array of purchases
  for(let purchase of purchases){

    //creates a variable called purchase price to hold the function calculateTicketPrice(the process of figuring out how much a ticket cost)using the ticketData(ticket.js) and purchase array in the beginning of the problem will calculate new ticket price
    let purchasePrice = calculateTicketPrice(ticketData, purchase)

    //if the purchacePrice is a string ""
    if(typeof purchasePrice === 'string'){
    //return the original ticket price
      return purchasePrice;
    } else {
      //else receipt will read the original ticket price
      totalReceiptPrice += purchasePrice;


      //creates a variable called entrant to equal the purchases array at entrantType fist letter capital and the rest lower case (Senior, Child, Adult)
      let entrant = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1).toLowerCase();

      //creates a variable called ticketType to equal the purchase tickeType from the ticketData - tickets.js description section (General Admisiion, Membership Admission)
      let ticketType = ticketData[purchase.ticketType].description; 

      //creates a variable price in dollars to equal the puchace price divided by 100 .to Fixed(2) - for decimal points
      let priceInnDollars = (purchasePrice /100).toFixed(2)

      //creates a variable called ticket extras to equal a string ('movie' 'terrace' 'education')
      let ticketExtras = "";
      
      //loops through the the purchase array, extras array 
      for(let i = 0; i < purchase.extras.length; i++){

        //conditional if i is 0 close the () - no string
        if(i === 0){
          ticketExtras += " ("
        } 
        //iterating through purchases array at the extras array of the TicketData(ticket.js) extras match the descrition add it to the ticketExtras variable
        ticketExtras += ticketData.extras[purchase.extras[i]].description

        //if iterating throught pruchases array at extras array has one element 
        if( i === purchase.extras.length -1){

          //close the () of the ticketExtras variable 
          ticketExtras += ")"
        } else {
          //else add a , to include the next extra listed
          ticketExtras += ", "
        }
      }

      //receipt will read entrant (adult, child, senior) ticket type (general, membership), $price in dollars, ticket extras (terrace, movie, educational)
      receipt += `\n${entrant} ${ticketType}: $${priceInnDollars}${ticketExtras}`

        }

    }
    //total receipt price is the caluculated price divided by 100 to fixed for decimal points
    totalReceiptPrice = (totalReceiptPrice / 100).toFixed(2)

    //add the closing total template to the receipt with the newly calculated totalReceiptPrice interpolated
    receipt += `\n-------------------------------------------\nTOTAL: $${totalReceiptPrice}`;

    //then return receipt
    return receipt;





  }













// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
