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
  let finalPrice = 0;
  let withExtra = true;
  // ERROR HANGLING
  function errorHandling(ticketInfo) {
    let withExtra = false;
    if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
      throw `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
    }
    if (
      !ticketData.general.priceInCents.hasOwnProperty(ticketInfo.entrantType)
    ) {
      throw `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    }
    for (let extra of ticketInfo.extras) {
      withExtra = true;
      if (!ticketData.extras.hasOwnProperty(extra)) {
        throw `Extra type '${ticketInfo.extras}' cannot be found.`;
      }
    }
  }
  try {
    errorHandling(ticketInfo);
  } catch (e) {
    return e;
  }
  // Assuming you can't buy multiple of the same extra
  // Gets Final Extra price
  if (withExtra) {
    let priceOfExtra = 0;
    for (let extra of ticketInfo.extras) {
      if (extra === "movie") {
        priceOfExtra += ticketData.extras.movie.priceInCents.child;
      }
      if (extra === "education" && ticketInfo.entrantType === "child") {
        priceOfExtra += ticketData.extras.education.priceInCents.child;
      } else if (extra === "education" && ticketInfo.entrantType === "adult") {
        priceOfExtra += ticketData.extras.education.priceInCents.adult;
      } else if (extra === "education" && ticketInfo.entrantType === "senior") {
        priceOfExtra += ticketData.extras.education.priceInCents.senior;
      }
      if (extra === "terrace" && ticketInfo.entrantType === "child") {
        priceOfExtra += ticketData.extras.terrace.priceInCents.child;
      } else if (extra === "terrace" && ticketInfo.entrantType === "adult") {
        priceOfExtra += ticketData.extras.terrace.priceInCents.adult;
      } else if (extra === "terrace" && ticketInfo.entrantType === "senior") {
        priceOfExtra += ticketData.extras.terrace.priceInCents.senior;
      }
    }
    // Gets Final Ticket price
    if (ticketInfo.ticketType === "general") {
      if (ticketInfo.entrantType === "child") {
        finalPrice += ticketData.general.priceInCents.child;
      } else if (ticketInfo.entrantType === "adult") {
        finalPrice += ticketData.general.priceInCents.adult;
      } else if (ticketInfo.entrantType === "senior") {
        finalPrice += ticketData.general.priceInCents.senior;
      }
    }
    if (ticketInfo.ticketType === "membership") {
      if (ticketInfo.entrantType === "child") {
        finalPrice += ticketData.membership.priceInCents.child;
      } else if (ticketInfo.entrantType === "adult") {
        finalPrice += ticketData.membership.priceInCents.adult;
      } else if (ticketInfo.entrantType === "senior") {
        finalPrice += ticketData.membership.priceInCents.senior;
      }
    }
    // Adds Ticket + Extras
    finalPrice = finalPrice + priceOfExtra;
  }
  // Ticket Price WITHOUT any extras
  if (!withExtra) {
    if (ticketInfo.ticketType === "general") {
      if (ticketInfo.entrantType === "child") {
        finalPrice = ticketData.general.priceInCents.child;
      } else if (ticketInfo.entrantType === "adult") {
        finalPrice = ticketData.general.priceInCents.adult;
      } else if (ticketInfo.entrantType === "senior") {
        finalPrice = ticketData.general.priceInCents.senior;
      }
    }
    if (ticketInfo.ticketType === "membership") {
      if (ticketInfo.entrantType === "child") {
        finalPrice = ticketData.membership.priceInCents.child;
      } else if (ticketInfo.entrantType === "adult") {
        finalPrice = ticketData.membership.priceInCents.adult;
      } else if (ticketInfo.entrantType === "senior") {
        finalPrice = ticketData.membership.priceInCents.senior;
      }
    }
  }
  return finalPrice;
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
  let finalPrice = 0;
  let thankYouMessage = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;
  let withExtra = false;
  // ERROR HANGLING
  function errorHandling(purchases){
  for (let purchase of purchases) {
    if (!ticketData.hasOwnProperty(purchase.ticketType)) {
      throw `Ticket type '${purchase.ticketType}' cannot be found.`;
    }
    if (!ticketData.general.priceInCents.hasOwnProperty(purchase.entrantType)) {
      throw `Entrant type '${purchase.entrantType}' cannot be found.`;
    }
    for (let extra of purchase.extras) {
      if (extra) {
        withExtra = true;
        if (!ticketData.extras.hasOwnProperty(extra)) {
          throw `Extra type '${purchase.extras}' cannot be found.`;
        }
      }
    }
  }
}
try {
    errorHandling(purchases);
  } catch (e) {
    return e;
  }

  // Assuming you can't buy multiple of the same extra
  // Gets Final Extra price
  let priceOfExtra = 0;
  let admissionPrice = 0;
  let ticketDescription = "";
  // Gets Final Ticket price
  for (let purchase of purchases) {
    if (purchase.ticketType === "general" && purchase.entrantType === "child") {
      let generalChildExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.general.priceInCents.child;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.child;
          generalChildExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.child;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nChild General Admission: $${(
          (ticketData.general.priceInCents.child + generalChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nChild General Admission: $${(
          (ticketData.general.priceInCents.child + generalChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nChild General Admission: $${(
          (ticketData.general.priceInCents.child + generalChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nChild General Admission: $${(
          (ticketData.general.priceInCents.child + generalChildExtras) /
          100
        ).toFixed(2)}`;
      }
    } else if (
      purchase.ticketType === "general" &&
      purchase.entrantType === "adult"
    ) {
      let generalAdultExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.general.priceInCents.adult;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.adult;
          generalAdultExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.adult;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nAdult General Admission: $${(
          (ticketData.general.priceInCents.adult + generalAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nAdult General Admission: $${(
          (ticketData.general.priceInCents.adult + generalAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nAdult General Admission: $${(
          (ticketData.general.priceInCents.adult + generalAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nAdult General Admission: $${(
          (ticketData.general.priceInCents.adult + generalAdultExtras) /
          100
        ).toFixed(2)}`;
      }
    } else if (
      purchase.ticketType === "general" &&
      purchase.entrantType === "senior"
    ) {
      let generalSeniorExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.general.priceInCents.senior;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.senior;
          generalSeniorExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.senior;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nSenior General Admission: $${(
          (ticketData.general.priceInCents.senior + generalSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nSenior General Admission: $${(
          (ticketData.general.priceInCents.senior + generalSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nSenior General Admission: $${(
          (ticketData.general.priceInCents.senior + generalSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nSenior General Admission: $${(
          (ticketData.general.priceInCents.senior + generalSeniorExtras) /
          100
        ).toFixed(2)}`;
      }
    } else if (
      purchase.ticketType === "membership" &&
      purchase.entrantType === "child"
    ) {
      let membershipChildExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.membership.priceInCents.child;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.child;
          membershipChildExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.child;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nChild Membership Admission: $${(
          (ticketData.membership.priceInCents.child + membershipChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nChild Membership Admission: $${(
          (ticketData.membership.priceInCents.child + membershipChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nChild Membership Admission: $${(
          (ticketData.membership.priceInCents.child + membershipChildExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nChild Membership Admission: $${(
          (ticketData.membership.priceInCents.child + membershipChildExtras) /
          100
        ).toFixed(2)}`;
      }
    } else if (
      purchase.ticketType === "membership" &&
      purchase.entrantType === "adult"
    ) {
      let membershipAdultExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.membership.priceInCents.adult;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.adult;
          membershipAdultExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.adult;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nAdult Membership Admission: $${(
          (ticketData.membership.priceInCents.adult + membershipAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nAdult Membership Admission: $${(
          (ticketData.membership.priceInCents.adult + membershipAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nAdult Membership Admission: $${(
          (ticketData.membership.priceInCents.adult + membershipAdultExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nAdult Membership Admission: $${(
          (ticketData.membership.priceInCents.adult + membershipAdultExtras) /
          100
        ).toFixed(2)}`;
      }
    } else if (
      purchase.ticketType === "membership" &&
      purchase.entrantType === "senior"
    ) {
      let membershipSeniorExtras = 0;
      let extraInfo = new Array();
      admissionPrice += ticketData.membership.priceInCents.senior;
      for (let i = 0; i < purchase.extras.length; i++) {
        if (ticketData.extras.hasOwnProperty(purchase.extras[i])) {
          extraInfo.push(ticketData.extras[purchase.extras[i]].description);
          priceOfExtra += ticketData.extras[purchase.extras[i]].priceInCents.senior;
          membershipSeniorExtras +=
          ticketData.extras[purchase.extras[i]].priceInCents.senior;
        }
      }
      if (extraInfo.length === 3) {
        ticketDescription += `\nSenior Membership Admission: $${(
          (ticketData.membership.priceInCents.senior + membershipSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]}, ${extraInfo[2]})`;
      } else if (extraInfo.length === 2) {
        ticketDescription += `\nSenior Membership Admission: $${(
          (ticketData.membership.priceInCents.senior + membershipSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]}, ${extraInfo[1]})`;
      } else if (extraInfo.length === 1) {
        ticketDescription += `\nSenior Membership Admission: $${(
          (ticketData.membership.priceInCents.senior + membershipSeniorExtras) /
          100
        ).toFixed(2)} (${extraInfo[0]})`;
      } else {
        ticketDescription += `\nSenior Membership Admission: $${(
          (ticketData.membership.priceInCents.senior + membershipSeniorExtras) /
          100
        ).toFixed(2)}`;
      }
    }
    // Adds Ticket + Extras
  }
  finalPrice = `\n-------------------------------------------\nTOTAL: $${(
    (admissionPrice + priceOfExtra) /
    100
  ).toFixed(2)}`;

  return thankYouMessage + ticketDescription + finalPrice;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
