import { PtonV1 } from "./v1/PtonV1.js";
import { PtonV2 } from "./v2/PtonV2.js";
import { pTON_VERSION } from "./constants.js";
const pTON = {
  [pTON_VERSION.v1]: PtonV1,
  [pTON_VERSION.v2]: PtonV2
};
export {
  pTON,
  pTON_VERSION
};
//# sourceMappingURL=index.js.map
