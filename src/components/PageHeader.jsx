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

  const isProjectPage = pathname.startsWith('/work/') && pathname.length > '/work/'.length;

  const titles = {
    '/': 'murillobazz',
    '/work': tx.navWork,
    '/about': tx.navAbout,
    '/contact': tx.navContact,
    '/playground': tx.navPlayground,
  };

  const tabLabels = {
    '/': tx.tabHome,
    '/work': tx.tabWork,
    '/about': tx.tabAbout,
    '/contact': tx.tabContact,
    '/playground': tx.tabPlayground,
  };

  const title = titles[pathname] ?? 'murillobazz';
  const tabLabel = tabLabels[pathname];

  useEffect(() => {
    if (isProjectPage) return;
    document.title = tabLabel ? `${tabLabel} | murillobazz` : 'murillobazz';
  }, [isProjectPage, tabLabel]);

  if (isProjectPage) return null;

  return <PageHeaderInner key={pathname} title={title} showNav={pathname !== '/'} />;
}
