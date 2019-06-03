import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import profile from 'assets/images/profile.png';
import {constants} from 'config/constants';
import Img from 'components/atoms/Image';
import ArchiveByMonth from 'components/organisms/ArchiveByMonth';
import i18next from 'lib/i18next';

export default class Sidebar extends PureComponent {
  render() {
    const {amp, archiveByMonth} = this.props;
    return (
      <div className="sidebar">
        <section className="section">
          <h3>{i18next.t('labels.sidebar.profile-title')}</h3>
          <div className="self-introduction">
            <div className="profile-image">
              <Img
                amp={amp}
                width="100"
                height="100"
                layout="fixed"
                src={profile}
                alt="profile"
              />
            </div>
            <div className="introduction">
              <p>{i18next.t('labels.sidebar.profile-description')}</p>
              <p>
                <Link to="/about">
                  {i18next.t('labels.sidebar.profile-link')}
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <h3> {i18next.t('labels.sidebar.freelance-title')}</h3>
          {constants.recomended.map((post, index) => (
            <Link key={index} to={post.to}>
              <div className="flat-card">
                <div className="card-image">
                  <Img amp={amp} src={post.thumbnail} alt={post.title} />
                </div>
                <div className="card-content">
                  <span>{post.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <section className="section">
          <ArchiveByMonth items={archiveByMonth} />
        </section>
      </div>
    );
  }
}
