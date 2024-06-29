import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import type { ContractOptions } from '../../../contracts/core/Contract';
import { JettonMinter } from '../../../contracts/core/JettonMinter';
import { JettonWallet } from '../../../contracts/core/JettonWallet';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
import { LpAccountV1 } from "./LpAccountV1";
export interface PoolV1Options extends ContractOptions {
    gasConstants?: Partial<typeof PoolV1.gasConstants>;
}
/**
 * The pool is the contract that stores the AMM data for a certain pair and is responsible for handling “swaps” or providing liquidity for a certain pool.
 * For each pair (e.g. STON/USDT), there is only a single pool contract.
 * The pool is also a Jetton Minter, and handles minting/burning of Liquidity Provider Jettons.
 * All the swap/lp calculations are done in the pool contract.
 */
export declare class PoolV1 extends JettonMinter {
    static readonly version: "v1";
    static readonly gasConstants: {
        collectFees: bigint;
        burn: bigint;
    };
    readonly gasConstants: {
        collectFees: bigint;
        burn: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: PoolV1Options);
    createCollectFeesBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `collect_fees` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `collect_fees` transaction.
     */
    getCollectFeeTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendCollectFees(provider: ContractProvider, via: Sender, params: Parameters<PoolV1["getCollectFeeTxParams"]>[1]): Promise<void>;
    createBurnBody(params: {
        amount: AmountType;
        responseAddress: AddressType;
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `burn` transaction.
     *
     * @param {bigint | number} params.amount - Amount of lp tokens to burn (in basic token units)
     * @param {Address | string} params.responseAddress - Address of a user
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `burn` transaction.
     */
    getBurnTxParams(provider: ContractProvider, params: {
        amount: AmountType;
        responseAddress: AddressType;
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendBurn(provider: ContractProvider, via: Sender, params: Parameters<PoolV1["getBurnTxParams"]>[1]): Promise<void>;
    /**
     * Estimate expected result of the amount of jettonWallet tokens swapped to the other type of tokens of the pool
     *
     * @param {bigint | number} params.amount - Amount of tokens to swap (in basic token units)
     * @param {Address | string} params.jettonWallet - Token Jetton address (must be equal to one of the Jetton addresses of the pool)
     *
     * @returns structure with expected result of a token swap
     */
    getExpectedOutputs(provider: ContractProvider, params: {
        amount: AmountType;
        jettonWallet: AddressType;
    }): Promise<{
        jettonToReceive: bigint;
        protocolFeePaid: bigint;
        refFeePaid: bigint;
    }>;
    /**
     * Estimate an expected amount of lp tokens minted when providing liquidity.
     *
     * @param {bigint | number} params.amount0 - Amount of tokens for the first Jetton (in basic token units)
     * @param {bigint | number} params.amount1 - Amount of tokens for the second Jetton (in basic token units)
     *
     * @returns {bigint} an estimated amount of liquidity tokens to be minted
     */
    getExpectedTokens(provider: ContractProvider, params: {
        amount0: AmountType;
        amount1: AmountType;
    }): Promise<bigint>;
    /**
     * Estimate expected liquidity freed upon burning liquidity tokens.
     *
     * @param {bigint | number} params.jettonAmount - Amount of liquidity tokens (in basic token units)
     *
     * @returns structure with expected freed liquidity
     */
    getExpectedLiquidity(provider: ContractProvider, params: {
        jettonAmount: AmountType;
    }): Promise<{
        amount0: bigint;
        amount1: bigint;
    }>;
    /**
     * @param {Address | string} params.ownerAddress - Address of a user
     *
     * @returns {Address} the lp account address of a user
     */
    getLpAccountAddress(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<import("@ton/ton").Address>;
    /**
     * @param {Address | string} params.ownerAddress - Address of a user
     *
     * @returns {JettonWallet} a JettonWallet instance with address returned by getJettonWalletAddress
     */
    getJettonWallet(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<JettonWallet>;
    /**
     * @returns structure containing current state of the pool.
     */
    getPoolData(provider: ContractProvider): Promise<{
        reserve0: bigint;
        reserve1: bigint;
        token0WalletAddress: import("@ton/ton").Address;
        token1WalletAddress: import("@ton/ton").Address;
        lpFee: bigint;
        protocolFee: bigint;
        refFee: bigint;
        protocolFeeAddress: import("@ton/ton").Address;
        collectedToken0ProtocolFee: bigint;
        collectedToken1ProtocolFee: bigint;
    }>;
    /**
     * @param {Address | string} params.ownerAddress - Address of a user
     *
     * @returns {LpAccount} object for address returned by getLpAccountAddress
     */
    getLpAccount(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<LpAccountV1>;
}
