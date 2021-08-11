# Dinosaur Museum Extension

If you have completed all of the functions in Dinosaur Museum, congratulations! Now that you've completed the basic requirements, complete the following tasks to improve your project.

## Additional tasks

Each of the tasks below can be completed individually. You may accomplish any of the following in any order. For help, reach out to an instructor!

### organizeDinosaursByPeriod()

Write a function that will organize all of the dinosaurs by their `period` key. The function should return an object where the keys are the `period` values, and the values are an array of IDs.

```js
const result = organizeDinosaursByPeriod();
console.log(result);
/*
  {
    "Late Jurassic": [
      "YLtkN9R37",
      "GGvO1X9Zeh",
      "BFjjLjea-O",
      "iOVNUcv-ww",
      "V53DvdhV2A",
    ],
    "Late Cretaceous": [
      "WHQcpcOj0G",
      "GKl035EYKN",
      "2GglUqKT0G",
      "Pr6kc4Q_Xf",
      "ft5Gs5izdq",
      "wuL4ddBinQ",
    ],
    // ...
  }
*/
```

Then, add an optional parameter of `key` that, when set to a key inside of an individual dinosaur object, will return that value inside of the array instead of the IDs. Consider what you want to happen if someone enters a key that does not appear in the dinosaur object.

### validateMuseumPath()

Write a function that takes in an array of strings, where each string is a `roomId`. Assume that someone is attempting to go from room to room, starting with the room at index `0` and then preceding to the room at index `1`, and so on.

Return `true` if the path the person is trying to follow is possible. Otherwise, return `false`.

```js
const valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
validateMuseumPath(valid); //> true

const invalid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];
validateMuseumPath(invalid); //> false
```

Then, add an optional parameter that, when set to `true`, returns a string that describes the path if it is valid.

```js
const valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
validateMuseumPath(valid, true);
//> "Coat Check Room -> Ticket Center -> Kit Hopkins Education Wing -> Haley Hall"

const invalid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];
validateMuseumPath(invalid, true); //> false
```

Consider what edge cases could occur in this function. What if the array is empty? What if one of the IDs does not match with a room?

### ticketExtraDetails()

Write a new function called `ticketExtraDetails()` that takes a string as its argument. If that string matches one of the ticket "extras", provide information about what someone would be able to do based on purchasing that ticket. The format is up to you.

Make sure to only highlight the positives of buying the ticket.

```js
ticketExtraDetails("education");
//> "If you purchase this ticket extra you will gain access to 2 more rooms and see 2 more dinosaurs!

ticketExtraDetails("terrace");
//> "If you purchase this ticket extra you will gain access to 1 more room!
```

Then, update the function so that it can _also_ receive an array of ticket extras.

```js
ticketExtraDetails(["education", "terrace"]);
//> "If you purchase this ticket extra you will gain access to 3 more rooms and see 2 more dinosaurs!
```

Consider the edge cases for this function. For example, what happens if one of the keys doesn't match an extra?

### Use destructuring in your function signature

Object destructuring is a powerful tool that can make your code a bit shorter and cleaner. Use object destructuring to [assign multiple variables at once](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) or to [unpack fields from objects passed into your functions.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#unpacking_fields_from_objects_passed_as_a_function_parameter)

Where possible, apply this to your existing functions. If your functions were passing their tests before, they should still pass!