const expect = require("unexpected")
  .clone()
  .use(require("unexpected-express"));
const sinon = require("sinon");

const intersectionHandler = require("../../lib/handlers/intersection");

const createMockIntersector = () => ({
  findNearestLocation: sinon.stub().named("findNearestLocation")
});

describe("intersection", () => {
  let intersector;

  beforeEach(() => {
    intersector = createMockIntersector();
  });

  it("should respond", () => {
    intersector.findNearestLocation.returns({ bob: 1, alice: 0 });

    return expect(intersectionHandler({ intersector }), "to yield exchange", {
      request: "/?long=0&lat=0",
      response: {
        statusCode: 200,
        headers: {
          "Content-Type": /^application\/json/
        },
        body: { bob: 1, alice: 0 }
      }
    });
  });
});
