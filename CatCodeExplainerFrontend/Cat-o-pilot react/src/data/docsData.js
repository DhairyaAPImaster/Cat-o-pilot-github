import { docsManifest } from './docsManifest';

const rawDocs = import.meta.glob('../docs/**/*.md', { as: 'raw', eager: true });

const normalizePath = (path) => path.replace('../docs/', '');

const rawByFile = Object.fromEntries(
  Object.entries(rawDocs).map(([path, content]) => [normalizePath(path), content])
);

const stripMarkdown = (content) =>
  content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getExcerpt = (content, limit = 180) => {
  const cleaned = stripMarkdown(content);
  if (cleaned.length <= limit) {
    return cleaned;
  }
  return `${cleaned.slice(0, limit).trim()}...`;
};

const buildDocsData = () => {
  const pages = [];
  const pageMap = {};

  const versions = docsManifest.versions.map((version) => {
    const nav = version.nav.map((item, index) => {
      const content = rawByFile[item.file] ?? '';
      const excerpt = getExcerpt(content);
      const searchText = `${item.title} ${item.summary} ${stripMarkdown(content)}`.toLowerCase();
      const page = {
        ...item,
        order: index,
        version: version.id,
        versionLabel: version.label,
        status: version.status,
        content,
        excerpt,
        searchText,
        path: `/docs/${version.id}/${item.slug}`
      };

      pages.push(page);
      pageMap[`${version.id}/${item.slug}`] = page;
      return page;
    });

    return {
      ...version,
      nav
    };
  });

  return { versions, pages, pageMap };
};

const docsData = buildDocsData();

export const getDocsData = () => docsData;

export const searchDocs = (query, pages, options = {}) => {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return [];
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const scopedPages = options.version
    ? pages.filter((page) => page.version === options.version)
    : pages;

  return scopedPages
    .map((page) => {
      let score = 0;
      const titleLower = page.title.toLowerCase();

      tokens.forEach((token) => {
        if (titleLower.includes(token)) {
          score += 3;
        }
        if (page.searchText.includes(token)) {
          score += 1;
        }
      });

      return { page, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.page);
};
