import { Link, useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { PongCard } from '../components/PongCard';
import { MindTheGap } from '../components/MindTheGap';
import { Folder } from '../components/Folder';

export function HomePage() {
  const navigate = useNavigate();
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="home">
      <p className="home-tagline">
        {tx.taglinePrefix}<MindTheGap text={tx.taglineEm} reveal={tx.taglineGap} />
      </p>

      <div className="home-grid">
        <div className="home-card home-card--work" onClick={() => navigate('/work')}>
          <span className="home-card-label">{tx.navWork}</span>
          {/* A stack of folders, one per case: hover pulls one out with its tags */}
          <div className="home-folders" style={{ '--n': tx.projects.length }}>
            {tx.projects.map((project, i) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="home-folder"
                style={{ '--i': i }}
                aria-label={project.title}
                title={project.name}
                onClick={e => e.stopPropagation()}
                viewTransition
              >
                {/* The link stays put as the hover area; only the body moves */}
                <span className="home-folder-body">
                  <span className="home-folder-tags" aria-hidden="true">
                    {project.tags.map((tag, j) => (
                      <span key={tag} className="home-folder-tag" style={{ '--j': j }}>{tag}</span>
                    ))}
                  </span>
                  <Folder symbol={project.symbol} />
                </span>
              </Link>
            ))}
          </div>
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
