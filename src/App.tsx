import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Close,
  Code,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
} from './components/Icons'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
]

const skills = {
  Frontend: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'FastAPI', 'PHP'],
  Database: ['MongoDB', 'Mongoose', 'Data persistence', 'API workflows'],
  Tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Clerk Auth', 'OpenAI API'],
}

const projectStack = [
  'React 19',
  'TypeScript',
  'FastAPI',
  'Python',
  'MongoDB',
  'Clerk',
  'OpenAI',
  'Gemini',
]

const education = [
  {
    period: '2025 — 2027',
    course: 'M.Sc. Computer Applications-2',
    institute: 'MES Abasaheb Garware College, Pune',
    meta: 'Pursuing',
  },
  {
    period: '2021 — 2025',
    course: 'B.Sc. Computer Science',
    institute: 'MES Abasaheb Garware College, Pune',
    meta: 'Completed',
  },
  {
    period: '2019 — 2021',
    course: 'Higher Secondary Education',
    institute: 'Shri Jayntrao Wanjari Junior College, Wadoda, Nagpur',
    meta: '12th',
  },
  {
    period: '2015 — 2019',
    course: 'Secondary School Education',
    institute: 'Annasaheb Dange Public School, Ashta, Sangli',
    meta: '10th',
  },
]

const certifications = [
  {
    title: 'Cloud 101',
    provider: 'Anthropic Academy',
    link: 'https://verify.skilljar.com/c/fhuz8cgfrvej',
  },
  {
    title: 'Postman API Beginner',
    provider: 'Postman',
    link: 'https://verify.skilljar.com/c/c4cp75rd6hi9',
  },
]

