import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const linkProps = (href) =>
  href && href.startsWith('http')
    ? { target: '_blank', rel: 'noreferrer' }
    : undefined;

export function MarkdownPage({ content }) {
  return (
    <div className="docs-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} {...linkProps(href)}>
              {children}
            </a>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
