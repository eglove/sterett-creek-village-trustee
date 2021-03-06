import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import { Container } from '../../../core/components/container';
import coreStyles from '../../../core/styles/styles.module.css';
import { TrussLink } from '../../../trussworks/truss-link/truss-link';
import { Pagination } from '../../../util/pagination/components/pagination';
import {
  COVENANTS_DASHBOARD_PAGE_SIZE,
  useManageCovenants,
} from '../../hooks/covenants/use-manage-covenants';
import styles from '../../styles/dashboard.module.css';

export const ManageCovenants = (): JSX.Element => {
  const router = useRouter();

  const {
    handleDeleteCovenant,
    handleNavigateToUpsert,
    isLoading,
    covenants,
    skip,
    setSkip,
    count,
  } = useManageCovenants();

  return (
    <Container>
      <ButtonGroup>
        <Button
          type="button"
          onClick={async (): Promise<void> => {
            await handleNavigateToUpsert();
          }}
        >
          Add New Covenant
        </Button>
        <Button
          className="bg-accent-cool-dark"
          type="button"
          onClick={async (): Promise<void> => {
            await router.push('/dashboard');
          }}
        >
          Go Back
        </Button>
      </ButtonGroup>
      <div className={coreStyles.FileLinkContainer}>
        {covenants.map(covenant => {
          return (
            <div className={styles.DashboardFileLinkActions} key={covenant.id}>
              <TrussLink newTab href={covenant.url}>
                {covenant.fileName}
              </TrussLink>
              <ButtonGroup>
                <Button
                  className="bg-accent-warm"
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleNavigateToUpsert(covenant.id);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="bg-error"
                  disabled={isLoading}
                  type="button"
                  onClick={async (): Promise<void> => {
                    await handleDeleteCovenant(covenant.id);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          );
        })}
      </div>
      <Pagination
        pageLength={COVENANTS_DASHBOARD_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </Container>
  );
};
