"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const api = require("@ston-fi/api");
const ton = require("@ton/ton");
class Client extends ton.TonClient {
  constructor(options) {
    super(options);
    this.stonApiClient = options.stonApiClient ?? new api.StonApiClient();
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
          stack: new ton.TupleReader([
            {
              type: "slice",
              cell: ton.beginCell().storeAddress(ton.Address.parse(jettonWalletAddress)).endCell()
            }
          ])
        };
      } catch {
      }
    }
    return super.callGetMethod(...args);
  }
}
exports.Client = Client;
//# sourceMappingURL=Client.cjs.map
