import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import _ from 'lodash';

const PER_PAGE = 18;

const className = classes => {
  return _.compact(Object.keys(classes).map(key => {
   return classes[key] ? key: null
  })).join(' ')
}

const PageLink = ({content, link, isDisabled, isActive}) => (
  <li
    className={className({
      'wave-effect': true,
      disabled: isDisabled,
      active: isActive,
    })}>
    <Link to={link}>{content}</Link>
  </li>
);

export default class Pagination extends PureComponent {
  get perPage() {
    return this.props.per || PER_PAGE;
  }

  get pageCount() {
    const {count,} = this.props;
    return Math.ceil(count / this.perPage);
  }

  get pageIndex() {
    return this.props.index || 1
  }

  isActive(page) {
    return page === this.pageIndex;
  }

  link(page) {
    const { namespace } = this.props;
    if (!page || page === 0) return namespace  + '/';
    if (page === 1) return namespace;
    return `${namespace}/${page}`;
  }

  render() {
    return (
      <ul className="pagination">
        <PageLink
          link={this.link()}
          content={<i className="material-icons">chevron_left</i>}
        />
        {Array.from({length: this.pageCount}).map((dummy, index) => (
          <PageLink
            key={index}
            link={this.link(index + 1)}
            content={index + 1}
            isActive={this.isActive(index + 1)}
          />
        ))}
        <PageLink
          link={this.link(this.pageCount)}
          content={<i className="material-icons">chevron_right</i>}
        />
      </ul>
    );
  }
}
