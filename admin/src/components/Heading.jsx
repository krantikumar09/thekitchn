import React from "react";

const Heading = ({ heading }) => {
  return (
    <h2 className="font-bold text-xl text-textColor-heading md:text-2xl mb-4">
      {heading}
    </h2>
  );
};

export default Heading;
