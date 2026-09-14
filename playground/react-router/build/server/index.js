import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, useRouteLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, createElement, useContext, useMemo, useRef, useSyncExternalStore } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../../node_modules/.pnpm/@react-router+dev@7.18.3_@react-router+serve@7.18.3_react-router@7.18.3_react-dom@19.3._a73e15c0b1ee049b73f502057e615d7d/node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region ../../packages/best-themes/dist/cookie-C20ySBfi.mjs
function parseThemeCookie(cookieHeader, storageKey = "theme") {
	if (!cookieHeader) return null;
	const parts = `; ${cookieHeader}`.split(`; ${storageKey}=`);
	if (parts.length < 2) return null;
	const raw = parts[1].split(";")[0];
	try {
		return decodeURIComponent(raw);
	} catch {
		return raw;
	}
}
function serializeThemeCookie(theme, storageKey = "theme", maxAge = 31536e3) {
	return `${storageKey}=${encodeURIComponent(theme)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
//#endregion
//#region ../../packages/best-themes/dist/types-BJaWdq7I.mjs
function resolveConfig(config = {}) {
	const enableSystem = config.enableSystem ?? true;
	return {
		themes: config.themes ?? ["light", "dark"],
		defaultTheme: config.defaultTheme ?? (enableSystem ? "system" : "light"),
		enableSystem,
		attribute: config.attribute ?? "class",
		storageKey: config.storageKey ?? "theme",
		storage: config.storage ?? "localStorage",
		enableColorScheme: config.enableColorScheme ?? true,
		disableTransitionOnChange: config.disableTransitionOnChange ?? false,
		forcedTheme: config.forcedTheme
	};
}
//#endregion
//#region ../../packages/best-themes/dist/store-CWEr9o3x.mjs
var isBrowser = typeof window !== "undefined";
var DARK_QUERY = "(prefers-color-scheme: dark)";
function createThemeStore(config = {}) {
	const c = resolveConfig(config);
	const listeners = /* @__PURE__ */ new Set();
	const media = isBrowser && c.enableSystem ? window.matchMedia(DARK_QUERY) : void 0;
	let detach;
	/** Last resolved theme this store wrote to the DOM; null = not yet applied. */
	let applied = null;
	const systemTheme = () => media ? media.matches ? "dark" : "light" : void 0;
	const readStored = () => {
		if (!isBrowser || c.storage === "none") return null;
		if (c.storage === "cookie") {
			const parts = `; ${document.cookie}`.split(`; ${c.storageKey}=`);
			if (parts.length > 1) {
				const raw = parts[1].split(";")[0];
				try {
					return decodeURIComponent(raw);
				} catch {
					return raw;
				}
			}
		}
		try {
			return localStorage.getItem(c.storageKey);
		} catch {
			return null;
		}
	};
	const normalize = (theme) => theme && (c.themes.includes(theme) || theme === "system") ? theme : c.defaultTheme;
	const resolve = (theme) => {
		const target = c.forcedTheme ?? theme;
		return target === "system" ? systemTheme() ?? "light" : target;
	};
	const makeState = (theme) => ({
		theme,
		resolvedTheme: resolve(theme),
		systemTheme: systemTheme()
	});
	let state = makeState(normalize(readStored()));
	const serverState = {
		theme: c.defaultTheme,
		resolvedTheme: c.forcedTheme ?? (c.defaultTheme === "system" ? "light" : c.defaultTheme),
		systemTheme: void 0
	};
	const applyDom = () => {
		if (!isBrowser) return;
		const resolved = state.resolvedTheme;
		if (resolved === applied) return;
		const firstApply = applied === null;
		const write = () => {
			const html = document.documentElement;
			if (c.attribute === "class") {
				html.classList.remove(...c.themes);
				html.classList.add(resolved);
			} else html.setAttribute(c.attribute, resolved);
			if (c.enableColorScheme) html.style.colorScheme = resolved === "dark" || resolved === "light" ? resolved : "";
		};
		if (c.disableTransitionOnChange && !firstApply) withoutTransitions(write);
		else write();
		applied = resolved;
	};
	const update = (theme) => {
		const next = makeState(theme);
		if (next.theme === state.theme && next.resolvedTheme === state.resolvedTheme && next.systemTheme === state.systemTheme) return;
		state = next;
		applyDom();
		for (const listener of listeners) listener();
	};
	const persist = (theme) => {
		if (!isBrowser || c.storage === "none") return;
		try {
			localStorage.setItem(c.storageKey, theme);
		} catch {}
		if (c.storage === "cookie") document.cookie = serializeThemeCookie(theme, c.storageKey);
	};
	const setTheme = (theme) => {
		persist(theme);
		update(theme);
	};
	const attach = () => {
		if (!isBrowser) return;
		const onMedia = () => update(state.theme);
		media?.addEventListener("change", onMedia);
		const onStorage = (e) => {
			if (e.key === c.storageKey) update(normalize(e.newValue));
		};
		window.addEventListener("storage", onStorage);
		detach = () => {
			media?.removeEventListener("change", onMedia);
			window.removeEventListener("storage", onStorage);
			detach = void 0;
		};
	};
	const subscribe = (listener) => {
		if (listeners.size === 0) {
			attach();
			applyDom();
		}
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
			if (listeners.size === 0) detach?.();
		};
	};
	return {
		getSnapshot: () => state,
		getServerSnapshot: () => serverState,
		subscribe,
		setTheme,
		themes: c.themes,
		forcedTheme: c.forcedTheme
	};
}
function withoutTransitions(write) {
	const style = document.createElement("style");
	style.appendChild(document.createTextNode("*,*::before,*::after{transition:none!important}"));
	document.head.appendChild(style);
	write();
	window.getComputedStyle(document.body);
	setTimeout(() => style.remove(), 1);
}
//#endregion
//#region ../../packages/best-themes/dist/index.mjs
var ThemeContext = createContext(void 0);
function ThemeProvider({ children, ...config }) {
	const ref = useRef(void 0);
	ref.current ??= createThemeStore(config);
	return createElement(ThemeContext.Provider, { value: ref.current }, children);
}
/** Shared by every `useTheme` outside a provider, so they stay in sync. */
var fallbackStore;
function useTheme() {
	const store = useContext(ThemeContext) ?? (fallbackStore ??= createThemeStore());
	const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
	return useMemo(() => ({
		...state,
		setTheme: store.setTheme,
		themes: store.themes,
		forcedTheme: store.forcedTheme
	}), [state, store]);
}
//#endregion
//#region ../../packages/best-themes/dist/script-BKolPVkG.mjs
/**
* The inline anti-FOUC script as a string: reads the stored theme (cookie
* first in cookie mode, then localStorage), resolves `'system'` via
* `prefers-color-scheme`, and writes the attribute + `color-scheme` onto
* `<html>` before first paint. Must be injected synchronously in `<head>`.
*/
function buildThemeScript(config = {}) {
	const c = resolveConfig(config);
	return `(function(){try{var c=${JSON.stringify({
		k: c.storageKey,
		d: c.defaultTheme,
		t: c.themes,
		s: c.enableSystem,
		a: c.attribute,
		g: c.storage,
		e: c.enableColorScheme,
		f: c.forcedTheme ?? null
	}).replaceAll("<", "\\u003c")},h=document.documentElement,t=c.f;if(!t&&c.g!=="none"){if(c.g==="cookie"){var p=("; "+document.cookie).split("; "+c.k+"=");if(p.length>1)t=decodeURIComponent(p[1].split(";")[0])}if(!t)try{t=localStorage.getItem(c.k)}catch(e){}}if(!t||(c.t.indexOf(t)<0&&t!=="system"))t=c.d;var r=t==="system"&&c.s?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;if(c.a==="class"){h.classList.remove.apply(h.classList,c.t);h.classList.add(r)}else h.setAttribute(c.a,r);if(c.e)h.style.colorScheme=r==="dark"||r==="light"?r:""}catch(e){}})()`;
}
//#endregion
//#region ../../packages/best-themes/dist/script.mjs
/**
* The anti-FOUC script as a React element. Render it inside `<head>` of a
* SERVER layout (root layout in Next.js, `root.tsx` in React Router,
* `__root.tsx` in TanStack Start) so it executes before first paint.
*
* This module carries no `'use client'` on purpose: rendering the script from
* a client component is exactly what triggers React 19's "script tag while
* rendering" warning when the tree remounts.
*
* Pass the same config here and to `ThemeProvider`.
*/
function ThemeScript({ nonce, ...config }) {
	return createElement("script", {
		nonce,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: buildThemeScript(config) }
	});
}
//#endregion
//#region ../../packages/best-themes/dist/server.mjs
/**
* Read the theme from an incoming `Request` - React Router loaders, TanStack
* Start server functions, or any fetch-based server. Requires
* `storage: 'cookie'`; returns null for first-time visitors.
*/
function getThemeFromRequest(request, storageKey = "theme") {
	return parseThemeCookie(request.headers.get("cookie"), storageKey);
}
//#endregion
//#region app/app.css?url
var app_default = "/assets/app-POB92fet.css";
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	default: () => root_default,
	links: () => links,
	loader: () => loader
});
function loader({ request }) {
	/** What the server sees in the cookie - null until the user picks a theme. */
	return { serverTheme: getThemeFromRequest(request) };
}
function links() {
	return [{
		rel: "stylesheet",
		href: app_default
	}];
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx("title", { children: "best-themes · React Router" }),
			/* @__PURE__ */ jsx(ThemeScript, { storage: "cookie" }),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(ThemeProvider, {
				storage: "cookie",
				children: /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) })
			}),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
});
//#endregion
//#region app/switcher.tsx
function Switcher() {
	const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme();
	const data = useRouteLoaderData("root");
	return /* @__PURE__ */ jsxs("div", {
		className: "card",
		children: [/* @__PURE__ */ jsx("p", { children: ["system", ...themes].map((t) => /* @__PURE__ */ jsx("button", {
			type: "button",
			"data-active": theme === t,
			onClick: () => setTheme(t),
			children: t
		}, t)) }), /* @__PURE__ */ jsxs("dl", { children: [
			/* @__PURE__ */ jsx("dt", { children: "theme" }),
			/* @__PURE__ */ jsx("dd", { children: theme }),
			/* @__PURE__ */ jsx("dt", { children: "resolvedTheme" }),
			/* @__PURE__ */ jsx("dd", { children: resolvedTheme }),
			/* @__PURE__ */ jsx("dt", { children: "systemTheme" }),
			/* @__PURE__ */ jsx("dd", { children: systemTheme ?? "undefined" }),
			/* @__PURE__ */ jsx("dt", { children: "server cookie" }),
			/* @__PURE__ */ jsx("dd", { children: data?.serverTheme ?? "null (not set yet)" })
		] })]
	});
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({ default: () => home_default });
var home_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", { children: "best-themes · React Router" }),
		/* @__PURE__ */ jsx(Switcher, {}),
		/* @__PURE__ */ jsxs("p", { children: ["Pick a theme, reload: the server cookie row should match and the page must not flash. ", /* @__PURE__ */ jsx(Link, {
			to: "/other",
			children: "/other"
		})] })
	] });
});
//#endregion
//#region app/routes/other.tsx
var other_exports = /* @__PURE__ */ __exportAll({ default: () => other_default });
var other_default = UNSAFE_withComponentProps(function Other() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", { children: "/other" }),
		/* @__PURE__ */ jsx(Switcher, {}),
		/* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, {
			to: "/",
			children: "Back to /"
		}) })
	] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-dWdnBprI.js",
		"imports": ["/assets/jsx-runtime-C7BNWRL5.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/root-BfexxVP3.js",
			"imports": ["/assets/jsx-runtime-C7BNWRL5.js", "/assets/dist-Q7vi7a6n.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-BSrqqv1I.js",
			"imports": [
				"/assets/jsx-runtime-C7BNWRL5.js",
				"/assets/switcher-BM_cSJTw.js",
				"/assets/dist-Q7vi7a6n.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/other": {
			"id": "routes/other",
			"parentId": "root",
			"path": "other",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/other-CO42660P.js",
			"imports": [
				"/assets/jsx-runtime-C7BNWRL5.js",
				"/assets/switcher-BM_cSJTw.js",
				"/assets/dist-Q7vi7a6n.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-5af3237f.js",
	"version": "5af3237f",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": false,
	"v8_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/other": {
		id: "routes/other",
		parentId: "root",
		path: "other",
		index: void 0,
		caseSensitive: void 0,
		module: other_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
