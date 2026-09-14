import { i as getRequest, n as TSS_SERVER_FUNCTION, t as createServerFn } from "./_ssr/ssr.mjs";
import { t as parseThemeCookie } from "./_ssr/cookie-C20ySBfi-CmlES84l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-ByoM-hfj.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Read the theme from an incoming `Request` - React Router loaders, TanStack
* Start server functions, or any fetch-based server. Requires
* `storage: 'cookie'`; returns null for first-time visitors.
*/
function getThemeFromRequest(request, storageKey = "theme") {
	return parseThemeCookie(request.headers.get("cookie"), storageKey);
}
/** What the server sees in the cookie - null until the user picks a theme. */
var getServerTheme_createServerFn_handler = createServerRpc({
	id: "aa1b1adc77303d87dc48fee1e98c665be092cc2ae375fcf3ecdaf73a3c0396a9",
	name: "getServerTheme",
	filename: "src/routes/__root.tsx"
}, (opts) => getServerTheme.__executeServer(opts));
var getServerTheme = createServerFn().handler(getServerTheme_createServerFn_handler, () => getThemeFromRequest(getRequest()));
//#endregion
export { getServerTheme_createServerFn_handler };
