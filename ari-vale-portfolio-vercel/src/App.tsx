import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: 'motion-ed',
    number: '01',
    name: 'Motion.ed',
    year: '2024',
    type: 'Learning platform',
    summary: 'A studio-like workspace for learning motion design through practice, critique, and momentum.',
    tags: ['Product direction', 'React', 'Prototyping'],
    artClass: 'art-motion',
  },
  {
    id: 'field-notes',
    number: '02',
    name: 'Field Notes',
    year: '2023',
    type: 'Civic research tool',
    summary: 'Turning on-the-ground observations into a legible, shared picture of a changing city.',
    tags: ['Systems design', 'Next.js', 'Mapping'],
    artClass: 'art-field',
  },
  {
    id: 'arc-os',
    number: '03',
    name: 'Arc/OS',
    year: '2023',
    type: 'Operations system',
    summary: 'A calmer command center for the people keeping distributed hardware moving.',
    tags: ['UX architecture', 'TypeScript', 'Design systems'],
    artClass: 'art-arc',
  },
  {
    id: 'studio-north',
    number: '04',
    name: 'Studio North',
    year: '2022',
    type: 'Brand and digital home',
    summary: 'A small digital home for a large point of view: generous, curious, and a little off-axis.',
    tags: ['Creative development', 'WebGL', 'Editorial'],
    artClass: 'art-studio',
  },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

