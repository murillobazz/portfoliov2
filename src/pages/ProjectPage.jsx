import { useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { RichText } from '../components/RichText';

// A visual without `src` is still in production: placeholder in dev, nothing in prod
function CaseImage({ image, todoLabel, eager = false }) {
  if (!image) return null;
  // Several phone screens side by side
  if (image.images) {
    return (
      <figure className="case-figure">
        <div className="case-phones">
          {image.images.map(img => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    );
  }
  if (!image.src) {
    if (!import.meta.env.DEV) return null;
    return (
      <figure className="case-figure case-figure--todo">
        <span>{todoLabel}: {image.todo}</span>
      </figure>
    );
  }
  return (
    <figure className={`case-figure${image.narrow ? ' case-figure--narrow' : ''}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={eager ? 'high' : 'auto'}
      />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function Paragraphs({ body }) {
  return body.map((block, i) => {
    if (typeof block === 'string') return <p key={i}><RichText text={block} /></p>;
    const List = block.ordered ? 'ol' : 'ul';
    return (
      <List key={i} className="case-list">
        {block.list.map((item, j) => <li key={j}><RichText text={item} /></li>)}
      </List>
    );
  });
}

function Section({ section, tx }) {
  switch (section.type) {
    case 'image':
      return <CaseImage image={section} todoLabel={tx.caseVisualTodo} />;
    case 'callout':
      return (
        <blockquote className="case-callout">
          <p><RichText text={section.body} /></p>
        </blockquote>
      );
    case 'stats':
      return (
        <section className="case-section">
          <h2 className="case-heading">{section.heading}</h2>
          <ul className="case-stats">
            {section.items.map(item => (
              <li key={item.value} className="case-stat">
                <span className="case-stat-value">{item.value}</span>
                <span className="case-stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    default:
      return (
        <section className="case-section">
          {section.heading && <h2 className="case-heading">{section.heading}</h2>}
          <Paragraphs body={section.body} />
        </section>
      );
  }
}

export function ProjectPage() {
  const { slug } = useParams();
  const [lang] = useLanguageContext();
  const tx = t[lang];

  const index = tx.projects.findIndex(p => p.slug === slug);
  const project = tx.projects[index];
  const next = tx.projects[(index + 1) % tx.projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.name} | murillobazz`;
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <article className="case">
      <header
        className="case-header"
        style={{ viewTransitionName: `project-card-${slug}` }}
      >
        <Link to="/work" className="project-page-back" viewTransition>
          {tx.projectPageBack}
        </Link>
        <p className="case-meta">
          <span>{project.name}</span>
          {project.tags.map(tag => <span key={tag}>{tag}</span>)}
          {project.status && <span className="case-status">{project.status}</span>}
        </p>
        <h1 className="case-title">{project.title}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        {project.link && (
          <a
            href={project.link.href}
            className="project-page-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.link.label} ↗
          </a>
        )}
      </header>

      <CaseImage image={project.hero} todoLabel={tx.caseVisualTodo} eager />

      <section className="case-tldr" aria-label={tx.caseTldr}>
        <span className="about-col-label">{tx.caseTldr}</span>
        <dl>
          {project.tldr.map(([label, value]) => (
            <div key={label} className="case-tldr-row">
              <dt>{label}</dt>
              <dd><RichText text={value} /></dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="case-body">
        {project.sections.map((section, i) => (
          <Section key={i} section={section} tx={tx} />
        ))}
      </div>

      {next && next.slug !== slug && (
        <Link to={`/work/${next.slug}`} className="case-next">
          <span className="about-col-label">{tx.caseNext} →</span>
          <span className="case-next-title">{next.title}</span>
        </Link>
      )}
    </article>
  );
}
