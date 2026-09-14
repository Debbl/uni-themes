// @ts-nocheck
import * as __fd_glob_7 from "../content/docs/vite.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/tanstack-start.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/react-router.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/nextjs.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/migration.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/api.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"api.mdx": __fd_glob_1, "index.mdx": __fd_glob_2, "migration.mdx": __fd_glob_3, "nextjs.mdx": __fd_glob_4, "react-router.mdx": __fd_glob_5, "tanstack-start.mdx": __fd_glob_6, "vite.mdx": __fd_glob_7, });