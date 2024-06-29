"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const Contract = require("../../core/Contract.cjs");
const constants = require("../constants.cjs");
const _LpAccountV1 = class _LpAccountV12 extends Contract.Contract {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._LpAccountV12.gasConstants,
      ...gasConstants
    };
  }
  async createRefundBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.REFUND_ME, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
  /**
   * Build all data required to execute a `refund_me` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `refund_me` transaction.
   */
  async getRefundTxParams(provider, params) {
    const to = this.address;
    const body = await this.createRefundBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.refund);
    return { to, value, body };
  }
  async sendRefund(provider, via, params) {
    const txParams = await this.getRefundTxParams(provider, params);
    return via.send(txParams);
  }
  async createDirectAddLiquidityBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.DIRECT_ADD_LIQUIDITY, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).storeCoins(BigInt(params.amount0)).storeCoins(BigInt(params.amount1)).storeCoins(BigInt(params.minimumLpToMint ?? 1)).endCell();
  }
  /**
   * Build all data required to execute a `direct_add_liquidity` transaction.
   *
   * @param {bigint | number} params.amount0 - Amount of the first Jetton tokens (in basic token units)
   * @param {bigint | number} params.amount1 - Amount of the second Jetton tokens (in basic token units)
   * @param {bigint | number | undefined} params.minimumLpToMint - Optional; minimum amount of received liquidity tokens (in basic token units)
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `direct_add_liquidity` transaction.
   */
  async getDirectAddLiquidityTxParams(provider, params) {
    const to = this.address;
    const body = await this.createDirectAddLiquidityBody({
      amount0: params.amount0,
      amount1: params.amount1,
      minimumLpToMint: params.minimumLpToMint,
      queryId: params.queryId
    });
    const value = BigInt(params.gasAmount ?? this.gasConstants.directAddLp);
    return { to, value, body };
  }
  async sendDirectAddLiquidity(provider, via, params) {
    const txParams = await this.getDirectAddLiquidityTxParams(provider, params);
    return via.send(txParams);
  }
  async createResetGasBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.RESET_GAS, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
  /**
   * Build all data required to execute a `reset_gas` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `reset_gas` transaction.
   */
  async getResetGasTxParams(provider, params) {
    const to = this.address;
    const body = await this.createResetGasBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.resetGas);
    return { to, value, body };
  }
  async sendResetGas(provider, via, params) {
    const txParams = await this.getResetGasTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * @returns structure containing current state of the lp account.
   */
  async getLpAccountData(provider) {
    const result = await provider.get("get_lp_account_data", []);
    return {
      userAddress: result.stack.readAddress(),
      poolAddress: result.stack.readAddress(),
      amount0: result.stack.readBigNumber(),
      amount1: result.stack.readBigNumber()
    };
  }
};
_LpAccountV1.version = constants.DEX_VERSION.v1;
_LpAccountV1.gasConstants = {
  refund: ton.toNano("0.3"),
  directAddLp: ton.toNano("0.3"),
  resetGas: ton.toNano("0.3")
};
let LpAccountV1 = _LpAccountV1;
exports.LpAccountV1 = LpAccountV1;
//# sourceMappingURL=LpAccountV1.cjs.map
