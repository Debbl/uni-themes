import { i as __toESM } from "../_runtime.mjs";
import { c as lazyRouteComponent, i as HeadContent, l as createFileRoute, m as require_react, o as createRouter, p as require_jsx_runtime, r as Scripts, s as Outlet, u as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as serializeThemeCookie } from "./cookie-C20ySBfi-CmlES84l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CmN_xlxE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var ThemeContext = (0, import_react.createContext)(void 0);
function ThemeProvider({ children, ...config }) {
	const ref = (0, import_react.useRef)(void 0);
	ref.current ??= createThemeStore(config);
	return (0, import_react.createElement)(ThemeContext.Provider, { value: ref.current }, children);
}
/** Shared by every `useTheme` outside a provider, so they stay in sync. */
var fallbackStore;
function useTheme() {
	const store = (0, import_react.useContext)(ThemeContext) ?? (fallbackStore ??= createThemeStore());
	const state = (0, import_react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getServerSnapshot);
	return (0, import_react.useMemo)(() => ({
		...state,
		setTheme: store.setTheme,
		themes: store.themes,
		forcedTheme: store.forcedTheme
	}), [state, store]);
}
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
	return (0, import_react.createElement)("script", {
		nonce,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: buildThemeScript(config) }
	});
}
var styles_default = "/assets/styles-POB92fet.css";
/** What the server sees in the cookie - null until the user picks a theme. */
var getServerTheme = createServerFn().handler(createSsrRpc("aa1b1adc77303d87dc48fee1e98c665be092cc2ae375fcf3ecdaf73a3c0396a9"));
var Route$2 = createRootRoute({
	loader: () => getServerTheme(),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "best-themes · TanStack Start" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeScript, { storage: "cookie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, {
			storage: "cookie",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-Ds5iwi3q.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./other-BmWtkfYr.mjs");
var Route = createFileRoute("/other")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	OtherRoute: Route.update({
		id: "/other",
		path: "/other",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { useTheme as n, router_exports as t };
