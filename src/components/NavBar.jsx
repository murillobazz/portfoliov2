import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'home', end: true },
  { to: '/portfolio', label: 'portfolio' },
  { to: '/about', label: 'about me' },
  { to: '/contact', label: 'get in touch' },
];

export function NavBar() {
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
