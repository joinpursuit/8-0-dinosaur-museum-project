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
 * EXAMPLE 1:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [], >>>>is an object of object
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000 >>>>priceInCents object is an object inside another object and is present
     under the same configuration in all the objects of the supreme object.  
                         priceInCents:{
                                        child: 1500,
                                        adult: 2800,
                                        senior: 2300,
                                      },
 *  
 * EXAMPLE 2:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",               //// 1500
      extras: ["movie"],                 ////  1000
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE 3:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."

    lets do 3 blocks the follow:
   
    1. take ticketType in ticketInfo >>>> if 

 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let baseTotal = 0
  let extraTotal = 0
  let ticketType = ticketInfo.ticketType
  let entrantType = ticketInfo.entrantType

  /*
    [] ==> estructura de datos LINEAL donde la informacion se almacena EN BASE A SU POSICION (iterable)
    {} ==> estructura de datos NO LINEAL donde la informacion se almacena en forma LLAVE: VALOR
  */
  
  let targetTicketInfo = ticketData[ticketType] // ==> undefined
  
  if (!targetTicketInfo) {
    return `Ticket type '${ticketType}' cannot be found.`
  }

  baseTotal = targetTicketInfo.priceInCents[entrantType]

  if (!baseTotal) {
    return `Entrant type '${entrantType}' cannot be found.`
  }

  let arrayOfExtras = ticketInfo.extras

  for (let i=0; i < arrayOfExtras.length; i++) {
    let eachExtra = arrayOfExtras[i] ///vamos a usar esto en mi busqueda de propiedad en mi array
    let eachExtraTotal = ticketData.extras[eachExtra]?.priceInCents[entrantType] //signo de interrogacion sirve para parar la busqueda de la porpiedad cuando se vuelva indefinido, nota corchetes es dinamico mientras que notacionm dot es directo cuando conocemos la propiedad
    
    if (!eachExtraTotal) {
      return `Extra type '${eachExtra}' cannot be found.`
    }

    extraTotal += eachExtraTotal
  }
   
  return baseTotal + extraTotal
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
 * 
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
      let purchasesTotal = 0
      let finalMessage = undefined
      let eachPurchaseMessageTotal = undefined
      let newArrayOfExtrasCapLetter = []
      // falta formatear el mensaje para mostrarlo correctamente
      // Expected: "Thank you for visiting the Dinosaur Museum!
      // -------------------------------------------
      // Adult General Admission: $30.00
      // Senior General Admission: $25.00
      // Adult General Admission: $30.00
      // Child General Admission: $20.00
      // Child General Admission: $20.00
      // -------------------------------------------
      // TOTAL: $125.00"
      
      for (let i = 0; i < purchases.length; i++ ) {
        let eachPurchaseTicketInfo = purchases[i]
        let purchaseTicketPrice = calculateTicketPrice(ticketData, eachPurchaseTicketInfo) / 100
        purchasesTotal += purchaseTicketPrice
        let toUpperCase1= eachPurchaseTicketInfo.entrantType.charAt(0).toUpperCase() + eachPurchaseTicketInfo.entrantType.slice(1)
        let toUpperCase2= eachPurchaseTicketInfo.ticketType.charAt(0).toUpperCase() + eachPurchaseTicketInfo.ticketType.slice(1)
        
    
        for (let k = 0; k < eachPurchaseTicketInfo.extras.length; k++) {
          let eachExtra = eachPurchaseTicketInfo.extras[k].charAt(0).toUpperCase() + eachPurchaseTicketInfo.extras[k].slice(1)
          newArrayOfExtrasCapLetter.push(eachExtra + " Access")
        }
         
    
        let toUpperCase3 = newArrayOfExtrasCapLetter.join(', ')
        let initialMessage = `Thank you for visiting the Dinosaur Museum!`
        let initialRaya = `\n-------------------------------------------`
    
        let eachPurchaseMessage = `\n${toUpperCase1} ${toUpperCase2} Admission: $${purchaseTicketPrice}.00 (${toUpperCase3})`
        eachPurchaseMessageTotal += eachPurchaseMessage 
        let finalRaya = `\n-------------------------------------------`
    
        let finalTotal = `\nTOTAL: $${purchasesTotal}.00`
     
         finalMessage =  initialMessage + initialRaya + eachPurchaseMessageTotal + finalRaya + finalTotal
    
      }
     return finalMessage 
    }


// const purchases = [
//   {
//     ticketType: "general",
//     entrantType: "adult",
//     extras: ["movie", "terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "senior",
//     extras: ["terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "child",
//     extras: ["education", "movie", "terrace"],
//   },
//   {
//     ticketType: "general",
//     entrantType: "child",
//     extras: ["education", "movie", "terrace"],
//   },
// ];

// purchaseTickets(exampleTicketData, purchases)

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
