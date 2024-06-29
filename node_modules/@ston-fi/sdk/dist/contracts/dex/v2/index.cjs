"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const RouterV2 = require("./router/RouterV2.cjs");
const PoolV2 = require("./pool/PoolV2.cjs");
const LpAccountV2 = require("./LpAccount/LpAccountV2.cjs");
const VaultV2 = require("./vault/VaultV2.cjs");
const DEX = {
  Router: RouterV2.RouterV2,
  Pool: PoolV2.PoolV2,
  LpAccount: LpAccountV2.LpAccountV2,
  Vault: VaultV2.VaultV2
};
exports.DEX = DEX;
//# sourceMappingURL=index.cjs.map
