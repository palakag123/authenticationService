const handlers = require("../handlers/authentication.handler");
const services = require("../services/authentication.service");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.header = jest.fn().mockReturnValue(res);
  return res;
};
describe("getCredentials Function", () => {
  it("should send 404 response status if users are not found", async () => {
    jest.spyOn(services, "getCredentials").mockResolvedValue([]);
    const res = mockResponse();
    await handlers.getCredentials("", res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("no credentials in list");
  });
  it("should send 200 response status if users are returned ", async () => {
    const user = [
      {
        username: "palak",
        password: "palak",
      },
    ];
    // const token = "abc";
    jest.spyOn(services, "getCredentials").mockResolvedValue(user);
    const res = mockResponse();
    await handlers.getCredentials("", res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });
  it("should send 500 response status if some error is thrown", async () => {
    jest
      .spyOn(services, "getCredentials")
      .mockRejectedValue(new Error("Some error!"));
    const res = mockResponse();
    await handlers.getCredentials("", res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Some error!");
  });
});

describe("validateCredentials Function", () => {
  it("should send 200 response and token status if users is correct ", async () => {
    //   const user = [
    //     {
    //       username: "palak",
    //       password: "palak",
    //     },
    //   ];
    const req = {
      body: {
        username: "palak",
        password: "palak",
      },
    };
    const token = "abc";
    const tokenJson = { token };
    jest.spyOn(services, "validateCredentials").mockResolvedValue(token);
    const res = mockResponse();
    await handlers.validateCredentials(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.header).toHaveBeenCalledWith("token", token);
    expect(res.json).toHaveBeenCalledWith(tokenJson);
  });
  it("should send 500 response status if some error is thrown", async () => {
    jest
      .spyOn(services, "validateCredentials")
      .mockRejectedValue(new Error("Some error!"));
    const res = mockResponse();
    await handlers.validateCredentials("", res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Some error!");
  });
});
