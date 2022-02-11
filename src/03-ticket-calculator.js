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
  let noAddons     = (ticketInfo.extras.length === 0),
      prefixTicketType,
      prefixEstrasType,
      ticketTypes     = [],
      admissionInfo   = [],
      entrantTypes    = [],
      extraTypes      = [],
      ticketPrice  = 0;

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


    if(ticketData[item] === 'general'){
      console.log('yes')
    }
  })
  


  for (const [key, value] of Object.entries(ticketData)) {
    // ticketTypes array = [general, membership, extras]
    ticketTypes.push(key);
    if(value.description !== undefined){
      admissionInfo.push(value.description)
    }
    

    //console.log(ticketData.general)
    //console.log(ticketData.membership)
    //console.log(ticketData.extras)
    //console.log(value.priceInCents)
    if(typeof value.priceInCents === 'object'){
      for (const [key2, value2] of Object.entries(value.priceInCents)) {
        entrantTypes.push(key2)
      }
    }
    if(typeof ticketData.extras === 'object'){
      for (const [key3, value3] of Object.entries(ticketData.extras)) {
        extraTypes.push(key3)
      }
    }
    
  }  

  //console.log(ticketInfo.entrantType)
  //console.log(extraTypes)
  //////////////////////////////////////////////////////////////////////////////////////
    // Validating T I C K E T - T Y P E S
    if(ticketTypes.includes(ticketInfo.ticketType)) {

      if(entrantTypes.includes(ticketInfo.entrantType)) {
        
        //if(ticketInfo.entrantType === 'child' || ticketInfo.entrantType === 'adult' || ticketInfo.entrantType === 'senior') {
          
          ticketPrice = ticketData[ticketInfo.ticketType]['priceInCents'][ticketInfo.entrantType];
            
        }else{
          ticketPrice = `Entrant type 'incorrect-entrant' cannot be found.`;  
        }

        if(ticketInfo.extras.length !== 0){
          if(extraTypes.some(value => ticketInfo.extras.includes(value))) {
            // >> Calculate EXTRAS
            for(let extra of ticketInfo.extras){
              ticketPrice += ticketData.extras[extra]['priceInCents'][ticketInfo.entrantType];
            }
          }else{
            ticketPrice = `Extra type 'incorrect-extra' cannot be found.`;  
          }
        }
    }else{
      ticketPrice = `Ticket type 'incorrect-type' cannot be found.`;  
    }
    return ticketPrice;
  }








    //////////////////////////////////////////////////////////////////////////////////////

//     // Validating T I C K E T - T Y P E S
//     if(ticketTypes.includes(ticketInfo.ticketType)) {
//       // >> Validations: G E N E R A L - A D M I S S I O N S
//       // console.log(ticketInfo.ticketType)
//       // console.log(ticketInfo.entrantType)
//       // console.log(ticketInfo.extras)

//       if(ticketInfo.ticketType === 'general') { 
//         prefixTicketType = 'gen';  
//       }
//       if(ticketInfo.ticketType === 'membership') { 
//         prefixTicketType = 'mem';  
//       }
//       if(ticketInfo.extras === 'movie') { 
//         prefixEstrasType = 'mov';  
//       }

//       ////////////
//       let getTicketType  = ticketInfo.ticketType
//           getEntrantType = ticketInfo.entrantType
//           getExtras      = ticketInfo.extras;
//       function validateTicket(getTicketType, getEntrantType, getExtras){
//         return getTicketType;
//       }
//       //console.log(validateTicket(getTicketType, getEntrantType, getExtras))

