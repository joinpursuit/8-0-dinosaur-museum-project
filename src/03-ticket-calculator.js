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
  let validEntrance = ['adult','child', 'senior'];
  let validTicketType = ['general', 'membership'];
  let validExtras = ['movie', 'education', 'terrace'];
  let costWithoutExtras = 0;
  let costWithExtras = 0;

  if (validTicketType.includes(ticketInfo.ticketType)){
    if (validEntrance.includes(ticketInfo.entrantType)){
      costWithoutExtras += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
    }
  }
  for (let i = 0; i < ticketInfo.extras.length; i++){
    if (validExtras.includes(ticketInfo.extras[i])){
      if (validEntrance.includes(ticketInfo.entrantType)){
        costWithExtras += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]
      }
    }
    if (!validExtras.includes(ticketInfo.extras[i])){
      return `Extra type '${ticketInfo.extras[i]}' cannot be found.`;
    }

  }
  if (!validTicketType.includes(ticketInfo.ticketType)){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  if (!validEntrance.includes(ticketInfo.entrantType)){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  return costWithoutExtras + costWithExtras;
   
}

  //extracting all possible outcomes of entrancetypes and including them within an array
  //''          '' tickettypes and including them within an array
  //''          '' extras and including them within an array

  // let validEntrance = ['adult','child', 'senior'];
  // let validTicketType = ['general', 'membership'];
  // let validExtras = ['movie', 'education', 'terrace'];

  //create a totalCost variable to get the price extracted from the ticketData given
  //create a second variable to get the extra price extracted from the ticketData given
  // 

  //testing if our array includes the data given, and if our second array includes the data given
  //return the ticketData at the [ticketType given] at the key of priceInCents[of the entrantType]
  //after retrieved add that to the totalCost


  

  //creating a loop to iterate through the key of extras which is an array within ticketInfo
  //if the array we created includes the given element in the extras key at ticketInfo, and if our other array includes the key at ticketInfo(do this below)
  
      // We are going to use the ticketData.extras to to access the Extras values (Movie, education and terrace). if the customer is a (child, adult or senior) it should access and add the priceInCents. else return Extra type (movie, education and terrace) cannot be found.
    // }
    
    // if this line is falsy it should return Extra type : (movie, education and terrace)
    // ticketInfo.extra is like a placeholder 9 if the customer input a value other than the valid Extra it should return (movie , education , terrace) cannot be found.

  // }
  
  // if you input any value aside from ticketInfo.ticketType ( general , membership) cannot be found. 
  
  // I have to add the costWithoutExtras plus extraCost;



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

  let total = 0;
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
 
  for(let i = 0; i < purchases.length; i++){
    let ticketPrice = calculateTicketPrice(ticketData, purchases[i]); 
    if(typeof ticketPrice === "string"){
      return ticketPrice;
    }else{
      total += ticketPrice;
      let ticketExtras = '';
      for(let j = 0; j < purchases[i].extras.length; j++){
        if(j === 0){
          ticketExtras += " (" + ticketData.extras[purchases[i].extras[j]].description;
        }else{
          ticketExtras += ", " + ticketData.extras[purchases[i].extras[j]].description;
        }
        if((j === purchases[i].extras.length-1)){
          ticketExtras += ")"
        }
      }
      receipt += `${purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)} ${ticketData[purchases[i].ticketType].description}: $${(ticketPrice / 100).toFixed(2)}${ticketExtras}\n`
    }
  }
  receipt += `-------------------------------------------\nTOTAL: $${(total / 100).toFixed(2)}`

  return receipt;

}

 //line 156 - going into the ticketData and checking the current purchase[i].ticketType and return in the description within the ticketData Object
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
