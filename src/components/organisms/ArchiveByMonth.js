import React from 'react';
import {Link} from 'gatsby';
import moment from 'moment';
import i18next from 'lib/i18next';
import {monthArchivePath} from 'lib/routes';

const ARCHIVE_LIMIT = 12;
const ArchiveByMonth = ({language, items}) => {
  if (!items) return <div />;

  const sortedKeys = Object.keys(items).sort((a, b) => {
    if (moment(a, 'YYYY/MM').isAfter(moment(b, 'YYYY/MM'))) {
      return -1;
    } else {
      return 1;
    }
  });
  return (
    <div className="archive-by-month">
      <h3>{i18next.t('labels.sidebar.archive-by-month')}</h3>
      <ul className="archive-by-month-body">
        {sortedKeys.slice(0, ARCHIVE_LIMIT).map(key => {
          if (!items[key]) return <></>;
          return (
            <li key={key}>
              <Link to={monthArchivePath(key, language)}>
                {key} ({items[key].length})
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArchiveByMonth;
