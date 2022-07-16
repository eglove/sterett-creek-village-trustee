import { formatList, formatPhoneNumber } from '@ethang/utilities';
import { CardBody, CardHeader, CardMedia } from '@trussworks/react-uswds';
import { Image } from 'next/image';

import { GetTrustee } from '../../dashboard/queries/trustees/get-trustees';

interface TrusteesCardGroupProperties {
  trustee: GetTrustee;
}

export const TrusteeCard = ({
  trustee,
}: TrusteesCardGroupProperties): JSX.Element => {
  return (
    <div style={{ width: '300px' }}>
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
    </div>
  );
};
