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
 * Returns the ticket singleTicketPrice based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
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
// Method 1 - using if...in 

// Declaration 

  let ticketType = ticketInfo.ticketType; 
  let entrantType = ticketInfo.entrantType;

// Main code
  if(ticketType in ticketData && entrantType in ticketData[ticketType].priceInCents){ // checking if ticket type and entrant type in ticketdata
    let ticketPrice = ticketData[ticketType].priceInCents[entrantType];               // assigning value of entrant type
    let extrasPrice = 0;                                                              // block variable
    for( let i = 0; i < ticketInfo.extras.length; i++ ){
      if( ticketInfo.extras[i] in ticketData.extras){                                     // checking for extras
        extrasPrice += ticketData.extras[ticketInfo.extras[i]].priceInCents[entrantType]  // calculating extras
      }else{
        return `Extra type '${ticketInfo.extras}' cannot be found.`       // if invalid extra type
      }
    }
    return ticketPrice + extrasPrice                                            // add the total values of admission and extras
  
  // Error Messages
  }else if(!(ticketType in ticketData)){ // if invalid ticket type
    return `Ticket type '${ticketType}' cannot be found.`

  }else if(!(entrantType in ticketData[ticketType].priceInCents)){ // if invalid entrant type
    return `Entrant type '${entrantType}' cannot be found.`
  }
}

/* ********************* Method 2 using hasOwnProperty()

function calculateTicketPrice(ticketData, ticketInfo) {
  if(ticketData.hasOwnProperty(ticketInfo.ticketType) && ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(ticketInfo.entrantType)){
    /* 
    ticketInfo.ticketType = "general" or "membership"
    ticketData.hasOwnProperty(ticketInfo.ticketType) - checks if ticket object also has the same property as ticketInfo.ticketType

    ticketInfo.entrantType = "senior" or "child" or "adult"
    ticketData[ticketInfo.ticketType].priceInCents - access the priceInCents property of ticketInfo.ticketType ("general" or "membership") of ticketdata object
    ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(ticketInfo.entrantType) - check if under priceInCents there is a property for entrant type(senior/child/adult)    
    */
    /*let extraTicket = 0
    // set local variable for if block.. 
    // reason 1 - we need it only for if block, its not used anywhere, (although still can be declared within function)
    
    for(let i = 0; i < ticketInfo.extras.length; i++){
      if(ticketData.extras.hasOwnProperty(ticketInfo.extras[i])){
      // ticketInfo.extras[i] - extras is an array inside ticket info object
      // ticketData.extras.hasOwnProperty(ticketInfo.extras[i]) - check if ticketinfo extras property is same as ticketdata extras property

          extraTicket += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType] 
  
          /*
            ticketInfo.entrantType - "senior" or "child" or "adult"
            priceInCents[ticketInfo.entrantType] - access the price in cents of each entrant type
            ticketData.extras[ticketInfo.extras[i]] - access the extra array inside ticket data object 
            ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType] - take the price of given entrant from ticket data extras array
          */
     /* } 
      else{     // handle the error if given extras is not same as the ticketdata extras
        return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      }
    }
    return ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] + extraTicket
    // calculate the price based on ticket type, entrant type and extras (if not extras, it will be 0 based on initialisation)
  } else if (!ticketData.hasOwnProperty(ticketInfo.ticketType)){ 
     // handle the error if ticket type is not same as the ticketdata ticket type
       return `Ticket type '${ticketInfo.ticketType}' cannot be found.`

  } else if (!ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(ticketInfo.entrantType)){ 
    // handle the error if entrant type is not same as the ticketdata entrant type
        return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
} */



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
// Declaration

let totalBillPrice = 0

// Receipt format
let finalReceipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n"

for (let singlePurchase of purchases) {
  let singleTicketPrice = calculateTicketPrice(ticketData, singlePurchase) // REUSABILITY - using the previous function calculate Price
  // if priceOfTicket is not a number - then it is an error message, return error message
  if (typeof singleTicketPrice === "string"){                       
      return singleTicketPrice
  }
  let extraArr = []                                 // local scope variable declaration
  let extras = ""
    
  for (let extra of singlePurchase.extras) {
    extraArr.push(ticketData.extras[extra].description)   // push the extra description such as movie,terrace, education
  }
  if (singlePurchase.extras.length){                      // add the extras
    extras = ` (${extraArr.join(", ")})`                  // using join to convert array to string
  }// end of for loop
  totalBillPrice += singleTicketPrice                     // final bill price
  
  finalReceipt += `${singlePurchase.entrantType[0].toUpperCase()+(singlePurchase.entrantType.slice(1))} ${ticketData[singlePurchase.ticketType].description}: $${(singleTicketPrice/100).toFixed(2)}${extras}\n`
    //accumulate the full singleTicketPrice
    
}// end of for loop
// print the total bill
finalReceipt += `-------------------------------------------\nTOTAL: $${(totalBillPrice/100).toFixed(2)}`
return finalReceipt  
}// end of function


// Method 2

// function purchaseTickets(ticketData, purchases) {
//   let finalPrice = 0
//   let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------' //start of receipt
//   for(let i = 0; i< purchases.length; i++){
//     let extra1 = []
//     if(!(ticketData.hasOwnProperty(purchases[i].ticketType))){//error handling. Checking if ticket data does not have the correct purchase type.
//       return `Ticket type '${purchases[i].ticketType}' cannot be found.`
//   } 
//       if(!(ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType))){// error handling. Checking if the entrant type is incorrect
//         return `Entrant type '${purchases[i].entrantType}' cannot be found.`
//       }
//       let price = calculateTicketPrice(ticketData, purchases[i])/100 //calculate price of ticket
//       if(typeof price === 'string'){
//         return price
//       }
//       let ticketType = purchases[i].ticketType; //type of ticket
//       let entrantType = purchases[i].entrantType; // entrant type
//       receipt += `\n${entrantType[0].toUpperCase()}${entrantType.slice(1)} ${ticketType[0].toUpperCase()}${ticketType.slice(1)} Admission: $${price.toFixed(2)}`// formatting receipt
//       for (let j = 0; j < purchases[i].extras.length; j++){//loop for extras
//           if(ticketData.extras.hasOwnProperty(purchases[i].extras[j])){ //Checking for purchase extras
//               extra1.push(ticketData.extras[purchases[i].extras[j]].description)//pushing the description in array if extra exists
//           } else {
//             return `Extra type '${purchases[i].extras[j]}' cannot be found.` //if incorrect extras
//           }
//       }// ending [j] for loop
//       if(extra1.length !== 0){
//         receipt += ` (${extra1.join(', ')})`//if no extras
//       }
//       finalPrice += price
//   }//ending [i] for loop
//   receipt += `\n-------------------------------------------\nTOTAL: $${finalPrice.toFixed(2)}`//Adding final costs to receipt
//   return receipt
//   }// end of function


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};