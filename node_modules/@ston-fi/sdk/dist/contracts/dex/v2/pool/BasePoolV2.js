import { toNano, beginCell } from "@ton/ton";
import { JettonMinter } from "../../../core/JettonMinter.js";
import { JettonWallet } from "../../../core/JettonWallet.js";
import { DEX_VERSION, DEX_OP_CODES } from "../../constants.js";
import { toAddress } from "../../../../utils/toAddress.js";
import { LpAccountV2 } from "../LpAccount/LpAccountV2.js";
const _BasePoolV2 = class _BasePoolV22 extends JettonMinter {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._BasePoolV22.gasConstants,
      ...gasConstants
    };
  }
  async createCollectFeesBody(params) {
    return beginCell().storeUint(DEX_OP_CODES.COLLECT_FEES, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
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
    return beginCell().storeUint(DEX_OP_CODES.BURN, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).storeCoins(BigInt(params.amount)).storeAddress(null).storeMaybeRef(params.customPayload).endCell();
  }
  async getBurnTxParams(provider, params) {
    const [to, body] = await Promise.all([
      this.getWalletAddress(provider, params.userWalletAddress),
      this.createBurnBody({
        amount: params.amount,
        customPayload: params.customPayload,
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
  async getPoolType(provider) {
    const result = await provider.get("get_pool_type", []);
    return result.stack.readString();
  }
  async getLpAccountAddress(provider, params) {
    const result = await provider.get("get_lp_account_address", [
      {
        type: "slice",
        cell: beginCell().storeAddress(toAddress(params.ownerAddress)).endCell()
      }
    ]);
    return result.stack.readAddress();
  }
  async getLpAccount(provider, params) {
    const lpAccountAddress = await this.getLpAccountAddress(provider, params);
    return LpAccountV2.create(lpAccountAddress);
  }
  async getJettonWallet(provider, params) {
    const jettonWalletAddress = await this.getWalletAddress(
      provider,
      params.ownerAddress
    );
    return JettonWallet.create(jettonWalletAddress);
  }
  async getPoolData(provider) {
    const data = await this.implGetPoolData(provider);
    return data.commonPoolData;
  }
  async implGetPoolData(provider) {
    const result = await provider.get("get_pool_data", []);
    return {
      commonPoolData: {
        isLocked: result.stack.readBoolean(),
        routerAddress: result.stack.readAddress(),
        totalSupplyLP: result.stack.readBigNumber(),
        reserve0: result.stack.readBigNumber(),
        reserve1: result.stack.readBigNumber(),
        token0WalletAddress: result.stack.readAddress(),
        token1WalletAddress: result.stack.readAddress(),
        lpFee: result.stack.readBigNumber(),
        protocolFee: result.stack.readBigNumber(),
        protocolFeeAddress: result.stack.readAddressOpt(),
        collectedToken0ProtocolFee: result.stack.readBigNumber(),
        collectedToken1ProtocolFee: result.stack.readBigNumber()
      },
      stack: result.stack
    };
  }
};
_BasePoolV2.version = DEX_VERSION.v2;
_BasePoolV2.gasConstants = {
  collectFees: toNano("0.4"),
  burn: toNano("0.8")
};
let BasePoolV2 = _BasePoolV2;
export {
  BasePoolV2
};
//# sourceMappingURL=BasePoolV2.js.map
