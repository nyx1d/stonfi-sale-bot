import { toAddress } from "../../utils/toAddress.js";
class Contract {
  constructor(address, options) {
    this.address = toAddress(address);
  }
  static create(address) {
    return new this(address);
  }
}
export {
  Contract
};
//# sourceMappingURL=Contract.js.map
