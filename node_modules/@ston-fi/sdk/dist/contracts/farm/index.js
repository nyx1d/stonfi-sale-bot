import { FARM as FARM$1 } from "./v1/index.js";
import { FARM as FARM$2 } from "./v2/index.js";
import { FARM as FARM$3 } from "./v3/index.js";
import { FARM_VERSION } from "./constants.js";
const FARM = {
  [FARM_VERSION.v1]: FARM$1,
  [FARM_VERSION.v2]: FARM$2,
  [FARM_VERSION.v3]: FARM$3
};
export {
  FARM,
  FARM_VERSION
};
//# sourceMappingURL=index.js.map
