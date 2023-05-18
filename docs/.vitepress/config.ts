import { defineConfig } from 'vitepress'
import { calcMenu } from './helper/menu'

const { nav, sidebar } = calcMenu()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Handbooks',
  description: 'Write handbooks for libraries I\'ve used.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/alexzhang1030/handbooks' },
    ],
    search: {
      provider: 'local',
    },
  },
})
