"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const Contract = require("../../core/Contract.cjs");
const constants = require("../constants.cjs");
const _FarmNftItemV1 = class _FarmNftItemV12 extends Contract.Contract {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._FarmNftItemV12.gasConstants,
      ...gasConstants
    };
  }
  async createClaimRewardsBody(params) {
    return ton.beginCell().storeUint(constants.FARM_OP_CODES.CLAIM_REWARDS, 32).storeUint(BigInt((params == null ? void 0 : params.queryId) ?? 0), 64).endCell();
  }
  /**
   * Build all data required to execute a `claim_rewards` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `claim_rewards` transaction.
   */
  async getClaimRewardsTxParams(provider, params) {
    const to = this.address;
    const body = await this.createClaimRewardsBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.claimRewards);
    return { to, value, body };
  }
  async sendClaimRewards(provider, via, params) {
    const txParams = await this.getClaimRewardsTxParams(provider, params);
    return via.send(txParams);
  }
  async createUnstakeBody(params) {
    return ton.beginCell().storeUint(constants.FARM_OP_CODES.UNSTAKE, 32).storeUint(BigInt((params == null ? void 0 : params.queryId) ?? 0), 64).endCell();
  }
  /**
   * Build all data required to execute a `unstake` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `unstake` transaction.
   */
  async getUnstakeTxParams(provider, params) {
    const to = this.address;
    const body = await this.createUnstakeBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.unstake);
    return { to, value, body };
  }
  async sendUnstake(provider, via, params) {
    const txParams = await this.getUnstakeTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * @returns structure containing current state of the farm NFT
   *
   * @property {number} status Status of the contract: uninitialized `0`, active `1`, unstaked `2`, claiming `3`
   * @property {boolean} isSoulbound If nft is soulbound
   * @property {bigint} stakedTokens Amount of staked tokens
   * @property {bigint} claimedPerUnitNanorewards `accrued_per_unit_nanorewards` at the time the user made the stake or last claimed rewards
   */
  async getFarmingData(provider) {
    const result = await provider.get("get_farming_data", []);
    return {
      status: result.stack.readNumber(),
      isSoulbound: result.stack.readBoolean(),
      stakedTokens: result.stack.readBigNumber(),
      claimedPerUnitNanorewards: result.stack.readBigNumber()
    };
  }
};
_FarmNftItemV1.version = constants.FARM_VERSION.v1;
_FarmNftItemV1.gasConstants = {
  claimRewards: ton.toNano("0.3"),
  unstake: ton.toNano("0.4"),
  destroy: ton.toNano("0.05")
};
let FarmNftItemV1 = _FarmNftItemV1;
exports.FarmNftItemV1 = FarmNftItemV1;
//# sourceMappingURL=FarmNftItemV1.cjs.map
