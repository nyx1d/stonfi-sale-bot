import { type Cell } from "@ton/ton";
import type { AddressType, QueryIdType, AmountType } from '../types';
/**
 * Implements `transfer` function from Jettons Standard.
 * [Docs](https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md#1-transfer)
 *
 * ```TL-B
 * transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress response_destination:MsgAddress custom_payload:(Maybe ^Cell) forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell) = InternalMsgBody;
 * ```
 */
export declare function createJettonTransferMessage(params: {
    queryId: QueryIdType;
    amount: AmountType;
    destination: AddressType;
    responseDestination?: AddressType;
    customPayload?: Cell;
    forwardTonAmount: AmountType;
    forwardPayload?: Cell;
}): Cell;
