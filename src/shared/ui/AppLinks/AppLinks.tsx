import { FC, memo } from "react";
import { LinkProps, Link } from "react-router-dom";
import { classNames } from "../../lib/classNames/classNames";

import cls from "./AppLink.module.scss";

interface AppLinkProps extends LinkProps {
  className?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const { to, className, children, ...otherProps } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
