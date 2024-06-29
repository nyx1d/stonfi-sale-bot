"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const constants = require("./constants.cjs");
const index = require("./v1/index.cjs");
const index$1 = require("./v2/index.cjs");
const DEX = {
  [constants.DEX_VERSION.v1]: index.DEX,
  [constants.DEX_VERSION.v2]: index$1.DEX
};
exports.DEX_TYPE = constants.DEX_TYPE;
exports.DEX_VERSION = constants.DEX_VERSION;
exports.DEX = DEX;
//# sourceMappingURL=index.cjs.map
