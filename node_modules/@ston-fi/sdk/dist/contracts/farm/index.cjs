"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./v1/index.cjs");
const index$1 = require("./v2/index.cjs");
const index$2 = require("./v3/index.cjs");
const constants = require("./constants.cjs");
const FARM = {
  [constants.FARM_VERSION.v1]: index.FARM,
  [constants.FARM_VERSION.v2]: index$1.FARM,
  [constants.FARM_VERSION.v3]: index$2.FARM
};
exports.FARM_VERSION = constants.FARM_VERSION;
exports.FARM = FARM;
//# sourceMappingURL=index.cjs.map
