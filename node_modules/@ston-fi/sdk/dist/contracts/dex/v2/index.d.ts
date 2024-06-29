import { RouterV2 } from "./router/RouterV2";
import { PoolV2 } from "./pool/PoolV2";
import { LpAccountV2 } from "./LpAccount/LpAccountV2";
import { VaultV2 } from "./vault/VaultV2";
export declare const DEX: {
    readonly Router: typeof RouterV2;
    readonly Pool: typeof PoolV2;
    readonly LpAccount: typeof LpAccountV2;
    readonly Vault: typeof VaultV2;
};
