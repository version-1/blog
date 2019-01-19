import React from 'react';
import moment from 'moment';

const ARCHIVE_LIMIT = 12;
const ArchiveByMonth = ({items}) => {
  if (!items) return <div></div>;

  const sortedKeys = Object.keys(items).sort((a, b) => {
    if (moment(a, 'YYYY/MM').isAfter(moment(b, 'YYYY/MM'))) {
       return -1
    } else {
       return 1
    }
  })
  return (
    <div className="archive-by-month">
      <h3>月別アーカイブ</h3>
      <ul className="archive-by-month-body">
        {sortedKeys.slice(0, ARCHIVE_LIMIT).map(key => {
          if (!items[key]) return;
          return (
            <li key={key}>
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
