import { beginCell } from "@ton/ton";
import { Contract } from "./Contract.js";
import { toAddress } from "../../utils/toAddress.js";
class JettonMinter extends Contract {
  async getWalletAddress(provider, ownerAddress) {
    const result = await provider.get("get_wallet_address", [
      {
        type: "slice",
        cell: beginCell().storeAddress(toAddress(ownerAddress)).endCell()
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
export {
  JettonMinter
};
//# sourceMappingURL=JettonMinter.js.map
