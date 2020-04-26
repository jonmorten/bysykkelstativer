import React from "react";

const Anchor: React.FC = ({ children, ...props }) => (
  <a className="text-blue-500 hover:text-blue-800" {...props}>
    {children}
  </a>
);

export default Anchor;
