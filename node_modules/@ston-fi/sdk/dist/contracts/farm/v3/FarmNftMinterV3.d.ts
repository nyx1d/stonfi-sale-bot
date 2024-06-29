import { type Address, type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import { Contract, type ContractOptions } from '../../../contracts/core/Contract';
import type { AddressType, AmountType, QueryIdType } from '../../../types';
import { FARM_VERSION } from "../constants";
/**
 *  @type {FarmDataAccrued} represent state of the accrued data for pool
 *
 * @property {bigint} depositedNanorewards - Deposited rewards in nanounits
 * @property {bigint} accruedPerUnitNanorewards - Number of accrued nanorewards per basic stake token unit
 * @property {bigint} accruedFeeNanorewards - Accrued fees
 * @property {bigint} claimedNanorewards - Number of claimed rewards in nanounits
 * @property {bigint} claimedFeeNanorewards - Claimed fees
 * @property {bigint} accruedNanorewards - Total number of accrued rewards in nanounits
 * @property {bigint} lastUpdateTime - Last time farming values were updated
 */
export declare type FarmDataAccrued = {
    depositedNanorewards: bigint;
    accruedPerUnitNanorewards: bigint;
    accruedFeeNanorewards: bigint;
    claimedNanorewards: bigint;
    claimedFeeNanorewards: bigint;
    accruedNanorewards: bigint;
    lastUpdateTime: bigint;
};
/**
 *  @type {FarmDataParameters} represent state of the pool parameters
 *
 * @property {bigint} adminFee - Admin fee; divider is 10000
 * @property {bigint} nanorewardsPer24h - Total number of accrued rewards per 24h in nanounits
 * @property {boolean} unrestrictedDepositRewards - If rewards can be deposited by anyone
 * @property {Address} rewardTokenWallet - Minter's reward jetton wallet
 * @property {boolean} canChangeFee - If can change fee
 * @property {bigint} status - Status of the contract
 */
export declare type FarmDataParameters = {
    adminFee: bigint;
    nanorewardsPer24h: bigint;
    unrestrictedDepositRewards: boolean;
    rewardTokenWallet: Address;
    canChangeFee: boolean;
    status: number;
};
export interface FarmNftMinterV3Options extends ContractOptions {
    gasConstants?: Partial<typeof FarmNftMinterV3.gasConstants>;
}
export declare class FarmNftMinterV3 extends Contract {
    static readonly version: FARM_VERSION;
    static readonly gasConstants: {
        stakeFwdBase: bigint;
        stakeFwdPerPool: bigint;
        stake: bigint;
    };
    readonly gasConstants: {
        stakeFwdBase: bigint;
        stakeFwdPerPool: bigint;
        stake: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: FarmNftMinterV3Options);
    createStakeBody(params?: {
        ownerAddress?: AddressType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a jetton `stake` transaction
     *
     * @param {Address | string} params.userWalletAddress - User's address
     * @param {Address | string} params.jettonAddress - Jetton address of token to be staked
     * @param {bigint | number} params.jettonAmount - Amount of tokens to be staked (in basic token units)
     * @param {number | undefined} params.poolCount - Optional; Number of deployed farm reward pools; If undefined value will get onchain
     * @param {Address | string} params.ownerAddress - Optional; custom owner of stake; if undefined stake owner is sender address
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     * @returns {SenderArguments} containing all data required to execute a jetton `stake` transaction
     */
    getStakeTxParams(provider: ContractProvider, params: {
        userWalletAddress: AddressType;
        jettonAddress: AddressType;
        jettonAmount: AmountType;
        poolCount?: number;
        ownerAddress?: AddressType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendStake(provider: ContractProvider, via: Sender, params: Parameters<FarmNftMinterV3["getStakeTxParams"]>[1]): Promise<void>;
    /**
     * @returns {Address} address of minter for staking jetton that is used for farming
     */
    getStakingJettonAddress(provider: ContractProvider): Promise<Address>;
    /**
     * @returns structure containing pending data
     *
     * @property {bigint} changeCustodianTs - Timestamp when 'change_custodian' was initiated
     * @property {bigint} sendMsgTs - Timestamp when 'send_raw_msg' was initiated
     * @property {bigint} codeUpgradeTs - Timestamp when 'code_upgrade' was initiated
     * @property {Address} newCustodian - New custodian that will be set after confirmation
     * @property {Cell} pendingMsg - Pending msg that will be sends after confirmation
     * @property {Cell} newCode - New contract code that will be set after confirmation
     * @property {Cell} newStorage - New contract storage that will be set after confirmation
     */
    getPendingData(provider: ContractProvider): Promise<{
        changeCustodianTs: bigint;
        sendMsgTs: bigint;
        codeUpgradeTs: bigint;
        newCustodian: Address | null;
        pendingMsg: Cell;
        newCode: Cell;
        newStorage: Cell;
    }>;
    /**
     * @returns structure containing version data
     *
     * @property {number} major - Major version; breaking changes in api
     * @property {number} minor - Minor version; non-breaking new functionality
     * @property {string} development - Development version; can contain breaking changes
     */
    getVersion(provider: ContractProvider): Promise<{
        major: number;
        minor: number;
        development: string;
    }>;
    /**
     * @returns structure containing current state of the minter
     *
     * @property {bigint} nextItemIndex - Index of the next nft in this collection
     * @property {number} status - Status of the contract: uninitialized `0`, operational `1`, pause_all `2`, frozen `3`, retired `4`,
     * @property {number} poolCount - Pools count
     * @property {bigint} currentStakedTokens - Number of staked tokens in basic token units
     * @property {bigint} contractUniqueId - Minter id
     * @property {bigint} minStakeTime - Minimum staking time
     * @property {Address} stakingTokenWallet - Minter's staking jetton wallet
     * @property {Address} custodianAddress - Custodian address
     * @property {boolean} canChangeCustodian - If can change custodian
     * @property {boolean} canSendRawMsg - If admin can send arbitrary raw msg from Minter
     * @property {Map<number, FarmDataAccrued>} farmDataAccrued - Accrued data for pools
     * @property {Map<number, FarmDataParameters>} farmDataParameters - Pools parameters
     */
    getFarmingMinterData(provider: ContractProvider): Promise<{
        nextItemIndex: bigint;
        status: number;
        poolCount: number;
        currentStakedTokens: bigint;
        contractUniqueId: bigint;
        minStakeTime: bigint;
        stakingTokenWallet: Address;
        custodianAddress: Address;
        canChangeCustodian: boolean;
        canSendRawMsg: boolean;
        farmDataAccrued: Map<number, FarmDataAccrued>;
        farmDataParameters: Map<number, FarmDataParameters>;
    }>;
}
