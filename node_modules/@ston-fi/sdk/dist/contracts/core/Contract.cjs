"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const toAddress = require("../../utils/toAddress.cjs");
class Contract {
  constructor(address, options) {
    this.address = toAddress.toAddress(address);
  }
  static create(address) {
    return new this(address);
  }
}
exports.Contract = Contract;
//# sourceMappingURL=Contract.cjs.map
