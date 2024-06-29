"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const createSbtDestroyMessage = require("../../../utils/createSbtDestroyMessage.cjs");
const constants = require("../constants.cjs");
const FarmNftItemV1 = require("../v1/FarmNftItemV1.cjs");
class FarmNftItemV2 extends FarmNftItemV1.FarmNftItemV1 {
  async createDestroyBody(params) {
    return createSbtDestroyMessage.createSbtDestroyMessage({
      queryId: (params == null ? void 0 : params.queryId) ?? 0
    });
  }
  /**
   * Build all data required to execute a `destroy` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; amount of gas for the transaction (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `destroy` transaction.
   */
  async getDestroyTxParams(provider, params) {
    const to = this.address;
    const body = await this.createDestroyBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.destroy);
    return { to, value, body };
  }
  async sendDestroy(provider, via, params) {
    const txParams = await this.getDestroyTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * @returns structure containing current state of the farm NFT
   *
   * @property {number} status Status of the contract: uninitialized `0`, active `1`, unstaked `2`, claiming `3`
   * @property {bigint} revokeTime Timestamp of unstake
   * @property {bigint} stakedTokens Amount of staked tokens
   * @property {bigint} claimedPerUnitNanorewards `accrued_per_unit_nanorewards` at the time the user made the stake or last claimed rewards
   * @property {bigint} stakeDate Timestamp in which the owner started staking
   * @property {boolean} isSoulbound If nft is soulbound; Always true in V2
   */
  async getFarmingData(provider) {
    const result = await provider.get("get_farming_data", []);
    return {
      status: result.stack.readNumber(),
      revokeTime: result.stack.readBigNumber(),
      stakedTokens: result.stack.readBigNumber(),
      claimedPerUnitNanorewards: result.stack.readBigNumber(),
      stakeDate: result.stack.readBigNumber(),
      isSoulbound: true
      // NFTs are always soulbound in V2
    };
  }
}
FarmNftItemV2.version = constants.FARM_VERSION.v2;
exports.FarmNftItemV2 = FarmNftItemV2;
//# sourceMappingURL=FarmNftItemV2.cjs.map