const contactLinks = {
  email: 'mailto:tanmaypawar200@gmail.com',
  phone: 'tel:+919022620336',
  github: 'https://github.com/tanmaypawar4912',
  linkedin: 'https://www.linkedin.com/in/tanmay-pawar315835821',
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!selectedProject) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedProject])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brand-mark">TP</span>
          <span>
            <strong>Tanmay Pawar</strong>
            <small>Full Stack Developer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="availability" href={contactLinks.email}>
            <span className="availability-dot" /> Available for opportunities
          </a>
          <a className="nav-cta" href="#contact">
            Get in touch <ArrowUpRight width={17} height={17} />
          </a>
          <button
            className="menu-button"
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-head">
          <span className="brand-mark">TP</span>
          <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close navigation">
            <Close />
          </button>
        </div>
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>
            <span>05</span>
            Contact
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-card">
            <div className="hero-grid" />
            <div className="hero-ghost" aria-hidden="true">DEVELOPER</div>
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />

            <div className="hero-copy">
              <div className="eyebrow"><Sparkles width={17} /> Hello, I’m Tanmay.</div>
              <h1>
                Full-Stack <br />
                <span>Developer &amp;</span> <br />
                AI Builder
              </h1>
              <p>
                I build responsive web products,with clean,<br/> deployment-ready code.
              practical backend<br/> systems and AI-powered experiences<br />
              </p>
              <div className="hero-buttons">
                <a className="primary-button" href="#projects">
                  Explore my work <ArrowRight width={18} />
                </a>
                <a className="secondary-button" href="/Tanmay-Pawar-Resume.pdf" download>
                  <Download width={18} /> Resume
                </a>
              </div>
            </div>

            <div className="portrait-stage" aria-label="Portrait of Tanmay Pawar">
              <div className="portrait-arch">
                <div className="portrait-glow" />
                <img src="/profile photo.jpeg" alt="Tanmay Pawar in formal attire" />
              </div>
              <div className="floating-tag floating-tag-left">React + TypeScript</div>
              <div className="floating-tag floating-tag-right">AI Applications</div>
            </div>

            <div className="hero-stat">
              <span>Building</span>
              <strong>Useful digital products</strong>
              <div className="stat-line">
                <span>Responsive</span>
                <span>Scalable</span>
                <span>Human-focused</span>
              </div>
            </div>

            <div className="hero-socials" aria-label="Social links">
              <a href={contactLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <Github />
              </a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Linkedin />
              </a>
              <a href={contactLinks.email} aria-label="Email Tanmay">
                <Mail />
              </a>
            </div>
          </div>
        </section>

        {/* Responsive, seamless technology marquee. Styling is scoped to this strip. */}
        <style>{`
          .marquee-strip {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: tanmay-marquee-scroll 30s linear infinite;
            will-change: transform;
          }
          .marquee-group {
            display: flex;
            flex: 0 0 auto;
            align-items: center;
          }
          .marquee-group > span {
            flex: 0 0 auto;
          }
          @keyframes tanmay-marquee-scroll {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
          .marquee-strip:hover .marquee-track,
          .marquee-strip:focus-within .marquee-track {
            animation-play-state: paused;
          }
          @media (max-width: 768px) {
            .marquee-track { animation-duration: 20s; }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track { animation: none; }
          }
        `}</style>
        <div className="marquee-strip" aria-label="Technology skills">
          <div className="marquee-track">
            {[0, 1].map((copyIndex) => (
              <div className="marquee-group" key={copyIndex} aria-hidden={copyIndex === 1}>
                {['REACT', 'TYPESCRIPT', 'NODE.JS', 'MONGODB', 'FASTAPI', 'AI PRODUCTS'].map((item) => (
                  <span key={`${copyIndex}-${item}`}>
                    {item}<i aria-hidden="true">✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section-wrap" id="about">
          <div className="about-panel">
            <div className="section-label"><Sparkles width={16} /> About me</div>
            <div className="about-intro">
              <h2>
                I create thoughtful digital experiences that connect
                <span> logic, usability and visual clarity.</span>
              </h2>
              <a className="compact-button" href="#contact">
                Start a conversation <ArrowRight width={17} />
              </a>
            </div>

            <div className="about-layout">
              <div className="about-portrait">
                <div className="about-portrait-bg" />
                <img src="/suiet_photo.png" alt="Tanmay Pawar" />
                <div className="location-pill"><MapPin width={15} /> Satara, Maharashtra</div>
              </div>

              <div className="about-cards">
                <article className="metric-card metric-blue">
                  <span>Academic focus</span>
                  <strong>M.Sc. Computer Applications</strong>
                  <p>Advancing full-stack, software and AI development skills.</p>
                </article>
                <article className="metric-card">
                  <span>Core direction</span>
                  <strong>Frontend + Backend</strong>
                  <p>From responsive interfaces to secure REST API workflows.</p>
                </article>
                <article className="metric-card metric-wide">
                  <span>Working style</span>
                  <strong>Practical thinking. Clean execution.</strong>
                  <div className="pill-row">
                    <span>Reusable React</span>
                    <span>Responsive UI</span>
                    <span>API integration</span>
                    <span>Problem solving</span>
                  </div>
                </article>
                <article className="metric-card metric-dark">
                  <span>Languages</span>
                  <strong>English · Marathi · Hindi · Japanese</strong>
                  <div className="rating-row"><span>Curious</span><span>Adaptable</span><span>Collaborative</span></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap" id="skills">
          <div className="section-heading light-heading">
            <div>
              <div className="section-label section-label-light"><Code width={16} /> Capabilities</div>
              <h2>Full-stack skills, arranged for real product work.</h2>
            </div>
            <p>
              A balanced toolkit for crafting polished interfaces, dependable APIs and AI-enabled applications.
            </p>
          </div>

          <div className="skills-grid">
            <article className="skill-card skill-gradient">
              <span className="skill-index">01</span>
              <div>
                <h3>Frontend engineering</h3>
                <p>Responsive, reusable and accessible user interfaces with strong visual polish.</p>
              </div>
              <div className="skill-pills">
                {skills.Frontend.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              <div className="code-window">
                <div className="window-bar"><i /><i /><i /></div>
                <pre><code>{`const experience = {
  responsive: true,
  reusable: true,
  userFocused: true
}`}</code></pre>
              </div>
            </article>

            <article className="skill-card skill-light">
              <span className="skill-index">02</span>
              <div>
                <h3>Backend &amp; APIs</h3>
                <p>Structured server-side applications, REST APIs and data persistence.</p>
              </div>
              <div className="stack-lines">
                {skills.Backend.map((skill, index) => (
                  <div key={skill}><span>0{index + 1}</span>{skill}<i /></div>
                ))}
              </div>
            </article>

            <article className="skill-card skill-dark">
              <span className="skill-index">03</span>
              <div>
                <h3>AI-powered products</h3>
                <p>Practical AI workflows for resumes, interviews and intelligent user experiences.</p>
              </div>
              <div className="ai-orbit" aria-hidden="true">
                <span className="ai-core">AI</span>
                <span className="ai-node node-one">OpenAI</span>
                <span className="ai-node node-two">Gemini</span>
                <span className="ai-node node-three">FastAPI</span>
              </div>
            </article>

            <article className="skill-card skill-light skill-tools">
              <span className="skill-index">04</span>
              <div>
                <h3>Databases &amp; tools</h3>
                <p>Development workflows built around maintainability, testing and deployment readiness.</p>
              </div>
              <div className="tools-cloud">
                {[...skills.Database, ...skills.Tools].map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          </div>
        </section>

        <section className="section-wrap" id="projects">
          <div className="projects-panel">
            <div className="section-heading">
              <div>
                <div className="section-label"><Sparkles width={16} /> Featured projects</div>
                <h2>Projects that turn learning into usable products.</h2>
              </div>
              <p>Three full-stack builds across AI-assisted career tools, automotive commerce and personal productivity.</p>
            </div>

            <div className="projects-grid">
              <article className="project-card project-card-career">

                <div
                  className="project-card-visual career-mini"
                  aria-label="CareerForge AI project preview"
                >
                  <img
                    src="/carrerForge-preview.jpeg"
                    alt="CareerForge AI website screenshot"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="project-card-content">
                  <div className="project-card-topline"><span>01 / AI CAREER PLATFORM</span><span className="project-status"><i /> Full-stack</span></div>
                  <h3>CareerForge AI</h3>
                  <p>AI-assisted career preparation with resume building, ATS matching, job matching and mock interview practice in one platform.</p>
                  <div className="project-tech-list">{['React', 'FastAPI', 'Python', 'MongoDB', 'Clerk', 'Groq / Gemini'].map((x) => <span key={x}>{x}</span>)}</div>
                  <div className="project-card-actions">
                    <button className="project-detail-button" type="button" onClick={() => setSelectedProject('careerforge')}>See details <ArrowUpRight width={16} /></button>
                    <span className="project-link-note">AI · Career tools</span>
                  </div>
                </div>
              </article>

              <article className="project-card project-card-autolux">
                <div
                  className="project-card-visual autolux-mini"
                  aria-label="AutoLux project preview"
                >
                  <img
                    src="/autoLux-preview.jpg"
                    alt="AutoLux website screenshot"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="project-card-content">
                  <div className="project-card-topline"><span>02 / AUTOMOTIVE MARKETPLACE</span><span className="project-status"><i /> Live demo</span></div>
                  <h3>AutoLux</h3>
                  <p>A database-driven car marketplace for browsing, comparing, wishlisting, selling vehicles and booking test drives, with admin-managed listings.</p>
                  <div className="project-tech-list">{['React 19', 'TypeScript', 'Express 5', 'MongoDB', 'Clerk', 'Cloudinary'].map((x) => <span key={x}>{x}</span>)}</div>
                  <div className="project-card-actions">
                    <button className="project-detail-button" type="button" onClick={() => setSelectedProject('autolux')}>See details <ArrowUpRight width={16} /></button>
                    <a className="project-live-link" href="https://auto-lux-frontend.vercel.app" target="_blank" rel="noreferrer">Open live site <ArrowUpRight width={15} /></a>
                  </div>
                </div>
              </article>

              <article className="project-card project-card-taskflow">

                <div
                  className="project-card-visual taskflow-mini"
                  aria-label="TaskFlow project preview"
                >
                  <img
                    src="/TaskFlow-preview.jpg"
                    alt="TaskFlow website screenshot"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="project-card-content">
                  <div className="project-card-topline"><span>03 / PRODUCTIVITY WORKSPACE</span><span className="project-status"><i /> Live demo</span></div>
                  <h3>TaskFlow</h3>
                  <p>A focused task-management workspace with secure accounts, task lifecycle actions, search and filters, dashboard insights and analytics.</p>
                  <div className="project-tech-list">{['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT + Google OAuth'].map((x) => <span key={x}>{x}</span>)}</div>
                  <div className="project-card-actions">
                    <button className="project-detail-button" type="button" onClick={() => setSelectedProject('taskflow')}>See details <ArrowUpRight width={16} /></button>
                    <a className="project-live-link" href="https://task-flow-frontend-dusky.vercel.app" target="_blank" rel="noreferrer">Open live site <ArrowUpRight width={15} /></a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {selectedProject && (
          <div
            className="project-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null) }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflowY: 'auto',
              padding: '88px 16px 20px',
              boxSizing: 'border-box',
            }}
          >
            <section
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              style={{
                position: 'relative',
                zIndex: 1001,
                width: 'min(100%, 830px)',
                maxHeight: 'calc(100dvh - 108px)',
                overflowY: 'auto',
                boxSizing: 'border-box',
                margin: '0 auto',
                paddingTop: '64px',
              }}
            >
              <button
                className="project-modal-close"
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                style={{ position: 'absolute', top: '12px', right: '16px', zIndex: 1002 }}
              ><Close /></button>
              <div className="section-label"><Sparkles width={15} /> Project details</div>
              {selectedProject === 'careerforge' && <>
                <span className="project-modal-index">01 / AI CAREER PLATFORM</span>
                <h2 id="project-modal-title">CareerForge AI</h2>
                <p className="project-modal-lead">An AI-supported career development platform designed to bring resume preparation, job matching and interview practice into one place.</p>
                <div className="project-modal-columns">
                  <div><h3>What it does</h3><ul><li>Builds and improves professional, ATS-friendly resumes.</li><li>Compares resume content with job descriptions and presents an ATS match score.</li><li>Supports AI mock interview questions and feedback.</li><li>Matches candidate skills with job requirements and supports recruiter workflows.</li><li>Provides authentication and centralized data storage.</li></ul></div>
                  <div><h3>Technology</h3><div className="project-tech-list">{['React', 'FastAPI', 'Python', 'MongoDB', 'Clerk', 'Groq AI', 'Google Gemini'].map((x) => <span key={x}>{x}</span>)}</div><p className="project-modal-note">The supplied documentation describes AI features powered by Groq and Gemini. A public demo URL was not provided.</p></div>
                </div>
              </>}
              {selectedProject === 'autolux' && <>
                <span className="project-modal-index">02 / AUTOMOTIVE MARKETPLACE</span>
                <h2 id="project-modal-title">AutoLux</h2>
                <p className="project-modal-lead">A premium car dealership and used-car marketplace with buyer, seller and administrator workflows.</p>
                <div className="project-modal-columns">
                  <div><h3>What it does</h3><ul><li>Searches, filters, sorts and browses approved car listings.</li><li>Shows detailed specifications, image galleries, reviews and similar cars.</li><li>Supports test-drive bookings, car enquiries, wishlist and comparison of up to three cars.</li><li>Lets registered sellers submit vehicles and manage their listings.</li><li>Provides an admin dashboard for listings, bookings, users, reviews, enquiries and dynamic filter options.</li><li>Includes a rule-based car valuation tool and Cloudinary image hosting.</li></ul></div>
                  <div><h3>Technology</h3><div className="project-tech-list">{['React 19', 'TypeScript', 'Tailwind CSS v4', 'Express 5', 'MongoDB / Mongoose', 'Clerk', 'Cloudinary'].map((x) => <span key={x}>{x}</span>)}</div><p className="project-modal-note">Payments and legal ownership transfer are outside the documented project scope.</p><a className="modal-live-button" href="https://auto-lux-frontend.vercel.app" target="_blank" rel="noreferrer">Visit AutoLux <ArrowUpRight width={16} /></a></div>
                </div>
              </>}
              {selectedProject === 'taskflow' && <>
                <span className="project-modal-index">03 / PRODUCTIVITY WORKSPACE</span>
                <h2 id="project-modal-title">TaskFlow</h2>
                <p className="project-modal-lead">A calm, responsive task-management workspace for planning priorities, tracking progress and completing work.</p>
                <div className="project-modal-columns">
                  <div><h3>What it does</h3><ul><li>Email/password registration and login, session restoration and Google Sign-In.</li><li>Create, view, edit, complete, restore, duplicate and delete tasks.</li><li>Search, filter, sort and paginate task lists.</li><li>Dashboard summaries and analytics charts for task progress.</li><li>Account, appearance, notification and security settings.</li><li>Responsive desktop and mobile layouts with protected task APIs.</li></ul></div>
                  <div><h3>Technology</h3><div className="project-tech-list">{['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT cookies', 'Google OAuth'].map((x) => <span key={x}>{x}</span>)}</div><p className="project-modal-note">The documented deployment uses Vercel for the frontend, Render for the backend and MongoDB Atlas for persistence.</p><a className="modal-live-button" href="https://task-flow-frontend-dusky.vercel.app" target="_blank" rel="noreferrer">Visit TaskFlow <ArrowUpRight width={16} /></a></div>
                </div>
              </>}
            </section>
          </div>
        )}
        <section className="section-wrap" id="education">
          <div className="journey-grid">
            <div className="journey-main">
              <div className="section-label section-label-light"><Sparkles width={16} /> Education</div>
              <h2>Learning with a strong technical foundation.</h2>
              <div className="timeline">
                {education.map((item, index) => (
                  <article key={item.course}>
                    <span className="timeline-index">0{index + 1}</span>
                    <div className="timeline-copy">
                      <small>{item.period}</small>
                      <h3>{item.course}</h3>
                      <p>{item.institute}</p>
                    </div>
                    <span className="timeline-meta">{item.meta}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="certifications-card">
              <div className="section-label"><Sparkles width={16} /> Certifications</div>
              <h3>Verified learning</h3>
              <p>Focused credentials supporting cloud and API development fundamentals.</p>
              <div className="cert-list">
                {certifications.map((certificate, index) => (
                  <a key={certificate.title} href={certificate.link} target="_blank" rel="noreferrer">
                    <span>0{index + 1}</span>
                    <div><strong>{certificate.title}</strong><small>{certificate.provider}</small></div>
                    <ArrowUpRight width={18} />
                  </a>
                ))}
              </div>
              <div className="achievement-note">
                <strong>Beyond code</strong>
                <p>School and state-level Yogasan and Mallakhamb player, plus volunteer work with Doorstep School Foundation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-glow" />
            <div className="contact-copy">
              <div className="section-label section-label-light"><Sparkles width={16} /> Contact</div>
              <h2>Have a role, project or idea worth building?</h2>
              <p>Let’s discuss how I can contribute through frontend development, backend APIs or AI-enabled product work.</p>
              <a className="contact-main-button" href={contactLinks.email}>
                tanmaypawar200@gmail.com <ArrowUpRight />
              </a>
            </div>
            <div className="contact-links">
              <a href={contactLinks.phone}><Phone /><span><small>Call</small>+91 9022620336</span><ArrowUpRight /></a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer"><Github /><span><small>GitHub</small>tanmaypawar4912</span><ArrowUpRight /></a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin /><span><small>LinkedIn</small>tanmay-pawar</span><ArrowUpRight /></a>
              <a href="/Tanmay-Pawar-Resume.pdf" download><Download /><span><small>Resume</small>Download PDF</span><ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <div>
          <span className="brand-mark">TP</span>
          <p>Designed and coded for Tanmay Pawar.</p>
        </div>
        <p>© {new Date().getFullYear()} Tanmay Pawar. All rights reserved.</p>
        <a href="#top">Back to top <ArrowRight width={16} /></a>
      </footer>
    </div>
  )
}

export default App
