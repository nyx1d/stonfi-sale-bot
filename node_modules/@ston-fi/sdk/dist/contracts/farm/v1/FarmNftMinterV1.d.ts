import { type Address, type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
import { FARM_VERSION } from "../constants";
export interface FarmNftMinterV1Options extends ContractOptions {
    gasConstants?: Partial<typeof FarmNftMinterV1.gasConstants>;
}
/**
 * @deprecated `v1` version of the FarmNftMinter contracts is deprecated.
 *
 * Only use this version for get data contract calls.
 * For all other operations, use the latest version of the contract.
 */
export declare class FarmNftMinterV1 extends Contract {
    static readonly version: FARM_VERSION;
    static readonly gasConstants: {
        stake: bigint;
        stakeForward: bigint;
    };
    readonly gasConstants: {
        stake: bigint;
        stakeForward: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: FarmNftMinterV1Options);
    createStakeBody(): Promise<Cell>;
    /**
     * Build all data required to execute a jetton `stake` transaction
     *
     * @param {Address | string} params.userWalletAddress - User's address
     * @param {Address | string} params.jettonAddress - Jetton address of token to be staked
     * @param {bigint | number} params.jettonAmount - Amount of tokens to be staked (in basic token units)
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | string | undefined} params.forwardGasAmount - Optional; Custom transaction forward gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} containing all data required to execute a jetton `stake` transaction
     */
    getStakeTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        jettonAddress: AddressType;
        jettonAmount: AmountType;
        gasAmount?: AmountType;
        forwardGasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendStake(provider: ContractProvider, via: Sender, params: Parameters<FarmNftMinterV1["getStakeTxParams"]>[1]): Promise<void>;
    /**
     * @returns structure containing current state of the minter
     *
     * @property {bigint} nextItemIndex - Index of the next nft in this collection
     * @property {bigint} lastUpdateTime - Last time farming values were updated
     * @property {number} status - Status of the contract: uninitialized `0`, active `1`, paused `3`
     * @property {bigint} depositedNanorewards - Deposited rewards in nanounits
     * @property {bigint} currentStakedTokens - Number of staked tokens in basic token units
     * @property {bigint} accruedPerUnitNanorewards - Number of accrued nanorewards per basic stake token unit
     * @property {bigint} accruedNanorewards - Total number of accrued rewards in nanounits
     * @property {bigint} claimedNanorewards - Number of claimed rewards in nanounits
     * @property {bigint} contractUniqueId - Minter id
     * @property {bigint} nanorewardsPer24h - Total number of accrued rewards per 24h in nanounits
     * @property {boolean} soulboundItems - Whether minted NFTs are soulbound
     * @property {bigint} minStakeTime - Minimum staking time
     * @property {Address} stakingTokenWallet - Minter's staking jetton wallet
     * @property {Address} rewardTokenWallet - Minter's reward jetton wallet
     */
    getFarmingMinterData(provider: ContractProvider): Promise<{
        nextItemIndex: bigint;
        lastUpdateTime: bigint;
        status: number;
        depositedNanorewards: bigint;
        currentStakedTokens: bigint;
        accruedPerUnitNanorewards: bigint;
        accruedNanorewards: bigint;
        claimedNanorewards: bigint;
        contractUniqueId: bigint;
        nanorewardsPer24h: bigint;
        soulboundItems: boolean;
        minStakeTime: bigint;
        stakingTokenWallet: Address;
        rewardTokenWallet: Address;
    }>;
    /**
     * @returns {Address} address of minter for staking jetton that is used for farming
     */
    getStakingJettonAddress(provider: ContractProvider): Promise<Address>;
}
