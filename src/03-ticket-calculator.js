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
 
let totalPrice = null

//IF TICKET TYPE IS NOT ONES FOUND IN DATA
if(!(ticketInfo.ticketType.includes("general") ||
ticketInfo.ticketType.includes("membership")))
{return`Ticket type '${ticketInfo.ticketType}' cannot be found.` }






// {totalPrice= `Ticket type '${ticketInfo.ticketType}' cannot be found.` }

//-----------------------------------------------------------
//*~MEMBERSHIP~*///////////////////////////////////////
if (ticketInfo.ticketType ==="membership"){

//-----------------------------------------------------------

//-----------------------------------------------------------
if(ticketInfo.extras.length>0){

//-----------------------------------------------------------
  //IF ALL ADD-ONS ARE INCLUDED
  if(ticketInfo.extras.includes("movie") && 
  ticketInfo.extras.includes("education") &&
  ticketInfo.extras.includes("terrace")
  ){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.membership.priceInCents.child + 
      ticketData.extras.movie.priceInCents.child+
      ticketData.extras.education.priceInCents.child+
      ticketData.extras.terrace.priceInCents.child}

     else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.membership.priceInCents.adult + 
      ticketData.extras.movie.priceInCents.adult+
      ticketData.extras.education.priceInCents.adult+
      ticketData.extras.terrace.priceInCents.adult}


     else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.membership.priceInCents.senior + 
      ticketData.extras.movie.priceInCents.senior+
      ticketData.extras.education.priceInCents.senior+
      ticketData.extras.terrace.priceInCents.senior}

      else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
  }//-----------------------------------------------------------
//ADD-ONS education & terrace ONLY

  else if(ticketInfo.extras.includes("education") &&
  ticketInfo.extras.includes("terrace") && 
  !ticketInfo.extras.includes("movie")){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.membership.priceInCents.child + 
      ticketData.extras.education.priceInCents.child+
      ticketData.extras.terrace.priceInCents.child}

    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.membership.priceInCents.adult + 
      ticketData.extras.education.priceInCents.adult+
      ticketData.extras.terrace.priceInCents.adult}


    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.membership.priceInCents.senior + 
      ticketData.extras.education.priceInCents.senior+
      ticketData.extras.terrace.priceInCents.senior}

      else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
  }
  //-----------------------------------------------------------
//ADD-Ons movie & Education ONLY
  else if(ticketInfo.extras.includes("movie") && 
  ticketInfo.extras.includes("education") &&
  !ticketInfo.extras.includes("terrace")){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.membership.priceInCents.child + 
      ticketData.extras.movie.priceInCents.child+
      ticketData.extras.education.priceInCents.child
          }
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.membership.priceInCents.adult + 
      ticketData.extras.movie.priceInCents.adult+
      ticketData.extras.education.priceInCents.adult
          }

   else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.membership.priceInCents.senior + 
      ticketData.extras.movie.priceInCents.senior+
      ticketData.extras.education.priceInCents.senior
          }  
          else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}

  }//-----------------------------------------------------------
  //ADD-ONS are Movie & Terrace Only
  else if(ticketInfo.extras.includes("movie") && 
  ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")
  ){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.membership.priceInCents.child + 
      ticketData.extras.movie.priceInCents.child+
      ticketData.extras.terrace.priceInCents.child}

    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.membership.priceInCents.adult + 
      ticketData.extras.movie.priceInCents.adult+
      ticketData.extras.terrace.priceInCents.adult}


   else  if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.membership.priceInCents.senior + 
      ticketData.extras.movie.priceInCents.senior+
      ticketData.extras.terrace.priceInCents.senior}

      else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
  }

//-----------------------------------------------------------
//WITH MOVIE ADDON & MEMBERSHIP
else if(ticketInfo.extras[0] ==="movie"){
  if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.membership.priceInCents.child+ticketData.extras.movie.priceInCents.child)}

    else if (ticketInfo.entrantType === "adult"){totalPrice=  (ticketData.membership.priceInCents.adult+ticketData.extras.movie.priceInCents.adult)}

    else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.membership.priceInCents.senior+ticketData.extras.movie.priceInCents.senior)}
   
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}

}
//-----------------------------------------------------------
//EDUCATION ADDON & MEMBERSHIP
else if(ticketInfo.extras[0] ==="education"){
  if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.membership.priceInCents.child+ticketData.extras.education.priceInCents.child)}

  else if (ticketInfo.entrantType === "adult"){totalPrice=  (ticketData.membership.priceInCents.adult+ticketData.extras.education.priceInCents.adult)}

   else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.membership.priceInCents.senior+ticketData.extras.education.priceInCents.senior)}

   else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
}//-----------------------------------------------------------
//TERRACE ADDON & MEMBERSHIP
else if(ticketInfo.extras[0] ==="terrace"){
  if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.membership.priceInCents.child+ticketData.extras.terrace.priceInCents.child)}

 else if (ticketInfo.entrantType === "adult"){totalPrice=  (ticketData.membership.priceInCents.adult+ticketData.extras.terrace.priceInCents.adult)}

  else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.membership.priceInCents.senior+ticketData.extras.terrace.priceInCents.senior)}

  else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
}
}
  //-----------------------------------------------------------
