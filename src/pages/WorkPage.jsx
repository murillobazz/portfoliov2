import { Link } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { Folder } from '../components/Folder';

export function WorkPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="portfolio">
      <ul className="project-list">
        {tx.projects.map((project, i) => (
          <li
            key={project.slug}
            className={`project-card${i === 0 ? ' project-card--first' : ''}`}
            style={{ viewTransitionName: `project-card-${project.slug}` }}
          >
            <Link
              to={`/work/${project.slug}`}
              className="project-card-link"
              viewTransition
            >
              <div className="project-info">
                <h2 className="project-name">{project.name}</h2>
                <p className="project-subtitle">{project.title}</p>
              </div>
              <div className="project-folder">
                {/* The preview peeks out of the folder like a sheet of paper */}
                {project.preview && (
                  <span className="project-folder-preview">
                    <img
                      src={project.preview}
                      alt=""
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </span>
                )}
                <Folder symbol={project.symbol} className="project-folder-icon" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
