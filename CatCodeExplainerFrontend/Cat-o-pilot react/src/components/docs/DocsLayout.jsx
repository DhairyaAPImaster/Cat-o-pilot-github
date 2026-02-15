import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import clsx from 'clsx';

const groupBySection = (nav) =>
  nav.reduce((acc, item) => {
    const key = item.section || 'Docs';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

export function DocsLayout({
  versions,
  activeVersion,
  nav,
  activeSlug,
  onVersionChange,
  query,
  onQueryChange,
  children
}) {
  const grouped = groupBySection(nav);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24 theme-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_55%)] opacity-20" />
      <div className="absolute -top-32 left-8 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="rounded-3xl border border-border bg-background/80 backdrop-blur theme-card p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-4 py-2 text-sm">
                <BookOpen className="h-4 w-4 text-primary" />
                docs hub
              </div>
              <h1 className="text-4xl font-bold md:text-5xl">Cat-o-Pilot Documentation</h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Browse the guide, search by keyword, and jump across versions.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:min-w-[240px]">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                version
              </label>
              <select
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                value={activeVersion}
                onChange={(event) => onVersionChange(event.target.value)}
              >
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.label} {version.status === 'latest' ? '(latest)' : ''}
                  </option>
                ))}
              </select>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search docs"
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-3 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-border bg-background/80 backdrop-blur theme-card p-6">
            <div className="space-y-6">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section} className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {section}
                  </p>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <Link
                        key={`${section}-${item.slug}`}
                        to={`/docs/${activeVersion}/${item.slug}`}
                        className={clsx(
                          'block rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold transition',
                          activeSlug === item.slug
                            ? 'border-primary/40 bg-primary/10 text-primary'
                            : 'hover:border-border hover:bg-muted/40'
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="rounded-3xl border border-border bg-background/80 backdrop-blur theme-card p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
