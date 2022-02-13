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
  function ticketValidator(ticketData, ticketInfo) {
    if (!ticketData[ticketInfo.ticketType]) {
      return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
    } else if (
      !ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
    ) {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    } else if (ticketInfo.extras.length) {
      for (let extra of ticketInfo.extras) {
        if (!ticketData.extras[extra]) {
          return `Extra type '${extra}' cannot be found.`;
        }
      }
    }
  } // Validates whether ticket has correct information on it
  const validator = ticketValidator(ticketData, ticketInfo);

  if (validator) {
    return validator;
  }

  function priceCalculator(ticketData, ticketInfo) {
    let ticketPrice =
      ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

    if (ticketInfo.extras.length > 0) {
      for (let extra of ticketInfo.extras) {
        ticketPrice +=
          ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
      }
    }
    return ticketPrice;
  } // Calculates ticket price
  const calculator = priceCalculator(ticketData, ticketInfo);

  return calculator;
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
  let receipt = "";

  function ticketValidator(ticketData, ticketInfo) {
    if (!ticketData[ticketInfo.ticketType]) {
      return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
    } else if (
      !ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
    ) {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    } else if (ticketInfo.extras.length) {
      for (let extra of ticketInfo.extras) {
        if (!ticketData.extras[extra]) {
          return `Extra type '${extra}' cannot be found.`;
        }
      }
    }
  } // Validates whether ticket has correct information on it

  function purchasesValidator(ticketData, purchases) {
    for (let purchase of purchases) {
      if (ticketValidator(ticketData, purchase)) {
        return ticketValidator(ticketData, purchase);
      }
    }
  } // validates all purchased tickets
  const validator = purchasesValidator(ticketData, purchases);

  if (validator) {
    return validator;
  }

  function priceCalculator(ticketData, ticketInfo) {
    let ticketPrice =
      ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

    if (ticketInfo.extras.length > 0) {
      for (let extra of ticketInfo.extras) {
        ticketPrice +=
          ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
      }
    }
    return ticketPrice;
  } // Calculates ticket price

  function totalPriceCalculator(ticketData, purchases) {
    let totalPrice = 0;
    for (let purchase of purchases) {
      totalPrice += priceCalculator(ticketData, purchase);
    }
    totalPrice = (totalPrice / 100).toFixed(2);
    return totalPrice;
  } // Calculatos total price of all tickets
  const total = totalPriceCalculator(ticketData, purchases);

  function capitalizeFirstLetter(str) {
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1, str.length);
    return str;
  } // Capitalizes first letter of a string (used in purchase itermizer function)

  function purchaseItemizer(ticketData, ticketInfo) {
    let itemizedPurchase;
    itemizedPurchase = `\n${capitalizeFirstLetter(ticketInfo.entrantType)} ${
      ticketData[ticketInfo.ticketType].description
    }: $${(calculateTicketPrice(ticketData, ticketInfo) / 100).toFixed(2)}`;

    if (ticketInfo.extras.length) {
      itemizedPurchase += ` (`;
      for (let i = 0; i < ticketInfo.extras.length; ++i) {
        if (i === 0) {
          itemizedPurchase += `${
            ticketData.extras[ticketInfo.extras[i]].description
          }`;
        }
        if (i > 0) {
          itemizedPurchase += `, ${
            ticketData.extras[ticketInfo.extras[i]].description
          }`;
        }
      }
      itemizedPurchase += `)`;
    }
    return itemizedPurchase;
  } // Itemizes an individual ticket purchase

  function totalPurchasesItemizer(ticketData, purchases) {
    let itemizedPurchases = "";
    for (let purchase of purchases) {
      itemizedPurchases += purchaseItemizer(ticketData, purchase);
    }
    return itemizedPurchases;
  } // Itemizes all ticket purchases
  const itemizedPurchases = totalPurchasesItemizer(ticketData, purchases);

  receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------${itemizedPurchases}\n-------------------------------------------\nTOTAL: $${total}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
