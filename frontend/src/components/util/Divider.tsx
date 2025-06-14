import React, { memo } from "react";

const Divider: React.FC = memo(() => {
  return <hr className="my-8 border-gray-200" />;
});

Divider.displayName = "Divider";

export default Divider;
