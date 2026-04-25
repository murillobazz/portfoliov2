import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

function FolderIcon() {
  return (
    <svg
      className="project-folder-icon"
      viewBox="0 0 254 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M248.32 3.3705C251.032 3.3705 253.231 5.79828 253.231 8.79311V194.577C253.231 197.572 251.032 200 248.32 200L4.91154 177.75C2.19897 177.75 2.63695e-08 175.322 0 172.328L6.13774e-05 8.79311C6.3065e-05 5.79828 2.19903 3.3705 4.9116 3.3705L135.504 11.741C137.997 9.74975 159.469 1.09171e-08 162.182 0L248.32 3.3705Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PortfolioPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  const projects = tx.projects.map((p, i) => ({ ...p, first: i === 0 }));

  return (
    <div className="portfolio">

      <ul className="project-list">
        {projects.map((project, i) => (
          <li
            key={i}
            className={`project-card${project.first ? ' project-card--first' : ''}`}
          >
            <div className="project-info">
              <h2 className="project-name">
                {project.href ? (
                  <a
                    href={project.href}
                    className="project-name-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h2>
              <p className="project-subtitle">{project.subtitle}</p>
              <div className="project-details">
                {project.details.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>

            <div className="project-folder">
              <FolderIcon />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
