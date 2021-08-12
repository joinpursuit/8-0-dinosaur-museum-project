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

//create a function that goes into the object and looks at the ticket info and ticket data and the ticket entrant type
// if the ticket type is not general or membership, meaning if ticket type has be one of the ticket type listed 

function calculateTicketPrice(ticketData,ticketInfo) {
  //an accumulator for extra add ons
  let extraTotal = 0;
  //create a variable to store the type of ticket
  let ticketInfoTicketType = ticketInfo.ticketType;
  //create a variable to store the type of entrant
  let ticketInfoEntrantType = ticketInfo.entrantType;
  //declare a function the stores the types of extras
  let ticketInfoExtraType = ticketInfo.extras;
  //if there is a ticket type that is not listed in the ticket data ie not general, membership, or extras)
  if (ticketData[ticketInfoTicketType] === undefined) {
    return `Ticket type 'incorrect-type' cannot be found.`;
  }
  //if the entrant type is not listed in the ticket data ie not child, adult, or senior
  if (ticketData[ticketInfoTicketType].priceInCents[ticketInfoEntrantType] === undefined) {
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  }
  //define how to get the cost of a regular ticket without extras
  let costOfRegularTicket = ticketData[ticketInfoTicketType].priceInCents[ticketInfoEntrantType];
  //if there aren't any extras just return the cost a regular ticket
  if (ticketInfoExtraType.length === 0) {
    return costOfRegularTicket
  }
  // if there are more than 0 extras added onto a ticket
  if (ticketInfoExtraType.length > 0) {
     //loop through the extra ticket info values
    for (const eachExtraAddOn of ticketInfo.extras) {
      //if the extra add on the ticket is not real then it's undefined, since it doesn't exist in the ticket data file
      if (ticketData.extras[eachExtraAddOn] === undefined) {
        return `Extra type 'incorrect-extra' cannot be found.`;
      }
      //if the if statement is false, find the price of the add on and add it onto the extra total
      extraTotal += ticketData.extras[eachExtraAddOn].priceInCents[ticketInfoEntrantType]  
    }
  }  
  return costOfRegularTicket += extraTotal;
}

const ticketData = {
  general: {
    description: "General Admission",
    priceInCents: {
      child: 2000,
      adult: 3000,
      senior: 2500,
    },
  },
  membership: {
    description: "Membership Admission",
    priceInCents: {
      child: 1500,
      adult: 2800,
      senior: 2300,
    },
  },
  extras: {
    movie: {
      description: "Movie Access",
      priceInCents: {
        child: 1000,
        adult: 1000,
        senior: 1000,
      },
    }, 
}
}  

const sampleTicketInfo = {
  ticketType: "general",
  entrantType: "child",
  extras: ["movie"],
}

// const purchases = [
//   {
//     ticketType: "general", // Incorrect
//     entrantType: "adult",
//     extras: ["movie", "terrace"],
//   }
// ]
// console.log(calculateTicketPrice(ticketData,purchases))

// function calculateTicketPrice(ticketData,ticket) {
  //console.log(ticketData[ticket.ticketType].priceInCents[ticket.entrantType])
//how to do an error
//if ticketData[ticketInfoTicketType] === undefined
//if ticketdata[ticketype].priceInCents[entrantType] === undefined
// if extras[extra] === undefined



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

//function that converts dollars to cents
//take the calculate total function / 100 . to fixed (2). return `${result of the new function}.

//the receipt will print the entrant type, the ticket type, the price of the ticket, the extras + `access`
//each purchase on the purchase ticket is separated by \n
//its an array of objects so I'm looping through each index, and each index is an object with properties. I am gathering and using the the values of each key to print information I need
//the function loops and dumps the values + access into an accumulator which is an empty string
//will have to loop through each value execute the top code, then run that value through the convert to dollars function, and toFix(2) and dollars sign to that value
//   for (const eachPurchaseOnTicket of purchase) {

//function that returns a number with 2 decimal places - 
function convertToDollars(cost){
  let totalDollarCost = 0;
  totalDollarCost =+ (cost/100);
  return totalDollarCost; //add toFixed(2) and $ after
  }
// console.log(convertToDollars(calculateTicketPrice(ticketData, sampleTicketInfo))); //add the helper function to determine cost of each ticket of the entire purchase

//function that loops through the extras
function loopThroughTheExtras(eachTicket){
  let eachTicketExtra = []
    for (let i = 0 ; i < eachTicket.extras.length; i++) {
        let eachExtra = eachTicket.extras[i];
        eachExtra = eachExtra.charAt(0).toUpperCase(1) + eachExtra.slice(1)  + ` Access`;
        eachTicketExtra.push(eachExtra);
     }    
    return eachTicketExtra.join(', ');
    }


  const purchases = [
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

// console.log(loopThroughTheExtras(purchases));   //
//find a way to capitalize the first letter of each extra  
  
function purchaseTickets(ticketData, purchases) {
  for (const eachTicket of purchases) {
    if (typeof calculateTicketPrice(ticketData, eachTicket) === 'string') {
      return  calculateTicketPrice(ticketData, eachTicket);
    }
  }
  //create an accumulator to store the dollar amount
  let costOfAllTickets = 0;
  //an empty accumulator to gather the ticket type
  let eachTicketTicketValues = '';
  //an empty accumulator for the extra items
  // let allTheExtras = '';
  // //loop through to gather information from each ticket, looping through an array
  for (const eachTicket of purchases) {
    let allTheExtras = '';
    allTheExtras += `${loopThroughTheExtras(eachTicket)}`
    if (allTheExtras.length === 0) {
      eachTicketTicketValues += `${eachTicket.entrantType.charAt(0).toUpperCase() + eachTicket.entrantType.slice(1)} ${eachTicket.ticketType.charAt(0).toUpperCase() + eachTicket.ticketType.slice(1)} Admission: $${convertToDollars(calculateTicketPrice(ticketData,eachTicket)).toFixed(2)}\n`;

    }
    else {
      eachTicketTicketValues += `${eachTicket.entrantType.charAt(0).toUpperCase() + eachTicket.entrantType.slice(1)} ${eachTicket.ticketType.charAt(0).toUpperCase() + eachTicket.ticketType.slice(1)} Admission: $${convertToDollars(calculateTicketPrice(ticketData,eachTicket)).toFixed(2)} (${allTheExtras})\n`;
    }
    // (${eachTicket.extras.join(' Access,').charAt(0).toUpperCase() + eachTicket.extras.toUpperCase()} Access)
    // allTheExtras = `${loopThroughTheExtras(eachTicket)}`
    costOfAllTickets += calculateTicketPrice(ticketData,eachTicket); 

  // }
  }
  //loop and grab the values of entrant type
  costOfAllTickets = convertToDollars(costOfAllTickets);
return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${eachTicketTicketValues}-------------------------------------------\nTOTAL: $${costOfAllTickets.toFixed(2)}`;}
//${eachTicketTicketValues} \n /
console.log(purchaseTickets(ticketData,purchases));
//create a helper function that converts the cents to dollars
//create a helper function the loops all the extras that's in someone's purchase

//find a way to add the extra


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
