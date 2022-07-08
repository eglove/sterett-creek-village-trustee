import {
  ExtendedNav,
  Header,
  NavMenuButton,
  Title,
} from '@trussworks/react-uswds';
import { BlitzLayout, Head } from 'blitz';
import { useState } from 'react';

import { TrussLink } from '../../trussworks/truss-link/truss-link';
import styles from '../styles/layout.module.css';

const Layout: BlitzLayout<{ children?: React.ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (): void => {
    setExpanded(expanded_ => {
      return !expanded_;
    });
  };

  const NavigationItems = [
    <TrussLink href="/" key="home">
      Home
    </TrussLink>,
    <TrussLink href="/calendar" key="calendar">
      Calendar
    </TrussLink>,
    <TrussLink href="/" key="events">
      Events
    </TrussLink>,
    <TrussLink href="/" key="covenants">
      Covenants
    </TrussLink>,
  ];

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`} />
      <Head>
        <title>{title ?? 'Sterett Creek Village Trustee'}</title>
        <link href="/public/favicon.ico" rel="icon" />
      </Head>
      <Header extended className={styles.Navigation}>
        <div className="usa-navbar">
          <Title className={styles.Title}>
            <TrussLink href="/">Sterett Creek Village Trustee</TrussLink>
          </Title>
          <NavMenuButton label="Menu" onClick={toggleExpanded} />
        </div>
        <ExtendedNav
          mobileExpanded={expanded}
          primaryItems={NavigationItems}
          secondaryItems={[]}
          onToggleMobileNav={toggleExpanded}
        />
      </Header>
      {children}
    </>
  );
};

export default Layout;
