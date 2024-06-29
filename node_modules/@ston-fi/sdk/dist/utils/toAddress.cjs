"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
function toAddress(addressValue) {
  if (addressValue instanceof ton.Address) {
    return addressValue;
  }
  return ton.address(addressValue.toString());
}
exports.toAddress = toAddress;
//# sourceMappingURL=toAddress.cjs.map
