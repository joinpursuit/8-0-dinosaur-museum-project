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
let result = 0;
//let personType = ticketInfo.entrantType;// should be "kid"
//console.log(personType);
//let personEntrantType = 
//console.log(ticketData.extras);
// result += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  
if (ticketData[ticketInfo.ticketType]){
  //console.log(ticketData[ticket].priceInCents = );
  if (ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){//figure out how to do it with out hasOwnProperty or using in. 
    //console.log("ahdahsida");
        result += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  } else {
    result = `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    return result;
  }
} else {
  result = `Ticket type '${ticketInfo.ticketType}' cannot be found.`; 
  return result;
}

//console.log(ticketInfo.extras); 
if (ticketInfo.extras){
 // console.log("asdasdasdkojwodo")
  for (let extra of ticketInfo.extras){
    //console.log(ticketData.extras[extra]);
     if (ticketData.extras[extra]){//problem here, comparing string to object.
       //console.log('sdasd')
       result += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
      } else {
        result = `Extra type '${extra}' cannot be found.`;
        return result;
      }
  } 
} 
 
return result;
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
let result = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;
let total = 0;
//console.log(purchases[0]);
for (ticketInfo of purchases) {
  tempPrice = 0;

  if (ticketData[ticketInfo.ticketType]){//check if tickettype is there

    if (ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){//check if ficket entrant type is there
      tempPrice += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
      total += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
      
   
    } else {
      result = `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      return result;
    }


  } else {
    result = `Ticket type '${ticketInfo.ticketType}' cannot be found.`
    return result;
  }




//checking for extras
if (ticketInfo.extras.length > 0){
  for (let extra of ticketInfo.extras){
     //let asdasd = `${ticketData.extras[extra].description},,,,`;
    //console.log(extra[1]);
      if (ticketData.extras[extra]){
        tempPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
        total += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
        //console.log(ticketData.extras[extra].description);
        // result += `$${(tempPrice/100).toFixed(2)}`;
        // result += ` (${ticketData.extras[extra].description})`

       // console.log(asdasd);

        //reset cuz it would have keept the change from before
          // result = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${ticketInfo.entrantType.charAt(0).toUpperCase()}${ticketInfo.entrantType.substring(1,ticketInfo.entrantType.length)} ${ticketData[ticketInfo.ticketType].description}: $${(tempPrice/100).toFixed(2)} (`; 
          
          
          // result += ' ' + ticketData.extras([ticketInfo.extras][i]).description + ',';
          //console.log(ticketData.extras);
          //console.log(ticketInfo.extras)

          // for (let i = 0; i < ticketInfo.extras.length; i++){
          //     if (ticketData.extras[ticketInfo.extras[i]]){
          //       result += ' ' + ticketData.extras([ticketInfo.extras][i]).description + ',';
          //     } else {
          //       result += ticketData.extras([ticketInfo.extras][i]).description + ')';
          //     }
          // }
          


      } else {
        result = `Extra type '${extra}' cannot be found.`
        return result;
      }


      

  }
}
//console.log(ticketInfo.extras.length); 

 
result += `\n${ticketInfo.entrantType.charAt(0).toUpperCase()}${ticketInfo.entrantType.substring(1,ticketInfo.entrantType.length)} ${ticketData[ticketInfo.ticketType].description}: $${(tempPrice/100).toFixed(2)}`

if (ticketInfo.extras.length > 0){
  result += " ("
  for (let i = 0; i < ticketInfo.extras.length; i++){
    //result += ticketData.extras[ticketInfo.extras[i]].description + ',';
      if (i === ticketInfo.extras.length-1) {  
    //if (ticketData.extras[ticketInfo.extras[i]]){///something with length? - 
         //result += ticketData.extras[ticketInfo.extras[i]].description + ',';
         result += ticketData.extras[ticketInfo.extras[i]].description + ')';

       } else {
         //result += ticketData.extras[extra].description + ')';
          result += ticketData.extras[ticketInfo.extras[i]].description + ', ';
       }
    }
   // result += ticketData.extras[extra].description + ')';
  }

}


//console.log(result);


//.charAt(0).toUpperCase()
//.substring(1,ticketInfo.entrantType.length)

//console.log(result);


result += `\n-------------------------------------------\nTOTAL: $${(total/100).toFixed(2)}`;

return result;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
