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
  let price = 0 //accum. variable to accumulate the total price of tickets during loop
  let extrasName = [] // empty [], to store true values for comparing with ticketInfo.extras values
  let ticketType = [] // empty [], to store true values for comparing with ticketInfo.ticketType values
  let entrantType = [] // empty array to store true values for comparing with ticketInfo.entrantType values
  
  for(const key in ticketData){
    ticketType.push(key) // looping through ticketData object to push existing(true) value keys to ticketType array
    for(const entrant in ticketData[key][`priceInCents`]){
      if(!entrantType.includes(entrant)){
      entrantType.push(entrant)
    }// looping through the key object containing [`priceInCents`] to gather true values for entrantType, and pushing them to entrantType []
  }
}
  for(const extra in ticketData[`extras`]){
    extrasName.push(extra) //looping through the ticketData.extras objects to push existing(true) value keys to extrasName []
  }

  if(!entrantType.includes(ticketInfo.entrantType)){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  if (!ticketType.includes(ticketInfo.ticketType)){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  // ^^ comparing values with the corresponding []'s that hold only true values, to filter out any values that do not exist, or are false. If so, returns an error message accordingly.
  for(const extras of ticketInfo.extras){
    if((extrasName.includes(extras))){
      price += ticketData[`extras`][extras][`priceInCents`][ticketInfo.entrantType]
    }
    else{
      return `Extra type '${extras}' cannot be found.`
      }
    }
    //^^ compares values inside of ticketType.extras array with extrasName array, if there is a match the price is updated to the price of that extras ticket type and entrantType, if a value is false, an error message is returned.
    
    price += ticketData[ticketInfo.ticketType][`priceInCents`][ticketInfo.entrantType]
    // if no errors are found within the ticketInfo {}, the price for the intial ticketType is added to the price and the total accum. price is returned.
    return price
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
      let realEntrant = false
      let receipt = `` 
      
      
      for(let i = 0; i < purchases.length; i++){
        let extrasPrice = 0
        let description = []
      
        for(const key in ticketData){
          if(!ticketData[purchases[i].ticketType]){
            return `Ticket type '${purchases[i].ticketType}' cannot be found.`
          }
          for(const entrant in ticketData[key][`priceInCents`]){
            if(purchases[i].entrantType === entrant){
              realEntrant = true
            }
            if(!ticketData[key][`priceInCents`][purchases[i].entrantType]){
              return `Entrant type '${purchases[i].entrantType}' cannot be found.`
            }
          }
          if(realEntrant === true){
            if(purchases[i].extras.length > 0){
              for(const extra of purchases[i].extras){
                for(const key2 in ticketData[`extras`]){
                  if(key2 === extra){
                    if(description.length !== purchases[i].extras.length){
                      description.push(ticketData[`extras`][extra][`description`])
                      
                      extrasPrice += ticketData[`extras`][extra][`priceInCents`][purchases[i].entrantType]
                    }
                  }
                  if(!ticketData[`extras`][extra]){
                    return `Extra type '${extra}' cannot be found.`
                  }
                }
              }
            }
            if(key === purchases[i].ticketType){
              extrasPrice += ticketData[key][`priceInCents`][purchases[i].entrantType]
              
              finalPrice += extrasPrice
              
              receipt += `${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1)} ${ticketData[key][`description`]}: $${(extrasPrice/100).toFixed(2)}`
              
              purchases[i].extras.length > 0 ? receipt += ` (${description.join(`, `)})\n` :
                receipt += `\n`
              }
            }
          }
        }
        return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(finalPrice /100).toFixed(2)}`
    } 
    // For this function all comments will be here for readabilty (organized by line):
    /*
    
    -ln 158 - finalPrice  accum. variable to accumulate total price for entire purchases []
    
    -ln 159 entrantType boolean accum. variable set to false, later helping to distinguish whether a loop should progress into the ['extras'] key of the ticketData {} 
    
    -ln 160 receipt string accum. variable to store the summarized info from each individual 'ticket' ({} in purchases []) needed for final return 
   
    -ln 163 initialize umbrella loop for the purchases []
    
    -ln 164, 165 -> initializing extrasPrice accum. variable (numbers) and desription [], that will accumulate for each loop({} in purchases aka 'tickets'), gathering information needed for the receipt variable at each iteration, then resets itself once the next iteration begins. 
    
    -ln 167-168 loops into the ticketData object, now using the purchases.ticketData value to determine if it is an existing key (general, membership) in the ticketData {}, if not, an error message is returned.
    
    -ln 171 -172 loops into the [`priceInCents] object of each [key] now using the purchases.entrantType value to determine if it is an existing key (child, adult, senior) in the [`priceInCents`] {}, if true, realEntrant (accum. variable) is set to true, if not, an error message is returned.
    
    -ln 179 - 182, if the realEntrant is switched to true, I check for the length of the current iteration's (purchases[i]) .extras key (which is an []). If it has a length ( > 0), I use a For...Of loop to loop into the purchases[i].extras [], while simultaneously using a For...In loop, looping through the ticketData['extras'] object to compare values. 
    
    -ln 183 if there is a match btw the values, I grab the .description key value of that matching obj (movies, terrace, education), and push that to my decription array. (these values `Movie Access`, `Terrace Access`, `Education Access`) are needed for printing the individual summary for each purchases[i] object.
    
    -ln 189 if a given value in the purchases.extras array doesn't exist as an existing true key inside of the ticketData[`extras`] object, an error message is returned.
    
    -ln 195- 197 reading top to bottom in my code, by this point I would have already established truthy values to all of my values in purchases[i] {}, so I now accumulate the price for all the `extras` in the purchases.extras[], as well as updating the finalPrice with that total as well.
    
    -ln 198 receipt -> adding a string interpolation value to existing receipt, which includes the entrant name(capitalized frist letter), the ticketType.description(`General Admission` or `Member Admission`), followed by the accum price variable (not finalPrice) (by now should have totaled the initial ticketType price plus any `extras` price) converted to dollars and 2 decimal places.
    
    -ln 199 if the purchases.extras.length was > 0 ( had extras ticket values), then I add a string of the values of the description [] -> `Movie Access`, `Terrace Access`, or `Education Access`) joined(.join(`, `) in (), to the receipt, and if not, I just add a \n to the end of the receipt allowing for the new info to be stored again in a new line after the next loop.
    
    -ln 209 return the final format of th receipt, with all of the summarized `receipts` and the finalPrice accum. converted to dollars and to 2 decimal places.
    */
  

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
