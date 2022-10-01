import React, { memo } from "react";

const Divider: React.FC = memo(() => {
  return <hr className="my-8" />;
});

Divider.displayName = "Divider";

export default Divider;
