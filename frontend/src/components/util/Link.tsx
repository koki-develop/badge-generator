import NextLink from "next/link";
import React from "react";

export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, "href"> & {
  href: string;
  external?: boolean;
};

const Link: React.FC<LinkProps> = React.memo((props) => {
  const { external, ...linkProps } = props;

  if (external) {
    return <a target="_blank" rel="noreferrer noopener" {...linkProps} />;
  }

  const { href, ...otherLinkProps } = linkProps;

  return (
    <NextLink href={href}>
      <a {...otherLinkProps} />
    </NextLink>
  );
});

Link.displayName = "Link";

export default Link;
