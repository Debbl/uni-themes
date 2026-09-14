import { defineI18n } from 'fumadocs-core/i18n'

// English lives at the root: /docs, with /zh/docs beside it. The `(main)`
// route tree serves the unprefixed pages, `[lang]` the prefixed ones.
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
  hideLocale: 'default-locale',
})
