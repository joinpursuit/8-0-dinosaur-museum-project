/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
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
/*
function calculateTicketPrice(ticketData, ticketInfo) {
  let validEntrants = ['adult', 'child', 'senior'];
  let validTicketType = ['general', 'membership'];
  let validExtras = ['movie', 'education', 'terrace'];
  let totalCost = 0;
  let costWithExtras = 0;

  if (validTicketType.includes(ticketInfo.ticketType)){ //object 'ticketInfo' at key 'ticketType'
    if (validEntrants.includes(ticketInfo.entrantType)){//object 'ticketInfo' at key 'entrantType'
      totalCost += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
    } else {
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
    }
  } else {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }


  for (let i = 0; i < ticketInfo.extras.length; i++){ 
    if (validExtras.includes(ticketInfo.extras[i])){
      if (validEntrants.includes(ticketInfo.entrantType)){
        costWithExtras += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType];
      }
    } 
    else if (!validExtras.includes(ticketInfo.extras[i])){
      return `Extra type '${ticketInfo.extras}' cannot be found.`
    }
  }
  return totalCost + costWithExtras;
}
*/

/**
 * GIGI'S CODE / CLASS NOTES
 * 
 * Pseudo Code:
 * 1. Return errors if ticket types, entrants or extras not included
 * 2. Start with a base price - 0
 * 3. Accumulate each portion of the tickets fees
 * 
*/

