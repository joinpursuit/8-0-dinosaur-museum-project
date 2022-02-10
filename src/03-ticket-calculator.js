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
  //Declared variable for ticketInfo.ticketType called type and same thing for entrant
  //Declared variable for priceInCent called price
  const type = ticketInfo.ticketType
  const entrant = ticketInfo.entrantType
  const price = 'priceInCents'
  //Included the array and used the if/else statement and for of loop
  const array = ['general', 'membership', `adult`, `child`, `senior`, `movie`, `education`, `terrace`]
  // Used the if statement to see if the array does not include the type and entrant then it will return a message, for the second one used the string interpolation
  if(!array.includes(type)) {
    return "Ticket type 'incorrect-type' cannot be found."
  } else if (!array.includes(entrant)) {
    return `Entrant type '${entrant}' cannot be found.`
  }
  for (const extra of ticketInfo.extras) {
    if(!array.includes(extra)) {
      return "Extra type 'incorrect-extra' cannot be found."
    }
  }
  //Declared variable totalCost and used += to add the totalCost
  let totalCost = ticketData[type][price][entrant]
  for (const extra of ticketInfo.extras) {
    totalCost += ticketData.extras[extra][price][entrant]
  }
  return totalCost;
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
  let receiptStr = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let purchaseTotal = 0;
 //Declared the purchaseTotal to equal 0 and let receiptStr print out the message
  for (let purchase of purchases) {
    let sum = calculateTicketPrice(ticketData, purchase);
  //Used for of loop and sum equal to calculate ticket price with the given parameters
    if (typeof sum === "string") {
      return sum;
    } 
    receiptStr += upperCaseFirstLetter(purchase.entrantType) + " " + ticketData[purchase.ticketType].description + ": " + "$" + (sum/100).toFixed(2) + extraTicketData(ticketData, purchase) + "\n";
    purchaseTotal += sum/100;
  }
  return receiptStr + "-------------------------------------------\n" + "TOTAL: $" + purchaseTotal.toFixed(2);
}
// In order to print it like a receipt I had to meet the expected by capitalizing and adding the $ and making a decimal point
// In the receiptStr it needs to add the first uppercase letter for purchase entrant type and concatenate with ticketdata description with : and using string interpolation the sum/100 to a fixed decimal

function upperCaseFirstLetter(ticketString){
  let firstLetter = ticketString.charAt(0);
  let upperCaseFirst = firstLetter.toUpperCase();
  let restOfWord = ticketString.slice(1);

  return upperCaseFirst + restOfWord;
}
//Creating another function to capitalize the first letter. Used the charAt to return a specific position in string and the restOfWord gets to not be changed
//Then return uppercase and concatenate the rest of the word
function extraTicketData(ticketData, ticketInfo) {
  let arr = ticketInfo.extras.slice(0);
  if (!arr.length) {
    return '';
  } 

  let str = ' (';
  //Used the accumulator pattern to iterate through the array
  // Created an if statement stating i to compare === the last length in array
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length-1) {
      str += ticketData.extras[arr[i]].description + ')';
    } else {
      str += ticketData.extras[arr[i]].description + ', ';
    }
  }
  return str;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
