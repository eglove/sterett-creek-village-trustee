import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'blitz';

import utilityStyles from '../../../../styles/util.module.css';
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
    covenants,
    skip,
    setSkip,
    count,
  } = useManageCovenants();

  return (
    <div className={utilityStyles.CenterOnPage}>
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
      <div className={styles.CovenantLinkContainer}>
        {covenants.map(covenant => {
          return (
            <div
              className={styles.DashboardCovenantLinkContainer}
              key={covenant.id}
            >
              <TrussLink newTab href={covenant.url}>
                {covenant.title}
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
    </div>
  );
};
