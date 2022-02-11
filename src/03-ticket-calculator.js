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
  let cost = 0; //Declare variable cost, set equal to 0
  let typeOfTicket = ticketInfo["ticketType"]; //Declare typeOfTicket, set equl to ticketInfo["ticketType"]
  let typeOfEntrant = ticketInfo["entrantType"]; //Declare typeOfTicket, set equl to ticketInfo["entrantType"]
  //If type of ticket in ticketInfo is in ticketData (general/membership)
  if (typeOfTicket in ticketData) {
    //If type of entrant in ticketInfo is in ticketData (child/adult/senior)
    if (typeOfEntrant in ticketData[typeOfTicket]["priceInCents"]) {
      //Update cost to priceInCents using typeOfTicket and typeOfEntrant
      cost += ticketData[typeOfTicket]["priceInCents"][typeOfEntrant];
    } else {
      return `Entrant type '${ticketInfo["entrantType"]}' cannot be found.`; //Otherwise, did not find entrant
    }
  } else {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`; //Otherwise, did not find ticket type
  }

  //Loop through ticketInfo["extras"]
  for (const type of ticketInfo["extras"]) {
    //If given element "type" is in ticketData["extras"]
    if (type in ticketData["extras"]) {
      //Update cost to priceInCents using given element "type" and typeOfEntrant
      cost += ticketData["extras"][type]["priceInCents"][typeOfEntrant];
    } else if (ticketInfo["extras"][0] === undefined) {
      return cost; //Otherwise, just return cost
    } else {
      return "Extra type 'incorrect-extra' cannot be found."; //Otherwise, the given ticketInfo['extras'] value does not exist in ticketData
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
  let purchaseArray = []; //Declare an empty array that will later include strings detailing each purchase, each element being an object from purchases
  let firstLine =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"; //Declare first line for formatting
  let finalString = ""; //Declare empty string, the final string that will be returned at the end of the function
  let middleString = ""; //Declare empty string, a placeholder string to format multiple objects
  let extrasString = ""; //Declare empty string, a placeholder string for when purchases objects have 'extras'
  let endString = "-------------------------------------------\nTOTAL: $"; //Declare last line for formatting
  let initialTotal = 0; //Declare initial total, the initial total after calculateTicketPrice is called on given object in purchases
  let finalSum = 0; //the sum cost of all objects in purhchases
  //Loop through purchases
  for (const purchase of purchases) {
    //Get total cost of each ticket purchase in purchases using calculateTicketPrice function
    initialTotal = calculateTicketPrice(ticketData, purchase);
    //If initialTotal is not an integer, purchase must not be a valid object
    if (!Number.isInteger(initialTotal)) {
      return initialTotal;
    } else {
      //Otherwise, add initialTotal of given object in purchases to finalSum
      finalSum += initialTotal;
    }
  }

  //divide finalSum by 100 and fix to two decimal places to get dollars value
  finalSum /= 100;
  finalSum = finalSum.toFixed(2);

  let ticketString = ""; //variable that will be used to manipulate ticketType
  let entrantString = ""; //variable that will be used to manipulate entrantType

  //Loop through purchases array, otherwise get total of objects and push information to purchaseArray
  for (const purchase of purchases) {
    //set ticketString to the description of the given purchase ticketType (ex: "General Admission")
    ticketString = ticketData[purchase["ticketType"]]["description"];
    //capitzalize first letter entrantType of purchase, set equal to entrantString (ex: "Adult")
    entrantString =
      purchase["entrantType"].charAt(0).toUpperCase() +
      purchase["entrantType"].slice(1);
    //get ticket price of purchase with calculateTicketPrice, format with toFixed(2) and divide by 100 for dollar value
    initialTotal = calculateTicketPrice(ticketData, purchase) / 100;
    initialTotal = initialTotal.toFixed(2);
    //If the given purchase object has an "extras" array
    if (purchase["extras"].length > 0) {
      //Loop through extras array
      for (const extra of purchase["extras"]) {
        //Add the description of the given element in extras array with a comma
        extrasString += ticketData.extras[extra]["description"];
        extrasString += ", ";
      }
      extrasString = extrasString.substring(0, extrasString.length - 2); //remove extras comma and space at the end of extrasString
      //Push string to purchaseArray using string interpolation
      purchaseArray.push(
        `${entrantString} ${ticketString}: $${initialTotal} (${extrasString})`
      );
      extrasString = ""; //reset value of extrasString to empty
    } else {
      //Push string of interpolated variables into purchaseArray
      purchaseArray.push(`${entrantString} ${ticketString}: $${initialTotal}`);
    }
  }

  //loop through purchaseArray and add each element to middleString for formatting
  for (let i = 0; i < purchaseArray.length; i++) {
    middleString += purchaseArray[i];
    middleString += "\n"; //Add new line after each element in purchaseArray
  }
  //cut off last character of middleString since last character is a space, then set finalString value
  middleString = middleString.substring(0, middleString.length - 1);
  finalString = firstLine + middleString + "\n" + endString + finalSum;

  return finalString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
