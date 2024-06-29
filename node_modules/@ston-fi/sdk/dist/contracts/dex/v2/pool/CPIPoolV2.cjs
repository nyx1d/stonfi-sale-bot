"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const constants = require("../../constants.cjs");
const BasePoolV2 = require("./BasePoolV2.cjs");
class CPIPoolV2 extends BasePoolV2.BasePoolV2 {
  async getPoolData(provider) {
    const data = await this.implGetPoolData(provider);
    return {
      ...data.commonPoolData
    };
  }
}
CPIPoolV2.dexType = constants.DEX_TYPE.CPI;
exports.CPIPoolV2 = CPIPoolV2;
//# sourceMappingURL=CPIPoolV2.cjs.map
