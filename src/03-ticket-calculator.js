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
  //a variable to track the total price
  let total = 0;
  //created the variables for easy access
  const inputTicket = ticketInfo.ticketType;
  const inputEntrant = ticketInfo.entrantType;
  const inputExtra = ticketInfo.extras;
  
  if (!ticketData[inputTicket]) { //if @ticketType doesn't exist, return an error message.
    return `Ticket type '${inputTicket}' cannot be found.`;
  } else { //if @ticketType exists
    if (!ticketData[inputTicket].priceInCents[inputEntrant]) { //if @entrantType doesn't exist, return an error message.
      return `Entrant type '${inputEntrant}' cannot be found.`; 
    } else { //if @entrantType exists
      if (inputExtra[0] === 'incorrect-extra') { //if @extras doesn't exist, return an error message.
        return `Extra type '${inputExtra}' cannot be found.`;
      } else { //if @extras exists
        //add the value of the "total" with @ticketType and @entrantType info provided.
        total += ticketData[inputTicket].priceInCents[inputEntrant];
        for (let extra of inputExtra) { //loop through @extras array
          if (ticketData.extras.hasOwnProperty(extra)) { //if @extras array value(s) exists
            //add the value of the "total" with @extras info provided.
            total += ticketData.extras[extra].priceInCents[inputEntrant];
          }
        }
      }
    }
  }
  return total;
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
  //set the variables to track the ticket price and total price.
  let ticketPrice = 0;
  let totalPrice = 0;
  //set the variable for the first text on the receipt.
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  //to loop throught the @purchases array of objects.
  for (let purchase of purchases) {
    //set the variables for reference (easy access).
    let inputTicket = purchase.ticketType; //@ticketType
    let inputEntrant = purchase.entrantType; //@entrantType
    let inputExtra = purchase.extras; //@extras

    //first letter capitalized for @ticketType and @entrantType.
    const capTicket = inputTicket.charAt(0).toUpperCase() + inputTicket.slice(1);
    const capEntrant = inputEntrant.charAt(0).toUpperCase() + inputEntrant.slice(1);

    //error messages
    if (!ticketData[inputTicket]) { //if @ticketType doesn't exist, return an error message.
      return `Ticket type '${inputTicket}' cannot be found.`;
    } else if (!ticketData[inputTicket].priceInCents[inputEntrant]) { //if @entrantType doesn't exist, return an error message.
      return `Entrant type '${inputEntrant}' cannot be found.`;
    }
    
    //update the "ticketPrice" depending the @ticketType and @entrantType.
    ticketPrice = ticketData[inputTicket].priceInCents[inputEntrant];
    //add the text to the "receipt".
    receipt += `${capEntrant} ${capTicket} Admission: `;

    if (inputExtra.length > 0) {//if @extras is not empty
      //set the "arrList" array and the "strList" string, and to reset it every loop.
      let arrList = [];
      let strList = '';
      for (let extra of inputExtra) { //to loop through the @extras array.
        if (!ticketData.extras.hasOwnProperty(extra)) { //if @extras doesn't exist, return an error message.
          return `Extra type '${extra}' cannot be found.`;
        } else { //if @extras exists
          //push to the "arrList" array the first letter capitalized and the rest of the string from the @extras strings.
          arrList.push(extra.charAt(0).toUpperCase() + extra.slice(1) + " Access");
          //convert the "arrList" array to the "strList" string with a comma and a space between them.
          strList = arrList.join(", ");

          //add add-ons to the "ticketPrice".
          ticketPrice += ticketData.extras[extra].priceInCents[inputEntrant];
        }
      }
      //add the "ticketPrice" converted in dollar plus the "strList" string.
      receipt += `$${(ticketPrice/100).toFixed(2)} (${strList})`;
    } else { //if @extras is empty
      //add the "ticketPrice" converted in dollar.
      receipt += `$${(ticketPrice/100).toFixed(2)}`;
    }
    
    //add a new line to the "str".
    receipt += "\n";
    //add the "ticketPrice" to the "totalPrice".
    totalPrice += ticketPrice;
  }

  //add the divider plus the new line, and the final price at the end of the "receipt".
  receipt += "-------------------------------------------\n";
  receipt += `TOTAL: $${(totalPrice/100).toFixed(2)}`;

  //return the final result of "receipt".
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