//       /////////
//       if(ticketInfo.ticketType === 'general') { 
//         // >> Calculations: C H I L D
//         if(ticketInfo.entrantType === 'child') {
//           if(noAddons){
//             ticketPrice = genPriceInCents.child;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = genPriceInCents.child + movPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.child + movPriceInCents.child + eduPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.child + terPriceInCents.child + eduPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = genPriceInCents.child + terPriceInCents.child + movPriceInCents.child + eduPriceInCents.child;  
//           }
//         }
//         // >> Calculations: A D U L T
//         if(ticketInfo.entrantType === 'adult') {
//           if(noAddons){
//             ticketPrice = genPriceInCents.adult;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = genPriceInCents.adult + movPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'terrace'){
//             ticketPrice = genPriceInCents.adult + movPriceInCents.adult + terPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.adult + movPriceInCents.adult + eduPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.adult + terPriceInCents.adult + eduPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = genPriceInCents.adult + terPriceInCents.adult + movPriceInCents.adult + eduPriceInCents.adult;  
//           } 
//         }
//         // >> Calculations: S E N I O R
//         if(ticketInfo.entrantType === 'senior'){
//           if(noAddons){
//             ticketPrice = genPriceInCents.senior;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = genPriceInCents.senior + movPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.senior + movPriceInCents.senior + eduPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = genPriceInCents.senior + terPriceInCents.senior + eduPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = genPriceInCents.senior + terPriceInCents.senior + movPriceInCents.senior + eduPriceInCents.senior;  
//           }
//         } 
//       }
//       // >> Validations: M E M B E R S H I P
//       if(ticketInfo.ticketType === 'membership'){
//         // >> Calculations: C H I L D
//         if(ticketInfo.entrantType === 'child') {
//           if(noAddons){
//             ticketPrice = memPriceInCents.child;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = memPriceInCents.child + movPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.child + movPriceInCents.child + eduPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.child + terPriceInCents.child + eduPriceInCents.child;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = memPriceInCents.child + terPriceInCents.child + movPriceInCents.child + eduPriceInCents.child;  
//           }
//         }
//         // >> Calculations: A D U L T
//         if(ticketInfo.entrantType === 'adult'){
//           if(noAddons){
//             ticketPrice = memPriceInCents.adult;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = memPriceInCents.adult + movPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.adult + movPriceInCents.adult + eduPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.adult + terPriceInCents.adult + eduPriceInCents.adult;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = memPriceInCents.adult + terPriceInCents.adult + movPriceInCents.adult + eduPriceInCents.adult;  
//           }
//         }
//         // >> Calculations: S E N I O R
//         if(ticketInfo.entrantType === 'senior'){
//           if(noAddons){
//             ticketPrice = memPriceInCents.senior;
//           }
//           if(ticketInfo.extras[0] === 'movie'){
//             ticketPrice = memPriceInCents.senior + movPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'movie' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.senior + movPriceInCents.senior + eduPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'education'){
//             ticketPrice = memPriceInCents.senior + terPriceInCents.senior + eduPriceInCents.senior;  
//           }
//           if(ticketInfo.extras[0] === 'terrace' && ticketInfo.extras[1] === 'movie' && ticketInfo.extras[2] === 'education'){
//             ticketPrice = memPriceInCents.senior + terPriceInCents.senior + movPriceInCents.senior + eduPriceInCents.senior;  
//           } 
//         }
//       }
//       // >> Error V A L I D A T I O N S
//       if(ticketInfo.entrantType === 'incorrect-entrant'){
//         ticketPrice = `Entrant type 'incorrect-entrant' cannot be found.`; 
//       }
//       if(ticketInfo.extras[0] === 'incorrect-extra'){
//         ticketPrice = `Extra type 'incorrect-extra' cannot be found.`; 
//       }
//     }else{
//       ticketPrice = `Ticket type 'incorrect-type' cannot be found.`;  
//     }
//   return ticketPrice;
// }

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
      getTicketData = calculateTicketPrice(ticketData, purchase)
      
      if(typeof getTicketData === 'number'){
        total += getTicketData;
        ticketReceipt += `${purchase.entrantType.charAt(0).toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(getTicketData/100).toFixed(2)}`
        if(purchase.extras.length){
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
    ticketReceipt = ticketReceipt.slice(0, -1) + `${receiptFooter}${(total/100).toFixed(2)}`;

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
