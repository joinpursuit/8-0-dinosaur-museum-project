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
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. 
 * See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` 
 * key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. 
 *                                       All strings should be keys under the `extras` key in `ticketData`.
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
  let ticketTypes      = [],
      entrantTypes     = [],
      extraTypes       = [],
      setTicketCost    = 0,
      hasAddons        = (ticketInfo.extras.length !== 0),
      generateErrorMsg = (type) => `${type.charAt(0).toUpperCase() + type.slice(1)} type 'incorrect-${(type === 'entrant'||type ===  'extra') ? type : 'type'}' cannot be found.`;

  // Object destructuring:
  const { general : { description : genDescription, priceInCents : genPriceInCents }, 
          membership : { description : memDescription, priceInCents : memPriceInCents },
          extras     : { movie     : { description : movDescription, priceInCents : movPriceInCents}, 
                         education : { description : eduDescription, priceInCents : eduPriceInCents},
                         terrace   : { description : terDescription, priceInCents : terPriceInCents},
                       },
        } = ticketData;

  
  /*
  Object.entries(items).map(item => {
    console.log(item)
  })
  
  Object.entries(items).forEach(item => {
    console.log(item)
  })
  
  for (const item of Object.entries(items)) {
    console.log(item)
  }
  */
  for (const [key, value] of Object.entries(ticketData)) {
    //console.log(`${property}: ${object[property]}`);
    //console.log(ticketData[key].description)
    
  } 
  Object.entries(ticketData).map(item => {
    //console.log(item)
  })
  Object.entries(ticketData).forEach(item => {
    //console.log(general)


  })
  

  
  for (const [keyTicketTypes, valueTicketTypes] of Object.entries(ticketData)) {
    // Getting the ticket Types = [general, membership, extras]
    ticketTypes.push(keyTicketTypes);
    if(typeof valueTicketTypes.priceInCents === 'object'){
      for (const [keyEntrantTypes, value] of Object.entries(valueTicketTypes.priceInCents)) {
        // Getting the entrant Types = [child, adult, senior]
        entrantTypes.push(keyEntrantTypes)
      }
    }
    if(typeof ticketData.extras === 'object'){
      // Getting the extra Types = [movie, education, terrace]
      for (const [keyExtraTypes, value] of Object.entries(ticketData.extras)) {
        extraTypes.push(keyExtraTypes)
      }
    }
  }  

  // Validating T I C K E T - T Y P E S
  if(ticketTypes.includes(ticketInfo.ticketType)) {
    // Validating E N T R A N T - T Y P E S
    if(entrantTypes.includes(ticketInfo.entrantType)) {
      //
      setTicketCost = ticketData[ticketInfo.ticketType]['priceInCents'][ticketInfo.entrantType];
      // Validating E X T R A S
      if(hasAddons){
        // >> Adding extra cost to the ticket 
        if(extraTypes.some(value => ticketInfo.extras.includes(value))) {
          for(let extra of ticketInfo.extras){
            setTicketCost += ticketData.extras[extra]['priceInCents'][ticketInfo.entrantType];
          }
        }else{ 
          setTicketCost = generateErrorMsg('extra'); 
        }
      }    
    }else{ 
      setTicketCost = generateErrorMsg('entrant'); 
    }
  }else{ 
    setTicketCost = generateErrorMsg('ticket'); 
  }
  return setTicketCost;
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
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. 
 *                                        All strings should be keys under the `extras` key in `ticketData`.
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
  // helper to buid this
  let receiptHeader = 'Thank you for visiting the Dinosaur Museum!' +
                      '\n-------------------------------------------\n',
      receiptFooter = '\n-------------------------------------------\n' + 
                      'TOTAL: $',
      noAddons, 
      total = 0,
      getTicketData,
      ticketReceipt;

    ticketReceipt = receiptHeader;
    for(let purchase of purchases){
      // >>
      getTicketData = calculateTicketPrice(ticketData, purchase)
      if(typeof getTicketData === 'number'){
        total += getTicketData;
        // >> create helper for this task
        ticketReceipt += `${purchase.entrantType.charAt(0).toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(getTicketData/100).toFixed(2)}`
        if(purchase.extras.length){
          //helper to build this
          ticketReceipt += ' (';
          for(let extra of purchase.extras){
            ticketReceipt += `${ticketData.extras[extra].description}, `;
          } 
          ticketReceipt = ticketReceipt.slice(0, -2) + ')';
        }

      }else{
        return getTicketData; //// ?
      }
      ticketReceipt += '\n';
    }
    ticketReceipt = ticketReceipt.slice(0, -1) + `${receiptFooter}${(total/100).toFixed(2)}`; // >> helperr for formatting amounts of money!

  return ticketReceipt;
}

// function validateTicketError(ticketData, ticketInfo) {
//   console.log(ticketInfo)
//   return result;
// }
// validateTicketError(ticketData, ticketInfo)

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
