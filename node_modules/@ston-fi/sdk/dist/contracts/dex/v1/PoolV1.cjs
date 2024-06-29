"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const JettonMinter = require("../../core/JettonMinter.cjs");
const JettonWallet = require("../../core/JettonWallet.cjs");
const toAddress = require("../../../utils/toAddress.cjs");
const constants = require("../constants.cjs");
const LpAccountV1 = require("./LpAccountV1.cjs");
const _PoolV1 = class _PoolV12 extends JettonMinter.JettonMinter {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._PoolV12.gasConstants,
      ...gasConstants
    };
  }
  async createCollectFeesBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.COLLECT_FEES, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
  /**
   * Build all data required to execute a `collect_fees` transaction.
   *
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `collect_fees` transaction.
   */
  async getCollectFeeTxParams(provider, params) {
    const to = this.address;
    const body = await this.createCollectFeesBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.collectFees);
    return { to, value, body };
  }
  async sendCollectFees(provider, via, params) {
    const txParams = await this.getCollectFeeTxParams(provider, params);
    return via.send(txParams);
  }
  async createBurnBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.BURN, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).storeCoins(BigInt(params.amount)).storeAddress(toAddress.toAddress(params.responseAddress)).endCell();
  }
  /**
   * Build all data required to execute a `burn` transaction.
   *
   * @param {bigint | number} params.amount - Amount of lp tokens to burn (in basic token units)
   * @param {Address | string} params.responseAddress - Address of a user
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} all data required to execute a `burn` transaction.
   */
  async getBurnTxParams(provider, params) {
    const [to, body] = await Promise.all([
      this.getWalletAddress(provider, params.responseAddress),
      this.createBurnBody({
        amount: params.amount,
        responseAddress: params.responseAddress,
        queryId: params.queryId
      })
    ]);
    const value = BigInt(params.gasAmount ?? this.gasConstants.burn);
    return { to, value, body };
  }
  async sendBurn(provider, via, params) {
    const txParams = await this.getBurnTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * Estimate expected result of the amount of jettonWallet tokens swapped to the other type of tokens of the pool
   *
   * @param {bigint | number} params.amount - Amount of tokens to swap (in basic token units)
   * @param {Address | string} params.jettonWallet - Token Jetton address (must be equal to one of the Jetton addresses of the pool)
   *
   * @returns structure with expected result of a token swap
   */
  async getExpectedOutputs(provider, params) {
    const result = await provider.get("get_expected_outputs", [
      { type: "int", value: BigInt(params.amount) },
      {
        type: "slice",
        cell: ton.beginCell().storeAddress(toAddress.toAddress(params.jettonWallet)).endCell()
      }
    ]);
    return {
      jettonToReceive: result.stack.readBigNumber(),
      protocolFeePaid: result.stack.readBigNumber(),
      refFeePaid: result.stack.readBigNumber()
    };
  }
  /**
   * Estimate an expected amount of lp tokens minted when providing liquidity.
   *
   * @param {bigint | number} params.amount0 - Amount of tokens for the first Jetton (in basic token units)
   * @param {bigint | number} params.amount1 - Amount of tokens for the second Jetton (in basic token units)
   *
   * @returns {bigint} an estimated amount of liquidity tokens to be minted
   */
  async getExpectedTokens(provider, params) {
    const result = await provider.get("get_expected_tokens", [
      { type: "int", value: BigInt(params.amount0) },
      { type: "int", value: BigInt(params.amount1) }
    ]);
    return result.stack.readBigNumber();
  }
  /**
   * Estimate expected liquidity freed upon burning liquidity tokens.
   *
   * @param {bigint | number} params.jettonAmount - Amount of liquidity tokens (in basic token units)
   *
   * @returns structure with expected freed liquidity
   */
  async getExpectedLiquidity(provider, params) {
    const result = await provider.get("get_expected_liquidity", [
      { type: "int", value: BigInt(params.jettonAmount) }
    ]);
    return {
      amount0: result.stack.readBigNumber(),
      amount1: result.stack.readBigNumber()
    };
  }
  /**
   * @param {Address | string} params.ownerAddress - Address of a user
   *
   * @returns {Address} the lp account address of a user
   */
  async getLpAccountAddress(provider, params) {
    const result = await provider.get("get_lp_account_address", [
      {
        type: "slice",
        cell: ton.beginCell().storeAddress(toAddress.toAddress(params.ownerAddress)).endCell()
      }
    ]);
    return result.stack.readAddress();
  }
  /**
   * @param {Address | string} params.ownerAddress - Address of a user
   *
   * @returns {JettonWallet} a JettonWallet instance with address returned by getJettonWalletAddress
   */
  async getJettonWallet(provider, params) {
    const jettonWalletAddress = await this.getWalletAddress(
      provider,
      params.ownerAddress
    );
    return JettonWallet.JettonWallet.create(jettonWalletAddress);
  }
  /**
   * @returns structure containing current state of the pool.
   */
  async getPoolData(provider) {
    const result = await provider.get("get_pool_data", []);
    return {
      reserve0: result.stack.readBigNumber(),
      reserve1: result.stack.readBigNumber(),
      token0WalletAddress: result.stack.readAddress(),
      token1WalletAddress: result.stack.readAddress(),
      lpFee: result.stack.readBigNumber(),
      protocolFee: result.stack.readBigNumber(),
      refFee: result.stack.readBigNumber(),
      protocolFeeAddress: result.stack.readAddress(),
      collectedToken0ProtocolFee: result.stack.readBigNumber(),
      collectedToken1ProtocolFee: result.stack.readBigNumber()
    };
  }
  /**
   * @param {Address | string} params.ownerAddress - Address of a user
   *
   * @returns {LpAccount} object for address returned by getLpAccountAddress
   */
  async getLpAccount(provider, params) {
    const lpAccountAddress = await this.getLpAccountAddress(provider, params);
    return LpAccountV1.LpAccountV1.create(lpAccountAddress);
  }
};
_PoolV1.version = constants.DEX_VERSION.v1;
_PoolV1.gasConstants = {
  collectFees: ton.toNano("1.1"),
  burn: ton.toNano("0.5")
};
let PoolV1 = _PoolV1;
exports.PoolV1 = PoolV1;
//# sourceMappingURL=PoolV1.cjs.map
