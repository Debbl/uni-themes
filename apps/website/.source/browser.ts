// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"api.mdx": () => import("../content/docs/api.mdx?collection=docs"), "api.zh.mdx": () => import("../content/docs/api.zh.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "index.zh.mdx": () => import("../content/docs/index.zh.mdx?collection=docs"), "migration.mdx": () => import("../content/docs/migration.mdx?collection=docs"), "migration.zh.mdx": () => import("../content/docs/migration.zh.mdx?collection=docs"), "nextjs.mdx": () => import("../content/docs/nextjs.mdx?collection=docs"), "nextjs.zh.mdx": () => import("../content/docs/nextjs.zh.mdx?collection=docs"), "react-router.mdx": () => import("../content/docs/react-router.mdx?collection=docs"), "react-router.zh.mdx": () => import("../content/docs/react-router.zh.mdx?collection=docs"), "tanstack-start.mdx": () => import("../content/docs/tanstack-start.mdx?collection=docs"), "tanstack-start.zh.mdx": () => import("../content/docs/tanstack-start.zh.mdx?collection=docs"), "vite.mdx": () => import("../content/docs/vite.mdx?collection=docs"), "vite.zh.mdx": () => import("../content/docs/vite.zh.mdx?collection=docs"), }),
};
export default browserCollections;