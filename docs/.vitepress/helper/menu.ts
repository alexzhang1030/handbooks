import { sync as globSync } from 'fast-glob'
import type { DefaultTheme } from 'vitepress'

const PREFIX = 'docs/packages'

/**
 * @example
 * - /packages/zod/
 * - /packages/async-validator
 *
 * nav(s) should be
 * - packages
 *  - zod
 *  - async-validator
 */
export function calcMenu() {
  const packages = globSync(`${PREFIX}/**`, {
    onlyDirectories: true,
  })
  const nav: DefaultTheme.NavItem[] = []
  const sidebar: DefaultTheme.Sidebar = []
  const packagesNav: DefaultTheme.NavItemWithChildren = {
    text: 'packages',
    items: [],
  }

  for (const packagePath of packages) {
    const packageName = packagePath.replace(`${PREFIX}/`, '')
    packagesNav.items.push({
      text: packageName,
      link: `/packages/${packageName}/`,
    })
    sidebar.push({
      text: packageName,
      items: [
        { text: 'README', link: `/packages/${packageName}/` },
      ],
    })
  }

  nav.push(packagesNav)

  return {
    nav,
    sidebar,
  }
}
