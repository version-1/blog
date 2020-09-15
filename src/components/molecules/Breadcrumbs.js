import React from "react";
import Link from "atoms/Link";

const Breadcrumbs = ({ context }) => {
  return (
    <ul className="breadcrumbs">
      {context.map((item, idx) => {
        return (
          <li className="breadcrumbs-item" key={idx}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Breadcrumbs, []);
