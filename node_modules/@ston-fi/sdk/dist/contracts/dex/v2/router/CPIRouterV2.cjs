"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../index.cjs");
const CPIPoolV2 = require("../pool/CPIPoolV2.cjs");
const BaseRouterV2 = require("./BaseRouterV2.cjs");
const constants = require("../../constants.cjs");
class CPIRouterV2 extends BaseRouterV2.BaseRouterV2 {
  async getPool(provider, params) {
    const poolAddress = await this.getPoolAddressByJettonMinters(
      provider,
      params
    );
    return CPIPoolV2.CPIPoolV2.create(poolAddress);
  }
}
CPIRouterV2.dexType = constants.DEX_TYPE.CPI;
exports.CPIRouterV2 = CPIRouterV2;
//# sourceMappingURL=CPIRouterV2.cjs.map