//NO ADDONS && MEMBERSHIP
  else if(ticketInfo.extras.length === 0){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.membership.priceInCents.child}
     else if (ticketInfo.entrantType === "adult"){totalPrice=  ticketData.membership.priceInCents.adult}
    else  if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.membership.priceInCents.senior}

    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
  // 
  }
  

  //IF GIVEN EXTRAS IS INCORRECT AND DOES NOT MATCH DATA
else{totalPrice =  `Extra type '${ticketInfo.extras}' cannot be found.`}
}
  //IF GIVEN Entrant IS INCORRECT AND DOES NOT MATCH DATA
  

//end of membership code///////////////////////////////
//START OF GENERAL CODE
  else if (ticketInfo.ticketType ==="general"){

    if(ticketInfo.extras.length>0){
    
    //----------------------------------------------------------
    //IF ALL ADD-ONS ARE INCLUDED
    if(ticketInfo.extras.includes("movie") && 
    ticketInfo.extras.includes("education") &&
    ticketInfo.extras.includes("terrace")
    ){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.general.priceInCents.child + 
    ticketData.extras.movie.priceInCents.child+
    ticketData.extras.education.priceInCents.child+
    ticketData.extras.terrace.priceInCents.child}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.general.priceInCents.adult + 
    ticketData.extras.movie.priceInCents.adult+
    ticketData.extras.education.priceInCents.adult+
    ticketData.extras.terrace.priceInCents.adult}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.general.priceInCents.senior + 
    ticketData.extras.movie.priceInCents.senior+
    ticketData.extras.education.priceInCents.senior+
    ticketData.extras.terrace.priceInCents.senior}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    }//-----------------------------------------------------------
    //ADD-ONS education & terrace ONLY
    
    else if(ticketInfo.extras.includes("education") &&
    ticketInfo.extras.includes("terrace") && 
    !ticketInfo.extras.includes("movie")){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.general.priceInCents.child + 
    ticketData.extras.education.priceInCents.child+
    ticketData.extras.terrace.priceInCents.child}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.general.priceInCents.adult + 
    ticketData.extras.education.priceInCents.adult+
    ticketData.extras.terrace.priceInCents.adult}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.general.priceInCents.senior + 
    ticketData.extras.education.priceInCents.senior+
    ticketData.extras.terrace.priceInCents.senior}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    }
    //-----------------------------------------------------------
    //ADD-Ons movie & Education ONLY
    else if(ticketInfo.extras.includes("movie") && 
    ticketInfo.extras.includes("education") &&
    !ticketInfo.extras.includes("terrace")){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.general.priceInCents.child + 
    ticketData.extras.movie.priceInCents.child+
    ticketData.extras.education.priceInCents.child
    }
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.general.priceInCents.adult + 
    ticketData.extras.movie.priceInCents.adult+
    ticketData.extras.education.priceInCents.adult
    }
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.general.priceInCents.senior + 
    ticketData.extras.movie.priceInCents.senior+
    ticketData.extras.education.priceInCents.senior
    } 
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    
    }//-----------------------------------------------------------
    //ADD-ONS are Movie & Terrace Only
    else if(ticketInfo.extras.includes("movie") && 
    ticketInfo.extras.includes("terrace") && !ticketInfo.extras.includes("education")
    ){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.general.priceInCents.child + 
    ticketData.extras.movie.priceInCents.child+
    ticketData.extras.terrace.priceInCents.child}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.general.priceInCents.adult + 
    ticketData.extras.movie.priceInCents.adult+
    ticketData.extras.terrace.priceInCents.adult}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.general.priceInCents.senior + 
    ticketData.extras.movie.priceInCents.senior+
    ticketData.extras.terrace.priceInCents.senior}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    }
    
    //-----------------------------------------------------------
    //WITH MOVIE ADDON & MEMBERSHIP
    else if(ticketInfo.extras[0] ==="movie"){
    if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.general.priceInCents.child+ticketData.extras.movie.priceInCents.child)}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= (ticketData.general.priceInCents.adult+ticketData.extras.movie.priceInCents.adult)}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.general.priceInCents.senior+ticketData.extras.movie.priceInCents.senior)}
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    
    }
    //-----------------------------------------------------------
    //EDUCATION ADDON & MEMBERSHIP
   else if(ticketInfo.extras[0] ==="education"){
    if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.general.priceInCents.child+ticketData.extras.education.priceInCents.child)}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= (ticketData.general.priceInCents.adult+ticketData.extras.education.priceInCents.adult)}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.general.priceInCents.senior+ticketData.extras.education.priceInCents.senior)}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    }//-----------------------------------------------------------
    //TERRACE ADDON & MEMBERSHIP
    else if(ticketInfo.extras[0] ==="terrace"){
    if (ticketInfo.entrantType === "child"){totalPrice= (ticketData.general.priceInCents.child+ticketData.extras.terrace.priceInCents.child)}
    
    else if (ticketInfo.entrantType === "adult"){totalPrice= (ticketData.general.priceInCents.adult+ticketData.extras.terrace.priceInCents.adult)}
    
    else if (ticketInfo.entrantType === "senior"){totalPrice= (ticketData.general.priceInCents.senior+ticketData.extras.terrace.priceInCents.senior)}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    }
    }
    //-----------------------------------------------------------
    //NO ADDONS && MEMBERSHIP
   else if(ticketInfo.extras.length === 0){
    if (ticketInfo.entrantType === "child"){totalPrice= ticketData.general.priceInCents.child}
    else if (ticketInfo.entrantType === "adult"){totalPrice= ticketData.general.priceInCents.adult}
    else if (ticketInfo.entrantType === "senior"){totalPrice= ticketData.general.priceInCents.senior}
    
    else{ totalPrice =`Entrant type '${ticketInfo.entrantType}' cannot be found.`}
    // 
    }
    
    //IF GIVEN EXTRAS IS INCORRECT AND DOES NOT MATCH DATA
    else{totalPrice =  `Extra type '${ticketInfo.extras}' cannot be found.`}
  
  }


  if(ticketInfo.extras.length!==0 &&!(ticketInfo.extras.includes("movie")||
  ticketInfo.extras.includes("education")||
  ticketInfo.extras.includes("terrace"))){
   totalPrice =  `Extra type '${ticketInfo.extras}' cannot be found.`
  }
