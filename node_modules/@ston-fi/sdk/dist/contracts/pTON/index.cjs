"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const PtonV1 = require("./v1/PtonV1.cjs");
const PtonV2 = require("./v2/PtonV2.cjs");
const constants = require("./constants.cjs");
const pTON = {
  [constants.pTON_VERSION.v1]: PtonV1.PtonV1,
  [constants.pTON_VERSION.v2]: PtonV2.PtonV2
};
exports.pTON_VERSION = constants.pTON_VERSION;
exports.pTON = pTON;
//# sourceMappingURL=index.cjs.map
