const fs = require("fs");
const vm = require("vm");

describe("COLORS Lab frontend unit tests", () => {
  test("addColor sends the correct color and user ID", () => {
    const elements = {
      colorText: { value: "Blue" },
      colorAddResult: { innerHTML: "" },
    };

    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
    };

    const context = vm.createContext({
      document: {
        getElementById: jest.fn((id) => elements[id]),
      },
      XMLHttpRequest: jest.fn(() => mockXHR),
    });

    const source = fs.readFileSync(
      require.resolve("./code.js"),
      "utf8"
    );

    vm.runInContext(source, context);

    // Set the simulated logged-in user's ID.
    vm.runInContext("userId = 5", context);

    // Execute the actual addColor function.
    vm.runInContext("addColor()", context);

    expect(mockXHR.open).toHaveBeenCalledWith(
      "POST",
      "http://COP4331-5.com/LAMPAPI/AddColor.php",
      true
    );

    const payload = JSON.parse(mockXHR.send.mock.calls[0][0]);

    expect(payload).toEqual({
      color: "Blue",
      userId: 5,
    });
  });
});