function Cursor() {
  const [position, setPosition] = useState({ x: -50, y: -50 });

  useEffect(() => {
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <span className="cursor-dot" style={{ left: position.x, top: position.y }} aria-hidden="true" />
      <span className="cursor-ring" style={{ left: position.x, top: position.y }} aria-hidden="true" />
    </>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="container-wide topbar">
      <a className="brand" href="#top" data-testid="link-brand" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">Ari Vale</span>
      </a>
      <div className="topbar-meta mono" aria-label="Current availability">
        <span>Product engineer</span>
        <span>Available for select work — 2025</span>
      </div>
      <button
        className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        data-testid="button-toggle-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="nav-toggle-lines" aria-hidden="true"><i /><i /></span>
      </button>
      <nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <a href="#work" data-testid="link-mobile-work" onClick={closeMenu}>Selected work</a>
        <a href="#capabilities" data-testid="link-mobile-capabilities" onClick={closeMenu}>Capabilities</a>
        <a href="#about" data-testid="link-mobile-about" onClick={closeMenu}>About / contact</a>
      </nav>
    </header>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="top" className="site-shell">
      <Cursor />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="container-wide hero" aria-labelledby="hero-title">
        <span className="hero-index">01 / INTRODUCTION</span>
        <div className="hero-grid">
          <div className="hero-kicker reveal">
            <p className="mono eyebrow">Ari Vale — NYC / remote</p>
            <p>Product engineer and systems thinker. I make digital things with enough structure to feel <em>human</em>.</p>
          </div>
          <div className="hero-aside reveal delay-2">
            <p>Good software is not just useful. It has a point of view, a pace, a little room to breathe.</p>
            <a className="text-link mono" href="#work" data-testid="link-hero-work">See selected work</a>
          </div>
          <h1 id="hero-title" className="hero-title serif reveal delay-1">
            <span>Make it</span>
            <span className="indent">feel <span className="outline">human.</span></span>
          </h1>
        </div>
        <div className="scroll-note mono" aria-hidden="true">Scroll to wander</div>
      </section>

      <section id="work" className="container-wide section" aria-labelledby="work-title">
        <div className="section-head">
          <p className="section-label mono">02 / Selected work</p>
          <Reveal><h2 id="work-title" className="section-title serif">A few things I’ve <span className="outline">helped</span> into the world.</h2></Reveal>
        </div>
        <div className="work-list">
          {projects.map((project, index) => (
            <a
              key={project.id}
              className="work-item"
              href="#contact"
              data-testid={`link-project-${project.id}`}
              aria-label={`Talk about ${project.name}`}
            >
              <div className="work-copy">
                <span className="work-number mono">{project.number} / {project.type}</span>
                <div>
                  <h3 className="work-name serif" data-testid={`text-project-name-${project.id}`}>{project.name}</h3>
                  <p className="work-summary">{project.summary}</p>
                  <div className="work-tags" aria-label={`${project.name} disciplines`}>
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="work-meta mono">
                  <span className="work-year">{project.year}</span>
                  <span>Read the thinking ↘</span>
                </div>
              </div>
              <div className={`project-art ${project.artClass}`} role="img" aria-label={`Abstract grayscale visual for ${project.name}`} />
              <span className="work-arrow" aria-hidden="true">↘</span>
            </a>
          ))}
        </div>
      </section>

      <section className="container-wide stat-section" aria-labelledby="stat-title">
        <div className="stat-grid">
          <p className="stat-label mono">03 / A useful measure</p>
          <Reveal><h2 id="stat-title" className="stat-number serif" data-testid="text-stat-value">46.8<span className="accent">%</span></h2></Reveal>
          <div className="stat-caption">
            <strong>Less friction in the places people feel it most.</strong>
            <p>Average reduction in time-to-confidence across recent product launches. Not a vanity metric — a signal that the system is beginning to make sense.</p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
        <div className="container-wide">
          <div className="section-head">
            <p className="section-label mono">04 / Capabilities</p>
            <Reveal><h2 id="capabilities-title" className="section-title serif">Range is useful. <span className="outline">Taste</span> is everything.</h2></Reveal>
          </div>
          <div className="capability-grid">
            <Reveal className="capability" delay="delay-1">
              <span className="capability-index mono">01</span>
              <div><h3>Product thinking</h3><p>Finding the small, high-leverage decision inside a noisy brief — then making it concrete enough to ship.</p></div>
            </Reveal>
            <Reveal className="capability" delay="delay-2">
              <span className="capability-index mono">02</span>
              <div><h3>Interface systems</h3><p>Design languages that hold their shape as teams, features, and edge cases arrive.</p></div>
            </Reveal>
            <Reveal className="capability" delay="delay-2">
              <span className="capability-index mono">03</span>
              <div><h3>Front-end craft</h3><p>React, TypeScript, and CSS with an eye for the quiet details: loading, focus, pace, and feedback.</p></div>
            </Reveal>
            <Reveal className="capability" delay="delay-3">
              <span className="capability-index mono">04</span>
              <div><h3>Team rituals</h3><p>Clearer conversations between design and engineering. Better questions make better software.</p></div>
            </Reveal>
          </div>
          <div className="stack-line" aria-label="Technology stack">
            <span>React</span><span>TypeScript</span><span>Next.js</span><span>Node</span><span>Postgres</span><span>Figma</span><span>WebGL</span>
          </div>
        </div>
      </section>

      <section id="about" className="container-wide section about-section" aria-labelledby="about-title">
        <div className="about-grid">
          <Reveal><div className="about-mark" role="img" aria-label="Ari Vale monogram mark"><span className="mono">AV</span></div></Reveal>
          <Reveal className="about-copy" delay="delay-1">
            <h2 id="about-title">A little more <span>context.</span></h2>
            <p>I’m Ari, a product engineer who likes the messy middle: the part where a sharp idea becomes a real thing, and real people start using it. I work independently with teams who care about how their products land.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin">LinkedIn ↗</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github">GitHub ↗</a>
            </div>
          </Reveal>
          <Reveal className="about-contact" delay="delay-2">
            <p className="mono">Have a good problem?</p>
            <p>Tell me what you’re trying to make, what’s getting in the way, and where you’d like to go next.</p>
            <a className="contact-email" href="mailto:hello@arivale.dev?subject=Hello%20Ari" data-testid="link-contact-email">hello@arivale.dev</a>
          </Reveal>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container-wide footer-inner">
          <span className="mono">© 2025 Ari Vale</span>
          <nav className="footer-nav mono" aria-label="Footer navigation">
            <a href="#work" data-testid="link-footer-work">Work</a>
            <a href="#capabilities" data-testid="link-footer-capabilities">Capabilities</a>
            <a href="mailto:hello@arivale.dev" data-testid="link-footer-email">Email</a>
          </nav>
          <a className="footer-back mono" href="#top" data-testid="link-back-to-top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;