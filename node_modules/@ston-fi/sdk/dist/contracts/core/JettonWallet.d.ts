import type { ContractProvider } from "@ton/ton";
import { Contract } from '../../contracts/core/Contract';
export declare class JettonWallet extends Contract {
    getBalance(provider: ContractProvider): Promise<bigint>;
    getWalletData(provider: ContractProvider): Promise<{
        balance: bigint;
        ownerAddress: import("@ton/ton").Address;
        jettonMasterAddress: import("@ton/ton").Address;
        jettonWalletCode: import("@ton/ton").Cell;
    }>;
}