return totalPrice}

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




priceArray = [] // will contain an array of all values of each ticket in the ticketPRiceArray
let sum = 0 //the starting point for the accululator pattern summation of costs of tickets

 let finalReceipt="";
// let extrasString = ""
// let accessToken = 'Access'

for (i=0;i<purchases.length;i++){


priceArray.push((calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2))
 }
for (i=0;i<priceArray.length;i++){
  sum+=Number(priceArray[i])
} 
//---------------------------------------------------

//The bottom code will take care of the movie,education, and terrace name near the access


//  let extrasString = ""//will contain a string of the extratypes
 //Will Throw the Errori f there is error

// let insertHERE = []
//   let insertTicket=[]
// let insertAccess= []//`(${accesstoken.charAt(0)}${accesstoken.slice(1)} Access)`;
  
let receipt =[]
  //RECEIPT STRUCTURE BELOW

//RECEIPT STRUCTURE ABOVE

// for (i=0;i<purchases.length;i++){
  
//   insertTicket.push(`${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)}`)


//   for(x=0;x<purchases[i].extras.length;x++){
// insertAccess.push(` ${purchases[i].extras[x].toUpperCase().charAt(0)}${purchases[i].extras[x].slice(1)} Access`)
//   //ie. Movie Access <-- movie
// for(i=0;i<insertTicket.length;i++){
// if (insertAccess.length>0){
//   insertHERE.push(`\n${insertTicket[i].concat(insertAccess)}`)
// }

// if(insertAccess.length ===0){
  
//   insertHERE.push(`\n${insertTicket}`)
// }
// }
//ie. General Admission: $something here
  //  }
  // }
  let entrantArray7 = []
  let ticketArray7  = []
  let extrasArray7 = []
 let prices7 =[]
 
  for(let i=0;i<purchases.length;i++){
    
   
    entrantArray7.push(`${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)}`)
    ticketArray7.push(`${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)}`)
   prices7.push((calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2))
    extrasArray7.push(purchases[i].extras)

 
}

//////////////////
for(i=0;i<extrasArray7.length;i++){
for (x=0;x<extrasArray7[i].length;x++){
  if(extrasArray7[i][x].includes("movie")){
extrasArray7[i][x]= "Movie Access";}
if(extrasArray7[i][x].includes("terrace")){
extrasArray7[i][x]="Terrace Access";}

if(extrasArray7[i][x].includes("education")){
extrasArray7[i][x]="Education Access";}
}}
/////////////////////
// for(i=0;i<extrasArray7.length;i++){
// if(extrasArray7[i].length===0){
// extrasArray7[i] =''}
// if(extrasArray7[i].length===2){
//   extrasArray7[i][1] }

//   }}







