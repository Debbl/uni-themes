import { p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useTheme } from "./router-CmN_xlxE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switcher-Bn7ALwPR.js
var import_jsx_runtime = require_jsx_runtime();
function Switcher({ serverTheme }) {
	const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ["system", ...themes].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"data-active": theme === t,
			onClick: () => setTheme(t),
			children: t
		}, t)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "theme" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: theme }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "resolvedTheme" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: resolvedTheme }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "systemTheme" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: systemTheme ?? "undefined" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "server cookie" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: serverTheme ?? "null (not set yet)" })
		] })]
	});
}
//#endregion
export { Switcher as t };
