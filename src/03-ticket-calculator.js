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
let typeTicketStatus = false;
let typeEntrantStatus = false;
let typeExtraStatus = false;
let typeTicket = ticketInfo["ticketType"];
let typeEntrant = ticketInfo["entrantType"];
let typeExtra = ticketInfo["extras"];
let total = 0;

if(typeTicket === 'general' || typeTicket === "membership") {

  typeTicketStatus = true;
}
else {
  return `Ticket type 'incorrect-type' cannot be found.`;
}
if (typeEntrant === "child" || typeEntrant === "adult" 

|| typeEntrant === "senior") {
 
  typeEntrantStatus = true;

}
else {

  return `Entrant type 'incorrect-entrant' cannot be found.`
}
if (typeExtra.length >= 1 ) {

  for( i = 0; i < typeExtra.length; i++) {

  if(typeExtra.includes("movie")) {

    typeExtraStatus = true;
}
  else if(typeExtra.includes("education")) {

    typeExtraStatus = true;
}
  else if(typeExtra.includes("terrace")) {

    typeExtraStatus = true;
}
  else if (!typeExtra.includes("movie")) {

    return "Extra type " + `'${typeExtra[i]}'` + " cannot be found." 
}
  else if (!typeExtra.includes("education")) {

    return "Extra type " + `'${typeExtra[i]}'` + " cannot be found." 
}
  else if (!typeExtra.includes("terrace")) {

    return "Extra type " + `'${typeExtra[i]}'` + " cannot be found." 
}
}
}
  if (typeTicketStatus === true && typeEntrantStatus === true) {

    total += ticketData[typeTicket].priceInCents[typeEntrant];
  
    if(total != 0 && typeExtraStatus === true) {

      for(let i = 0; i < typeExtra.length; i++) {

        total += ticketData.extras[typeExtra[i]].priceInCents[typeEntrant]
}
    
}
}
  return total;
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
  /*Full disclaimer, beyond this point I had help with how to approach this from my younger brother's
  girlfriend who does mostly SQL and Javascript at FDM Group. without her this problem would have 
  taken significantly longer to solve.*/
total = 0;
let bigBIIIGString = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;

  for (let purchase of purchases) {
    let storedTicketPrice = calculateTicketPrice(ticketData, purchase);
    
    if(typeof storedTicketPrice === "string") {
      return storedTicketPrice;
}
  
    let descriptors = [];   
    for (let extra of purchase.extras) {
      descriptors.push(ticketData.extras[extra].description)
     
      /*particularly with making a descriptors array which could be used to hold the descriptions for ease of calling later 
      when logging the receipt.*/
}
    if(purchase.extras.length >= 1) {
    descriptors = `(${descriptors.join(", ")})`
    /*As well as recommending I use the join() method,to insert commas between multiple extras in the receipt
    if there are multiple extras in a given ticket.
     I never thought of using this method when I first implemented the code.
    */
}
     
    
    if(purchase.extras.length >= 1) {
      bigBIIIGString += `${purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(storedTicketPrice/100).toFixed(2)} ${descriptors}\n`
}
    else {
      bigBIIIGString += `${purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1)} ${ticketData[purchase.ticketType].description}: $${(storedTicketPrice/100).toFixed(2)}\n`
}
 
    total += storedTicketPrice/100;
}
bigBIIIGString +=`-------------------------------------------\nTOTAL: $${total.toFixed(2)}`;
console.log(bigBIIIGString);
  return bigBIIIGString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
