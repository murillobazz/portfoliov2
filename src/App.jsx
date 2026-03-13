import { useState, useEffect } from 'react'
import './App.css'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        // sun
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function MonogramLogo() {
  return (
    <svg width="50" height="27" viewBox="0 0 50 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="4.24264" x2="3" y2="26.2426" stroke="#393939" stroke-width="6"/>
      <line x1="25" y1="4.24264" x2="25" y2="26.2426" stroke="#393939" stroke-width="6"/>
      <line x1="2.12132" y1="2.12132" x2="24.1213" y2="24.1213" stroke="#393939" stroke-width="6"/>
      <line x1="24.1213" y1="2.12132" x2="46.1213" y2="24.1213" stroke="#393939" stroke-width="6"/>
      <line x1="47" y1="0.242638" x2="47" y2="26.2426" stroke="#657B83" stroke-width="6"/>
    </svg>

  )
}

function Row({ label, children, delay = 0 }) {
  return (
    <div className="row" style={{ animationDelay: `${delay}ms` }}>
      <div className="row-label">{label}</div>
      <div className="row-content">{children}</div>
    </div>
  )
}

function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="page">
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <header className="site-header">
        <MonogramLogo />
        <h1 className="site-name">murillobazz</h1>
        <p className="site-tagline">
          product-minded developer, <em>creative tech enthusiast</em>
        </p>
      </header>

      <main className="card">
        <Row label="about" delay={80}>
          <p>
            currently working as a web developer at moneri, in a fast-paced
            startup environment, where my responsibilities go from ui/ux
            feature conception to development. recently, i&apos;ve been looking for
            collaborating on new challenging projects that push my skills
            further and allow me to contribute to meaningful solutions and/or
            in creative and innovative environments.
          </p>
        </Row>

        <Row label="work" delay={150}>
          <p>web developer @ moneri, since 2021</p>
          <ul>
            <li>ux and ui design for new features</li>
            <li>
              development and maintenance for a saas platform with more
              than 60k users, prioritizing performance and user experience
            </li>
            <li>coding stack: javascript, vue.js, nuxt.js</li>
          </ul>
        </Row>

        <Row label="projects" delay={210}>
          <p>
            <a href="#" className="text-link">behired</a>
            {' '}— personal web app for job application management
          </p>
          <ul>
            <li>local-first approach, using browser storage for performance and privacy</li>
            <li>next.js, typescript, tailwindcss, shadcn/ui</li>
          </ul>
        </Row>

        <Row label="study" delay={270}>
          <p>postgraduate degree in ux design @ puc-rs (pontifical catholic university of rio grande do sul);</p>
          <p>major degree in broadcast (social communication) @ ufrj (federal university of rio de janeiro)</p>
        </Row>

        <Row label="what's up" delay={330}>
          <p>
            studying system design and what not;<br />
            rocking copilot and opencode with sonnet 4.6;<br />
            getting back on some creative coding with p5.js and more;<br />
            replaying pok&eacute;mon fire red for the 100th time and ff7 for the 1st;<br />
            trying to improve my cooking skills (tired of the basic stuff);<br />
            awed and amazed by the amount of stuff to learn, just how life goes.
          </p>
        </Row>

        <Row label="quote" delay={390}>
          <p>&ldquo;quote of the day&rdquo; &mdash; <em>person who said it</em></p>
        </Row>
      </main>

      <footer className="site-footer">
        <nav className="socials">
          <a href="https://github.com/murillobazz">cv</a>
          <a href="https://github.com/murillobazz">github</a>
          <a href="https://www.linkedin.com/in/murillobazilio/">linkedin</a>
          <a href="mailto:murillobazilio@gmail.com">email me</a>
          <a href="https://twitter.com/murillobazz">twitter</a>
        </nav>
        <p className="footer-name">murillobazz</p>
        <p className="footer-note">currently on a minimalist phase</p>
      </footer>
    </div>
  )
}

export default App
