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
  let cost = 0;
  let typeOfTicket = ticketInfo["ticketType"];
  let typeOfEntrant = ticketInfo["entrantType"]; 
  let typeOfExtras = ticketInfo['extras'][0]; 
  //if type of ticket in ticketInfo is in ticketData (general/membership)
  if (typeOfTicket in ticketData) {
    //if type of entrant in ticketInfo is in ticketData (child/adult/senior)
    if (typeOfEntrant in ticketData[typeOfTicket]["priceInCents"]) {
      cost += ticketData[typeOfTicket]['priceInCents'][typeOfEntrant];
    } else {
      return `Entrant type '${ticketInfo["entrantType"]}' cannot be found.`;
    }
  } else {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }

  for (const type of ticketInfo['extras']) {
  if (type in ticketData["extras"]) {
    cost += ticketData['extras'][type]['priceInCents'][typeOfEntrant];
  } else if (ticketInfo['extras'][0] === undefined) {
    return cost;
  } else {
    return "Extra type 'incorrect-extra' cannot be found.";
  }
  }
  return cost;
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
  let purchaseArray = []; //array of strings detailing each purchase, each element being an object from purchases
  let firstLine = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let finalString = ''; //the final string that will be returned at the end of the function
  let middleString = ''; //placeholder string to format multiple objects
  let extrasString = ''; //placeholder string for when purchases objects have 'extras'
  let endString = "-------------------------------------------\nTOTAL: $";
  let total = 0; //the initial total after calculateTicketPrice is called on given object
  let finalSum = 0; //the sum cost of all objects
  //gets total cost of each ticket purchase in purchases, but if calculateTicketPrice is not an integer, purchase must not be a valid object
  for (const purchase of purchases) {
    total = calculateTicketPrice(ticketData, purchase)
    if (!Number.isInteger(total)) {
      return total;
    } else {
      finalSum += total;
    }
  }

  //divide finalSum by 100 and fix to two decimal places to get dollars value
  finalSum /= 100;
  finalSum = finalSum.toFixed(2);

  let ticketString = ''; //variable that will be used to manipulate ticketType
  let entrantString = ''; //variable that will be used to manipulate entrantType 

  //loop through purchases array, if 'extras' exist, otherwise get total of objects and push information to purchaseArray 
  for (const purchase of purchases) {

    //capitzalize first letter entrantType of purchase, set new strings equal to ticketString and entrantString
    ticketString = ticketData[purchase["ticketType"]]['description'];
    entrantString = purchase['entrantType'].charAt(0).toUpperCase() + purchase['entrantType'].slice(1);
    //get ticket price of purchase with previous funciton, format with toFixed(2)
    total = calculateTicketPrice(ticketData, purchase) / 100;
    total = total.toFixed(2);
    if (purchase['extras'].length > 0) {
      for (const extra of purchase['extras']) {
        extrasString += ticketData.extras[extra]["description"];
        extrasString += ", ";
      }
      extrasString = extrasString.substring(0, extrasString.length - 2);
      purchaseArray.push(`${entrantString} ${ticketString}: $${total} (${extrasString})`);
      extrasString = "";
    } else {
    //push string of interpolated variables into purchaseArray
    purchaseArray.push(`${entrantString} ${ticketString}: $${total}`);
    }
  }
  
  //loop through purchaseArray and add each element to middleString for formatting
  for (let i = 0; i < purchaseArray.length; i++) {
    middleString += purchaseArray[i];
    middleString += '\n';
  }
  //cut off last character of middleString since last character is a space, then set finalString value
  middleString = middleString.substring(0, middleString.length - 1);
  finalString = firstLine + middleString + '\n' + endString + finalSum;

  return finalString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
