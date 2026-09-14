//#region node_modules/.nitro/vite/services/ssr/assets/cookie-C20ySBfi-CmlES84l.js
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
export { serializeThemeCookie as n, parseThemeCookie as t };
