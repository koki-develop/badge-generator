import React, { memo } from "react";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = memo((props) => {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <LayoutHeader />

      <main className="mb-4 px-4">
        <div className="container mx-auto">{children}</div>
      </main>

      <LayoutFooter />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
