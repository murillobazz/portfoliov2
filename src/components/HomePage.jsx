import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <p className="home-tagline">product-minded developer, creative tech enthusiast</p>

      <div className="home-grid">
        <div className="home-card home-card--portfolio" onClick={() => navigate('/portfolio')}>
          <span className="home-card-label">portfolio</span>
        </div>
        <div className="home-card home-card--about" onClick={() => navigate('/about')}>
          <span className="home-card-label">about me</span>
        </div>
        <div className="home-card home-card--contact" onClick={() => navigate('/contact')}>
          <span className="home-card-label">get<br />in<br />tou<br />ch</span>
        </div>
      </div>
    </div>
  );
}
