import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from './NavBar';
import { PageTitle } from './PageTitle';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

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
  const [lang] = useLanguageContext();
  const tx = t[lang];

  const isProjectPage = pathname.startsWith('/portfolio/') && pathname.length > '/portfolio/'.length;
  if (isProjectPage) return null;

  const titles = {
    '/': 'murillobazz',
    '/portfolio': tx.navPortfolio,
    '/about': tx.navAbout,
    '/contact': tx.navContact,
  };

  const tabLabels = {
    '/': tx.tabHome,
    '/portfolio': tx.tabPortfolio,
    '/about': tx.tabAbout,
    '/contact': tx.tabContact,
  };

  const title = titles[pathname] ?? 'murillobazz';
  const tabLabel = tabLabels[pathname];

  useEffect(() => {
    document.title = tabLabel ? `${tabLabel} | murillobazz` : 'murillobazz';
  }, [tabLabel]);

  return <PageHeaderInner key={pathname} title={title} showNav={pathname !== '/'} />;
}
