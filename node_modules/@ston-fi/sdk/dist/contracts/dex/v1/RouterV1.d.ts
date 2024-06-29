import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { Pton } from '../../../contracts/pTON/types';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
import { PoolV1 } from "./PoolV1";
export interface RouterV1Options extends ContractOptions {
    gasConstants?: Partial<typeof RouterV1.gasConstants>;
}
/**
 * The router is the contract that acts as an entrypoint for all DEX calls.
 * It is responsible for routing all Jetton calls with transfer_notification op to the correct pool contract.
 * It acts as a sovereign over the DEX, and can be used to lock/unlock trading on all pools,
 * to change fees on a certain pool or to upgrade its own contract. The router is the only contract that can be upgraded.
 * Each Jetton that goes through the DEX is owned by the router. The router does not store anything about pairs.
 */
export declare class RouterV1 extends Contract {
    static readonly version: "v1";
    static readonly address: import("@ton/ton").Address;
    static readonly gasConstants: {
        swapJettonToJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        swapJettonToTon: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        swapTonToJetton: {
            forwardGasAmount: bigint;
        };
        provideLpJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        provideLpTon: {
            forwardGasAmount: bigint;
        };
    };
    readonly gasConstants: {
        swapJettonToJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        swapJettonToTon: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        swapTonToJetton: {
            forwardGasAmount: bigint;
        };
        provideLpJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        provideLpTon: {
            forwardGasAmount: bigint;
        };
    };
    constructor(address?: AddressType, { gasConstants, ...options }?: RouterV1Options);
    createSwapBody(params: {
        userWalletAddress: AddressType;
        minAskAmount: AmountType;
        askJettonWalletAddress: AddressType;
        referralAddress?: AddressType;
    }): Promise<Cell>;
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
    getSwapJettonToJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        offerJettonAddress: AddressType;
        askJettonAddress: AddressType;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        referralAddress?: AddressType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapJettonToJetton(provider: ContractProvider, via: Sender, params: Parameters<RouterV1["getSwapJettonToJettonTxParams"]>[1]): Promise<void>;
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
    getSwapJettonToTonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        offerJettonAddress: AddressType;
        proxyTon: Pton;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        referralAddress?: AddressType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapJettonToTon(provider: ContractProvider, via: Sender, params: Parameters<RouterV1["getSwapJettonToTonTxParams"]>[1]): Promise<void>;
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
    getSwapTonToJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        proxyTon: Pton;
        askJettonAddress: AddressType;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        referralAddress?: AddressType | undefined;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapTonToJetton(provider: ContractProvider, via: Sender, params: Parameters<RouterV1["getSwapTonToJettonTxParams"]>[1]): Promise<void>;
    createProvideLiquidityBody(params: {
        routerWalletAddress: AddressType;
        minLpOut: AmountType;
    }): Promise<Cell>;
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
    getProvideLiquidityJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        sendTokenAddress: AddressType;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendProvideLiquidityJetton(provider: ContractProvider, via: Sender, params: Parameters<RouterV1["getProvideLiquidityJettonTxParams"]>[1]): Promise<void>;
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
    getProvideLiquidityTonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        proxyTon: Pton;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendProvideLiquidityTon(provider: ContractProvider, via: Sender, params: Parameters<RouterV1["getProvideLiquidityTonTxParams"]>[1]): Promise<void>;
    /**
     * **Note:** It's necessary to specify addresses of Jetton wallets of the router as the arguments of this method.
     * These addresses can be retrieved with getJettonWalletAddress of the Jetton minter.
     *
     * @param {Address | string} params.token0 - The address of the router's wallet of first Jetton
     * @param {Address | string} params.token1 - The address of the router's wallet of second Jetton
     *
     * @returns {Address} an address of a pool for a specified pair of assets.
     */
    getPoolAddress(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<import("@ton/ton").Address>;
    /**
     * @param {Address | string} params.token0 - The address of the first Jetton minter
     * @param {Address | string} params.token1 - The address of the second Jetton minter
     *
     * @returns {Address} an address of a pool for a specified pair of assets.
     */
    getPoolAddressByJettonMinters(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<import("@ton/ton").Address>;
    /**
     * @param {Address | string} params.token0 - The address of the first Jetton minter
     * @param {Address | string} params.token1 - The address of the second Jetton minter
     *
     * @returns {PoolV1} object for a pool with specified Jetton token addresses.
     */
    getPool(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<PoolV1>;
    /**
     * @returns current state of the router.
     */
    getRouterData(provider: ContractProvider): Promise<{
        isLocked: boolean;
        adminAddress: import("@ton/ton").Address;
        tempUpgrade: Cell;
        poolCode: Cell;
        jettonLpWalletCode: Cell;
        lpAccountCode: Cell;
    }>;
}
