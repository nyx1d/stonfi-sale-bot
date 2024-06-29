import "../../index.js";
import { CPIPoolV2 } from "../pool/CPIPoolV2.js";
import { BaseRouterV2 } from "./BaseRouterV2.js";
import { DEX_TYPE } from "../../constants.js";
class CPIRouterV2 extends BaseRouterV2 {
  async getPool(provider, params) {
    const poolAddress = await this.getPoolAddressByJettonMinters(
      provider,
      params
    );
    return CPIPoolV2.create(poolAddress);
  }
}
CPIRouterV2.dexType = DEX_TYPE.CPI;
export {
  CPIRouterV2
};
//# sourceMappingURL=CPIRouterV2.js.map
