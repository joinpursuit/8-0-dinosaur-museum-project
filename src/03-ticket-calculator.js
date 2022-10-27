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
  /*
  In Javascript, variables are hoisted to top of scope, so assigning variables with nice descriptive names to hold long complicated reference values can cause code to crash or otherwise result in error as the variable is evaluated.  Declaring variables first and assigning after error checks bypasses this issue.

  However, this function code still does not use many variables with descriptive names.  Such variables cannot easily be used during "if" validation checks as assigning values can cause problems.  After validation checks, assigning complicated names then using new variables is an additional complication.  So I just explain what the code does.

  Below validation checks return error messages if ticket type or entrant type cannot be found.  Simply declaring the returnPriceInCents variable does not cause a crash.
  */
  let returnPriceInCents;
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } else if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  /*
  Assigns a value to returnPriceInCents after validation checks.  Though returnPriceInCents does not run a validation check, it might in the future; separate assignation anticipates this possibility.
  */
  returnPriceInCents = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]

  /*
  For each element in the ticketInfo extras array
  */
  for (let extra of ticketInfo.extras) {
    /*
    Checks to see if that ticketInfo "extra" exists in ticketData.  If not, then returns error.
    */
    if (!ticketData.extras[extra]) {
      return `Extra type '${ticketInfo.extras}' cannot be found.`
    } else {
      /*
      If ticketInfo "extra" exists in ticketData, increments returnPriceInCents by the value stored in ticketData.
      */
      returnPriceInCents += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
    }
  }
  return returnPriceInCents;
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
  /*
  Declares and assigns a value to returnString; this value concatenated with other values to generate a final return string, or returnString is ignored to return a completely different error message.

  Declares and assigns the value 0 to runningTotal.

  Both variables are increased in iterative loops so must be declared outside those loop so their values may be referenced outside those loops.
  */
  let returnString = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let runningTotal = 0;
  /*
  Various strings needed first letter capitalized; rather than writing for each separately, wrote a function inside a function.  In other circumstances I would create the function separately, outside the function, but I don't know if that will work with npm test.
  */
  /**
   * capitalizeFirstLetter()
   * ---------------------
  * Returns a string with first letter capitalized.
  *  * @param {string} stringNeedingACapital - a string to be converted to have its first letter capitalized.
  *  * @returns {string} a string with first letter capitalized
  * */
 function capitalizeFirstLetter (stringNeedingACapital) {
  return stringNeedingACapital.charAt(0).toUpperCase() + stringNeedingACapital.slice(1);
 }
 /*
 Iterates through each purchase (ticket object) in the purchases array.
 */
 for (let purchase of purchases) {
  /*
  Validation checks; checks if data from the purchase (ticket object) in the purchases array has a corresponding value to look up in ticketData.  If not, returns an error message.
  */
  if (!ticketData[purchase.ticketType]) {
    return `Ticket type '${purchase.ticketType}' cannot be found.`;
  } else if (!ticketData[purchase.ticketType].priceInCents[purchase.entrantType]) {
    return `Entrant type '${purchase.entrantType}' cannot be found.`;
  }
  /*
  If validation checks pass, runningTotal is incremented by the ticket price for the current purchase (ticket object) in the purchases array, and returnString is incremented by the text appropriate to evaluation without accounting for extras.

  Extras is not accounted for in this step, as there is no guarantee there are any extras for the current purchase (ticket object).
  */
  runningTotal += calculateTicketPrice(ticketData, purchase);
  returnString += `${capitalizeFirstLetter(purchase.entrantType)} ${capitalizeFirstLetter(purchase.ticketType)} Admission: $${(calculateTicketPrice(ticketData, purchase)/100).toFixed(2)}`;
  /*
  Validation checks; checks if there are more than zero extras for the currently evaluated purchase (ticket object) of the purchases array.  If there are, then the appropriate text is generated.  Near the end of the code executed after a successful "if" check, the last two elements of the returnString are removed to eliminate the trailing ", ", then ")/n" appended to close the section out properly.
  */
   if (purchase.extras.length > 0) {
     returnString += " (";
      for (let extra of purchase.extras) {
        if (!ticketData.extras[extra]) {
          return `Extra type '${extra}' cannot be found.`;
        }
    returnString += `${capitalizeFirstLetter(extra)} Access, `;
      }
     returnString = returnString.slice(0, returnString.length-2);
     returnString += ")\n";  
     /*
     If the validation check did not pass for the above if, then there are ticket has no extras.  "/n" is appended to returnString to move to the next line.
     */ 
   } else {
     returnString += "\n"
   }
 }
 /*
 returnString is incremented by the text at the end of the receipt.  This text is outside and after the starting text and the loops texts.
 */
 returnString += `-------------------------------------------\nTOTAL: $${(runningTotal/100).toFixed(2)}`;
  return returnString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
