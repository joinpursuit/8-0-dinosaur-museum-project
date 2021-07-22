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
