"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const Contract = require("./Contract.cjs");
class JettonWallet extends Contract.Contract {
  async getBalance(provider) {
    const state = await provider.getState();
    if (state.state.type !== "active") {
      return BigInt(0);
    }
    const { balance } = await this.getWalletData(provider);
    return balance;
  }
  async getWalletData(provider) {
    const result = await provider.get("get_wallet_data", []);
    return {
      balance: result.stack.readBigNumber(),
      ownerAddress: result.stack.readAddress(),
      jettonMasterAddress: result.stack.readAddress(),
      jettonWalletCode: result.stack.readCell()
    };
  }
}
exports.JettonWallet = JettonWallet;
//# sourceMappingURL=JettonWallet.cjs.map
