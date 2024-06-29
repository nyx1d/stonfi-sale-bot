import { StonApiClient } from "@ston-fi/api";
import { TonClient, TupleReader } from "@ton/ton";
export declare class Client extends TonClient {
    private stonApiClient;
    constructor(options: ConstructorParameters<typeof TonClient>[0] & {
        stonApiClient?: StonApiClient;
    });
    callGetMethod(...args: Parameters<TonClient["callGetMethod"]>): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
}
