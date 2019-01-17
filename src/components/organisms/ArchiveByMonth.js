import React from 'react';

const ArchiveByMonth = ({items}) => {
  if (!items) return <div></div>;
  return (
    <div className="archive-by-month">
      <h3>月別アーカイブ</h3>
      <ul className="archive-by-month-body">
        {Object.keys(items).map(key => {
          if (!items[key]) return;
          return (
            <li>
              <a href={`/${key}`}>
                {key} ({items[key].length})
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArchiveByMonth
