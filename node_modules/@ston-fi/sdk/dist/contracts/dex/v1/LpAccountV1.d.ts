import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
export interface LpAccountV1Options extends ContractOptions {
    gasConstants?: Partial<typeof LpAccountV1.gasConstants>;
}
/**
 * The lp account contract holds information about the liquidity provided by the user before minting new liquidity.
 * It interacts only with a single pool contract. For each user, there is single account contract for each pool.
 * The router “routes” the temporary liquidity to the correct account contract.
 * Then the account contract calls the pool contract again to mint new liquidity (once it satisfies some requirements).
 */
export declare class LpAccountV1 extends Contract {
    static readonly version: "v1";
    static readonly gasConstants: {
        refund: bigint;
        directAddLp: bigint;
        resetGas: bigint;
    };
    readonly gasConstants: {
        refund: bigint;
        directAddLp: bigint;
        resetGas: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: LpAccountV1Options);
    createRefundBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `refund_me` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `refund_me` transaction.
     */
    getRefundTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendRefund(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV1["getRefundTxParams"]>[1]): Promise<void>;
    createDirectAddLiquidityBody(params: {
        amount0: AmountType;
        amount1: AmountType;
        minimumLpToMint?: AmountType;
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `direct_add_liquidity` transaction.
     *
     * @param {bigint | number} params.amount0 - Amount of the first Jetton tokens (in basic token units)
     * @param {bigint | number} params.amount1 - Amount of the second Jetton tokens (in basic token units)
     * @param {bigint | number | undefined} params.minimumLpToMint - Optional; minimum amount of received liquidity tokens (in basic token units)
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `direct_add_liquidity` transaction.
     */
    getDirectAddLiquidityTxParams(provider: ContractProvider, params: {
        amount0: AmountType;
        amount1: AmountType;
        minimumLpToMint?: AmountType;
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendDirectAddLiquidity(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV1["getDirectAddLiquidityTxParams"]>[1]): Promise<void>;
    createResetGasBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `reset_gas` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `reset_gas` transaction.
     */
    getResetGasTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendResetGas(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV1["getResetGasTxParams"]>[1]): Promise<void>;
    /**
     * @returns structure containing current state of the lp account.
     */
    getLpAccountData(provider: ContractProvider): Promise<{
        userAddress: import("@ton/ton").Address;
        poolAddress: import("@ton/ton").Address;
        amount0: bigint;
        amount1: bigint;
    }>;
}
