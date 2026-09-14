import { d as Link, f as useLoaderData, p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Switcher } from "./switcher-Bn7ALwPR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/other-BmWtkfYr.js
var import_jsx_runtime = require_jsx_runtime();
function Other() {
	const serverTheme = useLoaderData({ from: "__root__" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "/other" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switcher, { serverTheme }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			children: "Back to /"
		}) })
	] });
}
//#endregion
export { Other as component };
