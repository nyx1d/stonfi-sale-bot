import { toNano, beginCell } from "@ton/ton";
import { Contract } from "../../../core/Contract.js";
import { DEX_VERSION, DEX_OP_CODES } from "../../constants.js";
const _VaultV2 = class _VaultV22 extends Contract {
  constructor(address, { gasConstants, ...options } = {}) {
    super(address, options);
    this.gasConstants = {
      ..._VaultV22.gasConstants,
      ...gasConstants
    };
  }
  async createWithdrawFeeBody(params) {
    return beginCell().storeUint(DEX_OP_CODES.WITHDRAW_FEE, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
  }
  /**
   * Build all data required to execute a `withdraw_fee` transaction.
   *
   * @param {ContractProvider} provider - {@link ContractProvider} instance
   *
   * @param {object | undefined} params - Optional tx params
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   *
   * @returns {SenderArguments} all data required to execute a `withdraw_fee` transaction.
   */
  async getWithdrawFeeTxParams(provider, params) {
    const to = this.address;
    const body = await this.createWithdrawFeeBody({
      queryId: params == null ? void 0 : params.queryId
    });
    const value = BigInt((params == null ? void 0 : params.gasAmount) ?? this.gasConstants.withdrawFee);
    return { to, body, value };
  }
  async sendWithdrawFee(provider, via, params) {
    const txParams = await this.getWithdrawFeeTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * Get the current state of the vault contract.
   *
   * @param {ContractProvider} provider - {@link ContractProvider} instance
   *
   *
   * @returns {Promise<object>} structure containing the current state of the vault contract.
   */
  async getVaultData(provider) {
    const result = await provider.get("get_vault_data", []);
    return {
      ownerAddress: result.stack.readAddress(),
      tokenAddress: result.stack.readAddress(),
      routerAddress: result.stack.readAddress(),
      depositedAmount: result.stack.readBigNumber()
    };
  }
};
_VaultV2.version = DEX_VERSION.v2;
_VaultV2.gasConstants = {
  withdrawFee: toNano("0.3")
};
let VaultV2 = _VaultV2;
export {
  VaultV2
};
//# sourceMappingURL=VaultV2.js.map
