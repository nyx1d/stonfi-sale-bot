import type { ContractProvider } from "@ton/ton";
import type { AddressType } from '../../../../types';
import { CPIPoolV2 } from "../pool/CPIPoolV2";
import { BaseRouterV2 } from "./BaseRouterV2";
export declare class CPIRouterV2 extends BaseRouterV2 {
    static readonly dexType: "constant_product";
    getPool(provider: ContractProvider, params: {
        token0: AddressType;
        token1: AddressType;
    }): Promise<CPIPoolV2>;
}
