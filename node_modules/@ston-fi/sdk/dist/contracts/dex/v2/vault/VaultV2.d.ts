import { type Cell, type ContractProvider, type Sender, type SenderArguments } from "@ton/ton";
import type { QueryIdType, AmountType, AddressType } from '../../../../types';
import { Contract, type ContractOptions } from '../../../../contracts/core/Contract';
export interface VaultV2Options extends ContractOptions {
    gasConstants?: Partial<typeof VaultV2.gasConstants>;
}
/**
 * Token vault stores referral fees on a separate contract similar to an LP account.
 * This will allow us to decrease TX fees for swaps since users won't have to pay for additional Jetton transfer TX.
 *
 * Vault address is defined by router_address, owner_address and router_token_Wallet_address,
 * so, for each token, each user can have a dedicated vault contract.
 */
export declare class VaultV2 extends Contract {
    static readonly version: "v2";
    static readonly gasConstants: {
        withdrawFee: bigint;
    };
    readonly gasConstants: {
        withdrawFee: bigint;
    };
    constructor(address: AddressType, { gasConstants, ...options }?: VaultV2Options);
    createWithdrawFeeBody(params?: {
        queryId?: QueryIdType;
    }): Promise<Cell>;
    /**
     * Build all data required to execute a `withdraw_fee` transaction.
     *
     * @param {ContractProvider} provider - {@link ContractProvider} instance
     *
     * @param {object | undefined} params - Optional tx params
     * @param {bigint | number | string | undefined} params.gasAmount - Optional; Custom transaction gas amount (in nanoTons)
     * @param {bigint | number | undefined} params.queryId - Optional; query id
     *
     *
     * @returns {SenderArguments} all data required to execute a `withdraw_fee` transaction.
     */
    getWithdrawFeeTxParams(provider: ContractProvider, params?: {
        gasAmount?: AmountType;
        queryId?: QueryIdType;
    }): Promise<SenderArguments>;
    sendWithdrawFee(provider: ContractProvider, via: Sender, params: Parameters<VaultV2["getWithdrawFeeTxParams"]>[1]): Promise<void>;
    /**
     * Get the current state of the vault contract.
     *
     * @param {ContractProvider} provider - {@link ContractProvider} instance
     *
     *
     * @returns {Promise<object>} structure containing the current state of the vault contract.
     */
    getVaultData(provider: ContractProvider): Promise<{
        ownerAddress: import("@ton/ton").Address;
        tokenAddress: import("@ton/ton").Address;
        routerAddress: import("@ton/ton").Address;
        depositedAmount: bigint;
    }>;
}
