import { Address } from "@ton/ton";
import type { AddressType } from '../types';
/** Convert passed value to Address instance if it's not already */
export declare function toAddress(addressValue: AddressType): Address;
