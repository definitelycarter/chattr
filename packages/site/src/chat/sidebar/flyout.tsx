import React, { ReactChild, HTMLAttributes } from 'react';
import styles from './flyout.module.scss';

interface FlyoutProps extends HTMLAttributes<HTMLDivElement> {}
export function Flyout({ className, ...rest }: FlyoutProps) {
  let classes: string[] = [styles.container];
  if (typeof className === 'string') {
    classes.push(className);
  }
  return <div className={classes.join(' ')} {...rest} />;
}

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}
Flyout.Header = (props: HeaderProps) => <div className={styles.title}>{props.children}</div>;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}
Flyout.Body = (props: BodyProps) => <div>{props.children}</div>;
