const expect = require("unexpected")
  .clone()
  .use(require("unexpected-express"));

const intersectionHandler = require("../../lib/handlers/intersection");

describe("intersection", () => {
  it("should respond", () => {
    return expect(intersectionHandler({}), "to yield exchange", {
      request: "/",
      response: 200
    });
  });
});
