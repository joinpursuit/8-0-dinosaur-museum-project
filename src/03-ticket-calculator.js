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
  //check against ticket types
  if (
    ticketInfo.ticketType !== "general" &&
    ticketInfo.ticketType !== "membership"
  ) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  //check against entrant types
  if (
    ticketInfo.entrantType !== "senior" &&
    ticketInfo.entrantType !== "child" &&
    ticketInfo.entrantType !== "adult"
  ) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  //check against extras
  // (I don't like this)
  let tooLegit = false;

  if (ticketInfo.extras.length !== 0) {
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] == "movie") {
        tooLegit = true;
      }
      if (ticketInfo.extras[i] == "terrace") {
        tooLegit = true;
      }
      if (ticketInfo.extras[i] == "education") {
        tooLegit = true;
      }
    }
    if (!tooLegit) {
      return `Extra type '${ticketInfo.extras}' cannot be found.`;
    }
  }

  //calculations
  let ticketType = ticketInfo.ticketType;
  let age = ticketInfo.entrantType;
  let extras = ticketInfo.extras;
  let ticketPrice = 0;
  //What kind of ticket?

  switch (ticketType) {
    case "general":
      switch (age) {
        case "child":
          ticketPrice += ticketData.general.priceInCents.child;
          break;
        case "adult":
          ticketPrice += ticketData.general.priceInCents.adult;
          break;
        case "senior":
          ticketPrice += ticketData.general.priceInCents.senior;
          break;
      }
      break;
    case "membership":
      switch (age) {
        case "child":
          ticketPrice += ticketData.membership.priceInCents.child;
          break;
        case "adult":
          ticketPrice += ticketData.membership.priceInCents.adult;
          break;
        case "senior":
          ticketPrice += ticketData.membership.priceInCents.senior;
          break;
      }
      break;
  }

  //What, if any, extras.
  //gonna need a loop here before the switch on the 'extras' array (NOT WHAT IS PASSED IN);

  for (choice in extras){
    switch (extras[choice]) {
      case "movie":
        switch (age) {
          case "child":
            ticketPrice += ticketData.extras.movie.priceInCents.child;
            break;
          case "adult":
            ticketPrice += ticketData.extras.movie.priceInCents.adult;
            break;
          case "senior":
            ticketPrice += ticketData.extras.movie.priceInCents.senior;
            break;
        }
        break;
      case "education":
        switch (age) {
          case "child":
            ticketPrice += ticketData.extras.education.priceInCents.child;
            break;
          case "adult":
            ticketPrice += ticketData.extras.education.priceInCents.adult;
            break;
          case "senior":
            ticketPrice += ticketData.extras.education.priceInCents.senior;
            break;
        }
        break;
      case "terrace":
        switch (age) {
          case "child":
            ticketPrice += ticketData.extras.terrace.priceInCents.child;
            break;
          case "adult":
            ticketPrice += ticketData.extras.terrace.priceInCents.adult;
            break;
          case "senior":
            ticketPrice += ticketData.extras.terrace.priceInCents.senior;
            break;
        }
        break;
    }
  }
  
  return ticketPrice;
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
function purchaseTickets(ticketData, purchases) {}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
