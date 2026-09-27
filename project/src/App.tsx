import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Menu as MenuIcon,
  X,
} from 'lucide-react';

const photos = {
  hero: {
    src: 'https://images.pexels.com/photos/4916548/pexels-photo-4916548.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'A woman enjoying coffee in a bright café',
  },
  coffee: {
    src: 'https://images.pexels.com/photos/10206600/pexels-photo-10206600.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    alt: 'Latte art in a white cup surrounded by café mugs',
  },
  friends: {
    src: 'https://images.pexels.com/photos/6140394/pexels-photo-6140394.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600',
    alt: 'Friends sharing coffee and conversation at a café',
  },
  pastry: {
    src: 'https://images.pexels.com/photos/12660003/pexels-photo-12660003.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    alt: 'Fresh croissants arranged in a bakery display',
  },
  market: {
    src: 'https://images.pexels.com/photos/9867104/pexels-photo-9867104.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Colorful fresh produce arranged at a market',
  },
};

const highPriorityImage = { fetchpriority: 'high' } as const;

type Page = 'home' | 'menu';

type BrandMarkProps = {
  light?: boolean;
};

function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${light ? 'brand-mark--light' : ''}`} aria-label="Daily Cafe">
      <span className="brand-mark__symbol" aria-hidden="true">
        <span>da</span>
        <span>ily</span>
      </span>
      <span className="brand-mark__tagline">your daily escape</span>
    </span>
  );
}

function Header({ page, onNavigate }: { page: Page; onNavigate: (nextPage: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (nextPage: Page) => {
    onNavigate(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button className="brand-button" onClick={() => navigate('home')} aria-label="Go to Daily Cafe home">
          <BrandMark />
        </button>
        <nav className={`site-nav ${mobileOpen ? 'site-nav--open' : ''}`} aria-label="Primary navigation">
          <button className={page === 'home' ? 'nav-link nav-link--active' : 'nav-link'} onClick={() => navigate('home')}>
            Home
          </button>
          <button className={page === 'menu' ? 'nav-link nav-link--active' : 'nav-link'} onClick={() => navigate('menu')}>
            Menu
          </button>
          <a className="nav-link nav-link--location" href="#find-us" onClick={() => setMobileOpen(false)}>
            <MapPin size={15} strokeWidth={1.8} />
            Find us
          </a>
        </nav>
        <button className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}
        </button>
      </div>
    </header>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function HomePage({ onNavigate }: { onNavigate: (nextPage: Page) => void }) {
  return (
    <main id="main-content">
      <section className="hero section-shell">
        <div className="hero__topline">
          <span className="eyebrow">Daily Cafe &amp; Market</span>
          <span className="hero__index">01 / 05</span>
        </div>
        <div className="hero__grid">
          <div className="hero__copy">
            <BrandMark />
            <p className="hero__kicker">Coffee, sips, and a little room to breathe.</p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => onNavigate('menu')}>View Menu</button>
              <a className="btn btn--ghost" href="#find-us">Find Us</a>
            </div>
            <a className="text-link" href="#concept">
              Discover the everyday escape <ArrowDownRight size={17} strokeWidth={1.7} />
            </a>
          </div>
          <div className="hero__visual">
            <div className="hero__photo-wrap">
              <img className="hero__photo" src={photos.hero.src} alt={photos.hero.alt} {...highPriorityImage} />
              <span className="hero__stamp">Since<br />every day</span>
            </div>
            <h1 className="hero__slogan" aria-label="Your daily escape">
              <span>Your</span>
              <strong>daily</strong>
              <span>escape</span>
            </h1>
          </div>
        </div>
        <div className="hero__bottomline">
          <span>Al Shahabeya Square</span>
          <span className="hero__scroll"><ArrowDownRight size={16} /> Scroll to explore</span>
        </div>
      </section>

      <section className="intro section-shell" id="concept">
        <Reveal className="section-label"><span>02</span><span>The daily idea</span></Reveal>
        <Reveal className="intro__content">
          <h2>A small pause.<br /><em>A better day.</em></h2>
          <div className="intro__aside">
            <p>Daily Cafe &amp; Market is your everyday stop for good coffee, bright drinks, and the simple pleasure of taking a moment for yourself.</p>
            <button className="circle-arrow" onClick={() => onNavigate('menu')} aria-label="View the menu">
              <ArrowUpRight size={21} strokeWidth={1.7} />
            </button>
          </div>
        </Reveal>
      </section>

      <section className="dual-story section-shell">
        <Reveal className="story-image story-image--large">
          <img src={photos.coffee.src} alt={photos.coffee.alt} loading="lazy" />
          <span className="image-caption">Made for the in-between moments</span>
        </Reveal>
        <Reveal className="story-copy story-copy--red">
          <span className="story-copy__number">03</span>
          <div>
            <span className="eyebrow eyebrow--light">Café + Market</span>
            <h2>Bring your day.<br /><em>We’ll meet you there.</em></h2>
            <p>A quick coffee before the road. Something cold on a warm afternoon. A table where the conversation can stretch a little longer.</p>
          </div>
          <div className="story-copy__mark">da<br />ily</div>
        </Reveal>
      </section>

      <section className="gallery section-shell">
        <Reveal className="section-label"><span>04</span><span>Everyday, your way</span></Reveal>
        <div className="gallery__grid">
          <Reveal className="gallery__item gallery__item--friends"><img src={photos.friends.src} alt={photos.friends.alt} loading="lazy" /></Reveal>
          <Reveal className="gallery__item gallery__item--pastry"><img src={photos.pastry.src} alt={photos.pastry.alt} loading="lazy" /></Reveal>
          <Reveal className="gallery__item gallery__item--market"><img src={photos.market.src} alt={photos.market.alt} loading="lazy" /></Reveal>
          <Reveal className="gallery__note"><span className="gallery__note-mark">da<br />ily</span><p>Good things are<br /><em>worth returning to.</em></p></Reveal>
        </div>
      </section>

      <section className="location section-shell" id="find-us">
        <Reveal className="section-label"><span>05</span><span>Find your way here</span></Reveal>
        <Reveal className="location__grid">
          <div className="location__title">
            <span className="eyebrow">The daily address</span>
            <h2>See you<br /><em>at the square.</em></h2>
          </div>
          <div className="location__details">
            <div className="location__pin"><MapPin size={22} strokeWidth={1.5} /></div>
            <p>Al Shahabeya Square<br />Inside Mobil Gas Station<br />Damietta, Egypt</p>
            <a className="button button--dark" href="https://www.google.com/maps/search/?api=1&query=Al+Shahabeya+Square+Damietta+Egypt" target="_blank" rel="noreferrer">
              Open directions <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function MenuPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const menuImages: { src: string; alt: string }[] = [];

  const openLightbox = (index: number) => {
    setMenuIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight' && menuImages.length > 1) setMenuIndex((index) => (index + 1) % menuImages.length);
      if (event.key === 'ArrowLeft' && menuImages.length > 1) setMenuIndex((index) => (index - 1 + menuImages.length) % menuImages.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, menuImages.length]);

  return (
    <main className="menu-page section-shell" id="main-content">
      <section className="menu-hero">
        <Reveal className="section-label"><span>01</span><span>Take a look</span></Reveal>
        <Reveal className="menu-hero__content">
          <div>
            <span className="eyebrow">Daily Cafe &amp; Market</span>
            <h1>The menu,<br /><em>your way.</em></h1>
          </div>
          <div className="menu-hero__mark"><BrandMark /><span>Original menu artwork<br />presented as it is.</span></div>
        </Reveal>
      </section>
      <section className="menu-display">
        {menuImages.length > 0 ? menuImages.map((image, index) => (
          <Reveal className="menu-image" key={image.src}>
            <button onClick={() => openLightbox(index)} aria-label={`Enlarge menu page ${index + 1}`}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span><Maximize2 size={17} /> Enlarge</span>
            </button>
          </Reveal>
        )) : (
          <Reveal className="menu-empty">
            <div className="menu-empty__rule" />
            <span className="eyebrow">Menu artwork</span>
            <h2>The original menu<br /><em>belongs here.</em></h2>
            <p>Once the supplied menu artwork is added, it will be displayed here in its original proportions with no recreated items or altered details.</p>
            <div className="menu-empty__seal">da<br />ily</div>
          </Reveal>
        )}
      </section>
      {lightboxOpen && menuImages.length > 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged menu image" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox__close" onClick={() => setLightboxOpen(false)} aria-label="Close enlarged menu"><X size={24} /></button>
          {menuImages.length > 1 && <button className="lightbox__previous" onClick={(event) => { event.stopPropagation(); setMenuIndex((index) => (index - 1 + menuImages.length) % menuImages.length); }} aria-label="Previous menu page"><ChevronLeft size={28} /></button>}
          <img src={menuImages[menuIndex].src} alt={menuImages[menuIndex].alt} onClick={(event) => event.stopPropagation()} />
          {menuImages.length > 1 && <button className="lightbox__next" onClick={(event) => { event.stopPropagation(); setMenuIndex((index) => (index + 1) % menuImages.length); }} aria-label="Next menu page"><ChevronRight size={28} /></button>}
        </div>
      )}
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (nextPage: Page) => void }) {
  return (
    <footer className="site-footer section-shell">
      <div className="site-footer__top">
        <BrandMark light />
        <button className="footer-arrow" onClick={() => onNavigate('home')} aria-label="Back to top"><ArrowUpRight size={22} strokeWidth={1.6} /></button>
      </div>
      <div className="site-footer__bottom">
        <span>Daily Cafe &amp; Market</span>
        <span>Al Shahabeya Square, Damietta</span>
        <span>Your daily escape</span>
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState<Page>(window.location.hash === '#menu' ? 'menu' : 'home');

  useEffect(() => {
    document.title = page === 'menu' ? 'Daily Cafe Menu | Damietta' : 'Daily Cafe & Market | Your Daily Escape — Damietta';
    const handleHashChange = () => setPage(window.location.hash === '#menu' ? 'menu' : 'home');
    window.addEventListener('hashchange', handleHashChange);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal--visible');
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [page]);

  const navigate = (nextPage: Page) => {
    window.location.hash = nextPage === 'menu' ? 'menu' : '';
    setPage(nextPage);
  };

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      {page === 'home' ? <HomePage onNavigate={navigate} /> : <MenuPage />}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