for(let i=0;i<purchases.length;i++){

if(extrasArray7[i].length>0){
receipt.push(`\n${entrantArray7[i]} ${ticketArray7[i]} Admission: $${prices7[i]} (${extrasArray7[i]})`)
}else{receipt.push(`\n${entrantArray7[i]} ${ticketArray7[i]} Admission: $${prices7[i]}`)}

}



// receipt
// receipt;
// ;
receipt=receipt.join('')

receipt = receipt.replaceAll('s,',"s, ")
receipt = receipt.replaceAll('s,E',"s, E")
receipt = receipt.replaceAll('s,M',"s, M")
receipt = receipt.replaceAll('s,T',"s, T")




let hmm = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------${receipt}\n-------------------------------------------\nTOTAL: $${sum.toFixed(2)}`



for(i=0;i<purchases.length;i++){
if(!(purchases[i].ticketType.includes("general") ||
purchases[i].ticketType.includes("membership")))
{return`Ticket type '${purchases[i].ticketType}' cannot be found.` }
else if(!(purchases[i].entrantType.includes("child") || purchases[i].entrantType.includes("adult")  ||purchases[i].entrantType.includes("senior")))
{return `Entrant type '${purchases[i].entrantType}' cannot be found.`}
else if(hmm.includes('NaN')){
return `Extra type '${purchases[i].extras}' cannot be found.`
}
// else if(!(purchases[i].extras.includes("movie")||purchases[i].extras.includes("education")||purchases[i].extras.includes("terrace"))) {}

else{
return hmm}
}

}
/////////////////////////////////////////////

// let entrantArray7 = []
// let ticketArray7  = []
// let extrasArray7 = []
// for(let i=0;i<purchases.length;i++){
  
//   let theExtras = purchases[i].extras
//   theExtras.join('Access')
//   entrantArray7 = `${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)}`
//   ticketArray7 = `${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)}`
//   extrasArray7 = `${purchases[i].extras.toUpperCase().charAt(0)}${purchases[i].extras[x].slice(1)}`
//   let prices7 = (calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)
// }

//  receipt =
// `\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${entrantArray7} ${ticketArray7} ${extrasArray7} Access
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)})}`

//   if(purchases[i].ticketType==="general" || purchases[i].ticketType==="membership"){
    
//     if(purchases[i].entrantType.length >0  && 
//       !(purchases[i].entrantType.includes("child") ||
//          purchases[i].entrantType.includes("adult") || 
//          purchases[i].entrantType.includes("senior"))  ){

// //--------- Receipt for Movie Only
//  if(purchases[i].extras.length==1 && (purchases[i].extras.includes("movie") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Movie Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)

// }

//  ///-------
// //Receipt printed for Education Only
// else if(purchases[i].extras.length===1 && (purchases[i].extras.includes("education") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Education Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)


// }
// //---------- Receipt for Terrace Only
// else if(purchases[i].extras.length===1 && (purchases[i].extras.includes("terrace") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Terrace Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)

// }
 
// //--------- Terrace and Movie
// else if(purchases[i].extras.length===2 && (purchases[i].extras.includes("movie") && purchases[i].extras.includes("terrace") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Movie Access, Terrace Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)


// }
// //--------- Terrace and Education
// else if(purchases[i].extras.length===2 && (purchases[i].extras.includes("education") && purchases[i].extras.includes("terrace") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Education Access, Terrace Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)


// }
// //--------- Movie and Education
// else if(purchases[i].extras.length===2 && (purchases[i].extras.includes("education") && purchases[i].extras.includes("movie") ))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Education Access, Movie Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)


// }

// //--------- Terrace and Education and Movie
// else if(purchases[i].extras.length===3 && (purchases[i].extras.includes("education") && purchases[i].extras.includes("terrace") && (purchases[i].extras.includes("movie") )))
// {

  
// finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)} (Education Access, Movie Access, Terrace Access)
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)


// }



//          }
//          //----------for No Extras Only
// else if (purchases[i].extras.length ===0){
//   finalReceipt= (`\nThank you for visiting the Dinosaur Museum!
// \n-------------------------------------------
// ${purchases[i].entrantType.toUpperCase().charAt(0)}${purchases[i].entrantType.slice(1)} ${purchases[i].ticketType.toUpperCase().charAt(0)}${purchases[i].ticketType.slice(1)} Admission: $${(calculateTicketPrice(ticketData,purchases[i])/100).toFixed(2)}
// \n-------------------------------------------
// \nTOTAL: $${sum.toFixed(2)}`)
// }
// else
// {
//   finalReceipt= `Entrant type '${purchases[i].entrantType}' cannot be found.`
  
// }}
//   else {finalReceipt= `Ticket type '${purchases[i].ticketType}' cannot be found.`}
// }
// return finalReceipt
// }







// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
