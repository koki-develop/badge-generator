import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type ExternalAnchorProps = React.HTMLProps<HTMLAnchorElement>;

export type LinkProps =
  | ({
      external: true;
    } & ExternalAnchorProps)
  | ({
      external?: false;
    } & NextLinkProps);

const Link: React.FC<LinkProps> = React.memo((props) => {
  if (props.external) {
    return <a target="_blank" rel="noreferrer noopener" {...props} />;
  }

  return <NextLink {...props} />;
});

Link.displayName = "Link";

export default Link;
