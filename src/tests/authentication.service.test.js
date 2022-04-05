const services = require("../services/authentication.service");
const { credentials } = require("../../models");

describe("validateCredentials function", () => {
  it("should return token if username and pw correct", async () => {
    jest.spyOn(credentials, "findAll").mockResolvedValue({
      username: "test",
      password: "test",
    });

    expect(await services.validateCredentials("test", "test")).toEqual(
      // eslint-disable-next-line comma-dangle
      "1392542397501e1158418adae09d694ffb8ed833a3a5e8a017e15ba565d28c70"
    );
  });

  it("should return user does not exist if wrong username", async () => {
    jest
      .spyOn(credentials, "findAll")
      .mockRejectedValue(new Error("Some error!"));
    try {
      await services.validateCredentials("blah", "test");
    } catch (err) {
      expect(err.message).toEqual("Some error!");
    }
  });

  it("should return user does not exist if wrong username", async () => {
    jest
      .spyOn(credentials, "findAll")
      .mockRejectedValue(new Error("Some error!"));
    try {
      await services.validateCredentials("test", "blah");
    } catch (err) {
      expect(err.message).toEqual("Some error!");
    }
  });
});
