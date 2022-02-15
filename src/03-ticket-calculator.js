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
// const ticketInfo = {
//   ticketType: "general",
//   entrantType: "adult", // Incorrect
//   extras: ["education"],
// };

function calculateTicketPrice(ticketData, ticketInfo) {
  //set default value of total equal to 0
  let total = 0;
  //checking if our input object value for ticketType exists inside ticketData
  if (!ticketData[ticketInfo.ticketType]) {
    //return error message for invalid ticket type
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (
    //checking if our input object value for entrantType exists inside ticketData
    !ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  ) {
    //return error message for invalid entrant type
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  //setting total equal to corressponding priceInCents value (based off ticket type)
  total +=
    ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  // check if extras value exists in our input object (not an empty array), and run the code block
  if (ticketInfo.extras) {
    //iterate through each element in the extras array
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      //at each iteration check if the element exists in ticketData
      if (!ticketData.extras[ticketInfo.extras[i]]) {
        //if a matching element doesn't exist, return error message
        return `Extra type '${ticketInfo.extras[i]}' cannot be found.`;
      }
      //accumulate the priceInCents value for each element's corresponding entrant type in the extras array
      total +=
        ticketData.extras[ticketInfo.extras[i]].priceInCents[
          ticketInfo.entrantType
        ];
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

// const purchases = [
//   {
//     ticketType: "general",
//     entrantType: "adult",
//     extras: ["movie", "terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "senior",
//     extras: ["terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "child",
//     extras: ["education", "movie", "terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "child",
//     extras: ["education", "movie", "terrace"],
//   },
// ];

//For each purchase, we need
//    -> It's cost: check
//    -> It's itemized receipt line

//Cumulative info we need:
//    -> total cost of all purchases
//   let cost = 0;
//   for (let purchase of purchases) {
//     const purchasePrice = calculateTicketPrice(ticketData, purchase);
//     if (typeof purchasePrice !== 'number') {
//       return purchasePrice
//     }
//     cost += purchasePrice;
//   }
//   purchaseTickets(ticketData, purchasePrice);
// }

// console.log(purchaseTickets(exampleTicketData, purchases))

// console.log(formatTicketreceiptDescriptionion(examplePurchase, 5500));
//Child General Admission: $55:00 (Education Access, Movie Access, Terrace Access)

function purchaseTickets(ticketData, purchases) {
  //default value
  let total = 0;
  //default value
  let receipt =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  //loop through purchases
  for (let purchase of purchases) {
    //invoke calculateTicketPrice function to get cost
    let cost = calculateTicketPrice(ticketData, purchase);
    //check if cost is a string, should be a number
    if (typeof cost === "string") {
      return cost;
    }
    //create an array
    let receiptDescription = [];
    //loop through extras array
    for (let extra of purchase.extras) {
      //pushing the decription from extras object thats being referenced from purchase object into our new receiptDescription array
      receiptDescription.push(ticketData.extras[extra].description);
    }
    //check if our extras array exists inside our purchase object
    if (purchase.extras.length) {
      //join the desriptions together
      receiptDescription = ` (${receiptDescription.join(", ")})`;
    }
    //interpolating our string to adjusting spelling and decimal places
    receipt += `${
      purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)
    } ${ticketData[purchase.ticketType].description}: $${(cost / 100).toFixed(
      2
    )}${receiptDescription}\n`; //adding the extras descriptions, which is our new joined array
    //accumulate the total
    total += cost / 100;
  }
  receipt += `-------------------------------------------\nTOTAL: $${total.toFixed(
    2
  )}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
