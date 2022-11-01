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

      let ticketType = ticketInfo.ticketType
      let entrantType = ticketInfo.entrantType

      if(ticketType in ticketData && entrantType  in ticketData[ticketType].priceInCents){//Checking the property that exists in all these values
        
      
        let extraTicket = 0
       
        for(let i = 0; i < ticketInfo.extras.length; i++){
          if(ticketInfo.extras[i] in ticketData.extras){
         
              extraTicket += ticketData.extras[ticketInfo.extras[i]].priceInCents[ticketInfo.entrantType]//Populating the extra ticket data
              
   
          } 
          else{    
            return `Extra type '${ticketInfo.extras[i]}' cannot be found.` //Error message from extra
          }
        }
        return ticketData[ticketType].priceInCents[entrantType] + extraTicket
    } else if (!ticketData.hasOwnProperty(ticketType)){  
           return `Ticket type '${ticketType}' cannot be found.` //Error message from ticket type
    
      } else if (!ticketData[ticketType].priceInCents.hasOwnProperty(entrantType)){ 
            return `Entrant type '${entrantType}' cannot be found.` //Error message from extrant type
      }
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
      let finalPrice = 0
      let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------' //start of receipt
      
    
      for(let i = 0; i< purchases.length; i++){
        
        let extra1 = []
        if(!(ticketData.hasOwnProperty(purchases[i].ticketType))){//error handling. Checking if ticket data does not have the correct purchase type.
          return `Ticket type '${purchases[i].ticketType}' cannot be found.`
      } 
          if(!(ticketData[purchases[i].ticketType].priceInCents.hasOwnProperty(purchases[i].entrantType))){// error handling. Checking if the entrant type is incorrect
            return `Entrant type '${purchases[i].entrantType}' cannot be found.`
          }
          let price = calculateTicketPrice(ticketData, purchases[i])/100 //calculate price of ticket
          
          if(typeof price === 'string'){
            return price
          }

          let ticketType = purchases[i].ticketType; //type of ticket
          let entrantType = purchases[i].entrantType; // entrant type
          receipt += `\n${entrantType[0].toUpperCase()}${entrantType.slice(1)} ${ticketType[0].toUpperCase()}${ticketType.slice(1)} Admission: $${price.toFixed(2)}`// formatting receipt
          for (let j = 0; j < purchases[i].extras.length; j++){//loop for extras
              if(ticketData.extras.hasOwnProperty(purchases[i].extras[j])){ //Checking for purchase extras
                  
                  extra1.push(ticketData.extras[purchases[i].extras[j]].description)//pushing the description in array if extra exists
              } else {
                return `Extra type '${purchases[i].extras[j]}' cannot be found.` //if incorrect extras
              }
              
          }// ending [j] for loop
          

          if(extra1.length !== 0){
            receipt += ` (${extra1.join(', ')})`//if no extras
          }

          finalPrice += price

          
      }//ending [i] for loop
      receipt += `\n-------------------------------------------\nTOTAL: $${finalPrice.toFixed(2)}`//Adding final costs to receipt
      
      return receipt
         
      }// end of function
      
      
    
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
