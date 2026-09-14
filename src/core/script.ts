import { resolveConfig } from './types.ts'
import type { ThemeConfig } from './types.ts'

/**
 * The inline anti-FOUC script as a string: reads the stored theme (cookie
 * first in cookie mode, then localStorage), resolves `'system'` via
 * `prefers-color-scheme`, and writes the attribute + `color-scheme` onto
 * `<html>` before first paint. Must be injected synchronously in `<head>`.
 */
export function buildThemeScript(config: ThemeConfig = {}): string {
  const c = resolveConfig(config)
  // `<` is escaped so a hostile storageKey/theme value can't close the
  // surrounding <script> tag.
  const json = JSON.stringify({
    k: c.storageKey,
    d: c.defaultTheme,
    t: c.themes,
    s: c.enableSystem,
    a: c.attribute,
    g: c.storage,
    e: c.enableColorScheme,
    f: c.forcedTheme ?? null,
  }).replaceAll('<', '\\u003c')
  return (
    `(function(){try{var c=${json},h=document.documentElement,t=c.f;`
    + `if(!t&&c.g!=="none"){`
    + `if(c.g==="cookie"){var p=("; "+document.cookie).split("; "+c.k+"=");if(p.length>1)t=decodeURIComponent(p[1].split(";")[0])}`
    + `if(!t)try{t=localStorage.getItem(c.k)}catch(e){}}`
    + `if(!t||(c.t.indexOf(t)<0&&t!=="system"))t=c.d;`
    + `var r=t==="system"&&c.s?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;`
    + `if(c.a==="class"){h.classList.remove.apply(h.classList,c.t);h.classList.add(r)}else h.setAttribute(c.a,r);`
    + `if(c.e)h.style.colorScheme=r==="dark"||r==="light"?r:""`
    + `}catch(e){}})()`
  )
}
