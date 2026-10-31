import { NavLink } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

export function NavBar() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  const NAV_ITEMS = [
    { to: '/', label: tx.navHome, end: true },
    { to: '/work', label: tx.navWork },
    { to: '/playground', label: tx.navPlayground },
    { to: '/about', label: tx.navAbout },
    { to: '/contact', label: tx.navContact },
  ];

  return (
    <nav className="site-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `nav-item${isActive ? ' nav-item--active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
