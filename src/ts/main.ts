import { TonClient, toNano } from "@ton/ton";
import { DEX, pTON } from "@ston-fi/sdk";

const client = new TonClient({
  endpoint: "https://toncenter.com/api/v2/jsonRPC",
});

const router = client.open(
  DEX.v2.Router.create(
    "kQCas2p939ESyXM_BzFJzcIe3GD5S0tbjJDj6EBVn-SPsEkN"
  )
);

const proxyTon = pTON.v2.create(
  "kQDwpyxrmYQlGDViPk-oqP4XK6J11I-bx7fJAlQCWmJB4m74"
);

// swap 1 TON to TestRED but not less than 1 nano TestRED
const txParams = await router.getSwapTonToJettonTxParams({
  userWalletAddress: "", // ! replace with your address
  proxyTon: proxyTon,
  offerAmount: toNano("1"),
  askJettonAddress: "kQDLvsZol3juZyOAVG8tWsJntOxeEZWEaWCbbSjYakQpuYN5",
  minAskAmount: "1",
  queryId: 12345,
});