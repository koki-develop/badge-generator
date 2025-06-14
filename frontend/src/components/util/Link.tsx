import NextLink from "next/link";
import React from "react";

export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, "href"> & {
  href: string;
  external?: boolean;
};

const Link: React.FC<LinkProps> = React.memo((props) => {
  const { external, href, children, className, ...anchorProps } = props;

  if (external) {
    return <a target="_blank" rel="noreferrer noopener" href={href} className={className} {...anchorProps}>{children}</a>;
  }

  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";

export default Link;
