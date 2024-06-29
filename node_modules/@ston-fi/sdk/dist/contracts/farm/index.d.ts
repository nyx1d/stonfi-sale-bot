export { FARM_VERSION } from "./constants";
export declare const FARM: {
    readonly v1: {
        readonly NftItem: typeof import("./v1/FarmNftItemV1").FarmNftItemV1;
        readonly NftMinter: typeof import("./v1/FarmNftMinterV1").FarmNftMinterV1;
    };
    readonly v2: {
        readonly NftItem: typeof import("./v2/FarmNftItemV2").FarmNftItemV2;
        readonly NftMinter: typeof import("./v2/FarmNftMinterV2").FarmNftMinterV2;
    };
    readonly v3: {
        readonly NftItem: typeof import("./v3/FarmNftItemV3").FarmNftItemV3;
        readonly NftMinter: typeof import("./v3/FarmNftMinterV3").FarmNftMinterV3;
    };
};
