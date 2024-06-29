import { DEX_TYPE } from "../../constants.js";
import { BasePoolV2 } from "./BasePoolV2.js";
class CPIPoolV2 extends BasePoolV2 {
  async getPoolData(provider) {
    const data = await this.implGetPoolData(provider);
    return {
      ...data.commonPoolData
    };
  }
}
CPIPoolV2.dexType = DEX_TYPE.CPI;
export {
  CPIPoolV2
};
//# sourceMappingURL=CPIPoolV2.js.map
