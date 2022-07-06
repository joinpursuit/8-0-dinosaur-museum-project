

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



const ticketInfo = {
        ticketType: "party",
        entrantType: "senior",
        extras: ["movie",`education`],
      };

      function calculateTicketPrice(ticketData, ticketInfo) {
        let price = 0
        
        let extrasName = [] // movie/ education/ terrace
        let ticketType = [] // general, memebership, extras
        let entrantType = [] // child, adult, senior
        
        for(const extra in ticketData[`extras`]){
            extrasName.push(extra)
            for(const entrant in ticketData[`extras`][extra][`priceInCents`]){
                if(entrantType.includes(entrant)){
                    continue;
                }
                entrantType.push(entrant)
            }
        }
        for(const key in ticketData){
            ticketType.push(key)
        }

        if(!(entrantType.includes(ticketInfo.entrantType))){
            return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
        }
        if((ticketType.includes(ticketInfo.ticketType))){
            price += ticketData[ticketInfo.ticketType][`priceInCents`][ticketInfo.entrantType]
        }
        else if (!(ticketType.includes(ticketInfo.ticketType)) && ticketInfo.extras.length === 0){
            return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
        }
        if(ticketInfo.extras.length > 0){
            for(const extras of ticketInfo.extras){
                if((extrasName.includes(extras))){
                    price += ticketData[`extras`][extras][`priceInCents`][ticketInfo.entrantType]
                }
                else{
                    return `Extra type '${extras}' cannot be found.`
                }
            }
        }
        return price
      }

console.log(calculateTicketPrice(tickets, ticketInfo))
