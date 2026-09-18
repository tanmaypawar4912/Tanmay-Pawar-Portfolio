import { execFileSync } from 'node:child_process'
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  cpSync,
} from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

/* =========================================================
   PROJECT PATHS
   ========================================================= */

const root = fileURLToPath(new URL('..', import.meta.url))

const tempDir = join(root, '.static-build')
const distDir = join(root, 'dist')
const assetsDir = join(distDir, 'assets')
const publicDir = join(root, 'public')

/* =========================================================
   CLEAN OLD BUILD
   ========================================================= */

rmSync(tempDir, { recursive: true, force: true })
rmSync(distDir, { recursive: true, force: true })

mkdirSync(tempDir, { recursive: true })
mkdirSync(assetsDir, { recursive: true })

/* =========================================================
   IMPORT STRIPPING
   ========================================================= */
const stripImports = (source) =>
  source
    // Remove multi-line imports such as:
    // import {
    //   Icon1,
    //   Icon2
    // } from './components/Icons'
    .replace(
      /^\s*import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]\s*;?\s*$/gm,
      '',
    )

    // Remove side-effect imports such as:
    // import './style.css'
    .replace(
      /^\s*import\s+['"][^'"]+['"]\s*;?\s*$/gm,
      '',
    )

/* =========================================================
   ICONS SOURCE
   ========================================================= */

let iconsSource = stripImports(
  readFileSync(
    join(root, 'src/components/Icons.tsx'),
    'utf8',
  ),
)

iconsSource = iconsSource
  .replace(
    /type IconProps = SVGProps<SVGSVGElement>/,
    'type IconProps = Record<string, unknown>',
  )
  .replace(/export const /g, 'const ')
  .replace(/export function /g, 'function ')

/* =========================================================
   APP SOURCE
   ========================================================= */

let appSource = stripImports(
  readFileSync(
    join(root, 'src/App.tsx'),
    'utf8',
  ),
)

appSource = appSource.replace(
  /export\s+default\s+App\s*;?\s*/g,
  '',
)

/* =========================================================
   COMBINED TYPESCRIPT SOURCE
   ========================================================= */

const combinedSource = `
type StateSetter<T> = (
  value: T | ((current: T) => T)
) => void;

type ReactShim = {
  useState: <T>(
    initialValue: T
  ) => [T, StateSetter<T>];

  useEffect: (
    effect: () => void | (() => void),
    deps?: readonly unknown[]
  ) => void;
};

const React = (globalThis as any).React as ReactShim;

const { useEffect, useState } = React;

${iconsSource}

${appSource}

;(globalThis as any).__APP_TREE__ = App();
`

/* =========================================================
   TEMP FILE PATHS
   ========================================================= */

// IMPORTANT:
// These were missing in the previous version.
// They must be defined before execFileSync().

const combinedPath = join(
  tempDir,
  'portfolio.tsx',
)

const compiledPath = join(
  tempDir,
  'portfolio.js',
)

/* =========================================================
   WRITE TEMP TYPESCRIPT
   ========================================================= */

writeFileSync(
  combinedPath,
  combinedSource,
  'utf8',
)

/* =========================================================
   TYPESCRIPT COMPILER
   ========================================================= */

// Run TypeScript directly through Node.
// This avoids Windows tsc / tsc.cmd spawn issues.

const tscPath = join(
  root,
  'node_modules',
  'typescript',
  'bin',
  'tsc',
)

execFileSync(
  process.execPath,
  [
    tscPath,
    combinedPath,
    '--target',
    'ES2020',
    '--module',
    'none',
    '--jsx',
    'react',
    '--lib',
    'ES2020,DOM',
    '--skipLibCheck',
    '--outFile',
    compiledPath,
  ],
  {
    cwd: root,
    stdio: 'inherit',
  },
)

/* =========================================================
   MINIMAL REACT RUNTIME
   ========================================================= */

const Fragment = Symbol('Fragment')

const React = {
  Fragment,

  createElement(type, props, ...children) {
    const normalizedProps = {
      ...(props || {}),
    }

    if (children.length === 1) {
      normalizedProps.children = children[0]
    }

    if (children.length > 1) {
      normalizedProps.children = children
    }

    if (typeof type === 'function') {
      return type(normalizedProps)
    }

    return {
      type,
      props: normalizedProps,
    }
  },

  useState(initialValue) {
    return [
      typeof initialValue === 'function'
        ? initialValue()
        : initialValue,
      () => { },
    ]
  },

  useEffect() { },
}

/* =========================================================
   VM CONTEXT
   ========================================================= */

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

/* =========================================================
   EXECUTE COMPILED APP
   ========================================================= */

vm.runInContext(
  readFileSync(
    compiledPath,
    'utf8',
  ),
  context,
  {
    filename: 'portfolio.js',
  },
)

/* =========================================================
   HTML SERIALIZER
   ========================================================= */

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

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

const escapeText = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const escapeAttribute = (value) =>
  escapeText(value).replaceAll(
    '"',
    '&quot;',
  )

const kebab = (key) =>
  key.replace(
    /[A-Z]/g,
    (letter) =>
      `-${letter.toLowerCase()}`,
  )

function serializeStyle(style) {
  if (
    !style ||
    typeof style !== 'object'
  ) {
    return ''
  }

  return Object.entries(style)
    .map(
      ([key, value]) =>
        `${kebab(key)}:${value}`,
    )
    .join(';')
}

