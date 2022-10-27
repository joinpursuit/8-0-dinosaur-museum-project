const {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
} = require("../src/01-dinosaur-facts");

// Dinosaur data
const dinosaurs = require("../data/dinosaurs");

describe.only("getLongestDinosaur()", () => {
  test("should return an object where the key is the tallest dinosaur name and the value is the length in feet", () => {
    const actual = getLongestDinosaur(dinosaurs);

    const keys = Object.keys(actual);
    expect(keys.length).toEqual(1);

    const name = keys[0];
    expect(name).toEqual("Brachiosaurus");
    expect(actual[name]).toBeCloseTo(98.42, 1);
  });

  test("should return the first dinosaur if there are multiples with the same length", () => {
    const input = [
      ...dinosaurs,
      {
        dinosaurId: "7ZJlPQZRL",
        name: "Tallosaurus",
        pronunciation: "TALL-o-SORE-us",
        meaningOfName: "Very tall dinosaur",
        diet: "herbivorous",
        lengthInMeters: 30,
        period: "Early Cretaceous",
        mya: [120, 110],
        info: "Not much is known about this dinosaur because it didn't exist.",
      },
    ];
    const actual = getLongestDinosaur(input);

    const keys = Object.keys(actual);
    expect(keys.length).toEqual(1);

    const name = keys[0];
    expect(name).toEqual("Brachiosaurus");
    expect(actual[name]).toBeCloseTo(98.42, 1);
  });

  test("should return an empty object if there are no dinosaurs", () => {
    const actual = getLongestDinosaur([]);
    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe("getDinosaurDescription()", () => {
  test("should return a string description of a dinosaur, by ID", () => {
    const id = "U9vuZmgKwUr";
    const actual = getDinosaurDescription(dinosaurs, id);
    const expected =
      "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago.";
    expect(actual).toEqual(expected);
  });

  test("should work for dinosaurs with only one value in `mya`", () => {
    const id = "GKl035EYKN";
    const actual = getDinosaurDescription(dinosaurs, id);
    const expected =
      "Elasmosaurus (ee-LAZ-mo-sore-us)\nElasmosaurus was an aquatic dinosaur with an extremely long neck that likely fed on other smaller aquatic fauna like fish, molluscs, and squid. E.D. Cope mistakenly placed the skull of an Elasmosaurus on the much shorter tail rather than the extremely long neck. It lived in the Late Cretaceous period, over 80.5 million years ago.";
    expect(actual).toEqual(expected);
  });

  test("should return an error message if the dinosaur cannot be found", () => {
    const id = "incorrect-id";
    const actual = getDinosaurDescription(dinosaurs, id);
    const expected = `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
    expect(actual).toEqual(expected);
  });

  test("should not mutate the original dinosaurs array", () => {
    const id = "YLtkN9R37";
    getDinosaurDescription(dinosaurs, id);

    const actual = dinosaurs[0];
    const expected = {
      dinosaurId: "YLtkN9R37",
      name: "Allosaurus",
      pronunciation: "AL-oh-sore-us",
      meaningOfName: "other lizard",
      diet: "carnivorous",
      lengthInMeters: 12,
      period: "Late Jurassic",
      mya: [156, 144],
      info: "Allosaurus was an apex predator in the Late Jurassic in North America.",
    };
    expect(actual).toEqual(expected);
    expect(actual.mya).toEqual(expected.mya);
  });
});

describe("getDinosaursAliveMya()", () => {
  test("should return the IDs of all dinosaurs that were alive approximately at the given time", () => {
    const mya = 150;
    const actual = getDinosaursAliveMya(dinosaurs, mya);
    const expected = ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"];

    expect(actual).toEqual(expected);
  });

  test("should include dinosaurs with only one `mya` year", () => {
    const mya = 66;
    const actual = getDinosaursAliveMya(dinosaurs, mya);
    const expected = ["WHQcpcOj0G", "2GglUqKT0G", "wuL4ddBinQ"];

    expect(actual).toEqual(expected);
  });

  test("if the `mya` key is an array of one number, should allow for 1 MYA less than the amount", () => {
    const mya = 65;
    const actual = getDinosaursAliveMya(dinosaurs, mya);
    const expected = ["WHQcpcOj0G"];

    expect(actual).toEqual(expected);
  });

  test("should return an empty array if the year does not match any", () => {
    const mya = 5;
    const actual = getDinosaursAliveMya(dinosaurs, mya);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  test("if the third argument is set, should replace the IDs with the value of the given key", () => {
    const mya = 66;
    const key = "name";
    const actual = getDinosaursAliveMya(dinosaurs, mya, key);
    const expected = ["Dracorex", "Indosuchus", "Tyrannosaurus"];

    expect(actual).toEqual(expected);
  });

  test("if the third argument is set, but to a key that doesn't return a value, should return the IDs", () => {
    const mya = 66;
    const key = "name";
    const actual = getDinosaursAliveMya(dinosaurs, mya, key);
    const expected = ["Dracorex", "Indosuchus", "Tyrannosaurus"];

    expect(actual).toEqual(expected);
  });
});
