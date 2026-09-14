import { d as Link, f as useLoaderData, p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Switcher } from "./switcher-Bn7ALwPR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ds5iwi3q.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const serverTheme = useLoaderData({ from: "__root__" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "best-themes · TanStack Start" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switcher, { serverTheme }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Pick a theme, reload: the server cookie row should match and the page must not flash. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/other",
			children: "/other"
		})] })
	] });
}
//#endregion
export { Home as component };
