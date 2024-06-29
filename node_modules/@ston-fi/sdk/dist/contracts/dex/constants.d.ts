export declare const DEX_OP_CODES: {
    readonly SWAP: 630424929;
    readonly CROSS_SWAP: 4294967279;
    readonly PROVIDE_LP: 4244235663;
    readonly CROSS_PROVIDE_LP: 4294967039;
    readonly DIRECT_ADD_LIQUIDITY: 1291331587;
    readonly REFUND_ME: 200537159;
    readonly RESET_GAS: 1117846339;
    readonly COLLECT_FEES: 533429565;
    readonly BURN: 1499400124;
    readonly WITHDRAW_FEE: 1173171655;
};
export declare const DEX_VERSION: {
    readonly v1: "v1";
    readonly v2: "v2";
};
export declare type DEX_VERSION = (typeof DEX_VERSION)[keyof typeof DEX_VERSION];
export declare const DEX_TYPE: {
    readonly CPI: "constant_product";
};
export declare type DEX_TYPE = (typeof DEX_TYPE)[keyof typeof DEX_TYPE];
