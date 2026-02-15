import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { DocsLayout } from '../components/docs/DocsLayout';
import { MarkdownPage } from '../components/docs/MarkdownPage';
import { docsManifest } from '../data/docsManifest';
import { getDocsData, searchDocs } from '../data/docsData';

export function Documentation() {
  const { version: versionParam, slug: slugParam } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const { versions, pages, pageMap } = getDocsData();
  const activeVersion = versions.some((entry) => entry.id === versionParam)
    ? versionParam
    : docsManifest.defaultVersion;
  const versionData = versions.find((entry) => entry.id === activeVersion) || versions[0];
  const fallbackSlug = versionData?.nav[0]?.slug;
  const activeSlug = versionData?.nav.some((item) => item.slug === slugParam)
    ? slugParam
    : fallbackSlug;

  useEffect(() => {
    if (!activeVersion || !activeSlug) {
      return;
    }

    if (versionParam !== activeVersion || slugParam !== activeSlug) {
      navigate(`/docs/${activeVersion}/${activeSlug}`, { replace: true });
    }
  }, [activeSlug, activeVersion, navigate, slugParam, versionParam]);

  const activePage = activeSlug ? pageMap[`${activeVersion}/${activeSlug}`] : null;

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchDocs(query, pages, { version: activeVersion });
  }, [activeVersion, pages, query]);

  const showResults = query.trim().length > 0;

  const handleVersionChange = (nextVersion) => {
    const nextData = versions.find((entry) => entry.id === nextVersion);
    const nextSlug = nextData?.nav[0]?.slug;
    if (nextSlug) {
      setQuery('');
      navigate(`/docs/${nextVersion}/${nextSlug}`);
    }
  };

  const renderResults = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search results</h2>
        <span className="text-sm text-muted-foreground">
          {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
        </span>
      </div>
      {searchResults.length === 0 ? (
        <p className="rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          No results. Try a different keyword.
        </p>
      ) : (
        <div className="space-y-4">
          {searchResults.map((result) => (
            <Link
              key={`${result.version}-${result.slug}`}
              to={result.path}
              onClick={() => setQuery('')}
              className="block rounded-2xl border border-border bg-background/70 p-5 transition hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold">{result.title}</h3>
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {result.versionLabel}
                </span>
                {result.section ? (
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {result.section}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{result.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const renderPage = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
          <Tag className="h-3.5 w-3.5" />
          {versionData?.label} {versionData?.status === 'latest' ? 'latest' : 'stable'}
        </div>
        {activePage?.updated ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Updated {activePage.updated}
          </div>
        ) : null}
      </div>
      <div>
        <MarkdownPage content={activePage?.content || ''} />
      </div>
    </div>
  );

  return (
    <DocsLayout
      versions={versions}
      activeVersion={activeVersion}
      nav={versionData?.nav || []}
      activeSlug={activeSlug}
      onVersionChange={handleVersionChange}
      query={query}
      onQueryChange={setQuery}
    >
      {showResults ? renderResults() : renderPage()}
    </DocsLayout>
  );
}
