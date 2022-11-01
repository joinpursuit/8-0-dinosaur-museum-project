const {
  calculateTicketPrice,
  purchaseTickets,
} = require("../src/03-ticket-calculator");

// Ticket data
const tickets = require("../data/tickets");

describe("calculateTicketPrice()", () => {
  describe("errors", () => {
    test("ticket type does not match an existing ticket type", () => {
      const ticketInfo = {
        ticketType: "incorrect-type",
        entrantType: "child",
        extras: [],
      };
      const actual = calculateTicketPrice(tickets, ticketInfo);
      const expected = "Ticket type 'incorrect-type' cannot be found.";
      expect(actual).toEqual(expected);
    });

    test("entrant type does not match an existing entrant type", () => {
      const ticketInfo = {
        ticketType: "general",
        entrantType: "incorrect-entrant",
        extras: [],
      };
      const actual = calculateTicketPrice(tickets, ticketInfo);
      const expected = "Entrant type 'incorrect-entrant' cannot be found.";
      expect(actual).toEqual(expected);
    });

    test("extra type does not match an existing extra type", () => {
      const ticketInfo = {
        ticketType: "general",
        entrantType: "adult",
        extras: ["incorrect-extra"],
      };
      const actual = calculateTicketPrice(tickets, ticketInfo);
      const expected = "Extra type 'incorrect-extra' cannot be found.";
      expect(actual).toEqual(expected);
    });
  });

  describe("no extras", () => {
    describe("general admission", () => {
      test("should calculate a child general admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "general",
          entrantType: "child",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 2000;
        expect(actual).toEqual(expected);
      });

      test("should calculate an adult general admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "general",
          entrantType: "adult",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 3000;
        expect(actual).toEqual(expected);
      });

      test("should calculate a senior general admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "general",
          entrantType: "senior",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 2500;
        expect(actual).toEqual(expected);
      });
    });

    describe("membership admission", () => {
      test("should calculate a child membership admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "membership",
          entrantType: "child",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 1500;
        expect(actual).toEqual(expected);
      });

      test("should calculate an adult membership admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "membership",
          entrantType: "adult",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 2800;
        expect(actual).toEqual(expected);
      });

      test("should calculate a senior membership admission ticket without any addons", () => {
        const ticketInfo = {
          ticketType: "membership",
          entrantType: "senior",
          extras: [],
        };
        const actual = calculateTicketPrice(tickets, ticketInfo);
        const expected = 2300;
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("with extras", () => {
    describe("general admission", () => {
      test("should calculate a general admission ticket with the movie extra", () => {
        // Child General Admission Ticket
        const childTicketInfo = {
          ticketType: "general",
          entrantType: "child",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(3000);

        // Adult General Admission Ticket
        const adultTicketInfo = {
          ticketType: "general",
          entrantType: "adult",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(4000);

        // Senior General Admission Ticket
        const seniorTicketInfo = {
          ticketType: "general",
          entrantType: "senior",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(3500);
      });

      test("should calculate a general admission ticket with the movie and education extra", () => {
        // Child General Admission Ticket
        const childTicketInfo = {
          ticketType: "general",
          entrantType: "child",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(4000);

        // Adult General Admission Ticket
        const adultTicketInfo = {
          ticketType: "general",
          entrantType: "adult",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(5200);

        // Senior General Admission Ticket
        const seniorTicketInfo = {
          ticketType: "general",
          entrantType: "senior",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(4700);
      });

      test("should calculate a general admission ticket with the terrace and education extra", () => {
        // Child General Admission Ticket
        const childTicketInfo = {
          ticketType: "general",
          entrantType: "child",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(3500);

        // Adult General Admission Ticket
        const adultTicketInfo = {
          ticketType: "general",
          entrantType: "adult",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(5200);

        // Senior General Admission Ticket
        const seniorTicketInfo = {
          ticketType: "general",
          entrantType: "senior",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(4700);
      });

      test("should calculate a general admission ticket with all of the extras", () => {
        // Child General Admission Ticket
        const childTicketInfo = {
          ticketType: "general",
          entrantType: "child",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(4500);

        // Adult General Admission Ticket
        const adultTicketInfo = {
          ticketType: "general",
          entrantType: "adult",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(6200);

        // Senior General Admission Ticket
        const seniorTicketInfo = {
          ticketType: "general",
          entrantType: "senior",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(5700);
      });
    });

    describe("membership admission", () => {
      test("should calculate a membership admission ticket with the movie extra", () => {
        // Child Membership Admission Ticket
        const childTicketInfo = {
          ticketType: "membership",
          entrantType: "child",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(2500);

        // Adult Membership Admission Ticket
        const adultTicketInfo = {
          ticketType: "membership",
          entrantType: "adult",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(3800);

        // Senior Membership Admission Ticket
        const seniorTicketInfo = {
          ticketType: "membership",
          entrantType: "senior",
          extras: ["movie"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(3300);
      });

      test("should calculate a membership admission ticket with the movie and education extra", () => {
        // Child Membership Admission Ticket
        const childTicketInfo = {
          ticketType: "membership",
          entrantType: "child",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(3500);

        // Adult Membership Admission Ticket
        const adultTicketInfo = {
          ticketType: "membership",
          entrantType: "adult",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(5000);

        // Senior Membership Admission Ticket
        const seniorTicketInfo = {
          ticketType: "membership",
          entrantType: "senior",
          extras: ["movie", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(4500);
      });

      test("should calculate a membership admission ticket with the terrace and education extra", () => {
        // Child Membership Admission Ticket
        const childTicketInfo = {
          ticketType: "membership",
          entrantType: "child",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(3000);

        // Adult Membership Admission Ticket
        const adultTicketInfo = {
          ticketType: "membership",
          entrantType: "adult",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(5000);

        // Senior Membership Admission Ticket
        const seniorTicketInfo = {
          ticketType: "membership",
          entrantType: "senior",
          extras: ["terrace", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(4500);
      });

      test("should calculate a membership admission ticket with all of the extras", () => {
        // Child Membership Admission Ticket
        const childTicketInfo = {
          ticketType: "membership",
          entrantType: "child",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, childTicketInfo)).toEqual(4000);

        // Adult Membership Admission Ticket
        const adultTicketInfo = {
          ticketType: "membership",
          entrantType: "adult",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, adultTicketInfo)).toEqual(6000);

        // Senior Membership Admission Ticket
        const seniorTicketInfo = {
          ticketType: "membership",
          entrantType: "senior",
          extras: ["terrace", "movie", "education"],
        };
        expect(calculateTicketPrice(tickets, seniorTicketInfo)).toEqual(5500);
      });
    });
  });
});

describe("purchaseTickets()", () => {
  describe("errors", () => {
    test("should surface errors from calculateTicketPrice()", () => {
      // Incorrect ticket type
      const incorrectTicketType = {
        ticketType: "incorrect-type",
        entrantType: "child",
        extras: [],
      };
      expect(purchaseTickets(tickets, [incorrectTicketType])).toEqual(
        "Ticket type 'incorrect-type' cannot be found."
      );

      // Incorrect entrant type
      const incorrectEntrant = {
        ticketType: "general",
        entrantType: "incorrect-entrant",
        extras: [],
      };
      expect(purchaseTickets(tickets, [incorrectEntrant])).toEqual(
        "Entrant type 'incorrect-entrant' cannot be found."
      );

      // Incorrect extra type
      const incorrectAddOn = {
        ticketType: "general",
        entrantType: "adult",
        extras: ["incorrect-extra"],
      };
      expect(purchaseTickets(tickets, [incorrectAddOn])).toEqual(
        "Extra type 'incorrect-extra' cannot be found."
      );
    });
  });

  describe("no extras", () => {
    describe("general admission", () => {
      test("prints a receipt for a 1 Adult General Admission ticket", () => {
        const ticketInfo = [
          {
            ticketType: "general",
            entrantType: "adult",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $30.00\n-------------------------------------------\nTOTAL: $30.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for a 2 Adult General Admission tickets", () => {
        const ticketInfo = [
          {
            ticketType: "general",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "general",
            entrantType: "adult",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $30.00\nAdult General Admission: $30.00\n-------------------------------------------\nTOTAL: $60.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for multiple general admission tickets", () => {
        const ticketInfo = [
          {
            ticketType: "general",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "general",
            entrantType: "senior",
            extras: [],
          },
          {
            ticketType: "general",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "general",
            entrantType: "child",
            extras: [],
          },
          {
            ticketType: "general",
            entrantType: "child",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $30.00\nSenior General Admission: $25.00\nAdult General Admission: $30.00\nChild General Admission: $20.00\nChild General Admission: $20.00\n-------------------------------------------\nTOTAL: $125.00";
        expect(actual).toEqual(expected);
      });
    });

    describe("membership", () => {
      test("prints a receipt for a 1 Adult Membership Admission ticket", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult Membership Admission: $28.00\n-------------------------------------------\nTOTAL: $28.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for a 2 Adult Membership Admission tickets", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult Membership Admission: $28.00\nAdult Membership Admission: $28.00\n-------------------------------------------\nTOTAL: $56.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for multiple membership admission tickets", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "membership",
            entrantType: "senior",
            extras: [],
          },
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: [],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: [],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: [],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult Membership Admission: $28.00\nSenior Membership Admission: $23.00\nAdult Membership Admission: $28.00\nChild Membership Admission: $15.00\nChild Membership Admission: $15.00\n-------------------------------------------\nTOTAL: $109.00";
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("with extras", () => {
    describe("general admission", () => {
      test("prints a receipt for 1 Adult General Admission ticket with a single extra", () => {
        const ticketInfo = [
          {
            ticketType: "general",
            entrantType: "adult",
            extras: ["movie"],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $40.00 (Movie Access)\n-------------------------------------------\nTOTAL: $40.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for 1 Adult General Admission ticket with multiple extras", () => {
        const ticketInfo = [
          {
            ticketType: "general",
            entrantType: "adult",
            extras: ["movie", "terrace"],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $50.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for multiple general tickets with multiple extras", () => {
        const ticketInfo = [
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
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00";
        expect(actual).toEqual(expected);
      });
    });

    describe("membership admission", () => {
      test("prints a receipt for 1 Adult Membership Admission ticket with a single extra", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: ["movie"],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult Membership Admission: $38.00 (Movie Access)\n-------------------------------------------\nTOTAL: $38.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for 1 Adult Membership Admission ticket with multiple extras", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: ["movie", "terrace"],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult Membership Admission: $48.00 (Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $48.00";
        expect(actual).toEqual(expected);
      });

      test("prints a receipt for multiple membership tickets with multiple extras", () => {
        const ticketInfo = [
          {
            ticketType: "membership",
            entrantType: "senior",
            extras: ["terrace", "education"],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: ["education"],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: ["education"],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: ["education"],
          },
          {
            ticketType: "membership",
            entrantType: "child",
            extras: ["education"],
          },
          {
            ticketType: "membership",
            entrantType: "adult",
            extras: ["terrace", "education"],
          },
        ];
        const actual = purchaseTickets(tickets, ticketInfo);
        const expected =
          "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nSenior Membership Admission: $45.00 (Terrace Access, Education Access)\nChild Membership Admission: $25.00 (Education Access)\nChild Membership Admission: $25.00 (Education Access)\nChild Membership Admission: $25.00 (Education Access)\nChild Membership Admission: $25.00 (Education Access)\nAdult Membership Admission: $50.00 (Terrace Access, Education Access)\n-------------------------------------------\nTOTAL: $195.00";
        expect(actual).toEqual(expected);
      });
    });
  });
});
