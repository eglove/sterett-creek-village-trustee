import { Link as BlitzLink, LinkProps } from 'blitz';

interface TrussLinkProperties {
  blitzLinkProperties?: LinkProps;
  children: string | JSX.Element | JSX.Element[];
  href: string;
  hrefProperties?: JSX.IntrinsicElements['a'];
  newTab?: boolean;
}

export const TrussLink = ({
  blitzLinkProperties,
  children,
  href,
  hrefProperties,
  newTab,
}: TrussLinkProperties): JSX.Element => {
  return (
    <BlitzLink passHref href={href} {...blitzLinkProperties}>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a
        className={newTab === true ? `usa-link usa-link--external` : `usa-link`}
        rel={newTab === true ? 'noreferrer' : ''}
        target={newTab === true ? '_blank' : ''}
        {...hrefProperties}
      >
        {children}
      </a>
    </BlitzLink>
  );
};
