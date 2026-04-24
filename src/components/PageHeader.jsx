import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from './NavBar';
import { PageTitle } from './PageTitle';

const TITLES = {
  '/': 'murillobazz',
  '/portfolio': 'portfolio',
  '/about': 'about me',
  '/contact': 'get in touch',
};

const TAB_LABELS = {
  '/': 'HOME',
  '/portfolio': 'PORTFOLIO',
  '/about': 'ABOUT',
  '/contact': 'CONTACT',
};

function PageHeaderInner({ title, showNav }) {
  return (
    <header className="page-header">
      <PageTitle>{title}</PageTitle>
      {showNav && <NavBar />}
    </header>
  );
}

export function PageHeader() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? 'murillobazz';
  const tabLabel = TAB_LABELS[pathname];

  useEffect(() => {
    document.title = tabLabel ? `${tabLabel} | murillobazz` : 'murillobazz';
  }, [tabLabel]);

  return <PageHeaderInner key={pathname} title={title} showNav={pathname !== '/'} />;
}
