import { StonApiClient } from "@ston-fi/api";
import { TonClient, TupleReader, beginCell, Address } from "@ton/ton";
class Client extends TonClient {
  constructor(options) {
    super(options);
    this.stonApiClient = options.stonApiClient ?? new StonApiClient();
  }
  async callGetMethod(...args) {
    var _a, _b;
    if (args[1] === "get_wallet_address" && ((_b = (_a = args[2]) == null ? void 0 : _a[0]) == null ? void 0 : _b.type) === "slice") {
      try {
        const jettonWalletAddress = await this.stonApiClient.getJettonWalletAddress({
          jettonAddress: args[0].toString(),
          ownerAddress: args[2][0].cell.beginParse().loadAddress().toString()
        });
        return {
          gas_used: 0,
          stack: new TupleReader([
            {
              type: "slice",
              cell: beginCell().storeAddress(Address.parse(jettonWalletAddress)).endCell()
            }
          ])
        };
      } catch {
      }
    }
    return super.callGetMethod(...args);
  }
}
export {
  Client
};
//# sourceMappingURL=Client.js.map
