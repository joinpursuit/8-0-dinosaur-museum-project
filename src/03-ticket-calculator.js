/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const { general, extras } = require("../data/tickets");
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
  let pricePerTicket = 0;
  
  if (ticketInfo.ticketType !== "general" 
  && ticketInfo.ticketType !== "membership") {
    return `Ticket type 'incorrect-type' cannot be found.`;
  }
  else if (ticketInfo.entrantType !== "child" 
  && ticketInfo.entrantType !== "adult" 
  && ticketInfo.entrantType !== "senior") {
    return `Entrant type 'incorrect-entrant' cannot be found.`;
  }
  else if (ticketInfo.extras.length > 0) {
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" 
      && ticketInfo.extras[i] !== "terrace" 
      && ticketInfo.extras[i] !== "education") {
        return `Extra type 'incorrect-extra' cannot be found.`;
      }
    }
  } 
  if (ticketInfo.ticketType === "general" 
  && ticketInfo.entrantType === "child"){
     pricePerTicket = ticketData.general.priceInCents.child;
     if (ticketInfo.extras.length > 0){
       for (let i = 0; i < ticketInfo.extras.length; i++) {
         if (ticketInfo.extras[i] === "movie") {
           pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.child;
         }
         if (ticketInfo.extras[i] === "education") {
          pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.child;
        }
        if (ticketInfo.extras[i] === "terrace") {
          pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.child;
        }
       }
     }
  }
  if (ticketInfo.ticketType === "general" 
  && ticketInfo.entrantType === "adult") {
    pricePerTicket = ticketData.general.priceInCents.adult;
    if (ticketInfo.extras.length > 0) {
      for (let i = 0; i < ticketInfo.extras.length; i++) {
        if (ticketInfo.extras[i] === "movie") {
          pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.adult;
        }
        if (ticketInfo.extras[i] === "education") {
          pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.adult;
        }
        if (ticketInfo.extras[i] === "terrace") {
          pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.adult;
        }

      }
    }
 }
 if (ticketInfo.ticketType === "general" 
 && ticketInfo.entrantType === "senior") {
  pricePerTicket = ticketData.general.priceInCents.senior;
  if (ticketInfo.extras.length > 0) {
    for (let i = 0; i < ticketInfo.extras.length; i++) { 
      if(ticketInfo.extras[i] === "movie"){
        pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.senior;
      }
      if(ticketInfo.extras[i] === "education"){
        pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.senior;
      }
      if(ticketInfo.extras[i] === "terrace"){
        pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.senior;
      }
    }
  }
}
if (ticketInfo.ticketType === "membership" 
&& ticketInfo.entrantType === "child") {
  pricePerTicket = ticketData.membership.priceInCents.child;
  if (ticketInfo.extras.length > 0){
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      if(ticketInfo.extras[i] === "movie") {
        pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.child;
      }
      if(ticketInfo.extras[i] === "education") {
       pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.child;
     }
     if(ticketInfo.extras[i] === "terrace") {
       pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.child;
     }

    }
  }
}
if (ticketInfo.ticketType === "membership" 
&& ticketInfo.entrantType === "adult") { 
 pricePerTicket = ticketData.membership.priceInCents.adult;
  if (ticketInfo.extras.length > 0) {
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] === "movie") {
        pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.adult;
      }
      if (ticketInfo.extras[i] === "education") {
        pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.adult;
      }
      if (ticketInfo.extras[i] === "terrace") {
        pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.adult;
      }

    }
  }
}
if (ticketInfo.ticketType === "membership" 
&& ticketInfo.entrantType === "senior") {
pricePerTicket = ticketData.membership.priceInCents.senior;
  if (ticketInfo.extras.length > 0) {
    for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] === "movie") {
        pricePerTicket = pricePerTicket + ticketData.extras.movie.priceInCents.senior;
      }
      if (ticketInfo.extras[i] === "education") {
        pricePerTicket = pricePerTicket + ticketData.extras.education.priceInCents.senior;
      }
      if (ticketInfo.extras[i] === "terrace") {
        pricePerTicket = pricePerTicket + ticketData.extras.terrace.priceInCents.senior;
      }
    }
  }
}
 return pricePerTicket;
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
  let total = 0;
  let ticket = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  for (let i = 0; i < purchases.length; i++) {
    if (purchases[i].ticketType !== "general" 
    && purchases[i].ticketType !== "membership") {
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`;
    }
    else if (purchases[i].entrantType !== "child" 
    && purchases[i].entrantType !== "adult" 
    && purchases[i].entrantType !== "senior") {
      return `Entrant type 'incorrect-entrant' cannot be found.`;
    }
    else if (purchases[i].extras.length > 0) {
      for (let j = 0; j < purchases[i].extras.length; j++) {
        if (purchases[i].extras[j] !== "movie" 
        && purchases[i].extras[j] !== "terrace" 
        && purchases[i].extras[j] !== "education") {
         return `Extra type '${purchases[i].extras[j]}' cannot be found.`;
    }
    }
    }
    if (purchases[i].ticketType === "general" 
    && purchases[i].entrantType === "adult" ) {
      total = total + ticketData.general.priceInCents.adult / 100;
      ticket = `${ticket}Adult General Admission: $${(ticketData.general.priceInCents.adult / 100).toFixed(2)}\n`;

      if (purchases[i].extras.length === 1) {
        if(purchases[i].extras[0] === "movie") {
          total = total + ticketData.extras.movie.priceInCents.adult / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)/100).toFixed(2)} (Movie Access)\n`;
        }
        if(purchases[i].extras[0] === "terrace") {
          total = total + ticketData.extras.terrace.priceInCents.adult / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult)/100).toFixed(2)} (Terrace Access)\n`;
        }
        if(purchases[i].extras[0] === "education") {
          total = total + ticketData.extras.education.priceInCents.adult / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.adult + ticketData.extras.education.priceInCents.adult)/100).toFixed(2)} (Education Access)\n`;
        } 
      }
      if (purchases[i].extras.length === 2) {
         if(purchases[i].extras[0] === "movie" 
         && purchases[i].extras[1] === "terrace") {
           total = total + ticketData.extras.movie.priceInCents.adult / 100 + ticketData.extras.terrace.priceInCents.adult / 100 ;
           ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult)/100).toFixed(2)} (Movie Access, Terrace Access)\n` ;
         }
       }
       if (purchases[i].extras.length = 3) {
        if(purchases[i].extras[0] === "education" 
        && purchases[i].extras[1] === "movie" 
        && purchases[i].extras[2] === "terrace" ) {
          total = total + ticketData.extras.education.priceInCents.adult / 100 + ticketData.extras.movie.priceInCents.adult / 100 + ticketData.extras.terrace.priceInCents.adult / 100 ;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult)/100).toFixed(2)} (Education Access,Movie Access, Terrace Access)\n` ;
        }
      }
    }
    if (purchases[i].ticketType === "general" 
    && purchases[i].entrantType === "child") {
      total = total + ticketData.general.priceInCents.child / 100; 
      ticket = `${ticket}Child General Admission: $${(ticketData.general.priceInCents.child / 100).toFixed(2)}\n`;

      if (purchases[i].extras.length === 3) {
        if (purchases[i].extras[0] === "education" 
        && purchases[i].extras[1] === "movie" 
        && purchases[i].extras[2] === "terrace" ) {
          total = total + ticketData.extras.education.priceInCents.child / 100 + ticketData.extras.movie.priceInCents.child / 100 + ticketData.extras.terrace.priceInCents.child / 100 ;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.terrace.priceInCents.child)/100).toFixed(2)} (Education Access, Movie Access, Terrace Access)\n` ;
        }
      } 
    }
    if (purchases[i].ticketType === "general" 
    && purchases[i].entrantType === "senior") {
      total = total + ticketData.general.priceInCents.senior / 100;
      ticket = `${ticket}Senior General Admission: $${(ticketData.general.priceInCents.senior / 100).toFixed(2)}\n`;
      if (purchases[i].extras.length === 1) {
        if (purchases[i].extras[0] === "movie") {
          total = total + ticketData.extras.movie.priceInCents.senior / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)/100).toFixed(2)} (Movie Access)\n` ;
        }
        if (purchases[i].extras[0] === "terrace") {
         total = total + ticketData.extras.terrace.priceInCents.senior / 100;
         ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior)/100).toFixed(2)} (Terrace Access)\n` ;
        }
        if (purchases[i].extras[0] === "education") {
          total = total + ticketData.extras.education.priceInCents.senior / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.general.priceInCents.senior + ticketData.extras.education.priceInCents.senior)/100).toFixed(2)} (Education Access)\n` ;
        } 
      }
    }
    if (purchases[i].ticketType === "membership" 
    && purchases[i].entrantType === "adult" ) {
      total = total + ticketData.membership.priceInCents.adult / 100;
      ticket = `${ticket}Adult Membership Admission: $${(ticketData.membership.priceInCents.adult / 100).toFixed(2)}\n`
     
      if (purchases[i].extras.length === 1) {
        if (purchases[i].extras[0] === "movie") {
          total = total + ticketData.extras.movie.priceInCents.adult / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult)/100).toFixed(2)} (Movie Access)\n` ;
        }
        if (purchases[i].extras[0] === "terrace") {
         total = total + ticketData.extras.terrace.priceInCents.adult / 100;
         ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult)/100).toFixed(2)} (Terrace Access)\n` ;
        }
        if (purchases[i].extras[0] === "education") {
          total = total + ticketData.extras.education.priceInCents.adult / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.education.priceInCents.adult)/100).toFixed(2)} (Education Access)\n` ;
        } 
      }
    if (purchases[i].extras.length === 2) {
      if (purchases[i].extras[0] === "movie" 
      && purchases[i].extras[1] === "terrace") {
        total = total + ticketData.extras.movie.priceInCents.adult / 100 + ticketData.extras.terrace.priceInCents.adult / 100;
        ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult )/100).toFixed(2)} (Movie Access, Terrace Access)\n` ;
      }
      if (purchases[i].extras[0] === "terrace" 
      && purchases[i].extras[1] === "education") {
        total = total + ticketData.extras.terrace.priceInCents.adult / 100 + ticketData.extras.education.priceInCents.adult / 100;
        ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult + ticketData.extras.education.priceInCents.adult )/100).toFixed(2)} (Terrace Access, Education Access)\n` ;
      }
    }
    if (purchases[i].extras.length === 3) {
      if (purchases[i].extras[0] === "education" 
      && purchases[i].extras[1] === "movie" 
      && purchases[i].extras[2] === "terrace") {
        total = total + ticketData.extras.education.priceInCents.adult / 100 + ticketData.extras.movie.priceInCents.adult / 100 + ticketData.extras.terrace.priceInCents.adult / 100;
        ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult )/100).toFixed(2)} (Education Access, Movie Access, Terrace Access)\n` ;
      }
    }     
    }
    if (purchases[i].ticketType === "membership" 
    && purchases[i].entrantType === "child" ) {
      total = total + ticketData.membership.priceInCents.child / 100;
      ticket = `${ticket}Child Membership Admission: $${(ticketData.membership.priceInCents.child / 100).toFixed(2)}\n`;

      if (purchases[i].extras.length === 1) {
        if (purchases[i].extras[0] === "movie") {
          total = total + ticketData.extras.movie.priceInCents.child / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child)/100).toFixed(2)} (Movie Access)\n`;
        }
        if (purchases[i].extras[0] === "terrace") {
         total = total + ticketData.extras.terrace.priceInCents.child / 100;
         ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.child + ticketData.extras.terrace.priceInCents.child)/100).toFixed(2)} (Terrace Access)\n`;
        }
        if (purchases[i].extras[0] === "education") {
          total = total + ticketData.extras.education.priceInCents.child / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.child + ticketData.extras.education.priceInCents.child)/100).toFixed(2)} (Education Access)\n`;
        } 
      }        
    }
    if (purchases[i].ticketType === "membership" 
    && purchases[i].entrantType === "senior" ) {
      total = total + ticketData.membership.priceInCents.senior / 100;
      ticket = `${ticket}Senior Membership Admission: $${(ticketData.membership.priceInCents.senior / 100).toFixed(2)}\n`;

      if (purchases[i].extras.length === 1) {
        if (purchases[i].extras[0] === "movie") {
          total = total + ticketData.extras.movie.priceInCents.senior / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior)/100).toFixed(2)} (Movie Access)\n` ;
        }
        if (purchases[i].extras[0] === "terrace") {
         total = total + ticketData.extras.terrace.priceInCents.senior / 100;
         ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior)/100).toFixed(2)} (Terrace Access)\n` ;
        }
        if (purchases[i].extras[0] === "education") {
          total = total + ticketData.extras.education.priceInCents.senior / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.senior + ticketData.extras.education.priceInCents.senior)/100).toFixed(2)} (Education Access)\n` ;
        } 
      }
      if (purchases[i].extras.length === 2) {
        if (purchases[i].extras[0] === "movie" 
        && purchases[i].extras[1] === "education" ) {
          total = total + ticketData.extras.movie.priceInCents.senior / 100 + ticketData.extras.education.priceInCents.senior / 100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior)/100).toFixed(2)} (Movie Access, Education Access)\n` ;
        }
       if (purchases[i].extras[0] === "terrace" 
       && purchases[i].extras[1] === "education" ) {
          total = total + ticketData.extras.terrace.priceInCents.senior/100 + ticketData.extras.education.priceInCents.senior/100;
          ticket = `${ticket.slice("$",ticket.length - 6) + ((ticketData.membership.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior + ticketData.extras.education.priceInCents.senior)/100).toFixed(2)} (Terrace Access, Education Access)\n`;
        }
      }     
    }
  }
  return `${ticket}-------------------------------------------\nTOTAL: $${total.toFixed(2)}`;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
