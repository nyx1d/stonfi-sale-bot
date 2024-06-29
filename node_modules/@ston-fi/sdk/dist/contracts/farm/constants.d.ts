export declare const FARM_OP_CODES: {
    readonly STAKE: 1858722917;
    readonly CLAIM_REWARDS: 2027548937;
    readonly UNSTAKE: 3106497952;
};
export declare const FARM_VERSION: {
    readonly v1: "v1";
    readonly v2: "v2";
    readonly v3: "v3";
};
export declare type FARM_VERSION = (typeof FARM_VERSION)[keyof typeof FARM_VERSION];
