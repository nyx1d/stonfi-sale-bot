import { type ContractProvider } from "@ton/ton";
import { Contract } from '../../contracts/core/Contract';
import type { AddressType } from '../../types';
export declare class JettonMinter extends Contract {
    getWalletAddress(provider: ContractProvider, ownerAddress: AddressType): Promise<import("@ton/ton").Address>;
    getJettonData(provider: ContractProvider): Promise<{
        totalSupply: bigint;
        canIncSupply: boolean;
        adminAddress: import("@ton/ton").Address | null;
        contentRaw: import("@ton/ton").Cell;
        jettonWalletCode: import("@ton/ton").Cell;
    }>;
}
