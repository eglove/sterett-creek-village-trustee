import { formatList, formatPhoneNumber } from '@ethang/utilities';
import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  CardMedia,
} from '@trussworks/react-uswds';
import { useQuery } from 'blitz';
import { Image } from 'next/image';

import utilityStyles from '../../../styles/util.module.css';
import getTrustees from '../../dashboard/queries/trustees/get-trustees';

export const TrusteesLayout = (): JSX.Element => {
  const [trustees] = useQuery(getTrustees, undefined);

  return (
    <div className={utilityStyles.CenterOnPage}>
      <CardGroup>
        {trustees.map(trustee => {
          return (
            <div key={trustee.id}>
              <Card layout="standardDefault">
                <CardHeader>
                  {trustee.firstName} {trustee.lastName}
                </CardHeader>
                <CardMedia>
                  <div
                    style={{
                      height: '300px',
                      width: '300px',
                    }}
                  >
                    <Image
                      alt={trustee.image.description}
                      layout="fill"
                      objectFit="contain"
                      src={trustee.image.url}
                    />
                  </div>
                </CardMedia>
                <CardBody>{formatPhoneNumber(trustee.phoneNumber)}</CardBody>
                <CardBody>{formatList(trustee.duties)}</CardBody>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
};
