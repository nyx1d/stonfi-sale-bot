import type { Cell, ContractProvider, Sender, SenderArguments } from "@ton/ton";
import type { AmountType, QueryIdType } from '../../../types';
import { FarmNftItemV1, type FarmNftItemV1Options } from "../v1/FarmNftItemV1";
export interface FarmNftItemV2Options extends FarmNftItemV1Options {
}
/**
 * @deprecated `v2` version of the FarmNftItem contracts is deprecated.
 *
 * Only use this version to claim rewards and unstake tokens from the contract.
 * For all other operations, use the latest version of the contract.
 */
export declare class FarmNftItemV2 extends FarmNftItemV1 {
    static version: "v2";
    createDestroyBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `destroy` transaction.
     *
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; amount of gas for the transaction (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} all data required to execute a `destroy` transaction.
     */
    getDestroyTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendDestroy(provider: ContractProvider, via: Sender, params: Parameters<FarmNftItemV2["getDestroyTxParams"]>[1]): Promise<void>;
    /**
     * @returns structure containing current state of the farm NFT
     *
     * @property {number} status Status of the contract: uninitialized `0`, active `1`, unstaked `2`, claiming `3`
     * @property {bigint} revokeTime Timestamp of unstake
     * @property {bigint} stakedTokens Amount of staked tokens
     * @property {bigint} claimedPerUnitNanorewards `accrued_per_unit_nanorewards` at the time the user made the stake or last claimed rewards
     * @property {bigint} stakeDate Timestamp in which the owner started staking
     * @property {boolean} isSoulbound If nft is soulbound; Always true in V2
     */
    getFarmingData(provider: ContractProvider): Promise<{
        status: number;
        revokeTime: bigint;
        stakedTokens: bigint;
        claimedPerUnitNanorewards: bigint;
        stakeDate: bigint;
        isSoulbound: boolean;
    }>;
}