function calculateTicketPrice(ticketData, ticketInfo) {
  if (!ticketData[ticketInfo.ticketType] || ticketInfo.ticketType === 'extras'){ //'extras' is included because it's a valid key in the object 'ticketData', but would not give us valid ticket type info we need
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  } else {
    for (let extra of ticketInfo.extras){
      if(!ticketData.extras[extra]){
        return `Extra type '${ticketInfo.extras}' cannot be found.`;
      }
    }
  }

  // const ticketInfo = {
  //   ticketType: "membership",
  //   entrantType: "child",
  //   extras: ["movie", "terrace"],
  // };

  let baseTicket = 0; // starting off price
  // ticketInfo.ticketType - (in the ex.) would be -> "membership"
  // next, we narrowed down to the 'membership object' -> now we look at the objects 'priceInCents'
  // now we need the 'ticketInfo.entrant' type (aka: 'child'/ 'adult' / 'senior') -> "child"
  baseTicket += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  // Here we loop through the 'ticketInfo.extras' -> ["movie", "terrace"]
  for(let addOn of ticketInfo.extras){ // first loops through the 'addOn' -> "movie"
    baseTicket += ticketData.extras[addOn].priceInCents[ticketInfo.entrantType]; 
    // Here we add the cost of the extra, using the 'entrantType'  (aka: 'child'/ 'adult' / 'senior')
    // After adding the cost, it loops again to add the cost to include the 2nd 'addOn' -> "terrace"
  }
  return baseTicket;
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


// ----------- MY RIDICULOUS CODE ----------------
function purchaseTickets(ticketData, purchases) {
  //console.log(ticketData);
  //console.log(purchases);

  let validEntrants = ['adult', 'child', 'senior'];
  let validTicketType = ['general', 'membership'];
  let validExtras = ['movie', 'education', 'terrace'];
  let totalCost = [];
  let extraCost = [];
  let finalCost = [];
  let admissionType = [];
  let entrantType = [];
  let extrasType = [];
  let topOfReceipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
  let bottomOfReceipt = '\n-------------------------------------------\nTOTAL:';
  let receiptTotal = 0;


  for (i = 0; i < purchases.length; i++){ //loops through purchase array
    if (validTicketType.includes(purchases[i].ticketType)){ //checks to see 'ticketType' is valid
      admissionType.push(purchases[i].ticketType.charAt(0).toUpperCase() + purchases[i].ticketType.slice(1));

      if (validEntrants.includes(purchases[i].entrantType)){ //checks to see 'entrantType' is valid
        entrantType.push(purchases[i].entrantType.charAt(0).toUpperCase() + purchases[i].entrantType.slice(1));
        totalCost.push(ticketData[purchases[i].ticketType].priceInCents[purchases[i].entrantType])

      
      } else {
        return `Entrant type '${purchases[i].entrantType}' cannot be found.`
      } 
    } else {
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`
    }
  }

  for (i = 0; i < purchases.length; i++){
    if (purchases[i].extras.length){
      for (j = 0; j < purchases[i].extras.length; j++){
        if (validExtras.includes(purchases[i].extras[j])){ //checks to see 'extras' is valid
          if (purchases[i].extras[j] === 'movie'){
           extrasType.push('Movie Access');
            extraCost.push(ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]);
          } else if (purchases[i].extras[j] === 'terrace'){
           extrasType.push('Terrace Acess');
           extraCost.push(ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]);
         } else if (purchases[i].extras[j] === 'education'){
           extrasType.push('Education Acess');
           extraCost.push(ticketData.extras[purchases[i].extras[j]].priceInCents[purchases[i].entrantType]);
         }
        //} else {

        }

      }
    }
  }

  for(let k = 0; k < totalCost.length; k++){
    finalCost.push(((totalCost[k] += extraCost[k]) / 100).toFixed(2));
  }

  for (l = 0; l < purchases.length; l++){
    if (purchases[l].extras.length){
      topOfReceipt += `${entrantType[l]} ${admissionType[l]} Admission: $${finalCost[l]} (${extrasType[l]})\n`;
    } 
    else{
      topOfReceipt += `${entrantType[l]} ${admissionType[l]} Admission: $${finalCost[l]}\n`;
    }
    receiptTotal += Number(finalCost[l])
  }

  return topOfReceipt + bottomOfReceipt + ' $' + receiptTotal.toFixed(2)
}
 */

/**
 * GIGI'S CODE / CLASS NOTES !!!!!!!
 * 
 * Pseudo Code:
 * 1. Start our receipt template;
 * 2. Create a total variable
 * 3. We are going to iterate through our purchases;
 * 4. We are going to call our previous fuction and decide what we want to do with the data/how we want to manipulate it.
 *  - if error returned, we want to return that error;
 *  - price - put in our string and add to our total;
*/

function purchaseTickets(ticketData, purchases) {
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`
  let totalReceiptPrice = 0;

  for (let purchase of purchases){
    let purchasePrice = calculateTicketPrice(ticketData, purchase)
    if(typeof purchasePrice === 'string'){ // Reference to getting an error message back
      return purchasePrice; // we are allowing the error to be returned
    } else {
      totalReceiptPrice +=  purchasePrice // If its a number, we are adding that value to our "totalReceiptPrice" variable
      let entrant = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1).toLowerCase();
      let ticketType = ticketData[purchase.ticketType].description;
      let priceInDollars = (purchasePrice/100).toFixed(2);
      let ticketExtras = '';

      for(let i = 0; i < purchase.extras.length; i++){
        if (i === 0){ //If we are at the first ticket 'extra' value
          ticketExtras += " (" ; // Enter the opening parentheses
        } 

        if (i === purchase.extras.length - 1) {// if we are at the last ticket 'extra' value in the array, and it's also the same value as above (i===0)
          ticketExtras += ticketData.extras[purchase.extras[i]].description + ")"; //We add the 'extra' value AND add closing parentheses to the one 'extra' item 
        } else { //If i === 0 is not the only extra value...
          ticketExtras += ticketData.extras[purchase.extras[i]].description + ", "; //We add the 'extra' value AND add a comma.
        }
      }
      receipt += `\n${entrant} ${ticketType}: $${priceInDollars}${ticketExtras}`;
    }
  }
  receipt += `\n-------------------------------------------\nTOTAL: $${(totalReceiptPrice / 100).toFixed(2)}`
  return receipt
}


/* 
// CORRECT CODE OBTAINED FROM CLASSMATE JOHN : 
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
*/

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
