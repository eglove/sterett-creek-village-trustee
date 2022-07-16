import { Card, CardGroup } from '@trussworks/react-uswds';
import { useQuery } from 'blitz';

import { Container } from '../../core/components/container';
import getTrustees from '../../dashboard/queries/trustees/get-trustees';
import { TrusteeCard } from './trustee-card';

export const TrusteesLayout = (): JSX.Element => {
  const [trustees] = useQuery(getTrustees, undefined);

  if (trustees.length < 1) {
    return (
      <Container>
        <p>There&apos;s nothing here yet. Check back later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <CardGroup>
        {trustees.map(trustee => {
          return (
            <div key={trustee.id}>
              <Card layout="standardDefault">
                <TrusteeCard trustee={trustee} />
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </Container>
  );
};
