import { motion } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const setupVideoSrc = '/assets/Cat-o-pilot%20setup.mp4';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 theme-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Now with AI-Powered Explanations</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              code explanations,<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                but with cats 🐱
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              a vscode extension that actually explains your code. with cat metaphors. and real meow sounds. 
              yeah, its free.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                get it now
              </Link>
              <a
                href="#setup-video"
                className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-7 py-4 font-semibold hover:bg-secondary/20 transition"
              >
                <Play className="w-5 h-5" />
                see it in action
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                100% Free
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Privacy First
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Open Source
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <img
                src="/assets/thinking cat.png"
                alt="Thinking Cat"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-0 right-0 bg-background border border-border p-4 shadow-lg">
                <div className="text-xs font-mono text-muted-foreground">{`function explain() {`}</div>
                <div className="text-xs font-mono pl-4 text-primary">{`return "😺 Meow!";`}</div>
                <div className="text-xs font-mono text-muted-foreground">{`}`}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          id="setup-video"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 rounded-3xl border border-border bg-background/70 p-6 shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">setup walkthrough</p>
              <h2 className="text-2xl font-bold">Watch Cat-o-Pilot install in minutes</h2>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
              1x speed
            </span>
          </div>
          <div className="mt-6">
            <video
              className="w-full rounded-2xl border border-border bg-muted/30 shadow-lg"
              controls
              preload="metadata"
              playsInline
              aria-label="Cat-o-Pilot setup video"
            >
              <source src={setupVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-border flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
