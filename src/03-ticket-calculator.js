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
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect,
 *  or any of the values inside of the `ticketInfo.extras` key is incorrect, 
 * an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum.
 *  See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. 
 * Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. 
 * Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string 
 * represent a different "extra" that can be added to the ticket.
 *  All strings should be keys under the `extras` key in `ticketData`.
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
            //****** Given information ********
            //ticketType cannot be extras but general or membership
            //entrants -adult,senior,child
            //extra -movie, education, terrace if not in extras it is invalid
            // and each string can be added to the ticket
            //calculate extra just with the movie,education and terrace
            

            //arrays of allowed values
            let ticketType = ['general','membership']
            let entrants = ['child','adult','senior']
            let extraArr = ['movie','education','terrace']         
            //check if ticket is of any other type than general and memebership to dispaly error message
            if (!ticketType.includes(ticketInfo.ticketType)) {
              return `Ticket type 'incorrect-type' cannot be found.`
            }
            //check if the entrants are of any other option other than in entrants array to dispaly error message
            if (!entrants.includes(ticketInfo.entrantType)) {
              return `Entrant type 'incorrect-entrant' cannot be found.`
            }
            //checking for the invalid extras in the ticketInfo extra array other than movie,education and terrace
            for (let extra of ticketInfo.extras) {
                   //if the value of the extras in incorrect then display the respective message
                   if (!extraArr.includes(extra)) {
                      return `Extra type 'incorrect-extra' cannot be found.`
                   }
            }       
            //calculate the total amount according to the admissions and the entrants age 
            let total = ticketData[ticketInfo.ticketType]['priceInCents'][ticketInfo.entrantType]   
            //calculate the price for the extras from the ticketInfo object by iterating through
            //the array and add to the total to find the total ticketprice based on the entrants choices        
            for (let extra of ticketInfo.extras) {
                  total+=ticketData.extras[extra]['priceInCents'][ticketInfo.entrantType]        
            }         
   return total
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` 
 * in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way
 *  it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get
 *  the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` 
 * file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" 
 * that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
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

    //helper function to convert the first letter of the word to uppercase
    function convertToUpperCase(str){
      return str[0].toUpperCase()+str.slice(1)
    }    

   
    function purchaseTickets(ticketData, purchases) {
             //given information
             //ticketData is the original tickets object passed on to the function
             //purchases is an array of objects that has all the information needed to print a receipt
             //iterate through purchases array to calcuate all the purchases made 
             // return a string with all the purchases made with formatting as each array item  printed in a new line
             
             //variable to hold the value of the sum of all purchases made
             let total=0
             //variable that holds the result value as a string
             let receiptStr='Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'      
            //iterate through the purchases to find the total of purchased tickets
             for (let i = 0 ;i < purchases.length; i++) {

                          let extraStr=[]
                          //tyring to use the function above to refactor my code
                          let singlePurchasePrice = calculateTicketPrice(ticketData, purchases[i])
                          if(typeof singlePurchasePrice  !== 'number'){
                             return singlePurchasePrice
                           }
                        //push the information from extra into extrasStr array
                        for (let extra of purchases[i].extras){
                           extraStr.push(convertToUpperCase(extra) +' Access')
                        }            
                        // a string variable to hold all the values and the messages to output
                        receiptStr+=`${convertToUpperCase(purchases[i].entrantType)} ${convertToUpperCase(purchases[i].ticketType)} Admission: $${(singlePurchasePrice/100).toFixed(2)}`                        
                        //check if there are values to be added from the extras array 
                        if(extraStr.length > 0){           
                             //add the extras array values and the next value will be displayed in a new line
                             receiptStr+=` (${extraStr.join(', ')})\n`   
                        // if no values to be added add a new line 
                        }else{ 
                              receiptStr+=`\n`
                        }
                      total+=singlePurchasePrice/100     
             }
            // display the total 
            receiptStr+=`-------------------------------------------\nTOTAL: $${total.toFixed(2)}`               
        return receiptStr       
  }
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
