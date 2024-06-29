"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ton = require("@ton/ton");
const Contract = require("../../core/Contract.cjs");
const JettonMinter = require("../../core/JettonMinter.cjs");
const createJettonTransferMessage = require("../../../utils/createJettonTransferMessage.cjs");
const toAddress = require("../../../utils/toAddress.cjs");
const constants = require("../constants.cjs");
const PoolV1 = require("./PoolV1.cjs");
const _RouterV1 = class _RouterV12 extends Contract.Contract {
  constructor(address2 = _RouterV12.address, { gasConstants, ...options } = {}) {
    super(address2, options);
    this.gasConstants = {
      ..._RouterV12.gasConstants,
      ...gasConstants
    };
  }
  async createSwapBody(params) {
    const builder = ton.beginCell();
    builder.storeUint(constants.DEX_OP_CODES.SWAP, 32);
    builder.storeAddress(toAddress.toAddress(params.askJettonWalletAddress));
    builder.storeCoins(BigInt(params.minAskAmount));
    builder.storeAddress(toAddress.toAddress(params.userWalletAddress));
    if (params.referralAddress) {
      builder.storeUint(1, 1);
      builder.storeAddress(toAddress.toAddress(params.referralAddress));
    } else {
      builder.storeUint(0, 1);
    }
    return builder.endCell();
  }
  /**
   * Build all data required to execute a jetton to jetton `swap` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.offerJettonAddress - Jetton address of a token to be swapped
   * @param {Address | string} params.askJettonAddress - Jetton address of a token to be received
   * @param {bigint | number} params.offerAmount - Amount of tokens to be swapped (in basic token units)
   * @param {bigint | number} params.minAskAmount - Minimum amount of tokens received (in basic token units)
   * @param {Address | string | undefined} params.referralAddress - Optional; referral address
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} data required to execute a jetton `swap` transaction
   */
  async getSwapJettonToJettonTxParams(provider, params) {
    const [offerJettonWalletAddress, askJettonWalletAddress] = await Promise.all([
      provider.open(JettonMinter.JettonMinter.create(params.offerJettonAddress)).getWalletAddress(params.userWalletAddress),
      provider.open(JettonMinter.JettonMinter.create(params.askJettonAddress)).getWalletAddress(this.address)
    ]);
    const forwardPayload = await this.createSwapBody({
      userWalletAddress: params.userWalletAddress,
      minAskAmount: params.minAskAmount,
      askJettonWalletAddress,
      referralAddress: params.referralAddress
    });
    const forwardTonAmount = BigInt(
      params.forwardGasAmount ?? this.gasConstants.swapJettonToJetton.forwardGasAmount
    );
    const body = createJettonTransferMessage.createJettonTransferMessage({
      queryId: params.queryId ?? 0,
      amount: params.offerAmount,
      destination: this.address,
      responseDestination: params.userWalletAddress,
      forwardTonAmount,
      forwardPayload
    });
    const value = BigInt(
      params.gasAmount ?? this.gasConstants.swapJettonToJetton.gasAmount
    );
    return {
      to: offerJettonWalletAddress,
      value,
      body
    };
  }
  async sendSwapJettonToJetton(provider, via, params) {
    const txParams = await this.getSwapJettonToJettonTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * Build all data required to execute a jetton to ton `swap` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.offerJettonAddress - Jetton address of a token to be swapped
   * @param {Address | string} params.proxyTon - Proxy ton contract
   * @param {bigint | number} params.offerAmount - Amount of tokens to be swapped (in basic token units)
   * @param {bigint | number} params.minAskAmount - Minimum amount of tokens received (in basic token units)
   * @param {Address | string | undefined} params.referralAddress - Optional; referral address
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} data required to execute a jetton `swap` transaction
   */
  async getSwapJettonToTonTxParams(provider, params) {
    return await this.getSwapJettonToJettonTxParams(provider, {
      ...params,
      askJettonAddress: params.proxyTon.address,
      gasAmount: params.gasAmount ?? this.gasConstants.swapJettonToTon.gasAmount,
      forwardGasAmount: params.forwardGasAmount ?? this.gasConstants.swapJettonToTon.forwardGasAmount
    });
  }
  async sendSwapJettonToTon(provider, via, params) {
    const txParams = await this.getSwapJettonToTonTxParams(provider, params);
    return via.send(txParams);
  }
  /**
   * Build all data required to execute a ton to jetton `swap` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.proxyTon - Proxy ton contract
   * @param {Address | string} params.askJettonAddress - Jetton address of a token to be received
   * @param {bigint | number} params.offerAmount - Amount of ton to be swapped (in nanoTons)
   * @param {bigint | number} params.minAskAmount - Minimum amount of tokens received (in basic token units)
   * @param {Address | string | undefined} params.referralAddress - Optional; Referral address
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} data required to execute a ton to jetton `swap` transaction
   */
  async getSwapTonToJettonTxParams(provider, params) {
    const askJettonWalletAddress = await provider.open(JettonMinter.JettonMinter.create(params.askJettonAddress)).getWalletAddress(this.address);
    const forwardPayload = await this.createSwapBody({
      userWalletAddress: params.userWalletAddress,
      minAskAmount: params.minAskAmount,
      askJettonWalletAddress,
      referralAddress: params.referralAddress
    });
    const forwardTonAmount = BigInt(
      params.forwardGasAmount ?? this.gasConstants.swapTonToJetton.forwardGasAmount
    );
    return await provider.open(params.proxyTon).getTonTransferTxParams({
      queryId: params.queryId ?? 0,
      tonAmount: params.offerAmount,
      destinationAddress: this.address,
      refundAddress: params.userWalletAddress,
      forwardPayload,
      forwardTonAmount
    });
  }
  async sendSwapTonToJetton(provider, via, params) {
    const txParams = await this.getSwapTonToJettonTxParams(provider, params);
    return via.send(txParams);
  }
  async createProvideLiquidityBody(params) {
    return ton.beginCell().storeUint(constants.DEX_OP_CODES.PROVIDE_LP, 32).storeAddress(toAddress.toAddress(params.routerWalletAddress)).storeCoins(BigInt(params.minLpOut)).endCell();
  }
  /**
   * Collect all data required to execute a jetton `provide_lp` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.sendTokenAddress - Address of the provided Jetton token
   * @param {Address | string} params.otherTokenAddress - Address of the other Jetton token in pair
   * @param {bigint | number} params.sendAmount - Amount of the first token deposited as liquidity (in basic token units)
   * @param {bigint | number} params.minLpOut - Minimum amount of created liquidity tokens (in basic token units)
   * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} data required to execute a jetton `provide_lp` transaction
   */
  async getProvideLiquidityJettonTxParams(provider, params) {
    const [jettonWalletAddress, routerWalletAddress] = await Promise.all([
      provider.open(JettonMinter.JettonMinter.create(params.sendTokenAddress)).getWalletAddress(params.userWalletAddress),
      provider.open(JettonMinter.JettonMinter.create(params.otherTokenAddress)).getWalletAddress(this.address)
    ]);
    const forwardPayload = await this.createProvideLiquidityBody({
      routerWalletAddress,
      minLpOut: params.minLpOut
    });
    const forwardTonAmount = BigInt(
      params.forwardGasAmount ?? this.gasConstants.provideLpJetton.forwardGasAmount
    );
    const body = createJettonTransferMessage.createJettonTransferMessage({
      queryId: params.queryId ?? 0,
      amount: params.sendAmount,
      destination: this.address,
      responseDestination: params.userWalletAddress,
      forwardTonAmount,
      forwardPayload
    });
    const value = BigInt(
      params.gasAmount ?? this.gasConstants.provideLpJetton.gasAmount
    );
    return {
      to: jettonWalletAddress,
      value,
      body
    };
  }
  async sendProvideLiquidityJetton(provider, via, params) {
    const txParams = await this.getProvideLiquidityJettonTxParams(
      provider,
      params
    );
    return via.send(txParams);
  }
  /**
   * Collect all data required to execute a proxy ton `provide_lp` transaction
   *
   * @param {Address | string} params.userWalletAddress - User's address
   * @param {Address | string} params.proxyTon - proxy ton contract
   * @param {Address | string} params.otherTokenAddress - Address of the other Jetton token in pair
   * @param {bigint | number} params.sendAmount - Amount of ton deposited as liquidity (in nanoTons)
   * @param {bigint | number} params.minLpOut - Minimum amount of created liquidity tokens (in basic token units)
   * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
   * @param {bigint | number | undefined} params.queryId - Optional; query id
   *
   * @returns {SenderArguments} data required to execute a proxy ton `provide_lp` transaction
   */
  async getProvideLiquidityTonTxParams(provider, params) {
    const routerWalletAddress = await provider.open(JettonMinter.JettonMinter.create(params.otherTokenAddress)).getWalletAddress(this.address);
    const forwardPayload = await this.createProvideLiquidityBody({
      routerWalletAddress,
      minLpOut: params.minLpOut
    });
    const forwardTonAmount = BigInt(
      params.forwardGasAmount ?? this.gasConstants.provideLpTon.forwardGasAmount
    );
    return await provider.open(params.proxyTon).getTonTransferTxParams({
      queryId: params.queryId ?? 0,
      tonAmount: params.sendAmount,
      destinationAddress: this.address,
      refundAddress: params.userWalletAddress,
      forwardPayload,
      forwardTonAmount
    });
  }
  async sendProvideLiquidityTon(provider, via, params) {
    const txParams = await this.getProvideLiquidityTonTxParams(
      provider,
      params
    );
    return via.send(txParams);
  }
  /**
   * **Note:** It's necessary to specify addresses of Jetton wallets of the router as the arguments of this method.
   * These addresses can be retrieved with getJettonWalletAddress of the Jetton minter.
   *
   * @param {Address | string} params.token0 - The address of the router's wallet of first Jetton
   * @param {Address | string} params.token1 - The address of the router's wallet of second Jetton
   *
   * @returns {Address} an address of a pool for a specified pair of assets.
   */
  async getPoolAddress(provider, params) {
    const result = await provider.get("get_pool_address", [
      {
        type: "slice",
        cell: ton.beginCell().storeAddress(toAddress.toAddress(params.token0)).endCell()
      },
      {
        type: "slice",
        cell: ton.beginCell().storeAddress(toAddress.toAddress(params.token1)).endCell()
      }
    ]);
    return result.stack.readAddress();
  }
  /**
   * @param {Address | string} params.token0 - The address of the first Jetton minter
   * @param {Address | string} params.token1 - The address of the second Jetton minter
   *
   * @returns {Address} an address of a pool for a specified pair of assets.
   */
  async getPoolAddressByJettonMinters(provider, params) {
    const [jetton0WalletAddress, jetton1WalletAddress] = await Promise.all([
      provider.open(JettonMinter.JettonMinter.create(params.token0)).getWalletAddress(this.address),
      provider.open(JettonMinter.JettonMinter.create(params.token1)).getWalletAddress(this.address)
    ]);
    const poolAddress = await this.getPoolAddress(provider, {
      token0: jetton0WalletAddress,
      token1: jetton1WalletAddress
    });
    return poolAddress;
  }
  /**
   * @param {Address | string} params.token0 - The address of the first Jetton minter
   * @param {Address | string} params.token1 - The address of the second Jetton minter
   *
   * @returns {PoolV1} object for a pool with specified Jetton token addresses.
   */
  async getPool(provider, params) {
    const poolAddress = await this.getPoolAddressByJettonMinters(provider, {
      token0: params.token0,
      token1: params.token1
    });
    return PoolV1.PoolV1.create(poolAddress);
  }
  /**
   * @returns current state of the router.
   */
  async getRouterData(provider) {
    const result = await provider.get("get_router_data", []);
    return {
      isLocked: result.stack.readBoolean(),
      adminAddress: result.stack.readAddress(),
      tempUpgrade: result.stack.readCell(),
      poolCode: result.stack.readCell(),
      jettonLpWalletCode: result.stack.readCell(),
      lpAccountCode: result.stack.readCell()
    };
  }
};
_RouterV1.version = constants.DEX_VERSION.v1;
_RouterV1.address = ton.address(
  "EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt"
);
_RouterV1.gasConstants = {
  swapJettonToJetton: {
    gasAmount: ton.toNano("0.22"),
    forwardGasAmount: ton.toNano("0.175")
  },
  swapJettonToTon: {
    gasAmount: ton.toNano("0.17"),
    forwardGasAmount: ton.toNano("0.125")
  },
  swapTonToJetton: {
    forwardGasAmount: ton.toNano("0.185")
  },
  provideLpJetton: {
    gasAmount: ton.toNano("0.3"),
    forwardGasAmount: ton.toNano("0.24")
  },
  provideLpTon: {
    forwardGasAmount: ton.toNano("0.26")
  }
};
let RouterV1 = _RouterV1;
exports.RouterV1 = RouterV1;
//# sourceMappingURL=RouterV1.cjs.map
