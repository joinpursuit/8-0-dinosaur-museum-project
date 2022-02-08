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

module.exports = tickets;

/*

Thank you for visiting the Dinosaur Museum!
\n-------------------------------------------
\nAdult General Admission: $50.00 (Movie Access, Terrace Access)
\nSenior General Admission: $35.00 (Terrace Access)
\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)
\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)
\n-------------------------------------------
\nTOTAL: $175.00"

*/


/*


${ticketInfo.ticketType.slice(1, ticketData.ticketType.length -1)}

*/
