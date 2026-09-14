import { WithHomePage } from '../../home.with'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  return WithHomePage(lang)
}
