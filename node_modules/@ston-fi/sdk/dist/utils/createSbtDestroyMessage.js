import { beginCell } from "@ton/ton";
function createSbtDestroyMessage(params) {
  return beginCell().storeUint(520377210, 32).storeUint((params == null ? void 0 : params.queryId) ?? 0, 64).endCell();
}
export {
  createSbtDestroyMessage
};
//# sourceMappingURL=createSbtDestroyMessage.js.map
