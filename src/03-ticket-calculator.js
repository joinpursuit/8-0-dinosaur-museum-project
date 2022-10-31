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
  let price = 0;
  if (ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership") {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior") {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  } else if (!ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace") && ticketInfo.extras.length !== 0) {
    return `Extra type '${ticketInfo.extras}' cannot be found.`;
  } else if (ticketInfo.ticketType === "membership") {
    if (ticketInfo.entrantType === "child") {
      price = ticketData.membership.priceInCents.child;
    } else if (ticketInfo.entrantType === "adult") {
      price = ticketData.membership.priceInCents.adult;
    } else if (ticketInfo.entrantType === "senior") {
      price = ticketData.membership.priceInCents.senior;
    }
  } else if (ticketInfo.ticketType === "general") {
    if (ticketInfo.entrantType === "child") {
      price = ticketData.general.priceInCents.child;
    } else if (ticketInfo.entrantType === "adult") {
      price = ticketData.general.priceInCents.adult;
    } else if (ticketInfo.entrantType === "senior") {
      price = ticketData.general.priceInCents.senior;
    }
  }
  for (let i = 0; i < ticketInfo.extras.length; i++) {
    if (ticketInfo.extras[i] === ("movie")) {
      if (ticketInfo.entrantType === "child") {
        price += ticketData.extras.movie.priceInCents.child;
      }
      if (ticketInfo.entrantType === "adult") {
        price += ticketData.extras.movie.priceInCents.adult;
      }
      if (ticketInfo.entrantType === "senior") {
        price += ticketData.extras.movie.priceInCents.senior;
      }
    }
    if (ticketInfo.extras[i] === ("education")) {
      if (ticketInfo.entrantType === "child") {
        price += ticketData.extras.education.priceInCents.child;
      }
      if (ticketInfo.entrantType === "adult") {
        price += ticketData.extras.education.priceInCents.adult;
      }
      if (ticketInfo.entrantType === "senior") {
        price += ticketData.extras.education.priceInCents.senior;
      }
    }
    if (ticketInfo.extras[i] === ("terrace")) {
      if (ticketInfo.entrantType === "child") {
        price += ticketData.extras.terrace.priceInCents.child;
      }
      if (ticketInfo.entrantType === "adult") {
        price += ticketData.extras.terrace.priceInCents.adult;
      }
      if (ticketInfo.entrantType === "senior") {
        price += ticketData.extras.terrace.priceInCents.senior;
      }
    }
  }
  return price;
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
  let price = 0;
  arr = [];
  
  let totalPrice = 0;
  for (let i = 0; i < purchases.length; i++) {
    // throwing an error message if incorrect info is given
    if (purchases[i].ticketType !== "general" && purchases[i].ticketType !== "membership") {
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`;
    } else if (purchases[i].entrantType !== "child" && purchases[i].entrantType !== "adult" && purchases[i].entrantType !== "senior") {
      return `Entrant type '${purchases[i].entrantType}' cannot be found.`;
    } else if (!purchases[i].extras.includes("movie") && !purchases[i].extras.includes("education") && !purchases[i].extras.includes("terrace") && purchases[i].extras.length !== 0) {
      return `Extra type '${purchases[i].extras}' cannot be found.`;

    // finding price for membership admission
    } else if (purchases[i].ticketType === "membership") {
      if (purchases[i].entrantType === "child") {
        price = ticketData.membership.priceInCents.child;
      } else if (purchases[i].entrantType === "adult") {
        price = ticketData.membership.priceInCents.adult;
      } else if (purchases[i].entrantType === "senior") {
        price = ticketData.membership.priceInCents.senior;
      }

    // finding price for general admission
    } else if (purchases[i].ticketType === "general") {
      if (purchases[i].entrantType === "child") {
        price = ticketData.general.priceInCents.child;
      } else if (purchases[i].entrantType === "adult") {
        price = ticketData.general.priceInCents.adult;
      } else if (purchases[i].entrantType === "senior") {
        price = ticketData.general.priceInCents.senior;
      }
    }

    // finding price if there is an "extras" key
    for (let z = 0; z < purchases[i].extras.length; z++) {
      if (purchases[i].extras[z] === ("movie")) {
        if (purchases[i].entrantType === "child") {
          price += ticketData.extras.movie.priceInCents.child;
        }
        if (purchases[i].entrantType === "adult") {
          price += ticketData.extras.movie.priceInCents.adult;
        }
        if (purchases[i].entrantType === "senior") {
          price += ticketData.extras.movie.priceInCents.senior;
        }
      }
      if (purchases[i].extras[z] === ("education")) {
        if (purchases[i].entrantType === "child") {
          price += ticketData.extras.education.priceInCents.child;
        }
        if (purchases[i].entrantType === "adult") {
          price += ticketData.extras.education.priceInCents.adult;
        }
        if (purchases[i].entrantType === "senior") {
          price += ticketData.extras.education.priceInCents.senior;
        }
      }
      if (purchases[i].extras[z] === ("terrace")) {
        if (purchases[i].entrantType === "child") {
          price += ticketData.extras.terrace.priceInCents.child;
        }
        if (purchases[i].entrantType === "adult") {
          price += ticketData.extras.terrace.priceInCents.adult;
        }
        if (purchases[i].entrantType === "senior") {
          price += ticketData.extras.terrace.priceInCents.senior;
        }
      } 
    }
    // find cumulative price of all tickets
    totalPrice += price;

  // Capitalize the first letters
    let entrantCap = purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1);
    let ticketCap = purchases[i].ticketType.charAt(0).toUpperCase() + purchases[i].ticketType.slice(1);
    let extrasCap = [];

    // Capitalizing and adding the word access to the extras key
    if (purchases[i].extras.length > 0) {
      for (let z = 0; z < purchases[i].extras.length; z++) {
        let capAndAccess = purchases[i].extras[z].charAt(0).toUpperCase() + purchases[i].extras[z].slice(1) + " Access";
        extrasCap.push(capAndAccess);
      }
      arr.push(`${entrantCap} ${ticketCap} Admission: $${(price * 0.01).toFixed(2)} (${extrasCap.join(", ")})`);
    } else {
      arr.push(`${entrantCap} ${ticketCap} Admission: $${(price * 0.01).toFixed(2)}`);
    }  
  }
 
  // print reciept
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${arr.join("\n")}\n-------------------------------------------\nTOTAL: $${(totalPrice * 0.01).toFixed(2)}`
}

  // Do not change anything below this line.
  module.exports = {
    calculateTicketPrice,
    purchaseTickets,
  };
