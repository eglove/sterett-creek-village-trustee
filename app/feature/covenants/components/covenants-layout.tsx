import utilityStyles from '../../../styles/util.module.css';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import { Pagination } from '../../util/pagination/components/pagination';
import {
  COVENANTS_PAGE_SIZE,
  useCovenantsLayout,
} from '../hooks/use-covenants-layout';
import styles from '../styles/covenants.module.css';

export const CovenantsLayout = (): JSX.Element => {
  const { covenants, skip, setSkip, count } = useCovenantsLayout();

  return (
    <div className={utilityStyles.CenterOnPage}>
      <div className={styles.CovenantLinkContainer}>
        {covenants.map(covenant => {
          return (
            <TrussLink newTab href={covenant.url} key={covenant.url}>
              {covenant.title}
            </TrussLink>
          );
        })}
      </div>
      <Pagination
        pageLength={COVENANTS_PAGE_SIZE}
        setSkip={setSkip}
        skip={skip}
        totalCount={count}
      />
    </div>
  );
};
