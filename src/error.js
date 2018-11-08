export class ApiHttpError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  toString() {
    return `${this.code} ${this.message}`;
  }
}

export class ApiResultError {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  toString() {
    return `${this.code} ${this.message}`;
  }
}
