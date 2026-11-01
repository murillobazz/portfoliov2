import { Link, useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { PongCard } from '../components/PongCard';
import { MindTheGap } from '../components/MindTheGap';

export function HomePage() {
  const navigate = useNavigate();
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="home">
      <p className="home-tagline">
        {tx.taglinePrefix}<MindTheGap text={tx.taglineEm} reveal={tx.taglineGap} />
        <span className="home-tagline-facts">{tx.facts}</span>
      </p>

      <div className="home-grid">
        <div className="home-card home-card--work" onClick={() => navigate('/work')}>
          <span className="home-card-label">{tx.navWork}</span>
          {/* One flat folder per case, seen from the front: the case preview
              peeks out from behind its front, where the summary sits */}
          <ul className="home-folders">
            {tx.projects.map(project => (
              <li key={project.slug}>
                <Link
                  to={`/work/${project.slug}`}
                  className="home-folder"
                  onClick={e => e.stopPropagation()}
                  viewTransition
                >
                  <span className="home-folder-back" aria-hidden="true" />
                  {project.preview && (
                    <span className="home-folder-sheet">
                      <img src={project.preview} alt="" decoding="async" />
                    </span>
                  )}
                  <span className="home-folder-front">
                    <span className="home-folder-name">{project.name}</span>
                    <span className="home-folder-summary">{project.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="home-card home-card--about" onClick={() => navigate('/about')}>
          <span className="home-card-label">{tx.navAbout}</span>
        </div>
        <div className="home-card home-card--contact" onClick={() => navigate('/contact')}>
          <span className="home-card-label">
            {tx.navContactCard.map((chunk, i, arr) => (
              <span key={i}>{chunk}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        </div>
        <PongCard />
        <div className="home-card home-card--playground" onClick={() => navigate('/playground')}>
          <span className="home-card-label">{tx.navPlayground}</span>
        </div>
      </div>
    </div>
  );
}
