import { FC, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface AppLinkProps extends LinkProps {
  className?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const { to, className, children, ...otherProps } = props;

  return (
    <NavLink
      to={to}
      className={classNames(cls.AppLink, {}, [className])}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
