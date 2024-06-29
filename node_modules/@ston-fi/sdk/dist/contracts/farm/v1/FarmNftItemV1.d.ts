import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
import { FARM_VERSION } from "../constants";
export interface FarmNftItemV1Options extends ContractOptions {
    gasConstants?: Partial<typeof FarmNftItemV1.gasConstants>;
}
/**
 * @deprecated `v1` version of the FarmNftItem contracts is deprecated.
 *
 * Only use this version to claim rewards and unstake tokens from the contract.
 * For all other operations, use the latest version of the contract.
 */
export declare class FarmNftItemV1 extends Contract {
    static readonly version: FARM_VERSION;
    static readonly gasConstants: {
        claimRewards: bigint;
        unstake: bigint;
        destroy: bigint;
    };
    readonly gasConstants: {
        claimRewards: bigint;
        unstake: bigint;
        destroy: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: FarmNftItemV1Options);
    createClaimRewardsBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `claim_rewards` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `claim_rewards` transaction.
     */
    getClaimRewardsTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendClaimRewards(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV1["getClaimRewardsTxParams"]>[1]): Promise<void>;
    createUnstakeBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `unstake` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `unstake` transaction.
     */
    getUnstakeTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendUnstake(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV1["getUnstakeTxParams"]>[1]): Promise<void>;
    /**
     * @returns structure containing current state of the farm NFT
     *
     * @property {number} status Status of the contract: uninitialized `0`, active `1`, unstaked `2`, claiming `3`
     * @property {boolean} isSoulbound If nft is soulbound
     * @property {bigint} stakedTokens Amount of staked tokens
     * @property {bigint} claimedPerUnitNanorewards `accrued_per_unit_nanorewards` at the time the user made the stake or last claimed rewards
     */
    getFarmingData(provider: ContractProvider): Promise<{
        status: number;
        isSoulbound: boolean;
        stakedTokens: bigint;
        claimedPerUnitNanorewards: bigint;
    }>;
}
