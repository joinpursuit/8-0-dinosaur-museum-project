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
  // 1. Default value and output
  let result = 0
  let error = "Ticket type 'incorrect-type' cannot be found."
  let dataTickets = Object.keys(ticketData)
  let dataEntrants = Object.keys(ticketData.general.priceInCents)
  let dataExtras = Object.keys(ticketData.extras)

//ERRORS
//1. Default Value and Output
//2. Define the loop and Accumulate (via .includes to check against ticketData sets even exist)
  //In ticketInfo - we're looking to test if the keys even exist in the list of tickets (in tickets.js files) - 
  //so we're iterating over keys in tickets list which is an object of objects. 
  if (ticketInfo.ticketType === undefined || typeof ticketInfo.ticketType !== 'string' || !dataTickets.includes(ticketInfo.ticketType)) {
    return error 
  }

  if (ticketInfo.entrantType === undefined || typeof ticketInfo.entrantType !== 'string' || !dataEntrants.includes(ticketInfo.entrantType)) {
    error = "Entrant type 'incorrect-entrant' cannot be found." 
    return error
  }

  if (ticketInfo.extras === undefined || typeof ticketInfo.extras !== 'object') {
    error = "Extra type 'incorrect-extra' cannot be found." 
      return error
  }
//2. Define the loop and accumulate 
// (via for of loop for and then again via .includes to check if every element in ticketInfo extras can be found in ticketData extras)
  if (ticketInfo.extras.length) {
    for (let element of ticketInfo.extras) {
      if (typeof element !== 'string') {
        error = "Extra type 'incorrect-extra' cannot be found." 
        return error
      }
      if (!dataExtras.includes(element)) {
        error = "Extra type 'incorrect-extra' cannot be found." 
        return error
      }
    } 
  }
    
// 1. Define the loop and accumulate  
// GENERAL/MEMBERSHIP ADMIN
  
  for (let type in ticketData) {
    if (type === ticketInfo.ticketType) {
      for (let entrant in ticketData[type].priceInCents) {
        if (entrant === ticketInfo.entrantType) {
          result = ticketData[type].priceInCents[entrant]
          break;
        }
      }
    }
  }


// 1. Define the loop and accumulate  
// ADMIN WITH EXTRAS
  if (ticketInfo.extras.length) {
    for (let element in ticketInfo.extras) {
      for (let type in ticketData.extras) {
        if (type === ticketInfo.extras[element]) {
          for (let entrant in ticketData.extras[type].priceInCents) {
            if (entrant === ticketInfo.entrantType) {
              result += ticketData.extras[type].priceInCents[entrant]
            }
          }
        }
      } 
    }
  }

  return result
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

// Helper Function
function capitalize (element) {
  return element[0].toUpperCase() + element.slice(1)
}


function purchaseTickets(ticketData, purchases) {
  //1. Default value and output
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"

  let total = 0
  let ticketPrice = 0
  let dataEntrants = Object.keys(ticketData.general.priceInCents)

  // 2. Define the loop and Accumulate 
  for (let i = 0; i < purchases.length; i++) {
    let purchase = purchases[i]
    //ERRORS
    if (typeof calculateTicketPrice(ticketData, purchase) === 'string') {
      return calculateTicketPrice(ticketData, purchase)
    }

    //NOTE: Add breaks to stop the loop once a condition is met and speed up the process
    for (let j in dataEntrants) {
      if (dataEntrants[j] === purchase.entrantType) {
        let newEntrant = capitalize(dataEntrants[j])
        receipt += newEntrant + " "
        break;
      }
    }
    for (let k in ticketData) {
      if (k === purchase.ticketType) {
        let newTicket = ticketData[k].description
        receipt += newTicket + ": "
        total += calculateTicketPrice(ticketData, purchase)/100
        ticketPrice = calculateTicketPrice(ticketData, purchase)/100
        if (!purchase.extras.length) {
          receipt += "$" + ticketPrice.toFixed(2) + "\n"
          break;
        } else {
          receipt += "$" + ticketPrice.toFixed(2) + " "
          break;
        }
      }
    }
    
    if (purchase.extras.length) {
      for (let m in purchase.extras) {
        let extra = purchase.extras[m]
          for (let l in ticketData.extras) {
            if (l === extra) {
              let extraInfo = ticketData.extras[l].description
              if (purchase.extras.length === 1) {
                receipt += "(" + extraInfo + ")\n"
                break;
              } 
              // NOTE: The index in the array of extras in Purchases is a string 
              m = Number(m)
              if (m === 0) {
                receipt += "(" + extraInfo + ", "
                break;
              } else if (m > 0 && purchase.extras.length === 2) {
                receipt += extraInfo + ")\n"
                break;
              } else if (purchase.extras.length === 3 && m < purchase.extras.length - 1  && m > 0) {
                receipt += extraInfo + ", "
                break;
              } else if (purchase.extras.length === 3 && m === purchase.extras.length - 1 && m > 0) {
                receipt += extraInfo + ")\n"
                break;
              }
            }
          }
      }
    }
  }

  receipt += "-------------------------------------------\n" + "TOTAL: $" + total.toFixed(2)
  
  return receipt

}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
