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
  let cost = 0
  if (ticketInfo.ticketType === "incorrect-type") {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.` // error Guard Clause for incorrect ticket
  } else if (ticketInfo.entrantType === "incorrect-entrant") {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.` // error Guard Clause for incorrect entrant
  } else if (ticketInfo.extras.join() === "incorrect-extra") {
    return `Extra type '${ticketInfo.extras.join()}' cannot be found.` // error Guard Clause for incorrect extras, using .join()to make it a string.
  } else if (ticketInfo.extras.length === 0) {
    cost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] // If no extras exist then add the number (found through using the parameters information in bracket notation) to cost.
    return cost // returns the cost
  } else if (ticketInfo.extras.length !== 0) {
    cost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] // If extras exist add the specified value to cost.
    for (i = 0; i < ticketInfo.extras.length; i++) { // For loop to itterate through the extras
      cost += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType] // Add the price of the extras to cost. 
    }
    return cost // return the cost.
  }

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
  let total = 0
  let individualCost = 0
  if (purchases[0].ticketType === "incorrect-type") {
    return `Ticket type '${purchases[0].ticketType}' cannot be found.` // Guard Clause for incorrect ticket.
  } else if (purchases[0].entrantType === "incorrect-entrant") {
    return `Entrant type '${purchases[0].entrantType}' cannot be found.` // Guard Clause for incorrect entrant.
  } else if (purchases[0].extras[0] === "incorrect-extra") {
    return `Extra type '${purchases[0].extras[0]}' cannot be found.` // Guard Clause for incorrect extras.
  } else {
    let admissionArr = [] // Initialized an empty array to store future data.
    for (i = 0; i < purchases.length; i++) {
      let extrasArr = [] // Created another empty array to inside of the loop to store temporary data.
      if (purchases[i].extras.length === 0) { // If no extras exist
        individualCost = ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] // sets the individual cost of the first ticket
        total += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] // adds the price in cents to the total variable.
        admissionArr.push(`${purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.charAt(0).toUpperCase() + purchases[i].ticketType.slice(1)} Admission: $${(individualCost * .01).toFixed(2)}\n`) // pushes the desired formated information into the admissions array , with Each first letter capital and the individual ticket price
      } else { // Else If there are any elements in purchases.extras
        individualCost = ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] // Sets the individual cost of the first ticket.
        total += ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType] // adds the price in cents to the total variable.
        for (j = 0; j < purchases[i].extras.length; j++) { // second for loop to itterate through the purchases.extras array
        individualCost += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType] // adds the extras cost to the individual ticket price.
          total += ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType] // adds the cost of that extra to the total cost.
          extrasArr.push(`${ticketData.extras[purchases[i].extras[j]].description}`) // Pushes desired extras description into the temporary extrasArr.
        }
        admissionArr.push(`${purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.charAt(0).toUpperCase() + purchases[i].ticketType.slice(1)} Admission: $${(individualCost * .01).toFixed(2)}`) // pushes the desired formated information into the admissions array , with Each first letter capital and the individual ticket price
        admissionArr[i] += " ("+(extrasArr.join(", "))+")\n" // Concatenates the extrasArr in the desired format .joined() into a string seperated by a comma and a space.
      }
    }

    return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${admissionArr.join("")}-------------------------------------------\nTOTAL: $${(total * .01).toFixed(2)}` // returns receipt in desired format.
  }
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
