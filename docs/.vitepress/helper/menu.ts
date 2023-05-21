import { sync as globSync } from 'fast-glob'
import type { DefaultTheme } from 'vitepress'
import type { AllowingInput } from 'fmt-it'
import { addSpace, pascalCase, pipeFmt } from 'fmt-it'

const PREFIX = 'docs/packages'

function pascalCaseAndAddSpace(input: AllowingInput) {
  return pipeFmt(input)
    .then(pascalCase)
    .then(addSpace)
}

function getSidebarItemText(packageName: string) {
  /**
   * package name rules:
   * - <prefix_number>.<name>.md
   * e.g. :
   * - 01.quick_start.md
   * parse to
   * - Quick Start
   */
  const [_, name] = packageName.split('.')
  return pascalCaseAndAddSpace(name).get()
}

function getSidebarItems(packagePath: string, packageName: string) {
  const files = globSync([`${packagePath}/*.md`, `!${packagePath}/index.md`])
  const fileNames = files.map(file => file.replace(`${packagePath}/`, ''))
  return fileNames.map(item => ({
    text: getSidebarItemText(item),
    link: `/packages/${packageName}/${item.replace('.md', '')}.html`,
  })) satisfies DefaultTheme.SidebarItem[]
}

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
      items: getSidebarItems(packagePath, packageName),
    })
  }

  nav.push(packagesNav)

  return {
    nav,
    sidebar,
  }
}
