import { motion } from 'framer-motion';
import { Moon, Sun, Download, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useScroll';
import { docsManifest } from '../data/docsManifest';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const defaultDocsVersion = docsManifest.defaultVersion;
  const defaultDocsNav = docsManifest.versions.find((version) => version.id === defaultDocsVersion)?.nav;
  const defaultDocsSlug = defaultDocsNav?.[0]?.slug || 'getting-started';
  const docsPath = `/docs/${defaultDocsVersion}/${defaultDocsSlug}`;

  const playMeow = () => {
    const audio = new Audio('/assets/meow.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border theme-nav"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐱</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Cat-o-Pilot
              </h1>
              <span className="text-xs text-muted-foreground">Code by Cats</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/#features" className="text-sm hover:text-primary transition">Features</Link>
            <Link to="/#gallery" className="text-sm hover:text-primary transition">Gallery</Link>
            <Link to="/#how" className="text-sm hover:text-primary transition">How it Works</Link>
            <Link to="/#testimonials" className="text-sm hover:text-primary transition">Reviews</Link>
            <Link to={docsPath} className="text-sm hover:text-primary transition">Docs</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playMeow}
              className="p-2 hover:bg-secondary/20 rounded-lg transition"
              aria-label="Play meow"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/download"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">get it</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
