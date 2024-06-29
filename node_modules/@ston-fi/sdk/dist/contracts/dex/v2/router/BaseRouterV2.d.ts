import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import type { AddressType, AmountType, QueryIdType } from '../../../../types';
import { Contract, type ContractOptions } from '../../../../contracts/core/Contract';
import type { Pton } from '../../../../contracts/pTON/types';
import { BasePoolV2 } from "../pool/BasePoolV2";
import { VaultV2 } from "../vault/VaultV2";
export interface BaseRouterV2Options extends ContractOptions {
    gasConstants?: Partial<typeof BaseRouterV2.gasConstants>;
}
export declare class BaseRouterV2 extends Contract {
    static readonly version: "v2";
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
        singleSideProvideLpJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        singleSideProvideLpTon: {
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
        singleSideProvideLpJetton: {
            gasAmount: bigint;
            forwardGasAmount: bigint;
        };
        singleSideProvideLpTon: {
            forwardGasAmount: bigint;
        };
    };
    constructor(address: AddressType, { gasConstants, ...options }?: BaseRouterV2Options);
    createSwapBody(params: {
        askJettonWalletAddress: AddressType;
        receiverAddress: AddressType;
        minAskAmount: AmountType;
        refundAddress: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        refundPayload?: Cell;
        refundForwardGasAmount?: AmountType;
        referralAddress?: AddressType;
        referralValue?: AmountType;
    }): Promise<Cell>;
    createCrossSwapBody(params: {
        askJettonWalletAddress: AddressType;
        receiverAddress: AddressType;
        minAskAmount: AmountType;
        refundAddress: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        refundPayload?: Cell;
        refundForwardGasAmount?: AmountType;
        referralAddress?: AddressType;
        referralValue?: AmountType;
    }): Promise<Cell>;
    getSwapJettonToJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        offerJettonAddress: AddressType;
        askJettonAddress: AddressType;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        referralAddress?: AddressType;
        referralValue?: AmountType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        refundPayload?: Cell;
        refundForwardGasAmount?: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapJettonToJetton(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getSwapJettonToJettonTxParams"]>[1]): Promise<void>;
    getSwapJettonToTonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        offerJettonAddress: AddressType;
        proxyTon: Pton;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        referralAddress?: AddressType;
        referralValue?: AmountType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        refundPayload?: Cell;
        refundForwardGasAmount?: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapJettonToTon(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getSwapJettonToTonTxParams"]>[1]): Promise<void>;
    getSwapTonToJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        proxyTon: Pton;
        askJettonAddress: AddressType;
        offerAmount: AmountType;
        minAskAmount: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        referralAddress?: AddressType;
        referralValue?: AmountType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        refundPayload?: Cell;
        refundForwardGasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSwapTonToJetton(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getSwapTonToJettonTxParams"]>[1]): Promise<void>;
    createProvideLiquidityBody(params: {
        routerWalletAddress: AddressType;
        minLpOut: AmountType;
        receiverAddress: AddressType;
        refundAddress: AddressType;
        excessesAddress?: AddressType;
        bothPositive: boolean;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
    }): Promise<Cell>;
    createCrossProvideLiquidityBody(params: {
        routerWalletAddress: AddressType;
        minLpOut: AmountType;
        receiverAddress: AddressType;
        refundAddress: AddressType;
        excessesAddress?: AddressType;
        bothPositive: boolean;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
    }): Promise<Cell>;
    getProvideLiquidityJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        sendTokenAddress: AddressType;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendProvideLiquidityJetton(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getProvideLiquidityJettonTxParams"]>[1]): Promise<void>;
    getSingleSideProvideLiquidityJettonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        sendTokenAddress: AddressType;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSingleSideProvideLiquidityJetton(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getSingleSideProvideLiquidityJettonTxParams"]>[1]): Promise<void>;
    protected implGetProvideLiquidityJettonTxParams(provider: ContractProvider, params: Parameters<BaseRouterV2["getProvideLiquidityJettonTxParams"]>[1] & {
        gasAmount: AmountType;
        forwardGasAmount: AmountType;
        bothPositive: boolean;
    }): Promise<{
        to: import("@ton/ton").Address;
        value: bigint;
        body: Cell;
    }>;
    getProvideLiquidityTonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        proxyTon: Pton;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        bothPositive?: boolean;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendProvideLiquidityTon(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getProvideLiquidityTonTxParams"]>[1]): Promise<void>;
    getSingleSideProvideLiquidityTonTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        proxyTon: Pton;
        otherTokenAddress: AddressType;
        sendAmount: AmountType;
        minLpOut: AmountType;
        refundAddress?: AddressType;
        excessesAddress?: AddressType;
        bothPositive?: boolean;
        customPayload?: Cell;
        customPayloadForwardGasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendSingleSideProvideLiquidityTon(provider: ContractProvider, via: Sender, params: Parameters<BaseRouterV2["getSingleSideProvideLiquidityTonTxParams"]>[1]): Promise<void>;
    protected implGetProvideLiquidityTonTxParams(provider: ContractProvider, params: Parameters<BaseRouterV2["getProvideLiquidityTonTxParams"]>[1] & {
        forwardGasAmount: AmountType;
        bothPositive: boolean;
    }): Promise<SenderArguments>;
    getPoolAddress(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<import("@ton/ton").Address>;
    getPoolAddressByJettonMinters(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<import("@ton/ton").Address>;
    getPool(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<BasePoolV2>;
    getVaultAddress(provider: ContractProvider, params: {
        user: AddressType;
        tokenWallet: AddressType;
    }): Promise<import("@ton/ton").Address>;
    getVault(provider: ContractProvider, params: {
        user: AddressType;
        tokenMinter: AddressType;
    }): Promise<VaultV2>;
    getRouterVersion(provider: ContractProvider): Promise<{
        major: number;
        minor: number;
        development: string;
    }>;
    getRouterData(provider: ContractProvider): Promise<{
        routerId: number;
        dexType: "constant_product";
        isLocked: boolean;
        adminAddress: import("@ton/ton").Address;
        tempUpgrade: Cell;
        poolCode: Cell;
        jettonLpWalletCode: Cell;
        lpAccountCode: Cell;
        vaultCode: Cell;
    }>;
}
