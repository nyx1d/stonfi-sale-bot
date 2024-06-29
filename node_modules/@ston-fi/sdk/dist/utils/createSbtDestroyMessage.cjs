"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
function createSbtDestroyMessage(params) {
  return ton.beginCell().storeUint(520377210, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
}
exports.createSbtDestroyMessage = createSbtDestroyMessage;
//# sourceMappingURL=createSbtDestroyMessage.cjs.map
