import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { PongCard } from '../components/PongCard';

export function HomePage() {
  const navigate = useNavigate();
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="home">
      <p className="home-tagline">{tx.taglinePrefix}<em>{tx.taglineEm}</em></p>

      <div className="home-grid">
        <div className="home-card home-card--portfolio" onClick={() => navigate('/portfolio')}>
          <span className="home-card-label">{tx.navPortfolio}</span>
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
      </div>
    </div>
  );
}
