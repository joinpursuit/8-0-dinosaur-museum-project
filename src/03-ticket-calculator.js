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
  let totalPrice = 0; // track it
  if (ticketInfo.ticketType in ticketData) {
      // check if it's there, if false - error message. if entrantType
      if (ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents) {
        totalPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]; // to access the price in the object
      }
      else return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    }
    else return `Ticket type 'incorrect-type' cannot be found.`;
    if (ticketInfo.extras.length) {
      // check if its inside the extras object - loop through
      let extrasArr = ticketInfo.extras.slice(0); // makes a copy

      for (let elem of extrasArr) {
        // need to get only the extras object, and then check if our key is one of the keys - not make it static. there's 3 different ones.
        if (elem in ticketData.extras) { // check if its a valid key - enable access
          totalPrice += ticketData.extras[elem].priceInCents[ticketInfo.entrantType];
        }
        else return `Extra type '${elem}' cannot be found.`;
      }
  }
  return totalPrice;
// if extras exist, this happens:
// for (let ticket of ticketData) {}
// check if its an empty array

}

// if (ticketInfo.ticketType || ticketInfo.entrantType)
  // If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
  // let errorMsg = "Error.";
  // errorMsg;

  // Returns the ticket price based on the ticket information supplied to the function
// return totalPrice // number - The cost of the ticket in cents.


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


/**
 * helper function
 * @param {*} ticketData - object of tickets
 * @param {*} ticketInfo - info about a ticket
 * @returns {string} - returns a formatted string
 * @description - if empty, should not return anything
// if has an input/multiple inputs, should return those inputs

 */
// for each element to access. check if its the last
      // newStr += ticketData.extras[elem].description

function formatted(ticketData, ticketInfo) {
  let newArr = ticketInfo.extras.slice(0); // makes a copy of extras
  let newStr = "";
  if (newArr.length) { // if more than zero
    newStr += " ("; // if we are sure its just 1
    for (let i = 0; i < newArr.length; i++) { 
      if (i === newArr.length -1) { // if i equals last index element
        newStr += ticketData.extras[newArr[i]].description + ")";
      } // if more than 1 index element
      else newStr += ticketData.extras[newArr[i]].description + ", ";
    }
  }
  return newStr; // if 0 in extras
}
// need to check if this helper function works or not
// console.log(formatted(ticketData, ticketInfo));


/**
 * another helper function
 * @param {string} - str
 * @returns {string} - returns a string with the first letter in cap letter.
 */
 function capitalize(str){
  let first  = str[0].toUpperCase();
  let newArr = str.split("");
  newArr.shift();
  return first + newArr.join("");
}

  // call the function from before with parameters
  // check if it is a number
  // use helper function to get multiple inputs for extras/ the string with parentheses, and call it here
  // ticket.ticketType - to choose btwn membership or general, be dynamic

function purchaseTickets(ticketData, purchases) {
  let newStr = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let total = 0; // keep track
  for (let ticket of purchases) { // for loop - Adult, Senior, Child
    let subTotal = 0;
    let check = calculateTicketPrice(ticketData, ticket);
    
    // you could check if it's not a number first, to see if theres an error & return the error right away
    if (typeof check === "number") {
      subTotal = check;
      newStr += `${capitalize(ticket.entrantType)} ${ticketData[ticket.ticketType].description}: $${(subTotal/100).toFixed(2)}${formatted(ticketData, ticket)}\n`;
      total += subTotal/100; // add subtotal to the price
    }
    else return check;
  }
  return newStr += "-------------------------------------------\nTOTAL: $" +total.toFixed(2); // outside for loop
}

// function capitalize(str) {
//   let first = str[0].toUpperCase()
//   let newStr = str.slice(1);
//   return first + newStr;
// }
// console.log(capitalize("christina"));

// function capitalize2(str) {
//   let first = str[0].toUpperCase()
//   let newStr = str.split("");
//   newStr.shift();
//   return first + newStr.join("");
// }
// console.log(capitalize2("christina2"));



// ${ticket.ticketType}



  // if statement - for if extras
  // need to access the values for inputs:
  // (general + (extras: movie + terrace));

// calculate price in dollars for each
// Adult, Senior, Child

// then access the values/price for extras, and add those on.

// return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00`;
// }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
