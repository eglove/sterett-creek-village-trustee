import { useQuery } from 'blitz';
import { Image } from 'next/image';

import getHomeContent from '../../../queries/get-home-content';
import { Container } from '../../core/components/container';

export const HomeLayout = (): JSX.Element | null => {
  const [homeContent] = useQuery(getHomeContent, undefined);

  if (homeContent === null) {
    return <p>There&apos;s nothing here yet. Check back later.</p>;
  }

  return (
    <Container>
      <div style={{ height: '300px', position: 'relative', width: '50%' }}>
        <Image
          alt={homeContent.image.description}
          layout="fill"
          objectFit="contain"
          src={homeContent.image.url}
        />
      </div>
      <div style={{ maxWidth: '600px' }}>
        <p>
          A small community that has 202 homes for full time and part time
          residents. Located in Benton County Missouri!
        </p>
        <p>
          The community has a pool, pavilion (which can be rented by a resident
          by contacting a trustee) horseshoe pits, and basketball hoops.
        </p>
        <p>
          Close by (a golf cart ride away) is Sterett Creek Marina and
          Campground.
        </p>
        <p>
          <strong>Contacts</strong>
        </p>
        <p>Trustees</p>
        <ul>
          <li>Debra Anderson 660-233-3673</li>
          <li>Rita StJohn 417-268-5539</li>
          <li>Mike Robey 573-326-0217</li>
          <li>Lowell Washer 816-830-3342</li>
          <li>Caressa Maher 913-603-2286</li>
        </ul>
        <p>Water Technicians</p>
        <ul>
          <li>Kirk Leimkuehler, Chief Water Operator, 660-223-2310</li>
          <li>Mike Blyth, Back-up Water Operator, 816-316-9610</li>
        </ul>
      </div>
    </Container>
  );
};