function serialize(node) {
  if (
    node === null ||
    node === undefined ||
    node === false ||
    node === true
  ) {
    return ''
  }

  if (
    typeof node === 'string' ||
    typeof node === 'number'
  ) {
    return escapeText(node)
  }

  if (Array.isArray(node)) {
    return node.map(serialize).join('')
  }

  if (node.type === Fragment) {
    return serialize(
      node.props?.children,
    )
  }

  const {
    type,
    props = {},
  } = node

  if (typeof type !== 'string') {
    return ''
  }

  const attrs = []

  for (
    const [rawName, rawValue]
    of Object.entries(props)
  ) {
    if (
      rawName === 'children' ||
      rawName === 'key' ||
      rawName === 'ref'
    ) {
      continue
    }

    if (
      rawName.startsWith('on') &&
      typeof rawValue === 'function'
    ) {
      continue
    }

    if (
      rawValue === null ||
      rawValue === undefined ||
      rawValue === false
    ) {
      continue
    }

    const name =
      attributeNames[rawName] ||
      rawName

    if (rawName === 'style') {
      const style =
        serializeStyle(rawValue)

      if (style) {
        attrs.push(
          `style="${escapeAttribute(
            style,
          )}"`,
        )
      }

      continue
    }

    if (rawValue === true) {
      attrs.push(name)
      continue
    }

    attrs.push(
      `${name}="${escapeAttribute(
        rawValue,
      )}"`,
    )
  }

  const opening = `<${type}${attrs.length
      ? ` ${attrs.join(' ')}`
      : ''
    }>`

  if (voidElements.has(type)) {
    return opening
  }

  return `${opening}${serialize(
    props.children,
  )}</${type}>`
}

/* =========================================================
   CREATE HTML
   ========================================================= */

const appHtml = serialize(
  context.__APP_TREE__,
)

let html = readFileSync(
  join(root, 'index.html'),
  'utf8',
)

html = html
  .replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  .replace(
    '<script type="module" src="/src/main.tsx"></script>',
    '<script defer src="./assets/site.js"></script>',
  )
  .replace(
    '</head>',
    '    <link rel="stylesheet" href="./assets/index.css" />\n  </head>',
  )
  .replaceAll(
    'src="/',
    'src="./',
  )
  .replaceAll(
    'href="/',
    'href="./',
  )

writeFileSync(
  join(distDir, 'index.html'),
  html,
  'utf8',
)

/* =========================================================
   CSS
   ========================================================= */

let css = readFileSync(
  join(root, 'src/index.css'),
  'utf8',
)

css = css
  .replace(
    /^@import url\s*\([^\n]+\);\s*$/m,
    '',
  )
  .replace(
    /^@tailwind\s+(base|components|utilities);\s*$/gm,
    '',
  )

writeFileSync(
  join(assetsDir, 'index.css'),
  css,
  'utf8',
)

/* =========================================================
   SITE JAVASCRIPT
   ========================================================= */

const siteScript = `
(() => {

  const topbar =
    document.querySelector('.topbar');

  const menu =
    document.querySelector('.mobile-menu');

  const openButton =
    document.querySelector('.menu-button');

  const closeButton =
    document.querySelector(
      '.mobile-menu-head button'
    );

  const menuLinks =
    document.querySelectorAll(
      '.mobile-menu-links a'
    );

  const setMenu = (open) => {

    if (!menu) return;

    menu.classList.toggle(
      'mobile-menu-open',
      open
    );

    menu.setAttribute(
      'aria-hidden',
      String(!open)
    );

    document.body.style.overflow =
      open ? 'hidden' : '';

  };

  openButton?.addEventListener(
    'click',
    () => setMenu(true)
  );

  closeButton?.addEventListener(
    'click',
    () => setMenu(false)
  );

  menuLinks.forEach((link) =>
    link.addEventListener(
      'click',
      () => setMenu(false)
    )
  );

  document.addEventListener(
    'keydown',
    (event) => {

      if (event.key === 'Escape') {
        setMenu(false)
      }

    }
  );

  const updateTopbar = () =>
    topbar?.classList.toggle(
      'topbar-scrolled',
      window.scrollY > 28
    );

  updateTopbar();

  window.addEventListener(
    'scroll',
    updateTopbar,
    {
      passive: true,
    }
  );

})();
`

writeFileSync(
  join(assetsDir, 'site.js'),
  siteScript,
  'utf8',
)

/* =========================================================
   COPY ALL PUBLIC ASSETS
   ========================================================= */

cpSync(
  publicDir,
  distDir,
  {
    recursive: true,
  },
)

/* =========================================================
   BUILD VERIFICATION
   ========================================================= */

const requiredChecks = [
  [
    'dist/index.html',
    'CareerForge AI',
  ],
  [
    'dist/index.html',
    'Tanmay Pawar',
  ],
  [
    'dist/index.html',
    'Tanmay-Pawar-Resume.pdf',
  ],
  [
    'dist/assets/index.css',
    '.hero-card',
  ],
  [
    'dist/assets/site.js',
    'mobile-menu-open',
  ],
]

for (
  const [relativePath, token]
  of requiredChecks
) {
  const content = readFileSync(
    join(root, relativePath),
    'utf8',
  )

  if (!content.includes(token)) {
    throw new Error(
      `Build verification failed: ${relativePath} is missing ${token}`,
    )
  }
}

/* =========================================================
   CLEAN TEMP BUILD
   ========================================================= */

rmSync(
  tempDir,
  {
    recursive: true,
    force: true,
  },
)

console.log(
  'Static production build created and verified in dist/.',
)