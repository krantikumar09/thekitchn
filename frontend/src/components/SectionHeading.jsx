import React from "react";

const SectionHeading = ({ heading, subheading }) => {
  return (
    <div className="mb-12">
      <h1 className="heading1">{heading}</h1>
      <p className="subheading1">{subheading}</p>
    </div>
  );
};

export default SectionHeading;
