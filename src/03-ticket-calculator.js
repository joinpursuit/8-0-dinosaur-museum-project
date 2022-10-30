/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { general } = require("../data/tickets");
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
  // 6 new var created; 1 for tik cost, 1 for extra cost total, 1 for total cost; 3 separate error messages.
  let tikCost = 0;
  let extraCost = 0;
  let totalCost = 0;
  let errorEnt = `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  let errorTik = `Ticket type 'incorrect-type' cannot be found.`;
  let errorExt = `Extra type 'incorrect-extra' cannot be found.`;

  // Check for incorrect entrant type.
  if (ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'senior') {
    return errorEnt;
  }

  // Check for incorrect ticket type.
  if (ticketInfo.ticketType === 'incorrect-type') {
    return errorTik;
  }

  // Check for incorrect extra.
  if (ticketInfo.extras.includes('incorrect-extra')) {
    return errorExt;
  }
  /** The following are checks for entrant type.
   * Each of the 3 conditionals then check for general or memebership pricing.
   * Once we know what the entrant & ticket type are, we update our tikCost var accordingly.
   */
  if (ticketInfo.entrantType === 'child') {
    if (ticketInfo.ticketType === 'general') {
      tikCost = ticketData.general.priceInCents.child;
    } else if (ticketInfo.ticketType === 'membership') {
      tikCost = ticketData.membership.priceInCents.child;
    }
  } else if (ticketInfo.entrantType === 'adult') {
    if (ticketInfo.ticketType === 'general') {
      tikCost = ticketData.general.priceInCents.adult;
    } else if (ticketInfo.ticketType === 'membership') {
      tikCost = ticketData.membership.priceInCents.adult;
    }
  } else if (ticketInfo.entrantType === 'senior') {
    if (ticketInfo.ticketType === 'general') {
      tikCost = ticketData.general.priceInCents.senior;
    } else if (ticketInfo.ticketType === 'membership') {
      tikCost = ticketData.membership.priceInCents.senior;
    }
  }

  /**
   * The following 3 conditionals check for the 3 different extras. 
   * We then check for entrant type. 
   * Then we add and update the appropriate cost to the extraCost var bucket.
   */
  if (ticketInfo.extras.includes('movie')) {
    if (ticketInfo.entrantType === 'child') {
      extraCost += ticketData.extras.movie.priceInCents.child;
    } else if (ticketInfo.entrantType === 'adult') {
      extraCost += ticketData.extras.movie.priceInCents.adult;
    } else if (ticketInfo.entrantType === 'senior') {
      extraCost += ticketData.extras.movie.priceInCents.senior;
    }
  }
  if (ticketInfo.extras.includes('terrace')) {
    if (ticketInfo.entrantType === 'child') {
      extraCost += ticketData.extras.terrace.priceInCents.child;
    } else if (ticketInfo.entrantType === 'adult') {
      extraCost += ticketData.extras.terrace.priceInCents.adult;
    } else if (ticketInfo.entrantType === 'senior') {
      extraCost += ticketData.extras.terrace.priceInCents.senior;
    }
  }
  if (ticketInfo.extras.includes('education')) {
    if (ticketInfo.entrantType === 'child') {
      extraCost += ticketData.extras.education.priceInCents.child;
    } else if (ticketInfo.entrantType === 'adult') {
      extraCost += ticketData.extras.education.priceInCents.adult;
    } else if (ticketInfo.entrantType === 'senior') {
      extraCost += ticketData.extras.education.priceInCents.senior;
    }
  }

  //Adding the accurate cost of the ticket, plus the total of all desired extras and then returning the totalCost 
  totalCost = tikCost + extraCost;
  return totalCost;
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
  /** 
   * Several variables to use, call and manipulate as we loop.
   * lineTotal: used to hold cost per individual ticket
   * purchaseTotal: used to add lineTotal each lap of loop
   * lineFormat: used to properly uppercase entrant & ticket type values and add them together with required spacing
   * receipt: empty array that we will push to each lap of loop
   * errors x3: 3 error messages, I know we dont NEED a variable for these, but I like having them here
  */
  let lineTotal = 0;
  let purchaseTotal = 0;
  let lineFormat = '';
  let receipt = ['Thank you for visiting the Dinosaur Museum!\n-------------------------------------------'];
  let i;
  let errorEnt = `Entrant type '${purchases[i].entrantType}' cannot be found.`;
  let errorTik = `Ticket type '${purchases[i].ticketType}' cannot be found.`;
  let errorExt = `Extra type 'incorrect-extra' cannot be found.`;

  /**
   * Loop to comb through purchases param and look at each individual ticket + any extras.  
   * Using previous calculateTicketPrice fucntion, we can find the total of each ticket(each object in the purchases array).  
   * We will add this to lineTotal var in order to keep track of total and each lap of loop will push that to receipt array.
   */
  for (i = 0; i < purchases.length; i++) {
    /**
     * Empty array to push the extras of each ticket to.
     * We placed within for loop so it will reset after each lap of loop which prevents duplicates being pushed to the final receipt array.
     */
    let extraArr = [];
    // 3 escapes for errors.
    if (purchases[i].entrantType !== 'child' && purchases[i].entrantType !== 'adult' && purchases[i].entrantType !== 'senior') {
      return errorEnt;
    }
    if (purchases[i].ticketType !== 'general' && purchases[i].ticketType !== 'membership') {
      return errorTik;
    }
    if (purchases[i].extras.includes('incorrect-extra')) {
      return errorExt;
    }
    // Calling previous function to find total of each ticket and setting that to lineTotal.
    lineTotal = calculateTicketPrice(ticketData, purchases[i]) / 100;
    /**
     * Here is how we format each ticket line.
     * We use toUpperCase to capitalize the first letter of the entrant type.
     * We then use substring to add the rest of the string back to the capitalized first letter.
     * We then do the same for ticket type as well as add in necessary spaces, commas, the word Admission & the dollar sign.
    */
    lineFormat = `\n${(purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.substring(1)) + ' ' + (purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.substring(1)) + ' Admission: ' + '$' + (lineTotal) + '.00'}`
    receipt.push(lineFormat)
    /**
     * Nested loop to cycle through the extras array in each purchase object.
     * As we do this, we push the coresponding string the our extraArr array.
     * Then, outside of this loop, we make sure that the extraArr is not empty, to prevent pushing nothing.
     * If the extraArr has elements, we push that to our receipt array and turn it into a string using .join().
    */
    for (let e = 0; e < purchases[i].extras.length; e++) {
      if (purchases[i].extras[e] === 'movie') {
        extraArr.push('Movie Access');
      } else if (purchases[i].extras[e] === 'education') {
        extraArr.push('Education Access');
      } else if (purchases[i].extras[e] === 'terrace') {
        extraArr.push('Terrace Access');
      }
    }
    if (extraArr.length !== 0) {
      receipt.push(` (${extraArr.join(', ')})`)
    }
    /**
     * I left all of this in bc this is what I was working on before I discovered that I could call the previous function that I had already completed.
     * It required a good deal of reworking, but it was necessary to slim down and simplify my function.
     * Changing it from the below also allowed me to recreate the extra for loop.
     * I wanted to leave my work to show where my logic started and how I was able to level up my functions code.
    */

    // // Conditionals to check entrant type, and then within that chec ticket type
    // if (purchases[i].entrantType === 'child') {
    //   if (purchases[i].ticketType === 'general') {
    //     lineTotal = ticketData.general.priceInCents.child / 100;
    //   } else if (purchases[i].ticketType === 'membership') {
    //     lineTotal = ticketData.membership.priceInCents.child / 100;
    //   }
    // } else if (purchases[i].entrantType === 'adult') {
    //   if (purchases[i].ticketType === 'general') {
    //     lineTotal = ticketData.general.priceInCents.adult / 100;
    //   } else if (purchases[i].ticketType === 'membership') {
    //     lineTotal = ticketData.membership.priceInCents.adult / 100;
    //   }
    // } else if (purchases[i].entrantType === 'senior') {
    //   if (purchases[i].ticketType === 'general') {
    //     lineTotal = ticketData.general.priceInCents.senior / 100;
    //   } else if (purchases[i].ticketType === 'membership') {
    //     lineTotal = ticketData.membership.priceInCents.senior / 100;
    //   }
    // }
    // //Nested loop to check extras array
    // for (let e = 0; e < purchases[i].extras.length; e++) {
    //   // checking extras chosen
    //   if (purchases[i].extras[e] === 'movie') {
    //     lineTotal += ticketData.extras.movie.priceInCents.child / 100;
    //   } else if (purchases[i].extras[e] === 'education' && purchases[i].entrantType === 'child') {
    //     lineTotal += ticketData.extras.education.priceInCents.child / 100;
    //   } else if (purchases[i].extras[e] === 'education' && purchases[i].entrantType !== 'child') {
    //     lineTotal += ticketData.extras.education.priceInCents.adult / 100;
    //   } else if (purchases[i].extras[e] === 'terrace' && purchases[i].entrantType === 'child') {
    //     lineTotal += ticketData.extras.terrace.priceInCents.child / 100;
    //   } else if (purchases[i].extras[e] === 'terrace' && purchases[i].entrantType !== 'child') {
    //     lineTotal += ticketData.extras.terrace.priceInCents.adult / 100;
    //   }
    //   extraFormat = purchases[i].extras.slice(0, 1).join()
    //   extraFormat = extraFormat[0].toUpperCase() + extraFormat.substring(1);
    // }

    // Here we add the lineTotal to the purchaseTotal in order to keep track of the entire purchase total.
    purchaseTotal += lineTotal;
  }
  // Here we push the final purchaseTotal to the receipt array along with the necessary line breaks and formatting required by the tests.
  receipt.push(`\n-------------------------------------------\nTOTAL: $${purchaseTotal}.00`)
  return receipt.join('');
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
