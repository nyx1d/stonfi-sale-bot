import { Address, address } from "@ton/ton";
function toAddress(addressValue) {
  if (addressValue instanceof Address) {
    return addressValue;
  }
  return address(addressValue.toString());
}
export {
  toAddress
};
//# sourceMappingURL=toAddress.js.map
