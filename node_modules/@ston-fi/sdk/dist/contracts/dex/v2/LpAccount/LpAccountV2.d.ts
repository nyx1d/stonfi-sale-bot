import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import type { AddressType, AmountType, QueryIdType } from '../../../../types';
import { Contract, type ContractOptions } from '../../../../contracts/core/Contract';
export interface LpAccountV2Options extends ContractOptions {
    gasConstants?: Partial<typeof LpAccountV2.gasConstants>;
}
export declare class LpAccountV2 extends Contract {
    static readonly version: "v2";
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
    constructor(address: AddressType, { gasConstants, ...options }?: LpAccountV2Options);
    createRefundBody(params?: {
        leftMaybePayload?: Cell;
        rightMaybePayload?: Cell;
        queryId?: QueryIdType;
    }): Promise<Cell>;
    getRefundTxParams(provider: ContractProvider, params?: {
        leftMaybePayload?: Cell;
        rightMaybePayload?: Cell;
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendRefund(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV2["getRefundTxParams"]>[1]): Promise<void>;
    createDirectAddLiquidityBody(params: {
        amount0: AmountType;
        amount1: AmountType;
        minimumLpToMint?: AmountType;
        userWalletAddress: AddressType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<Cell>;
    getDirectAddLiquidityTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        amount0: AmountType;
        amount1: AmountType;
        minimumLpToMint?: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendDirectAddLiquidity(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV2["getDirectAddLiquidityTxParams"]>[1]): Promise<void>;
    createResetGasBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    getResetGasTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendResetGas(provider: ContractProvider, via: Sender, params: Parameters<LpAccountV2["getResetGasTxParams"]>[1]): Promise<void>;
    getLpAccountData(provider: ContractProvider): Promise<{
        userAddress: import("@ton/ton").Address;
        poolAddress: import("@ton/ton").Address;
        amount0: bigint;
        amount1: bigint;
    }>;
}
