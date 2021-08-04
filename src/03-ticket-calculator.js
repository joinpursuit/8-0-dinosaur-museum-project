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
*/

// const ticketInfo = {
//   ticketType: "general",
//   entrantType: "kid", // Incorrect
//   extras: ["movie"],
// };

const ticketInfo = {
  ticketType: "general",
  entrantType: "child",
  extras: ["movie"],
};
// calculateTicketPrice(tickets, ticketInfo);
//> "Entrant type 'kid' cannot be found."

function calculateTicketPrice(ticketData, { ticketType, entrantType, extras }) {
  const validTicketEntrantTypes = ["child", "adult", "senior"];
  const validTicketTypes = ["general", "membership"];
  const validExtras = ["terrace", "movie", "education"];
  let totalPrice = 0;

  //check to see if ticket is valid
  if (!validTicketEntrantTypes.includes(entrantType)) return `Entrant type '${entrantType}' cannot be found.`;
  if (!validTicketTypes.includes(ticketType)) return `Ticket type '${ticketType}' cannot be found.`;

  //iterate through ticketInfoExtras
  for (let i = 0; i < extras.length; i++) {
    //if current string is not included in valid extras
    if (!validExtras.includes(extras[i])) return `Extra type '${extras[i]}' cannot be found.`;
  }

  totalPrice = ticketData[ticketType].priceInCents[entrantType];

  if (extras.length === 0) return totalPrice;

  //iterate through Extras
  extras.forEach((extra) => {
    //get current string
    //reference current string and entrant type and add to totalPrice
    totalPrice += ticketData.extras[extra].priceInCents[entrantType];
  });

  return totalPrice;
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
 * */
//  * EXAMPLE:
// const purchases = [
//   {
//     ticketType: "discount", // Incorrect
//     entrantType: "adult",
//     extras: ["movie", "terrace"],
//   },
// ];
const purchases = [
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
purchaseTickets(exampleTicketData, purchases);
//> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"
//> "Ticket type 'discount' cannot be found."

// console.log(purchaseTickets(exampleTicketData, purchases));

function purchaseTickets(ticketData, purchases) {
  //input: object called ticketData, array of objects called purchases
  //output: formatted string

  function convertToDollars(pennys) {
    return "$" + (pennys / 100).toFixed(2);
  }

  function upperFirstChar(age) {
    return age[0].toUpperCase() + age.slice(1);
  }

  //declare totalPrice variable
  let totalPrice = 0;
  //declare receipt variable
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  //iterate through purchases
  for (let i = 0; i < purchases.length; i++) {
    let purchase = purchases[i];
    const validTicketEntrantTypes = ["child", "adult", "senior"];
    const validTicketTypes = ["general", "membership"];
    const validExtras = ["terrace", "movie", "education"];

    //check to see if ticket is valid
    if (!validTicketEntrantTypes.includes(purchase.entrantType)) return `Entrant type '${purchase.entrantType}' cannot be found.`;
    if (!validTicketTypes.includes(purchase.ticketType)) return `Ticket type '${purchase.ticketType}' cannot be found.`;

    let currentTotalPurchasePrice = 0;
    let extrasDescription = "";
    //iterate through purchaseExtras if the array length is empty
    if (purchase.extras.length > 0) {
      for (let j = 0; j < purchase.extras.length; j++) {
        //if current string is not included in valid extras
        if (!validExtras.includes(purchase.extras[j])) return `Extra type '${purchase.extras[j]}' cannot be found.`;
        //grab price of each extra
        currentTotalPurchasePrice += ticketData.extras[purchase.extras[j]].priceInCents[purchase.entrantType];
        extrasDescription += ticketData.extras[purchase.extras[j]].description + ", ";
      }
    }
    extrasDescription = extrasDescription.slice(0, -2);
    //get entrant type in specific format
    receipt += upperFirstChar(purchase.entrantType);
    //get admission description
    receipt += " " + ticketData[purchase.ticketType].description + ":";
    //get dollas
    currentTotalPurchasePrice += ticketData[purchase.ticketType].priceInCents[purchase.entrantType];
    receipt += " " + convertToDollars(currentTotalPurchasePrice);

    if (purchase.extras.length > 0) {
      receipt += ` (${extrasDescription})\n`;
    } else {
      receipt += "\n";
    }
    totalPrice += currentTotalPurchasePrice;
  }
  //post iteration add remainder of format to receipt
  totalPrice = convertToDollars(totalPrice);
  receipt += `-------------------------------------------\nTOTAL: ${totalPrice}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
