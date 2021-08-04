/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. 
 * The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. 
 * Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket.
 *  All strings should be keys under the `extras` key in `ticketData`.
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
  // const ticketInfo = {
  //   ticketType: "general",
  //   entrantType: "adult",
  //   extras: [],
  // };
  // calculateTicketPrice(tickets, ticketInfo);
  //> 3000

  //Input: object
  //Return total cost in number
  //If a string entrantType is incorrect, return an error message

  // Define your default value
  let totalCost = 0;

  let entrantType = ticketInfo.entrantType; // Hold ticketInfo's entrantType value
  let typeOfTicket = ticketInfo.ticketType; // Hold ticketInfo's ticketType value
  let extraService = ticketInfo.extras; // Hold ticketInfo's extras value

  // IF ticketInfo is present in ticketData
  if (ticketData[typeOfTicket]) {
    // Add up according to entrantType
    totalCost += ticketData[typeOfTicket].priceInCents[entrantType];
  } else {
    // IF typeOfTicket is not present in ticketData, return an error message
    return `Ticket type '${typeOfTicket}' cannot be found.`;
  }
  // IF entratType is not found in ticketData, return an error message
  if (!ticketData[typeOfTicket].priceInCents[entrantType]) {
    return `Entrant type '${entrantType}' cannot be found.`;
  }

  // Define your loop
  for (const i of extraService) {
    // Check array 'extraService'
    if (i in ticketData.extras) {
      // if extraService is found in ticketData.extras, ADD price based on entrantType
      totalCost += ticketData.extras[i].priceInCents[entrantType];
    } else {
      // Otherwise, return an error message
      return `Extra type '${extraService}' cannot be found.`;
    }
  }

  return totalCost; // return a number value
}

// const ticketInfo = {
//   ticketType: "membership",
//   entrantType: "child",
//   extras: ["movie", "education"],
// };

// calculateTicketPrice(tickets, ticketInfo);
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
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. 
 * All strings should be keys under the `extras` key in `ticketData`.
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
// To make the first letter of whatever value I need to add to the receipt be capitalized
// and concatenate it to the rest of the original value
// ex) charAt[0] -> First letter -> .toUpperCase()
// + the rest of the word - > slice(1) -> get values after 0 and concatenate to the capitalized first letter

function formattingLetter(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}
function purchaseTickets(ticketData, purchases) {
  //"Thank you for visiting the Dinosaur Museum!\n-------------------------------------------
  //\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)
  //\n-------------------------------------------\nTOTAL: $175.00";

  // Declare a variable to hold a price value for later
  let totalCost = 0;
  // Declare a variable that holds the receipt format
  let receipt =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  // Loop through the input 'purchases' to check if input matches with ticketData
  for (const i of purchases) {
    //IF output of the function is string,
    if (typeof calculateTicketPrice(ticketData, i) === "string") {
      // Return an error message based on the given incorrct info
      return calculateTicketPrice(ticketData, i);
    }
    if (ticketData[i.ticketType]) {
      // IF input's ticket type is present in the object 'ticketData'
      // purchaseList.push(i);
      // Declare a variable to hold values of each element of purchases' entrantType
      let entrantName = i.entrantType;

      // entrantName.split("");
      // let upperJoint = entrantName[0].toUpperCase();
      // let sliceJoint = entrantName.split("").slice(1, entrantName.length);
      // let joinEntrant = upperJoint + sliceJoint.join("");

      // Declare a variable to hold values of each element of purchases' ticketType
      let ticketTypeName = i.ticketType;
      // ticketTypeName.split("");
      // let upperTicket = ticketTypeName[0].toUpperCase();
      // let sliceTicket = ticketTypeName
      //   .split("")
      //   .slice(1, ticketTypeName.length);
      // let joinTicket = upperTicket + sliceTicket.join("");

      // Calculate a ticket price based on the given info
      let ticketPrice = calculateTicketPrice(ticketData, i);
      // Convert cent to dollars
      let convert = ticketPrice / 100;
      // Add up price of each ticket
      totalCost += ticketPrice / 100;

      // Loop through the array extras inside the object 'purchases'
      for (let name = 0; name < i.extras.length; name++) {
        // format each element in the array 'extras' inside the object 'purchases'
        i.extras[name] = formattingLetter(i.extras[name] + " Access");
      }
      // IF extras are present
      if (i.extras.length > 0) {
        // Reassign the variable 'receipt' to the given format
        receipt += `${formattingLetter(entrantName)} ${formattingLetter(
          ticketTypeName
        )} Admission: $${convert.toFixed(2)} (${i.extras.join(", ")})\n`;
        // IF no extra is provided, reassign the variable 'receipt' to the given format
        // without extras info
      } else {
        receipt += `${formattingLetter(entrantName)} ${formattingLetter(
          ticketTypeName
        )} Admission: $${convert.toFixed(2)}\n`;
      }
    }

    // The previous function solved the error message already.
    // IF its output is string, it means it is returning an error messsage, Otherwise
    // IT would return number

    //   } else if (!ticketData[i.entrantType]) {
    //     return "Entrant type 'incorrect-entrant' cannot be found.";
    //   } else if (!ticketData[i.extras]) {
    //     return "Extra type 'incorrect-extra' cannot be found.";
    //   }
    //   if (!ticketData[i.entrantType])
    //     receipt = "Entrant type 'incorrect-entrant' cannot be found.";
  }
  return (
    receipt +
    `-------------------------------------------\nTOTAL: $${totalCost.toFixed(
      2
    )}`
  );
}

// receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------
// \n{}`;
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
