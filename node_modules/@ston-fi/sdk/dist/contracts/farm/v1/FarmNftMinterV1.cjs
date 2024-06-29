"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const Contract = require("../../core/Contract.cjs");
const JettonMinter = require("../../core/JettonMinter.cjs");
const JettonWallet = require("../../core/JettonWallet.cjs");
const createJettonTransferMessage = require("../../../utils/createJettonTransferMessage.cjs");
const constants = require("../constants.cjs");
const _FarmNftMinterV1 = class _FarmNftMinterV12 extends Contract.Contract {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._FarmNftMinterV12.gasConstants,
      ...gasConstants
    };
  }
  async createStakeBody() {
    return ton.beginCell().storeUint(constants.FARM_OP_CODES.STAKE, 32).endCell();
  }
  /**
   * Build all data required to execute a jetton `stake` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.jettonAddress - Jetton address of token to be staked
   * @param {bigint | number} params.jettonAmount - Amount of tokens to be staked (in basic token units)
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} containing all data required to execute a jetton `stake` transaction
   */
  async getStakeTxParams(provider, params) {
    const [jettonWalletAddress, forwardPayload] = await Promise.all([
      provider.open(JettonMinter.JettonMinter.create(params.jettonAddress)).getWalletAddress(params.userWalletAddress),
      this.createStakeBody()
    ]);
    const forwardTonAmount = BigInt(
      params.forwardGasAmount ?? this.gasConstants.stakeForward
    );
    const body = createJettonTransferMessage.createJettonTransferMessage({
      queryId: params.queryId ?? 0,
      amount: params.jettonAmount,
      destination: this.address,
      responseDestination: params.userWalletAddress,
      forwardTonAmount,
      forwardPayload
    });
    const value = BigInt(params.gasAmount ?? this.gasConstants.stake);
    return {
      to: jettonWalletAddress,
      value,
      body
    };
  }
  async sendStake(provider, via, params) {
    const txParams = await this.getStakeTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * @returns structure containing current state of the minter
   *
   * @property {bigint} nextItemIndex - Index of the next nft in this collection
   * @property {bigint} lastUpdateTime - Last time farming values were updated
   * @property {number} status - Status of the contract: uninitialized `0`, active `1`, paused `3`
   * @property {bigint} depositedNanorewards - Deposited rewards in nanounits
   * @property {bigint} currentStakedTokens - Number of staked tokens in basic token units
   * @property {bigint} accruedPerUnitNanorewards - Number of accrued nanorewards per basic stake token unit
   * @property {bigint} accruedNanorewards - Total number of accrued rewards in nanounits
   * @property {bigint} claimedNanorewards - Number of claimed rewards in nanounits
   * @property {bigint} contractUniqueId - Minter id
   * @property {bigint} nanorewardsPer24h - Total number of accrued rewards per 24h in nanounits
   * @property {boolean} soulboundItems - Whether minted NFTs are soulbound
   * @property {bigint} minStakeTime - Minimum staking time
   * @property {Address} stakingTokenWallet - Minter's staking jetton wallet
   * @property {Address} rewardTokenWallet - Minter's reward jetton wallet
   */
  async getFarmingMinterData(provider) {
    const result = await provider.get("get_farming_minter_data", []);
    return {
      nextItemIndex: result.stack.readBigNumber(),
      lastUpdateTime: result.stack.readBigNumber(),
      status: result.stack.readNumber(),
      depositedNanorewards: result.stack.readBigNumber(),
      currentStakedTokens: result.stack.readBigNumber(),
      accruedPerUnitNanorewards: result.stack.readBigNumber(),
      accruedNanorewards: result.stack.readBigNumber(),
      claimedNanorewards: result.stack.readBigNumber(),
      contractUniqueId: result.stack.readBigNumber(),
      nanorewardsPer24h: result.stack.readBigNumber(),
      soulboundItems: result.stack.readBoolean(),
      minStakeTime: result.stack.readBigNumber(),
      stakingTokenWallet: result.stack.readAddress(),
      rewardTokenWallet: result.stack.readAddress()
    };
  }
  /**
   * @returns {Address} address of minter for staking jetton that is used for farming
   */
  async getStakingJettonAddress(provider) {
    const { stakingTokenWallet: stakingTokenWalletAddress } = await this.getFarmingMinterData(provider);
    const { jettonMasterAddress } = await provider.open(JettonWallet.JettonWallet.create(stakingTokenWalletAddress)).getWalletData();
    return jettonMasterAddress;
  }
};
_FarmNftMinterV1.version = constants.FARM_VERSION.v1;
_FarmNftMinterV1.gasConstants = {
  stake: ton.toNano("0.3"),
  stakeForward: ton.toNano("0.25")
};
let FarmNftMinterV1 = _FarmNftMinterV1;
exports.FarmNftMinterV1 = FarmNftMinterV1;
//# sourceMappingURL=FarmNftMinterV1.cjs.map
