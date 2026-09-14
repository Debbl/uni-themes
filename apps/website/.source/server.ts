// @ts-nocheck
import * as __fd_glob_17 from "../content/docs/vite.zh.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/vite.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/tanstack-start.zh.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/tanstack-start.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/react-router.zh.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/react-router.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/nextjs.zh.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/nextjs.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/migration.zh.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/migration.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/index.zh.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/comparison.zh.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/comparison.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/api.zh.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/api.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/meta.zh.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "meta.zh.json": __fd_glob_1, }, {"api.mdx": __fd_glob_2, "api.zh.mdx": __fd_glob_3, "comparison.mdx": __fd_glob_4, "comparison.zh.mdx": __fd_glob_5, "index.mdx": __fd_glob_6, "index.zh.mdx": __fd_glob_7, "migration.mdx": __fd_glob_8, "migration.zh.mdx": __fd_glob_9, "nextjs.mdx": __fd_glob_10, "nextjs.zh.mdx": __fd_glob_11, "react-router.mdx": __fd_glob_12, "react-router.zh.mdx": __fd_glob_13, "tanstack-start.mdx": __fd_glob_14, "tanstack-start.zh.mdx": __fd_glob_15, "vite.mdx": __fd_glob_16, "vite.zh.mdx": __fd_glob_17, });