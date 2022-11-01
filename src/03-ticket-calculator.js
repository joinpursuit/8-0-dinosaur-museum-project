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
  let totalPrice = 0; // accumalator to refence to later
  ticketData[ticketInfo.ticketType]; // ticket data is an array so we are accessing the array first

  if (
    ticketInfo.ticketType !== "general" &&
    ticketInfo.ticketType !== "membership"
  ) {
    // creating a condition to check for tickets types are not general or membership and then returning an error message
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
    // on the following line of code we are checking if the ticket entrant type is not an adult,child, or sr
  } else if (
    ticketInfo.entrantType !== "child" &&
    ticketInfo.entrantType !== "adult" &&
    ticketInfo.entrantType !== "senior"
  ) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    // here we are checking if no extras are included and if the length is greater than 0
  } else if (
    !ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("education") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.length > 0
  ) {
    return `Extra type '${ticketInfo.extras}' cannot be found.`;
  } // the following is code is determing the base pay with no extra cost , general ticket
  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.length === 0
  ) {
    return ticketData.general.priceInCents.child;
  } else if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.length === 0
  ) {
    return ticketData.general.priceInCents.adult;
  } else if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.length === 0
  )
    return ticketData.general.priceInCents.senior;
  // the following code is checking the memebership base pay with no extra for each one
  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.length === 0
  ) {
    return ticketData.membership.priceInCents.child;
  } else if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.length === 0
  ) {
    return ticketData.membership.priceInCents.adult;
  } else if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.length === 0
  )
    return ticketData.membership.priceInCents.senior;
  // the follwing code is checking the general base pay for child with the extras included. I used the . includes to check if the specific extra is include. I used the "!" not to still check for the extra but make sure its not includeded. I did this for the rest of the code.
  if (ticketInfo.ticketType === "general") {
    if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.child +
        ticketData.extras.movie.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.child +
        ticketData.extras.movie.priceInCents.child +
        ticketData.extras.education.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.child +
        ticketData.extras.terrace.priceInCents.child +
        ticketData.extras.education.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.child +
        ticketData.extras.movie.priceInCents.child +
        ticketData.extras.education.priceInCents.child +
        ticketData.extras.terrace.priceInCents.child;
      return totalPrice;
    }
  } // the follwing code is checking the general base pay for adult with the extras included. one by one by using the .includes meathod and !
  if (ticketInfo.ticketType === "general") {
    if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.adult +
        ticketData.extras.terrace.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult +
        ticketData.extras.terrace.priceInCents.adult;
      return totalPrice;
    }
  } // the follwing code is checking the general base pay for sr with the extras included. one by one
  if (ticketInfo.ticketType === "general") {
    if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.senior +
        ticketData.extras.terrace.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.general.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior +
        ticketData.extras.terrace.priceInCents.senior;
      return totalPrice;
    }
  } // one the rest of the code we are doing the same thing as the top but with the memnership pay. we are checking each one by ticket type and each extra one included.
  if (ticketInfo.ticketType === "membership") {
    if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.child +
        ticketData.extras.movie.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.child +
        ticketData.extras.movie.priceInCents.child +
        ticketData.extras.education.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.child +
        ticketData.extras.terrace.priceInCents.child +
        ticketData.extras.education.priceInCents.child;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "child" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.child +
        ticketData.extras.movie.priceInCents.child +
        ticketData.extras.education.priceInCents.child +
        ticketData.extras.terrace.priceInCents.child;
      return totalPrice;
    }
  }
  if (ticketInfo.ticketType === "membership") {
    if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.adult +
        ticketData.extras.terrace.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "adult" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.adult +
        ticketData.extras.movie.priceInCents.adult +
        ticketData.extras.education.priceInCents.adult +
        ticketData.extras.terrace.priceInCents.adult;
      return totalPrice;
    }
  }
  if (ticketInfo.ticketType === "membership") {
    if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      !ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      !ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      !ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.senior +
        ticketData.extras.terrace.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior;
      return totalPrice;
    } else if (
      ticketInfo.entrantType === "senior" &&
      ticketInfo.extras.includes("movie") &&
      ticketInfo.extras.includes("terrace") &&
      ticketInfo.extras.includes("education")
    ) {
      totalPrice =
        ticketData.membership.priceInCents.senior +
        ticketData.extras.movie.priceInCents.senior +
        ticketData.extras.education.priceInCents.senior +
        ticketData.extras.terrace.priceInCents.senior;
      return totalPrice;
    }
  }
}

// if (ticketInfo.extras.includes('education')) {
//   return ticketData.extras.education.priceInCents.child
// } else {
//   return(ticketData.extras.movies.priceInCents.chold + ticketData.general.priceInCents.child)
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
  let finalPrice = 0
  let final = []
  let finalReceipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------' // 
  for (let i = 0; i < purchases.length; i++) {
    if(!(ticketData.hasOwnProperty(purchases[i].ticketType))) {
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`
    }
  } 
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
