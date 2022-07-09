import {
  ExtendedNav,
  Header,
  NavMenuButton,
  Title,
} from '@trussworks/react-uswds';
import { BlitzLayout, Head, useMutation } from 'blitz';
import { useState } from 'react';

import { useCurrentUser } from '../../auth/hooks/use-current-user';
import signOut from '../../auth/mutations/sign-out';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import styles from '../styles/layout.module.css';

const Layout: BlitzLayout<{ children?: React.ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  const user = useCurrentUser();
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
    <TrussLink href="/calendar" key="calendar">
      Calendar
    </TrussLink>,
    <TrussLink href="/covenants" key="covenants">
      Covenants
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
      </Head>
      <Header extended className={styles.Navigation}>
        <div className="usa-navbar">
          <Title className={styles.Title}>
            <TrussLink href="/calendar">
              Sterett Creek Village Trustee
            </TrussLink>
          </Title>
          <NavMenuButton label="Menu" onClick={toggleExpanded} />
        </div>
        <ExtendedNav
          mobileExpanded={expanded}
          primaryItems={NavigationItems}
          secondaryItems={typeof user === 'undefined' ? [] : SecondaryItems}
          onToggleMobileNav={toggleExpanded}
        />
      </Header>
      {children}
    </>
  );
};

export default Layout;
