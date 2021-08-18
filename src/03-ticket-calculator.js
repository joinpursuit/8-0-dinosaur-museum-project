/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
const tickets = require("../data/tickets");
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
 * @param {Object} ticketInfo- An object representing data for a single ticket.
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

//ticketData.general.priceInCents.adult
//declare several separate variables
//variable for error messages
//first check for errors -- if/else statments or undefined, string, etc
//return right away the error messages
//looping through extras, etras = array
//only loop through the purchases
//looping through estas, extras = array
//use info from Ticket info to get info Ticketdata
//calculate price for each ticket
//return error or a number
function calculateTicketPrice(ticketData, ticketInfo) {
  //Get into ticket type and entrant type.
  //ticketData.general.priceInCents.adult, standard way to get to 3000 ticket
  //ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType] = basePrice > gives us one ticket at a time

  if (ticketInfo.ticketType in ticketData === false) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (
    ticketInfo.entrantType in ticketData.general.priceInCents ===
    false
  ) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  //extra represents each item in ticketInfo.extras array
  for (const extra of ticketInfo.extras) {
    if (extra in ticketData.extras === false) {
      return `Extra type '${extra}' cannot be found.`;
    }
  }
  //Declare a variable to store basePrice
  let Price =
    ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType];

  //how to get extra cost into basePrice
  //If length of ticketInfo.extras array is not equal to 0
  if (ticketInfo.extras.length !== 0) {
    //Iterate thru ticketInfo.extras array with For of loop
    for (const extra of ticketInfo.extras) {
      Price += ticketData.extras[extra]["priceInCents"][ticketInfo.entrantType];
    }
  }
  return Price;
}

// const ticketType = ticketInfo.ticketType;
// const entrantType = ticket.entrantType;
// const extras = ticket.extras;
// let total = ticketData[ticketType].priceInCents[entrantType];
// // add each extra to the total
// for (let i = 0; i < extras.length; i++) {
//   //find the price for entraType for that extra
//   const extra = extras[i];
//   const extraType = ticketData.extras[extra];
//   if (extraType === undefined) {
//     return `Extra type '${extra}' cannot be found.`;
//   }
//   const extraPrice = extraType.priceInCents[entrantType];
//   total = total + extraPrice;
// }
// return total;

// if (
//   ticketInfo.ticketType !== "membership" &&
//   ticketInfo.ticketType !== "general"
// ) {
//   return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
// }
// if (
//   ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] ===
//   undefined
// ) {
//   return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
// }
// let total = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]

//   for (let i = 0; i < ticketInfo.extras.length; i++) {
//     let ticketInfo.extra = ticketInfo.extras[i]}
//  if (ticketData.extras[extra]{
//   if(extraType === undefined) {
//     return `Extra type '${ticketData.extras[extra]}' cannnot be found`
//   }
//     total = total +

//   let total = 0
//   const ticketType = ticket.ticketType

//     if (ticketData[ticketType === undefined]) {
//       return `Ticket type '${ticketType}' cannot be found.`
//     }

//   const entrantType = ticket.entrantType
//     if(ticketData[ticketType].priceInCents[entrantType] === undefined) {
//       return `Entrant type '${entrantType}' cannot be found.`
//     }

//   total = ticketData[ticketType].priceInCents[entrantType]

//   for (let i = 0; i < extras.length; i++) {
//     const extra = extras[i]

//     ticketData.extras[extra]) {
//       if (extra in ticketData.extras) {
//         ticketPrice +=
//           ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
//       } else return `Extra type '${extra}' cannot be found.`;
//       return ticketPrice;
//     }
//   }

// }
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
  // creating a variable named to add the cost
  let totalCost = 0;
  let receipt =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let purchase = [];

  for (let i = 0; i < purchases.length; i++) {
    purchase = purchases[i];
  }
  let totalPrice = calculateTicketPrice(ticketData, purchase);
  if (typeof totalPrice === "string") {
    return totalPrice;
  }
  totalCost += totalPrice;
  let extras = purchase.extras;
  let extrasReceipt = "";
  for (let i = 0; i < extras.length; i++) {
    extrasReceipt += ticketData.extras[extras[i]].description;
    if (i !== extras.length - 1) {
      extrasReceipt = ", ";
    }
  }
  let purchaseType =
    purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1);
  receipt += `${purchaseType} ${
    ticketData[purchase.ticketType].description
  }: $${totalPrice / 100}.00`;
  if (extras.length > 0) {
    receipt += `(${extrasReceipt})\n`;
  } else {
    receipt += "\n";
  }
  return (
    receipt +
    `-------------------------------------------\nTOTAL: $${totalCost / 100}.00`
  );
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
