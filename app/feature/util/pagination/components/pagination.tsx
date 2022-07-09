import { Button, Icon } from '@trussworks/react-uswds';
import { Dispatch, SetStateAction } from 'react';

import styles from '../styles/pagination.module.css';

interface PaginationProperties {
  pageLength: number;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
  totalCount: number;
}

export const Pagination = ({
  pageLength,
  setSkip,
  skip,
  totalCount,
}: PaginationProperties): JSX.Element => {
  const handleNavigation = (direction: 'next' | 'previous'): void => {
    if (direction === 'next' && skip + pageLength < totalCount) {
      setSkip(skip_ => {
        return skip_ + pageLength;
      });
    } else if (direction === 'previous' && skip >= pageLength) {
      setSkip(skip_ => {
        return skip_ - pageLength;
      });
    }
  };

  return (
    <div className={styles.PaginationContainer}>
      <Button
        disabled={skip < pageLength}
        type="button"
        onClick={(): void => {
          handleNavigation('previous');
        }}
      >
        <Icon.NavigateBefore /> Previous
      </Button>
      <div>
        Page: {skip / pageLength + 1} of{' '}
        {Number.isNaN(Math.ceil(totalCount / pageLength)) ||
        Math.ceil(totalCount / pageLength) === 0
          ? 1
          : Math.ceil(totalCount / pageLength)}{' '}
      </div>
      <Button
        disabled={skip + pageLength >= totalCount}
        type="button"
        onClick={(): void => {
          handleNavigation('next');
        }}
      >
        Next <Icon.NavigateNext />
      </Button>
    </div>
  );
};
