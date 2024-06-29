"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const Contract = require("./Contract.cjs");
const toAddress = require("../../utils/toAddress.cjs");
class JettonMinter extends Contract.Contract {
  async getWalletAddress(provider, ownerAddress) {
    const result = await provider.get("get_wallet_address", [
      {
        type: "slice",
        cell: ton.beginCell().storeAddress(toAddress.toAddress(ownerAddress)).endCell()
      }
    ]);
    return result.stack.readAddress();
  }
  async getJettonData(provider) {
    const result = await provider.get("get_jetton_data", []);
    const jettonData = {
      totalSupply: result.stack.readBigNumber(),
      canIncSupply: Boolean(result.stack.readNumber()),
      adminAddress: result.stack.readAddressOpt(),
      contentRaw: result.stack.readCell(),
      jettonWalletCode: result.stack.readCell()
    };
    return jettonData;
  }
}
exports.JettonMinter = JettonMinter;
//# sourceMappingURL=JettonMinter.cjs.map
