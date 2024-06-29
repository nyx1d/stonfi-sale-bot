import { beginCell } from "@ton/ton";
import { toAddress } from "./toAddress.js";
function createJettonTransferMessage(params) {
  const builder = beginCell();
  builder.storeUint(260734629, 32);
  builder.storeUint(params.queryId, 64);
  builder.storeCoins(BigInt(params.amount));
  builder.storeAddress(toAddress(params.destination));
  builder.storeAddress(
    params.responseDestination ? toAddress(params.responseDestination) : void 0
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
export {
  createJettonTransferMessage
};
//# sourceMappingURL=createJettonTransferMessage.js.map
