import type { ContractProvider } from "@ton/ton";
import { BasePoolV2 } from "./BasePoolV2";
export declare class CPIPoolV2 extends BasePoolV2 {
    static readonly dexType: "constant_product";
    getPoolData(provider: ContractProvider): Promise<{
        isLocked: boolean;
        routerAddress: import("@ton/ton").Address;
        totalSupplyLP: bigint;
        reserve0: bigint;
        reserve1: bigint;
        token0WalletAddress: import("@ton/ton").Address;
        token1WalletAddress: import("@ton/ton").Address;
        lpFee: bigint;
        protocolFee: bigint;
        protocolFeeAddress: import("@ton/ton").Address | null;
        collectedToken0ProtocolFee: bigint;
        collectedToken1ProtocolFee: bigint;
    }>;
}
