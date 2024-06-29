import { toNano, beginCell } from "@ton/ton";
import { Contract } from "../../../core/Contract.js";
import { DEX_VERSION, DEX_OP_CODES } from "../../constants.js";
import { toAddress } from "../../../../utils/toAddress.js";
const _LpAccountV2 = class _LpAccountV22 extends Contract {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._LpAccountV22.gasConstants,
      ...gasConstants
    };
  }
  async createRefundBody(params) {
    return beginCell().storeUint(DEX_OP_CODES.REFUND_ME, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).storeMaybeRef(params == null ? void 0 : params.leftMaybePayload).storeMaybeRef(params == null ? void 0 : params.rightMaybePayload).endCell();
  }
  async getRefundTxParams(provider, params) {
    const to = this.address;
    const body = await this.createRefundBody({
      leftMaybePayload: params == null ? void 0 : params.leftMaybePayload,
      rightMaybePayload: params == null ? void 0 : params.rightMaybePayload,
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
    return beginCell().storeUint(DEX_OP_CODES.DIRECT_ADD_LIQUIDITY, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).storeCoins(BigInt(params.amount0)).storeCoins(BigInt(params.amount1)).storeCoins(BigInt(params.minimumLpToMint ?? 1)).storeCoins(BigInt(params.customPayloadForwardGasAmount ?? 0)).storeAddress(toAddress(params.userWalletAddress)).storeMaybeRef(params.customPayload).storeRef(
      beginCell().storeAddress(
        toAddress(params.refundAddress ?? params.userWalletAddress)
      ).storeAddress(
        toAddress(
          params.excessesAddress ?? params.refundAddress ?? params.userWalletAddress
        )
      ).endCell()
    ).endCell();
  }
  async getDirectAddLiquidityTxParams(provider, params) {
    const to = this.address;
    const body = await this.createDirectAddLiquidityBody({
      amount0: params.amount0,
      amount1: params.amount1,
      minimumLpToMint: params.minimumLpToMint,
      userWalletAddress: params.userWalletAddress,
      refundAddress: params.refundAddress,
      excessesAddress: params.excessesAddress,
      customPayload: params.customPayload,
      customPayloadForwardGasAmount: params.customPayloadForwardGasAmount,
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
    return beginCell().storeUint(DEX_OP_CODES.RESET_GAS, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
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
_LpAccountV2.version = DEX_VERSION.v2;
_LpAccountV2.gasConstants = {
  refund: toNano("0.8"),
  directAddLp: toNano("0.3"),
  resetGas: toNano("0.02")
};
let LpAccountV2 = _LpAccountV2;
export {
  LpAccountV2
};
//# sourceMappingURL=LpAccountV2.js.map
