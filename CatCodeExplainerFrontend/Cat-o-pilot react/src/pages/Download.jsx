import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download as DownloadIcon, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const setupVideoSrc = '/assets/Cat-o-pilot%20setup.mp4';

const versions = [
  {
    version: '1.0.1',
    title: 'OG Cat Brain',
    tone: 'from-orange-500/20 via-amber-400/10 to-transparent',
    downloadPath: '/assets/catcode-explainer-1.0.1.vsix',
    bullets: [
      'only gemini',
      'requires api key from user',
      'no response streaming'
    ]
  },
  {
    version: '1.0.2',
    title: 'Hackclub Boost',
    tone: 'from-cyan-500/20 via-sky-400/10 to-transparent',
    downloadPath: '/assets/catcode-explainer-1.0.2.vsix',
    bullets: [
      'Hackclub api integrated',
      'no api key required by user',
      'response streaming'
    ]
  },
  {
    version: '1.0.3',
    title: 'Power Cat',
    tag: 'best and most powerful',
    tone: 'from-fuchsia-500/20 via-pink-400/10 to-transparent',
    downloadPath: '/assets/catcode-explainer-1.0.3.vsix',
    bullets: [
      'Hackclub api integrated',
      'no api key required by user',
      'response streaming'
    ]
  }
];

const setupSteps = [
  'Step1 - Download the extension',
  'Step2 - Open VS code',
  'Step3 - Go to the extensions tab',
  'Step4 - Press the top right three buttons',
  'Step5 - Click install from Vsix',
  'Step6 - INSTALLED !!!!',
  'Step7 - Follow the instructions that popup and select the ai model',
  'Step8 - your extension is ready'
];

export function Download() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24 theme-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_55%)] opacity-20" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-muted/70 border border-border px-4 py-2 rounded-full text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            pick your cat power level
          </div>
          <h1 className="text-5xl md:text-7xl font-bold">
            Download Cat-o-Pilot
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              choose your version
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            three builds. same attitude. choose the one that fits your workflow, then click compare if you want the deep dive.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {versions.map((version, index) => (
            <motion.div
              key={version.version}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-border bg-background/70 backdrop-blur theme-card"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${version.tone}`} />
              <div className="relative p-8 space-y-6">
                {version.tag && (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    {version.tag}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <h3 className="text-3xl font-bold">{version.version}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-background/80 border border-border flex items-center justify-center">
                    <DownloadIcon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-lg font-semibold">{version.title}</p>
                <ul className="space-y-3 text-muted-foreground">
                  {version.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <a
                    href={version.downloadPath}
                    download
                    onClick={() => setShowSetup(true)}
                    className="inline-flex items-center justify-center w-full gap-2 bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition"
                  >
                    install {version.version}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <Link
            to="/comparison"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-lg font-semibold hover:opacity-90 transition shadow-xl"
          >
            Compare these three
          </Link>
          <p className="text-sm text-muted-foreground">Need the nitty-gritty? We put everything side-by-side.</p>
          <p className="text-xs text-muted-foreground">After download, install in VS Code: Extensions view - Install from VSIX.</p>
        </motion.div>
      </div>

      {showSetup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10">
          <button
            type="button"
            aria-label="Close setup steps"
            className="absolute inset-0 bg-background/70 backdrop-blur"
            onClick={() => setShowSetup(false)}
          />
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background shadow-2xl theme-card">
            <div className="flex items-start justify-between gap-6 border-b border-border px-8 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">setup guide</p>
                <h2 className="text-3xl font-bold">Next steps after install</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:bg-muted"
                onClick={() => setShowSetup(false)}
              >
                close
              </button>
            </div>
            <div className="space-y-6 px-8 py-6">
              <div className="rounded-2xl border border-border bg-muted/20 p-4">
                <video
                  className="w-full rounded-xl border border-border bg-background/60"
                  controls
                  preload="metadata"
                  playsInline
                  aria-label="Cat-o-Pilot setup video"
                >
                  <source src={setupVideoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <ol className="space-y-3 text-base text-muted-foreground">
                {setupSteps.map((step) => (
                  <li key={step} className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 font-semibold text-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
