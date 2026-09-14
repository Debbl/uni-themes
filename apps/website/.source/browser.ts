// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"api.mdx": () => import("../content/docs/api.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "migration.mdx": () => import("../content/docs/migration.mdx?collection=docs"), "nextjs.mdx": () => import("../content/docs/nextjs.mdx?collection=docs"), "react-router.mdx": () => import("../content/docs/react-router.mdx?collection=docs"), "tanstack-start.mdx": () => import("../content/docs/tanstack-start.mdx?collection=docs"), "vite.mdx": () => import("../content/docs/vite.mdx?collection=docs"), }),
};
export default browserCollections;