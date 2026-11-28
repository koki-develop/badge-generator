import React, { memo } from "react";
import LayoutFooter from "@/components/Layout/LayoutFooter";
import LayoutHeader from "@/components/Layout/LayoutHeader";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = memo((props) => {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <LayoutHeader />

      <main className="mx-auto mb-4 max-w-5xl px-4 py-4 sm:px-8 md:py-8">
        {children}
      </main>

      <LayoutFooter />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
