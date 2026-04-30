import { Navigate, Link, useParams } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

export function ProjectPage() {
  const { slug } = useParams();
  const [lang] = useLanguageContext();
  const tx = t[lang];

  const project = tx.projects.find(p => p.slug === slug);

  if (!project?.page) return <Navigate to="/portfolio" replace />;

  const { page } = project;
  const mockupSrc = page.mockup ?? null;
  const images = page.images ?? [];

  return (
    <div className="project-page">
      <div
        className="project-page-left"
        style={{ viewTransitionName: `project-card-${slug}` }}
      >
        <Link to="/portfolio" className="project-page-back" viewTransition>
          {tx.projectPageBack}
        </Link>
        <h1 className="project-page-title">{project.name}</h1>
        <div className="project-page-description">
          {page.description.map((para, i) => (
            <p key={i}>
              {Array.isArray(para)
                ? para.map((seg, j) =>
                    seg.b
                      ? <strong key={j}>{seg.t}</strong>
                      : <span key={j}>{seg.t}</span>
                  )
                : para}
            </p>
          ))}
          {page.accessLabel && project.href && (
            <p>
              <a
                href={project.href}
                className="project-page-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {page.accessLabel}
              </a>
            </p>
          )}
        </div>
      </div>

      {mockupSrc && (
        <div className="project-page-right">
          <div
            className="project-page-mockup"
          >
            <div className="project-page-accent" />
            <img
              src={mockupSrc}
              alt={`${project.name} mockup`}
              className="project-page-mockup-img"
              width="560"
              height="auto"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="project-page-right project-page-right--gallery">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.name} – screenshot ${i + 1}`}
              className="project-page-gallery-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'auto'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
