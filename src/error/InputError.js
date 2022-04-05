class InputError extends Error {
  httpCode;

  constructor(name, message, httpCode) {
    super();
    this.name = name;
    this.message = message;
    this.httpCode = httpCode;
  }
}
module.exports = InputError;
