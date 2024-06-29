import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { AddressType, QueryIdType } from '../../../types';
export interface FarmNftItemV3Options extends ContractOptions {
    gasConstants?: Partial<typeof FarmNftItemV3.gasConstants>;
}
export declare class FarmNftItemV3 extends Contract {
    static readonly version: "v3";
    static readonly gasConstants: {
        claimRewardsBase: bigint;
        claimRewardsPerPool: bigint;
        unstakeBase: bigint;
        unstakePerPool: bigint;
        destroy: bigint;
    };
    readonly gasConstants: {
        claimRewardsBase: bigint;
        claimRewardsPerPool: bigint;
        unstakeBase: bigint;
        unstakePerPool: bigint;
        destroy: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: FarmNftItemV3Options);
    createClaimRewardsBody(params: {
        queryId?: QueryIdType;
    } & ({
        claimAll: true;
    } | {
        claimAll: false;
        poolIndex: number;
    })): Promise<Cell>;
    /**
     * Build all data required to execute a `claim_rewards` transaction.
     *
     * @param {number | undefined} params.poolCount - Optional; Number of deployed farm reward pools; If undefined value will get onchain
     * @param {number | undefined} params.poolIndex - Optional; farm reward pool index used for claiming; If undefined claim rewards from all pools
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `claim_rewards` transaction.
     */
    getClaimRewardsTxParams(provider: ContractProvider, params?: {
        poolCount?: number;
        queryId?: QueryIdType;
        poolIndex?: number;
    }): Promise<SenderArguments>;
    sendClaimRewards(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV3["getClaimRewardsTxParams"]>[1]): Promise<void>;
    createUnstakeBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `unstake` transaction.
     *
     * @param {number | undefined} params.poolCount -  Optional; Number of deployed farm reward pools; If undefined value will get onchain
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `unstake` transaction.
     */
    getUnstakeTxParams(provider: ContractProvider, params?: {
        poolCount?: number;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendUnstake(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV3["getUnstakeTxParams"]>[1]): Promise<void>;
    createDestroyBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `destroy` transaction.
     *
     * @param {bigint | string | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `destroy` transaction.
     */
    getDestroyTxParams(provider: ContractProvider, params?: {
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendDestroy(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV3["getDestroyTxParams"]>[1]): Promise<void>;
    /**
     * @returns structure containing current state of the farm NFT
     *
     * @property {number} status Status of the contract: uninitialized (0), active (1), unstaked (2), claiming (3), unstaked_pending (4)
     * @property {bigint} revokeTime Timestamp of unstake
     * @property {bigint} stakedTokens Amount of staked tokens
     * @property {bigint} stakeDate Timestamp in which the owner started staking
     * @property {Map<number, bigint>} claimedPerUnit `accrued_per_unit_nanorewards amounts` for each pool at the time of last claim for this user
     * @property {Address} ownerAddress Owner address of farm nft
     */
    getFarmingData(provider: ContractProvider): Promise<{
        status: number;
        revokeTime: bigint;
        stakedTokens: bigint;
        stakeDate: bigint;
        claimedPerUnit: Map<number, bigint>;
        ownerAddress: import("@ton/ton").Address;
    }>;
    getPoolCount(provider: ContractProvider): Promise<number>;
}
