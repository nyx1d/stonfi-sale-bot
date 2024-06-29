export { DEX_VERSION, DEX_TYPE } from "./constants";
export declare const DEX: {
    readonly v1: {
        readonly Router: typeof import("./v1/RouterV1").RouterV1;
        readonly Pool: typeof import("./v1/PoolV1").PoolV1;
        readonly LpAccount: typeof import("./v1/LpAccountV1").LpAccountV1;
    };
    readonly v2: {
        readonly Router: typeof import("./v2/router/RouterV2").RouterV2;
        readonly Pool: typeof import("./v2/pool/PoolV2").PoolV2;
        readonly LpAccount: typeof import("./v2/LpAccount/LpAccountV2").LpAccountV2;
        readonly Vault: typeof import("./v2/vault/VaultV2").VaultV2;
    };
};
