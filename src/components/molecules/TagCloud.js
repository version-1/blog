import React, { useState, useMemo, useCallback } from "react";
import Link from "atoms/Link";
import i18next from "lib/i18next";
import { tagPath } from "lib/routes";

const defaultCount = 8;

const TagCloud = ({ language, tags }) => {
  const [count, setCount] = useState(defaultCount);
  const onMore = useCallback(() => {
    setCount(count => count + defaultCount);
  }, [setCount]);
  const rest = useMemo(() => tags.length - count, [tags, count]);

  return (
    <div className="sidebar-tags">
      <ul className="sidebar-tags-list">
        {tags.slice(0, count).map(tag => {
          const key = `tags.${tag}`;
          return (
            <li key={key} className="sidebar-tags-item">
              <Link
                className="sidebar-tags-item-link"
                to={tagPath(tag, language)}
              >
                {i18next.t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
      {tags.length > count && (
        <p>
          <a onClick={onMore}>{`>> ${rest} more`}</a>
        </p>
      )}
    </div>
  );
};

export default TagCloud;
