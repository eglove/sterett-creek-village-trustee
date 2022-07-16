import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from '../styles/styles.module.css';

interface ContainerProperties {
  children: JSX.Element | JSX.Element[];
  containerProperties?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export const Container = ({
  children,
  containerProperties,
}: ContainerProperties): JSX.Element => {
  return (
    <div
      {...containerProperties}
      className={`${containerProperties?.className ?? ''} ${
        styles.Container ?? ''
      }`}
    >
      {children}
    </div>
  );
};
