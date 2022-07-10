import {
  ExtendedNav,
  Header,
  NavMenuButton,
  Title,
} from '@trussworks/react-uswds';
import { BlitzLayout, Head, useMutation, useQuery } from 'blitz';
import { useState } from 'react';

import signOut from '../../auth/mutations/sign-out';
import getCurrentUser from '../../auth/queries/get-current-user';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import styles from '../styles/layout.module.css';

const Layout: BlitzLayout<{ children?: React.ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  const [user] = useQuery(getCurrentUser, undefined, { suspense: false });
  const [expanded, setExpanded] = useState(false);

  const [signOutMutation] = useMutation(signOut);

  const handleSignOut = async (): Promise<void> => {
    await signOutMutation(undefined);
  };

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
    <TrussLink href="/covenants" key="covenants">
      Covenants
    </TrussLink>,
    <TrussLink href="/meeting-minutes" key="meeting-minutes">
      Meeting Minutes
    </TrussLink>,
  ];

  const SecondaryItems = [
    <TrussLink href="/dashboard" key="dashboard">
      Dashboard
    </TrussLink>,
    <span
      className="usa-link"
      key="signOut"
      role="link"
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      onClick={handleSignOut}
      onKeyUp={handleSignOut}
    >
      Sign Out
    </span>,
  ];

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`} />
      <Head>
        <title>{title ?? 'Sterett Creek Village Trustee'}</title>
        <link href="/public/favicon.ico" rel="icon" />
        <link
          href="/public/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="76x76"
        />
        <link
          href="/public/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/public/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/public/site.webmanifest" rel="manifest" />
        <link
          color="#000000"
          href="/public/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffc40d" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
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
          secondaryItems={
            user === null || typeof user === 'undefined' ? [] : SecondaryItems
          }
          onToggleMobileNav={toggleExpanded}
        />
      </Header>
      {children}
    </>
  );
};

export default Layout;
