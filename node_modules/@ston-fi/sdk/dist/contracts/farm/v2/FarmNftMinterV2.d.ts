import type { ContractProvider } from "@ton/ton";
import { FarmNftMinterV1, type FarmNftMinterV1Options } from "../v1/FarmNftMinterV1";
export interface FarmNftMinterV2Options extends FarmNftMinterV1Options {
}
/**
 * @deprecated `v2` version of the FarmNftMinter contracts is deprecated.
 *
 * Only use this version for get data contract calls.
 * For all other operations, use the latest version of the contract.
 */
export declare class FarmNftMinterV2 extends FarmNftMinterV1 {
    static version: "v2";
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
        newCustodian: import("@ton/ton").Address | null;
        pendingMsg: import("@ton/ton").Cell;
        newCode: import("@ton/ton").Cell;
        newStorage: import("@ton/ton").Cell;
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
     * @property {bigint} lastUpdateTime - Last time farming values were updated
     * @property {number} status - Status of the contract: uninitialized `0`, active `1`, paused `3`
     * @property {bigint} depositedNanorewards - Deposited rewards in nanounits
     * @property {bigint} currentStakedTokens - Number of staked tokens in basic token units
     * @property {bigint} accruedPerUnitNanorewards - Number of accrued nanorewards per basic stake token unit
     * @property {bigint} claimedFeeNanorewards - Claimed fees
     * @property {bigint} accruedFeeNanorewards - Accrued fees
     * @property {bigint} accruedNanorewards - Total number of accrued rewards in nanounits
     * @property {bigint} claimedNanorewards - Number of claimed rewards in nanounits
     * @property {bigint} contractUniqueId - Minter id
     * @property {bigint} nanorewardsPer24h - Total number of accrued rewards per 24h in nanounits
     * @property {bigint} adminFee - Admin fee; divider is 10000
     * @property {bigint} minStakeTime - Minimum staking time
     * @property {Address} stakingTokenWallet - Minter's staking jetton wallet
     * @property {Address} rewardTokenWallet - Minter's reward jetton wallet
     * @property {Address} custodianAddress - Custodian address
     * @property {boolean} canChangeCustodian - If can change custodian
     * @property {boolean} canSendRawMsg - If can send raw msg
     * @property {boolean} canChangeFee - If can change fee
     * @property {boolean} unrestrictedDepositRewards - If rewards can be deposited by anyone
     * @property {boolean} soulboundItems - Whether minted NFTs are soulbound; Always true in V2
     */
    getFarmingMinterData(provider: ContractProvider): Promise<{
        nextItemIndex: bigint;
        lastUpdateTime: bigint;
        status: number;
        depositedNanorewards: bigint;
        currentStakedTokens: bigint;
        accruedPerUnitNanorewards: bigint;
        claimedFeeNanorewards: bigint;
        accruedFeeNanorewards: bigint;
        accruedNanorewards: bigint;
        claimedNanorewards: bigint;
        contractUniqueId: bigint;
        nanorewardsPer24h: bigint;
        adminFee: bigint;
        minStakeTime: bigint;
        stakingTokenWallet: import("@ton/ton").Address;
        rewardTokenWallet: import("@ton/ton").Address;
        custodianAddress: import("@ton/ton").Address | null;
        canChangeCustodian: boolean;
        canSendRawMsg: boolean;
        canChangeFee: boolean;
        unrestrictedDepositRewards: boolean;
        soulboundItems: boolean;
    }>;
}
