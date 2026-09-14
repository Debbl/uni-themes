import { i18n } from '~/lib/i18n'
import { WithHomePage } from '../../home.with'

export default function HomePage() {
  return WithHomePage(i18n.defaultLanguage)
}
