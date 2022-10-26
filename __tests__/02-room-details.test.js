const {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
} = require("../src/02-room-details");

// Data
const dinosaurs = require("../data/dinosaurs");
const rooms = require("../data/rooms");

describe.only("getRoomByDinosaurName()", () => {
  test("should return the name of the room where the given dinosaur can be found", () => {
    const name = "Tyrannosaurus";
    const actual = getRoomByDinosaurName(dinosaurs, rooms, name);
    const expected = "Roberts Room";
    expect(actual).toEqual(expected);
  });

  test("should work for other dinosaurs", () => {
    expect(getRoomByDinosaurName(dinosaurs, rooms, "Parasaurolophus")).toEqual(
      "Reyes Hall"
    );

    expect(getRoomByDinosaurName(dinosaurs, rooms, "Khaan")).toEqual(
      "Haley Hall"
    );
  });

  test("should return an error message if the dinosaur cannot be found at all", () => {
    const name = "Pterodactyl";
    const actual = getRoomByDinosaurName(dinosaurs, rooms, name);
    const expected = `Dinosaur with name 'Pterodactyl' cannot be found.`;
    expect(actual).toEqual(expected);
  });

  test("should return an error message if the dinosaur cannot be found in any room", () => {
    const input = [
      {
        roomId: "xwG7O4wQl",
        name: "Room A",
        requiredTicketPermissions: [],
        dinosaurs: [],
        connectsTo: [
          "GHPLI7EmD", // Room B
          "eU46gvYUF", // Room C
        ],
      },
    ];
    const name = "Tyrannosaurus";
    const actual = getRoomByDinosaurName(dinosaurs, input, name);
    const expected = `Dinosaur with name 'Tyrannosaurus' cannot be found in any rooms.`;
    expect(actual).toEqual(expected);
  });
});

describe("getConnectedRoomNamesById()", () => {
  test("should return the names of all rooms connected to the given room by ID", () => {
    const id = "A6QaYdyKra"; // Ticket Center
    const actual = getConnectedRoomNamesById(rooms, id);
    const expected = [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing",
    ];
    expect(actual).toEqual(expected);
  });

  test("should work for other rooms", () => {
    expect(
      getConnectedRoomNamesById(rooms, "aIA6tevTne") // Coat Check
    ).toEqual(["Ticket Center"]);

    expect(
      getConnectedRoomNamesById(rooms, "qi5e4IFDby") // Bryan Decker Hall
    ).toEqual(["Reyes Hall"]);
  });

  test("if initial room ID is incorrect, should return an error message", () => {
    const id = "incorrect-id";
    const actual = getConnectedRoomNamesById(rooms, id);
    const expected = `Room with ID of '${id}' could not be found.`;
    expect(actual).toEqual(expected);
  });

  test("if connected room ID is incorrect, should return an error message", () => {
    const input = [
      {
        roomId: "xwG7O4wQl",
        name: "Room A",
        requiredTicketPermissions: [],
        dinosaurs: [],
        connectsTo: [
          "GHPLI7EmD", // Room B
          "eU46gvYUF", // Room C
          "incorrect-id", // Incorrect Room. Does not exist.
        ],
      },
      {
        roomId: "GHPLI7EmD",
        name: "Room B",
        requiredTicketPermissions: [],
        dinosaurs: [],
        connectsTo: [
          "xwG7O4wQl", // Room A
        ],
      },
      {
        roomId: "eU46gvYUF", // 3
        name: "Room C",
        requiredTicketPermissions: [],
        dinosaurs: [],
        connectsTo: [
          "xwG7O4wQl", // Room A
        ],
      },
    ];
    const id = "xwG7O4wQl";
    const actual = getConnectedRoomNamesById(input, id);
    const expected = `Room with ID of 'incorrect-id' could not be found.`;
    expect(actual).toEqual(expected);
  });
});
