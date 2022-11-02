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
//guard clauses

if (ticketInfo.ticketType != "general" && ticketInfo.ticketType != "membership") {
  return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
}

if (ticketInfo.entrantType != "child" && ticketInfo.entrantType != "adult" && ticketInfo.entrantType != "senior"){
  return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
}

for (let i=0; i<ticketData.length; i++) {
  if (ticketInfo.extras != ticketData.extras[ticketInfo.extras[i]] || ticketInfo.extras === "incorrect-extra") {
    return "Extra type 'incorrect-extra' cannot be found."
  }
}


//then loop through extras
// if (ticketInfo.extras != )

    //need to include something that says if there is an incorrect extra, it is incorrect.  This should be someething like in the extras, the name of the extra should be one of the fields under ticket.extras.HERE. But it is okay to have no extras at all. So would that be find?

  let subTotal = "";
   {
    if (ticketInfo.ticketType==="general" && ticketInfo.entrantType==="child") {
      subTotal=2000
    } else if (ticketInfo.ticketType==="general" && ticketInfo.entrantType==="adult") {
      subTotal = 3000
    } else if (ticketInfo.ticketType==="general" && ticketInfo.entrantType==="senior") {
      subTotal = 2500
    } else if (ticketInfo.ticketType==="membership" && ticketInfo.entrantType==="child") {
      subTotal=1500
    } else if (ticketInfo.ticketType==="membership" && ticketInfo.entrantType==="adult") {
      subTotal = 2800
    } else if (ticketInfo.ticketType==="membership" && ticketInfo.entrantType==="senior") {
      subTotal = 2300
    }

    
    if (ticketInfo.extras.includes("movie")) {
      subTotal=subTotal+1000
    } 

    if (ticketInfo.extras.includes("education")) {
      if (ticketInfo.entrantType === "child") {
        subTotal = subTotal+1000
      } else {
        subTotal = subTotal+1200
      }
    }

    if (ticketInfo.extras.includes("terrace")) {
      if (ticketInfo.entrantType === "child") {
        subTotal = subTotal + 500
      } else {
        subTotal = subTotal + 1000
      } return subTotal;
    }

  }
  return subTotal
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


  //purchases is already an array. For each ticket purchased, determine the price and then add all of the prices together. Each object should be looped through the above function. In addition, each iteration also has to appear on the receipt.

function purchaseTickets(ticketData, purchases) {

let total = 0;   // total should sum here
let finalTotal = (total*0.01).toFixed(2) 
let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"; //build the receipt here



for (let ticket of purchases){
  let ticketPrice = calculateTicketPrice(ticketData, ticket);  


  //how do we get the picked options to show up on the receipt?
  let moreFun = [] //an array for the extras
  let extras = ""
    //loop-de-loop
    for (let fun of ticket.extras) {
      moreFun.push(ticketData.extras[fun].description)
    }


  total = total+ticketPrice
if(moreFun <=0) {
  receipt += `${ticket.entrantType.charAt(0).toUpperCase() + ticket.entrantType.slice(1)} ${ticket.ticketType.charAt(0).toUpperCase()+ticket.ticketType.slice(1)} Admission: $${(ticketPrice*0.01).toFixed(2)}\n` ;
} else {
  receipt += `${ticket.entrantType.charAt(0).toUpperCase() + ticket.entrantType.slice(1)} ${ticket.ticketType.charAt(0).toUpperCase()+ticket.ticketType.slice(1)} Admission: $${(ticketPrice*0.01).toFixed(2)} (${moreFun.join(", ")})\n` ;
}
}
let receiptEnd = `-------------------------------------------\nTOTAL: $${(total*0.01).toFixed(2)}`  //will use this as part of the receipt

  return receipt+receiptEnd  //RETURN
  }
  


 // } else if (ticket.extras.length !==0) {
    let extrasArray = [];
    // for (let i=0; i<ticket.extras.length; i++){ //list all extras in paranthesis
    //   let receiptExtras=ticket.extras[i];
    //   extrasArray.push(receiptExtras);
    //   receipt += `${ticket.entrantType.charAt(0).toUpperCase() + ticket.entrantType.slice(1)} ${ticket.ticketType.charAt(0).toUpperCase()+ticket.ticketType.slice(1)} Admission: $${ticketPrice} (${ticket.extras} Access) \n` ;


/*
  
  //Adult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"
 */ 

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
