import { DEX_VERSION } from "./constants.js";
import { DEX_TYPE } from "./constants.js";
import { DEX as DEX$1 } from "./v1/index.js";
import { DEX as DEX$2 } from "./v2/index.js";
const DEX = {
  [DEX_VERSION.v1]: DEX$1,
  [DEX_VERSION.v2]: DEX$2
};
export {
  DEX,
  DEX_TYPE,
  DEX_VERSION
};
//# sourceMappingURL=index.js.map
