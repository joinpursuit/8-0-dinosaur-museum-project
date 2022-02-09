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
            //ticketType cannot be extras but general or membership
            //entrants -adult,senior,child
            //extra -movie, education, terrace if not in extras it is invalid
            // and each string can be added to the ticket
            //calculate extra just with the movie,education and terrace
          
            //arrays of allowed values
            let ticketType=['general','membership']
            let entrants=['child','adult','senior']
            let extraArr=['movie','education','terrace']
          
            //assign the variables their respective ticketInfo object properties
            let ticketInfoType=ticketInfo.ticketType
            let ticketInfoEntrant=ticketInfo.entrantType
            
           //check if ticket is of any other type than general and memebership
           //display the error message if the condition staisfies
            if (!ticketType.includes(ticketInfoType)){
              return `Ticket type 'incorrect-type' cannot be found.`
            }
            //check if the entrants are of any other option other than in entrants array and 
            //display the error message if the condition staisfies
            if(!entrants.includes(ticketInfoEntrant)){
              return `Entrant type 'incorrect-entrant' cannot be found.`
            }
          
            //checking for the invalid extras in the ticketInfo extra array other than movie,education and terrace
            for(let extra of ticketInfo.extras){
          
                   //if the value of the extras in incorrect then display the respective message
                   if(!extraArr.includes(extra)){
                      return `Extra type 'incorrect-extra' cannot be found.`
                   }
            }
          
            //calculate the total amount according to the admissions and the entrants age 
            let total = ticketData[ticketInfoType]['priceInCents'][ticketInfoEntrant]
          
            //calculate the price for the extras from the ticketInfo object by iterating through
            //the array and add to the total to find the total ticketprice based on the entrants choices
          
            for(let extra of ticketInfo.extras){

                   total+=ticketData.extras[extra]['priceInCents'][ticketInfoEntrant]
          
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
    function upperCase(str){

      return str[0].toUpperCase()+str.slice(1)
    }
      
    function purchaseTickets(ticketData, purchases) {
    
    
             //ticketData is the original tickets object passed on to the function
             //purchases is an array of objects that has all the information needed to print a receipt
             //iterate through purchases array to calcuate all the purchases made 
             // return a string with all the purchases made with formatting as each array item  printed in a new line
           
             
             //variable to hold the value of the sum of 
             let total=sum=0
       
             //variable that holds the result value as a string
             let receiptStr='Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'
       
             // arrays to store the allowed values for dataType , entrants and the extras Array
             let ticketDataType=['general','membership']
             let ticketDataEntrants=['child','adult','senior']
             let ticketDataExtraArr=['movie','education','terrace']
           
             //iterate through the purchases to find the total of purchased tickets
             for(let i =0 ;i < purchases.length; i++){
       
                         //declare the array extrastr to hold the values of the extras that user provides
                         let extraStr=[]
                        
                         //variables to hold the values of individual properties of purchases object
                         let purchaseTicketType = purchases[i].ticketType
                         let purchaseEntrantType = purchases[i].entrantType
                        //  let price='priceInCents'
                      
                        //check if the purchaseTicketType is not a valid orption and return the error
                        if(!ticketDataType.includes(purchaseTicketType)){
                          return `Ticket type 'incorrect-type' cannot be found.`
                        }
                  
                         //check if the purchaseEntrantType is not a valid orption and return the error
                        if(!ticketDataEntrants.includes(purchaseEntrantType)){
                          return `Entrant type 'incorrect-entrant' cannot be found.`
                        }
                  
                         //check if the values of purchase extras are valid orptions and return the error
                        for(let extra of purchases[i].extras){
                          if(!ticketDataExtraArr.includes(extra)){
                             return `Extra type 'incorrect-extra' cannot be found.`
                          }
                        }
                  
                        //add the value of the current iterative object to the variable sum
                        sum = ticketData[purchaseTicketType]['priceInCents'][purchaseEntrantType]
                  
                        //add all the values of the extras array to the sum
                        for (let extra of purchases[i].extras){
              
                           sum+=ticketData.extras[extra]['priceInCents'][purchaseEntrantType]
                           
                           extraStr.push(upperCase(extra) +' Access')
                        }       
                        
                        // a string variable to hold all the values and the messages to output
                        receiptStr+=`${upperCase(purchaseEntrantType)} ${upperCase(purchaseTicketType)} Admission: $${(sum/100).toFixed(2)}` 
                        
                        //check if there are values to be added from the extras array 
                        //from the current iterative object
                        if(extraStr.length>0){
              
                             //add the extras array values and the next value will be displayed in a new line
                             receiptStr+=` (${extraStr.join(', ')})\n`
              
                         //if there are no values to be added ,just add tne newline symbol to print the 
                         //next iterative message in a new line
                        }else{ 
       
                              receiptStr+=`\n`
                             
                             }
                        
                       //calculate the price for the extras from the ticketInfo object by iterating through
                       //the array and add to the total to find the total ticketprice based on the entrants choices
                       total+=sum/100

             }

            // add the total value of all objects in the array and display the total 
            receiptStr+=`-------------------------------------------\nTOTAL: $${total.toFixed(2)}`
                 
        return receiptStr
    }       

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
