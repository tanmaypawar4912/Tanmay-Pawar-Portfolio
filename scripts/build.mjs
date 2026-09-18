import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import vm from 'node:vm'

const root = resolve(new URL('..', import.meta.url).pathname)
const tempDir = join(root, '.static-build')
const distDir = join(root, 'dist')
const assetsDir = join(distDir, 'assets')

rmSync(tempDir, { recursive: true, force: true })
rmSync(distDir, { recursive: true, force: true })
mkdirSync(tempDir, { recursive: true })
mkdirSync(assetsDir, { recursive: true })

const stripImports = (source) => source
  .replace(/^import[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
  .replace(/^import\s+['"][^'"]+['"]\s*;?\s*$/gm, '')

let iconsSource = stripImports(readFileSync(join(root, 'src/components/Icons.tsx'), 'utf8'))
iconsSource = iconsSource
  .replace(/type IconProps = SVGProps<SVGSVGElement>/, 'type IconProps = Record<string, unknown>')
  .replace(/export const /g, 'const ')
  .replace(/export function /g, 'function ')

let appSource = stripImports(readFileSync(join(root, 'src/App.tsx'), 'utf8'))
appSource = appSource.replace(/export default App\s*;?/, '')

const combinedSource = `
const React: any = (globalThis as any).React;
const { useEffect, useState } = React;
${iconsSource}
${appSource}
;(globalThis as any).__APP_TREE__ = App();
`

const combinedPath = join(tempDir, 'portfolio.tsx')
const compiledPath = join(tempDir, 'portfolio.js')
writeFileSync(combinedPath, combinedSource)

execFileSync('tsc', [
  combinedPath,
  '--target', 'ES2020',
  '--module', 'none',
  '--jsx', 'react',
  '--lib', 'ES2020,DOM',
  '--skipLibCheck',
  '--outFile', compiledPath,
], { cwd: root, stdio: 'inherit' })

const Fragment = Symbol('Fragment')
const React = {
  Fragment,
  createElement(type, props, ...children) {
    const normalizedProps = { ...(props || {}) }
    if (children.length === 1) normalizedProps.children = children[0]
    if (children.length > 1) normalizedProps.children = children
    if (typeof type === 'function') return type(normalizedProps)
    return { type, props: normalizedProps }
  },
  useState(initialValue) {
    return [typeof initialValue === 'function' ? initialValue() : initialValue, () => {}]
  },
  useEffect() {},
}

const context = vm.createContext({
  React,
  console,
  Date,
  Array,
  Object,
  String,
  Number,
  Boolean,
  Math,
  Symbol,
  globalThis: {},
})
context.globalThis = context
context.globalThis.React = React
vm.runInContext(readFileSync(compiledPath, 'utf8'), context, { filename: 'portfolio.js' })

const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const attributeNames = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',
  viewBox: 'viewBox',
}

const escapeText = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const escapeAttribute = (value) => escapeText(value).replaceAll('"', '&quot;')

const kebab = (key) => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

function serializeStyle(style) {
  if (!style || typeof style !== 'object') return ''
  return Object.entries(style)
    .map(([key, value]) => `${kebab(key)}:${value}`)
    .join(';')
}

function serialize(node) {
  if (node === null || node === undefined || node === false || node === true) return ''
  if (typeof node === 'string' || typeof node === 'number') return escapeText(node)
  if (Array.isArray(node)) return node.map(serialize).join('')
  if (node.type === Fragment) return serialize(node.props?.children)

  const { type, props = {} } = node
  if (typeof type !== 'string') return ''

  const attrs = []
  for (const [rawName, rawValue] of Object.entries(props)) {
    if (rawName === 'children' || rawName === 'key' || rawName === 'ref') continue
    if (rawName.startsWith('on') && typeof rawValue === 'function') continue
    if (rawValue === null || rawValue === undefined || rawValue === false) continue

    const name = attributeNames[rawName] || rawName
    if (rawName === 'style') {
      const style = serializeStyle(rawValue)
      if (style) attrs.push(`style="${escapeAttribute(style)}"`)
      continue
    }
    if (rawValue === true) {
      attrs.push(name)
      continue
    }
    attrs.push(`${name}="${escapeAttribute(rawValue)}"`)
  }

  const opening = `<${type}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`
  if (voidElements.has(type)) return opening
  return `${opening}${serialize(props.children)}</${type}>`
}

const appHtml = serialize(context.__APP_TREE__)
let html = readFileSync(join(root, 'index.html'), 'utf8')
html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('<script type="module" src="/src/main.tsx"></script>', '<script defer src="./assets/site.js"></script>')
  .replace('</head>', '    <link rel="stylesheet" href="./assets/index.css" />\n  </head>')
  .replaceAll('src="/', 'src="./')
  .replaceAll('href="/', 'href="./')
writeFileSync(join(distDir, 'index.html'), html)

let css = readFileSync(join(root, 'src/index.css'), 'utf8')
css = css
  .replace(/^@import url\([^\n]+\);\s*/m, '')
  .replace(/^@tailwind\s+(base|components|utilities);\s*$/gm, '')
writeFileSync(join(assetsDir, 'index.css'), css)

const siteScript = `
(() => {
  const topbar = document.querySelector('.topbar');
  const menu = document.querySelector('.mobile-menu');
  const openButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.mobile-menu-head button');
  const menuLinks = document.querySelectorAll('.mobile-menu-links a');

  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle('mobile-menu-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  openButton?.addEventListener('click', () => setMenu(true));
  closeButton?.addEventListener('click', () => setMenu(false));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const updateTopbar = () => topbar?.classList.toggle('topbar-scrolled', window.scrollY > 28);
  updateTopbar();
  window.addEventListener('scroll', updateTopbar, { passive: true });

})();
`
writeFileSync(join(assetsDir, 'site.js'), siteScript)

for (const file of ['tanmay-pawar.png', 'Tanmay-Pawar-Resume.pdf', 'favicon.svg']) {
  copyFileSync(join(root, 'public', file), join(distDir, file))
}

const requiredChecks = [
  ['dist/index.html', 'CareerForge AI'],
  ['dist/index.html', 'Tanmay Pawar'],
  ['dist/index.html', 'Tanmay-Pawar-Resume.pdf'],
  ['dist/assets/index.css', '.hero-card'],
  ['dist/assets/site.js', 'mobile-menu-open'],
]

for (const [relativePath, token] of requiredChecks) {
  const content = readFileSync(join(root, relativePath), 'utf8')
  if (!content.includes(token)) throw new Error(`Build verification failed: ${relativePath} is missing ${token}`)
}

rmSync(tempDir, { recursive: true, force: true })
console.log('Static production build created and verified in dist/.')
