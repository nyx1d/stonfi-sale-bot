"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const DEX_OP_CODES = {
  SWAP: 630424929,
  CROSS_SWAP: 4294967279,
  PROVIDE_LP: 4244235663,
  CROSS_PROVIDE_LP: 4294967039,
  DIRECT_ADD_LIQUIDITY: 1291331587,
  REFUND_ME: 200537159,
  RESET_GAS: 1117846339,
  COLLECT_FEES: 533429565,
  BURN: 1499400124,
  WITHDRAW_FEE: 1173171655
};
const DEX_VERSION = {
  v1: "v1",
  v2: "v2"
};
const DEX_TYPE = {
  CPI: "constant_product"
};
exports.DEX_OP_CODES = DEX_OP_CODES;
exports.DEX_TYPE = DEX_TYPE;
exports.DEX_VERSION = DEX_VERSION;
//# sourceMappingURL=constants.cjs.map
