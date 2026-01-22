import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <span htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </span>
  );
};

export default Label;
