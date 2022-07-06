

const tickets = {
    general: {
      description: "General Admission",
      priceInCents: {
        child: 2000,
        adult: 3000,
        senior: 2500,
      },
    },
    membership: {
      description: "Membership Admission",
      priceInCents: {
        child: 1500,
        adult: 2800,
        senior: 2300,
      },
    },
    extras: {
      movie: {
        description: "Movie Access",
        priceInCents: {
          child: 1000,
          adult: 1000,
          senior: 1000,
        },
      },
      education: {
        description: "Education Access",
        priceInCents: {
          child: 1000,
          adult: 1200,
          senior: 1200,
        },
      },
      terrace: {
        description: "Terrace Access",
        priceInCents: {
          child: 500,
          adult: 1000,
          senior: 1000,
        },
      },
    },
  };



  const purchases = [
    {
      ticketType: "general",
      entrantType: "adult",
      extras: ["movie", "terrace"],
    },
    {
      ticketType: "general",
      entrantType: "senior",
      extras: [],
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

  function purchaseTickets(ticketData, purchases) {
    let finalPrice = 0
    let extrasPrice = []
    let extrasTotal = 0
    let extrasArr = []
    let extrasString = ``
    let ticketType = [] // general, membership, extras
    let extrasName = [] // movie, education, terrace
    let entrantType = [] // child, adult, senior



    for(const key in ticketData){
        ticketType.push(key)
      }
      for(const extra in ticketData[`extras`]){
        extrasName.push(extra)
        for(const entrant in ticketData[`extras`][extra][`priceInCents`]){
          if(!entrantType.includes(entrant)){
            entrantType.push(entrant)
          }
        }
      }

      for(const ticket of purchases){
        if(!ticketType.includes(ticket.ticketType)){
            return `Ticket type '${ticket.ticketType}' cannot be found.`
        }
        if(!entrantType.includes(ticket.entrantType)){
            return `Entrant type '${ticket.entrantType}' cannot be found.`
        }
        for(const extras of ticket.extras){
            if(!extrasName.includes(extras)){
                return `Extra type '${extras}' cannot be found.`
            }
            else{
                finalPrice += ticketData[`extras`][extras][`priceInCents`][ticket.entrantType]
                extrasTotal += ticketData[`extras`][extras][`priceInCents`][ticket.entrantType]
                extrasString += `${ticketData[`extras`][extras][`description`]}, ` 
            }
        }
        finalPrice += ticketData[ticket.ticketType][`priceInCents`][ticket.entrantType]
        extrasPrice.push(`$${((extrasTotal + ticketData[ticket.ticketType][`priceInCents`][ticket.entrantType]) / 100).toFixed(2)}`)
        extrasArr.push(`${extrasString.slice(0, -2) +``.trim()}`)
        extrasTotal = 0
        extrasString = ``
    }
    
    let receipt = ``

    for(let i = 0; i < purchases.length; i++){
        purchases[i].entrantType = `${purchases[i].entrantType.charAt(0).toUpperCase()}${purchases[i].entrantType.slice(1)}`
        if(purchases[i].extras.length === 0){
            receipt += `${purchases[i].entrantType} ${ticketData[purchases[i].ticketType][`description`]}: ${extrasPrice[i]}\n`
        }
        else{
            receipt += `${purchases[i].entrantType} ${ticketData[purchases[i].ticketType][`description`]}: ${extrasPrice[i]} (${extrasArr[i]})\n`
        }
    }
    return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(finalPrice /100).toFixed(2)}`
}
   
     

console.log(purchaseTickets(tickets, purchases))

/*"Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00" */
