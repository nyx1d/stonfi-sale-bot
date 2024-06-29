import type { Address, Contract as ContractInterface } from "@ton/ton";
import type { AddressType } from '../../types';
export interface ContractOptions {
}
export declare abstract class Contract implements ContractInterface {
    readonly address: Address;
    constructor(address: AddressType, options?: ContractOptions);
    static create<T extends Contract>(this: new (address: AddressType) => T, address: AddressType): T;
}
