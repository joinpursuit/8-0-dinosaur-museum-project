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
  //console.log(ticketData)
  let ticket = 0;
//LOGIC HERE PLZ EDGY
//find base prices.. if ticket type is in data
if(ticketInfo.ticketType in ticketData){
  // now find the data of ticket type and its price in cents 
    if(ticketInfo.entrantType in ticketData[ticketInfo.ticketType].priceInCents){
      //update price value for each ticket
      ticket += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
      //console.log(ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType])
    }
     else {
      return `Entrant type 'incorrect-entrant' cannot be found.`
    }
  } 
  else {
    return `Ticket type 'incorrect-type' cannot be found.`
  }
  for (let x of ticketInfo.extras){
    if(x in ticketData.extras){
      ticket += ticketData.extras[x].priceInCents[ticketInfo.entrantType]
    }else { 
      return `Extra type 'incorrect-extra' cannot be found.`
    }
  }
  return ticket;
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
  //Prints a receipt for a (person) General Admission ticket.
  //error mesage 
  for (let i=0; i <purchases.length;i++){
    //setting ur error message
    let thePrice = calculateTicketPrice(ticketData, purchases[i])
    if (typeof thePrice === 'string'){
      return thePrice;
    }else if (typeof thePrice === 'number'){
      return thePrice;
    }
    }
  
  let totalPrice = 0;
  let receipt =''; 
  for (let i=0; i < purchases.length; i++){
    //Find prices
    // call the function above within the function for ticket price --> 
    //console.log(price);
    let person = purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)
    
    let ticketType = purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1) + " " + ticketData[purchases[i].ticketType][`description`];
    console.log(ticketType)
    let entryPass = `${person} ${ticketType} Admission: $${(price/100).toFixed(2)}`; 
    //console.log(`${person} ${ticketType}`)
    
  
    let receipt2 =[];
    for (let e = 0; e < purchases[i].extras.length; e++){

        //creating final receipt with extras and admisson prices
        let xTra = ticketData.extras[e].description;// create a loop purchases[i].extras to match at data and extras.. match and get description with keys
        receipt2.push(xTra);
        //let xTra2= xTra.join(", ")// use join to add a space.. use with array && add ACCESS using a method, like concat
        //upperCase
        //calaculates final price
        //
        // if(purchases[i].entrantType){
          
          // }
        }
        if(xTra2){

        };
        let xTra2 =receipt2.join(", ") // must add spaces later && uppercase
        
        let str1= `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`

        let strLast = `\n-------------------------------------------\nTOTAL: ${totalPrice} `
        //console.log(str1)
        receipt = `${str1}${entryPass} (${xTra2}) ${strLast} `
        totalPrice += (price); //move to end of loop, to reset at every loop
      }
///add to the final to uopdate price100).toFixed(2)
return receipt;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
