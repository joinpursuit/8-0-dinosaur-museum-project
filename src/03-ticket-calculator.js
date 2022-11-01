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
function calculateTicketPrice(ticketData, ticketInfo) {
    let totalPrice = 0  // accumulator

    ticketData[ticketInfo.ticketType] //this is referencing an array first
  
    if (ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership"){ 
      //no valid ticket type is present
      return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
    } else if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" &&  ticketInfo.entrantType !== "senior" ){
      return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
    }  else if (!ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("education") &&!ticketInfo.extras.includes("terrace") && ticketInfo.extras.length > 0){ //check if that array is empty
      return `Extra type '${ticketInfo.extras}' cannot be found.`
    } else
    if (ticketInfo.ticketType === "general" && ticketInfo.extras.length === 0){
      if (ticketInfo.entrantType === "child"){
        totalPrice += ticketData.general.priceInCents.child
      } else if (ticketInfo.entrantType === "adult"){
        totalPrice += ticketData.general.priceInCents.adult
      } else if (ticketInfo.entrantType === "senior"){
        totalPrice += ticketData.general.priceInCents.senior
      }
    }
      else
      if (ticketInfo.ticketType === "membership" && ticketInfo.extras.length === 0){
      if (ticketInfo.entrantType === "child"){
        totalPrice += ticketData.membership.priceInCents.child
      } else if (ticketInfo.entrantType === "adult"){
        totalPrice += ticketData.membership.priceInCents.adult
      } else if (ticketInfo.entrantType === "senior"){
        totalPrice += ticketData.membership.priceInCents.senior
      }
    
// end of the part above

  
    } else 
    if (ticketInfo.ticketType === "general") { // getting total prices based on entrant type and movie and education

     if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")){
    totalPrice = (ticketData.general.priceInCents.child + ticketData.extras.movie.priceInCents.child)
     } else 
     if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")) {
      totalPrice = (ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)
     } else 
     if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")){
      totalPrice = (ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)
     } if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")){
      totalPrice = (ticketData.general.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child)
       } else 
       if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")) {
        totalPrice = (ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult)
       } else 
       if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")){
        totalPrice = (ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior)
       } else
       if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.general.priceInCents.child + ticketData.extras.terrace.priceInCents.child + ticketData.extras.education.priceInCents.child)
      } else 
      if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")) {
     totalPrice = (ticketData.general.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult + ticketData.extras.education.priceInCents.adult)
     } else 
      if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")){
     totalPrice = (ticketData.general.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior + ticketData.extras.education.priceInCents.senior)
    } else
    if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.general.priceInCents.child + ticketData.extras.terrace.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.movie.priceInCents.child)
    } else 
    if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("terrace") &&        ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")) {
      totalPrice = (ticketData.general.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)
    } else 
    if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.general.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)
}



// The above works
    }
 else 

if (ticketInfo.ticketType === "membership") { // getting total price based on movie, education and extras

  if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")){
    totalPrice = (ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child)
     } else 
     if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")) {
      totalPrice = (ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)
     } else 
     if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("movie") && !ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")){
      totalPrice = (ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)
     } if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")){
      totalPrice = (ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child)
       } else 
       if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")) {
        totalPrice = (ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult)
       } else 
       if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("terrace")){
        totalPrice = (ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior)
       } else
       if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.membership.priceInCents.child + ticketData.extras.terrace.priceInCents.child + ticketData.extras.education.priceInCents.child)
      } else 
      if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")) {
     totalPrice = (ticketData.membership.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult + ticketData.extras.education.priceInCents.adult)
     } else 
      if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && !ticketInfo.extras.includes("movie")){
     totalPrice = (ticketData.membership.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior + ticketData.extras.education.priceInCents.senior)
    } else
    if (ticketInfo.entrantType === "child" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.membership.priceInCents.child + ticketData.extras.terrace.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.movie.priceInCents.child)
    } else 
    if (ticketInfo.entrantType === "adult" && ticketInfo.extras.includes("terrace") &&        ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")) {
      totalPrice = (ticketData.membership.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)
    } else 
    if (ticketInfo.entrantType === "senior" && ticketInfo.extras.includes("terrace") && ticketInfo.extras.includes("education") && ticketInfo.extras.includes("movie")){
      totalPrice = (ticketData.membership.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)
}

}
 return totalPrice
}
    
  
  // end function

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

    let subTotal = 0
    let extraOnes = [] // setting up empty array for the extra
    let printReceipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------";
     for (let i = 0; i < purchases.length; i++){
      //Guard Clause to generate your error message
      if(!(ticketData.hasOwnProperty(purchases[i].ticketType))){   //error message
        return `Ticket type '${purchases[i].ticketType}' cannot be found.`
     }
     if(!ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType)){
        return `Entrant type '${purchases[i].entrantType}' cannot be found.`  // same as above but for entrant type
     } 
     let ticketPrice = (calculateTicketPrice(ticketData, purchases[i])/100)
     printReceipt += `\n${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.charAt(0).toUpperCase()}${purchases[i].ticketType.slice(1)} Admission: `  // adding to the receipt
     printReceipt += `$${(ticketPrice).toFixed(2)}` // incrementing the receipt
     console.log(ticketPrice)  // running a test 
     // For extras

     for (let j = 0; j < purchases[i].extras.length; j++){  //looping through purchases for extras
      if(ticketData.extras.hasOwnProperty(purchases[i].extras[j])){ //Check for extras
      extraOnes.push(ticketData.extras[purchases[i].extras[j]].description)//push into array if any extras
      } else {
      return `Extra type '${purchases[i].extras[j]}' cannot be found.` //if incorrect extras
      }
        //console.log(purchases[i].extras[j])

      }// end j loop
      if(extraOnes.length !== 0){
      printReceipt += ` (${extraOnes.join(', ')})`//if no extras
      }
  
  
      subTotal += ticketPrice
    }//end of i loop
  
     printReceipt += `\n-------------------------------------------\nTOTAL: $${(subTotal).toFixed(2)}`  //adding cost to receipt
    return printReceipt


  }  //end of function




// if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
//   return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
// }
// if (!ticketData[ticketInfo.ticketType].priceInCents.hasOwnProperty(ticketInfo.entrantType)) {
//   return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
// }
// for (let i = 0; i < ticketInfo.extras.length; i++) {
//   if (!ticketData.extras.hasOwnProperty(ticketInfo.extras[i])) {
//     return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
//   }
//    total += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]
// }
//   total += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
//   return total

// }

      //
      // redefine params now that you invoke the previous function ---> HELPER FUNCTIONS 
      //ticketInfo = purchases[i]
      
  
     // if (typeof price === 'string') 
      //return ticketPrice



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
