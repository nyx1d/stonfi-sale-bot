import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import type { AddressType, AmountType, QueryIdType } from '../../../../types';
import type { ContractOptions } from '../../../../contracts/core/Contract';
import { JettonMinter } from '../../../../contracts/core/JettonMinter';
import { JettonWallet } from '../../../../contracts/core/JettonWallet';
import { LpAccountV2 } from "../LpAccount/LpAccountV2";
export interface BasePoolV2Options extends ContractOptions {
    gasConstants?: Partial<typeof BasePoolV2.gasConstants>;
}
export declare class BasePoolV2 extends JettonMinter {
    static readonly version: "v2";
    static readonly gasConstants: {
        collectFees: bigint;
        burn: bigint;
    };
    readonly gasConstants: {
        collectFees: bigint;
        burn: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: BasePoolV2Options);
    createCollectFeesBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    getCollectFeeTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendCollectFees(provider: ContractProvider, via: Sender, params: Parameters<BasePoolV2["getCollectFeeTxParams"]>[1]): Promise<void>;
    createBurnBody(params: {
        amount: AmountType;
        customPayload?: Cell;
        queryId?: QueryIdType;
    }): Promise<Cell>;
    getBurnTxParams(provider: ContractProvider, params: {
        amount: AmountType;
        userWalletAddress: AddressType;
        customPayload?: Cell;
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendBurn(provider: ContractProvider, via: Sender, params: Parameters<BasePoolV2["getBurnTxParams"]>[1]): Promise<void>;
    getPoolType(provider: ContractProvider): Promise<"constant_product">;
    getLpAccountAddress(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<import("@ton/ton").Address>;
    getLpAccount(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<LpAccountV2>;
    getJettonWallet(provider: ContractProvider, params: {
        ownerAddress: AddressType;
    }): Promise<JettonWallet>;
    getPoolData(provider: ContractProvider): Promise<{
        isLocked: boolean;
        routerAddress: import("@ton/ton").Address;
        totalSupplyLP: bigint;
        reserve0: bigint;
        reserve1: bigint;
        token0WalletAddress: import("@ton/ton").Address;
        token1WalletAddress: import("@ton/ton").Address;
        lpFee: bigint;
        protocolFee: bigint;
        protocolFeeAddress: import("@ton/ton").Address | null;
        collectedToken0ProtocolFee: bigint;
        collectedToken1ProtocolFee: bigint;
    }>;
    protected implGetPoolData(provider: ContractProvider): Promise<{
        commonPoolData: {
            isLocked: boolean;
            routerAddress: import("@ton/ton").Address;
            totalSupplyLP: bigint;
            reserve0: bigint;
            reserve1: bigint;
            token0WalletAddress: import("@ton/ton").Address;
            token1WalletAddress: import("@ton/ton").Address;
            lpFee: bigint;
            protocolFee: bigint;
            protocolFeeAddress: import("@ton/ton").Address | null;
            collectedToken0ProtocolFee: bigint;
            collectedToken1ProtocolFee: bigint;
        };
        stack: import("@ton/ton").TupleReader;
    }>;
}
