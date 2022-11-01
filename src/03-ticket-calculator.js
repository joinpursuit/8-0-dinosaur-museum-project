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
  let totalPrice = 0; // this is our accumulator
  ticketData[ticketInfo.ticketType]; //this is referencing an array first

  if (
    ticketInfo.ticketType !== "general" &&
    ticketInfo.ticketType !== "membership"
  ) {
    //no valid ticket type is present
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (
    ticketInfo.entrantType !== "child" &&
    ticketInfo.entrantType !== "adult" &&
    ticketInfo.entrantType !== "senior"
  ) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  } else if (
    !ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("education") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.length > 0
  ) {
    //check if that array is empty
    return `Extra type '${ticketInfo.extras}' cannot be found.`;
  }

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
  ) {
    return ticketData.membership.priceInCents.senior;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.general.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.extras.education.priceInCents.child +
      ticketData.general.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.extras.education.priceInCents.child +
      ticketData.extras.terrace.priceInCents.child +
      ticketData.general.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "child" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.child +
      ticketData.extras.terrace.priceInCents.child +
      ticketData.general.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.general.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.extras.education.priceInCents.adult +
      ticketData.general.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.extras.education.priceInCents.adult +
      ticketData.extras.terrace.priceInCents.adult +
      ticketData.general.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "adult" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.adult +
      ticketData.extras.terrace.priceInCents.adult +
      ticketData.general.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.general.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.extras.education.priceInCents.senior +
      ticketData.general.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.extras.education.priceInCents.senior +
      ticketData.extras.terrace.priceInCents.senior +
      ticketData.general.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "general" &&
    ticketInfo.entrantType === "senior" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.senior +
      ticketData.extras.terrace.priceInCents.senior +
      ticketData.general.priceInCents.senior;
    return totalPrice;
  } //end of extra gen admission

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.membership.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.extras.education.priceInCents.child +
      ticketData.membership.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "child" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.child +
      ticketData.extras.education.priceInCents.child +
      ticketData.extras.terrace.priceInCents.child +
      ticketData.membership.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "child" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.child +
      ticketData.extras.terrace.priceInCents.child +
      ticketData.membership.priceInCents.child;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.membership.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.extras.education.priceInCents.adult +
      ticketData.membership.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "adult" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.adult +
      ticketData.extras.education.priceInCents.adult +
      ticketData.extras.terrace.priceInCents.adult +
      ticketData.membership.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "adult" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.adult +
      ticketData.extras.terrace.priceInCents.adult +
      ticketData.membership.priceInCents.adult;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    !ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.membership.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    !ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.extras.education.priceInCents.senior +
      ticketData.membership.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "senior" &&
    ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.movie.priceInCents.senior +
      ticketData.extras.education.priceInCents.senior +
      ticketData.extras.terrace.priceInCents.senior +
      ticketData.membership.priceInCents.senior;
    return totalPrice;
  }

  if (
    ticketInfo.ticketType === "membership" &&
    ticketInfo.entrantType === "senior" &&
    !ticketInfo.extras.includes("movie") &&
    ticketInfo.extras.includes("terrace") &&
    ticketInfo.extras.includes("education")
  ) {
    totalPrice =
      ticketData.extras.education.priceInCents.senior +
      ticketData.extras.terrace.priceInCents.senior +
      ticketData.membership.priceInCents.senior;
    return totalPrice;
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
      let finalPrice = 0
      let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------' //start of receipt
      for(let i = 0; i< purchases.length; i++){
        let swag = []
        if(!(ticketData.hasOwnProperty(purchases[i].ticketType))){
          //setting up a guard clause for handling the error first this checks our purchase type
          return `Ticket type '${purchases[i].ticketType}' cannot be found.`
      }   //if purchase type cannot be found it returns this
          if(!(ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType))){
            // error handling. Checking if the entrant type is incorrect
            return `Entrant type '${purchases[i].entrantType}' cannot be found.`
          }
          let price = calculateTicketPrice(ticketData, purchases[i])/100 
          console.log(price, 'this is the current price')
          //calculate price of ticket using our previous function
          if(typeof price === 'string'){
            return price
          }
          let ticketType = purchases[i].ticketType; 
          //this is ^ type of ticket general 
          let entrantType = purchases[i].entrantType; 
          // this will determine if its an adult, senior or child
          receipt += `\n${entrantType[0].toUpperCase()}${entrantType.slice(1)} ${ticketType[0].toUpperCase()}${ticketType.slice(1)} Admission: $${price.toFixed(2)}`
          // formatting receipt
          for (let j = 0; j < purchases[i].extras.length; j++){
            //decided we would use a J loop for extras since its within a loop to iterate throgh the extras
              if(ticketData.extras.hasOwnProperty(purchases[i].extras[j])){ 
                //Checking for purchase extras
                  swag.push(ticketData.extras[purchases[i].extras[j]].description)
                  //pushing the description in array if extra exists
              } else {
                return `Extra type '${purchases[i].extras[j]}' cannot be found.` 
                //if incorrect extras
              }
          }// ending of [j] for loop
          if(swag.length !== 0){
            receipt += ` (${swag.join(', ')})`
            //if there are no extras this will accumulate the properties into a new array
          }
          finalPrice += price // accumulating to determine final price
      }//ending of [i] for loop
      receipt += `\n-------------------------------------------\nTOTAL: $${finalPrice.toFixed(2)}`//Adding final costs to receipt with a fixed 2 decimals
      return receipt
      }// end of function
  
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
