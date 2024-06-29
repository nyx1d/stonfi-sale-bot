"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const toAddress = require("./toAddress.cjs");
function createJettonTransferMessage(params) {
  const builder = ton.beginCell();
  builder.storeUint(260734629, 32);
  builder.storeUint(params.queryId, 64);
  builder.storeCoins(BigInt(params.amount));
  builder.storeAddress(toAddress.toAddress(params.destination));
  builder.storeAddress(
    params.responseDestination ? toAddress.toAddress(params.responseDestination) : void 0
  );
  if (params.customPayload) {
    builder.storeBit(true);
    builder.storeRef(params.customPayload);
  } else {
    builder.storeBit(false);
  }
  builder.storeCoins(BigInt(params.forwardTonAmount));
  if (params.forwardPayload) {
    builder.storeBit(true);
    builder.storeRef(params.forwardPayload);
  } else {
    builder.storeBit(false);
  }
  return builder.endCell();
}
exports.createJettonTransferMessage = createJettonTransferMessage;
//# sourceMappingURL=createJettonTransferMessage.cjs.map
