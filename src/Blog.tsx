import { formatPostDate, getPost, listPosts } from "./blogPosts";
import type { SiteCopy } from "./content";
import type { Locale } from "./i18n";
import { renderRichText } from "./renderRichText";
import { AppLink } from "./route";

export function BlogPage({
  locale,
  copy,
  slug,
}: {
  locale: Locale;
  copy: SiteCopy;
  slug?: string;
}) {
  const { ui } = copy;

  if (slug) {
    const post = getPost(locale, slug);
    if (!post) {
      return (
        <main className="blog">
          <div className="blog__inner blog__inner--narrow">
            <AppLink className="blog__back" href="/blog">
              ← {ui.blogBack}
            </AppLink>
            <h1 className="blog__title">{ui.blogNotFound}</h1>
            <p className="blog__lead">{ui.blogNotFoundLead}</p>
          </div>
        </main>
      );
    }

    return (
      <main className="article">
        <article className="article__inner">
          <AppLink className="blog__back" href="/blog">
            ← {ui.blogBack}
          </AppLink>
          <p className="article__meta">
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="article__tag">
                {tag}
              </span>
            ))}
          </p>
          <h1 className="article__title">{post.title}</h1>
          <div className="article__body">
            {post.body.map((block, index) => {
              if (block.type === "h2") {
                return <h2 key={`${index}-${block.text}`}>{block.text}</h2>;
              }
              if (block.type === "img") {
                return (
                  <figure key={`${index}-${block.src}`} className="article__figure">
                    <img
                      className="article__img"
                      src={block.src}
                      alt={block.alt}
                      loading="lazy"
                    />
                    {block.caption ? (
                      <figcaption className="article__caption">
                        {renderRichText(block.caption)}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              }
              if (block.type === "table") {
                return (
                  <div key={`${index}-table`} className="article__table-wrap">
                    <table className="article__table">
                      <thead>
                        <tr>
                          {block.headers.map((header) => (
                            <th key={header}>{renderRichText(header)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{renderRichText(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return (
                <p key={`${index}-${block.text.slice(0, 40)}`}>
                  {renderRichText(block.text)}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    );
  }

  const posts = listPosts(locale);

  return (
    <main className="blog">
      <div className="blog__inner">
        <h1 className="blog__title">{ui.blogTitle}</h1>
        <p className="blog__lead">{ui.blogLead}</p>
        {posts.length === 0 ? (
          <p className="blog__empty">{ui.blogEmpty}</p>
        ) : (
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <AppLink
                  className="blog-item"
                  href={`/blog/${post.slug}`}
                  data-umami-event={`blog-${post.slug}`}
                >
                  <div className="blog-item__meta">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date, locale)}
                    </time>
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-item__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="blog-item__title">{post.title}</h2>
                  <p className="blog-item__excerpt">{post.excerpt}</p>
                </AppLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export function NotFoundPage({ copy }: { copy: SiteCopy }) {
  const { ui } = copy;
  return (
    <main className="blog">
      <div className="blog__inner blog__inner--narrow">
        <AppLink className="blog__back" href="/">
          ← {ui.blogHome}
        </AppLink>
        <p className="eyebrow">{ui.notFoundLabel}</p>
        <h1 className="blog__title">{ui.notFoundTitle}</h1>
        <p className="blog__lead">{ui.notFoundLead}</p>
      </div>
    </main>
  );
}
