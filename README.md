# Tanmay Pawar Portfolio

Premium responsive portfolio inspired by the supplied navy, blue and white reference designs.

## Included

- React + TypeScript source
- Tailwind CSS setup with custom responsive CSS
- CSS-coded animated hero and coded project mockups
- Supplied candidate portrait as the only photographic asset
- About, skills, projects, education, certifications and contact sections
- Resume PDF download
- GitHub, LinkedIn, email and phone links
- Mobile navigation and desktop/tablet/mobile layouts
- Ready-to-deploy `dist` production output

## Run locally for development

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Create the production build

```bash
npm run build
```

The verified deployable website is generated in the `dist` folder.

A regular Vite client-side build is also available after installing dependencies:

```bash
npm run build:vite
```

## Preview without installing packages

Open `dist/index.html` in a browser.

## Deploy on Vercel

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`

## Main profile data

Update links, education, skills and project data near the top of `src/App.tsx`.


## Portfolio update
- Added dedicated showcase cards for CareerForge AI, AutoLux and TaskFlow.
- Each project has an interactive **See details** dialog with its documented features and technology stack.
- Added live links for AutoLux and TaskFlow. CareerForge AI has no public URL in the supplied materials, so its detail view does not invent one.
- Added responsive card layouts, keyboard Escape-to-close support, backdrop dismissal and reduced-motion handling.
- Existing portfolio sections and styling were retained; only the projects showcase and its supporting styles/interaction were enhanced.

### Live project links
- TaskFlow: https://task-flow-frontend-dusky.vercel.app
- AutoLux: https://auto-lux-frontend.vercel.app
