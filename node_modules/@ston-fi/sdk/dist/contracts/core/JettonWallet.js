import { Contract } from "./Contract.js";
class JettonWallet extends Contract {
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
export {
  JettonWallet
};
//# sourceMappingURL=JettonWallet.js.map
