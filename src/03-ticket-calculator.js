/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
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

  //Create empty variable for price
  let ticketPriceCents = 0;

  //Check for type of ticket first.
  if (ticketInfo.ticketType in ticketData){

    //Secondly, check for entrant type.
    if (ticketInfo.entrantType in ticketData[ticketInfo.ticketType]["priceInCents"]){

      //Add base price for tickets.
      ticketPriceCents += ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType];

      //Iterate through extras to check for match.
      for (extra of ticketInfo.extras){

        //Finally, check for extras.
        if (!(extra in ticketData.extras)){
          return `Extra type '${extra}' cannot be found.`
        }
        else {

          //Add price for each extra.
          ticketPriceCents += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
        }
      }
      
    }
    else {

      //Error if entrant type is invalid.
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
    }
  }
  else {

    //Error if ticket type is invalid.
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }

  //Return final ticket price in cents, if no errors
  return ticketPriceCents;
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
  //Create variable to store (and later format) total price.
  let totalPrice = 0;

  //Create the reciept base.
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------";

  //Iterate through the purchase array.
  for (purchase of purchases){

    //Use the previous function to calculate price and check for errors.
    let res = calculateTicketPrice(ticketData,purchase);

    //Return error, if there is one.
    if (typeof res === "string"){
      return res;
    }
    else {
      //Accumulate for total price!
      totalPrice += res;

      //Create empty array to format the extras properly.
      let extras = [];

      //Iterate through extras to fill the above array.
      for (extra of purchase.extras){
        extras.push(ticketData.extras[extra].description);
      }

      //Format entrant for accumulation into reciept
      let ticketEntrant = purchase.entrantType.charAt(0).toUpperCase() + purchase.entrantType.slice(1);

      //Format ticket type for accumulation into reciept.
      let ticketType = ticketData[purchase.ticketType].description;

      //Format the price of the single purchase.
      let indPrice = (res/100).toFixed(2);

      //Final formattiong of the extras.
      let extraList = "";

      //If extras is empty, then leave the string empty. Otherwise...
      if (extras.length!==0){
        extraList = ` (${extras.join(', ')})` //Use Array.join to format the list properly.
      }

      //Accumulate all of the values into the reciept!
      receipt += `\n${ticketEntrant} ${ticketType}: $${indPrice}${extraList}`;
    }
  }

  //Add the final piece with the total.
  receipt += `\n-------------------------------------------\nTOTAL: $${(totalPrice/100).toFixed(2)}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
