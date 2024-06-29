import { PtonV1 } from "./v1/PtonV1";
import { PtonV2 } from "./v2/PtonV2";
export { pTON_VERSION } from "./constants";
export declare const pTON: {
    v1: typeof PtonV1;
    v2: typeof PtonV2;
};
