import React from "react";
import { Link } from "gatsby";

const Breadcrumbs = ({ currentPath, context }) => {
  return (
    <ul className="breadcrumbs">
      {context.map((item, idx) => {
        return (
          <li className="breadcrumbs-item" key={idx}>
            {currentPath === item.path ? (
              <a href={item.path}>{item.label}</a>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Breadcrumbs, []);
