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
      price            = 'priceInCents',
      hasAddons        = (ticketInfo.extras.length !== 0),
      formatStrings    = (str) => `${str.charAt(0).toUpperCase() + str.slice(1)}`,
      generateErrorMsg = (type) => `${formatStrings(type)} type 'incorrect-${(type === 'entrant'||type === 'extra') ? type : 'type'}' cannot be found.`;

  // >> Looping over the objects inside the object getting the keys
  for (const [keyTicketTypes, valueTicketTypes] of Object.entries(ticketData)) {
    ticketTypes.push(keyTicketTypes);
    // >> Getting entrant types = [child, adult, senior]
    if(typeof valueTicketTypes.priceInCents === 'object'){
      entrantTypes = Object.keys(valueTicketTypes.priceInCents)
    }
    // >> Getting extra types = [movie, education, terrace]
    if(typeof ticketData.extras === 'object'){
      extraTypes = Object.keys(ticketData.extras)
    }
  }  

  // >> Validating if ticket type is valid
  if(ticketTypes.includes(ticketInfo.ticketType)) {
    // >> Validating if entrat type is valid
    if(entrantTypes.includes(ticketInfo.entrantType)) {
      // >> Setting ticket cost
      setTicketCost = ticketData[ticketInfo.ticketType][price][ticketInfo.entrantType];
      // >> Validating if ticket contains extras
      if(hasAddons){
        // >> Adding extras to tickets 
        if(extraTypes.some(value => ticketInfo.extras.includes(value))) {
          for(let extra of ticketInfo.extras){
            setTicketCost += ticketData.extras[extra][price][ticketInfo.entrantType];
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
  let strReceiptHeader = 'Thank you for visiting the Dinosaur Museum!',
      strReceiptFooter = 'TOTAL: $',
      divider          = '-',
      generateHeader   = () => `${strReceiptHeader}\n${divider}\n`,
      generateFooter   = () => `\n${divider}\n${strReceiptFooter}`,
      formatStrings    = (str) => `${str.charAt(0).toUpperCase() + str.slice(1)}`,
      formatNumbers    = (num) => `${(num/100).toFixed(2)}`,
      total = 0,
      getTicketData,
      ticketReceipt;

    for(let i = 0; i < 42; i++) { divider += '-'; } 
    
    // >> Starting process to assemble Receipt
    ticketReceipt = generateHeader();
    // >> Looping over the purchases to print every item
    for(let purchase of purchases) {
      getTicketData = calculateTicketPrice(ticketData, purchase)
      if(typeof getTicketData === 'number') {
        total += getTicketData;
        ticketReceipt += `${formatStrings(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${formatNumbers(getTicketData)}`
        if(purchase.extras.length) {
          // >> Adding opening parenthesis || Looping over the extras array
          ticketReceipt += ' (';
          for(let extra of purchase.extras) {
            ticketReceipt += `${ticketData.extras[extra].description}, `;
          } 
          // >> Removing last [comma-whitespace pair] || closing parenthesis 
          ticketReceipt = ticketReceipt.slice(0, -2) + ')';
        }
      }else{
        // >> Getting a wrong input
        return getTicketData;
      }
      ticketReceipt += '\n';
    }
    ticketReceipt = ticketReceipt.slice(0, -1) + `${generateFooter()}${formatNumbers(total)}`;
    // >> Ending process to assemble Receipt
  return ticketReceipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
