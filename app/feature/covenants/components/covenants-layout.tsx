import utilityStyles from '../../../styles/util.module.css';
import coreStyles from '../../core/styles/styles.module.css';
import { TrussLink } from '../../trussworks/truss-link/truss-link';
import { Pagination } from '../../util/pagination/components/pagination';
import {
  COVENANTS_PAGE_SIZE,
  useCovenantsLayout,
} from '../hooks/use-covenants-layout';

export const CovenantsLayout = (): JSX.Element => {
  const { covenants, skip, setSkip, count } = useCovenantsLayout();

  if (count === 0) {
    return (
      <div className={utilityStyles.CenterOnPage}>
        There&apos;s nothing here yet. Check back later.
      </div>
    );
  }

  return (
    <div className={utilityStyles.CenterOnPage}>
      <div className={coreStyles.CovenantLinkContainer}>
        {covenants.map(covenant => {
          return (
            <TrussLink newTab href={covenant.url} key={covenant.url}>
              {covenant.fileName}
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
