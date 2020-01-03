import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import profile from 'assets/images/profile.png';
import Img from 'components/atoms/Image';
import ArchiveByMonth from 'components/organisms/ArchiveByMonth';
import {aboutPath} from 'lib/routes';
import i18next from 'lib/i18next';
import Title from 'components/molecules/Title';

export default class Sidebar extends PureComponent {
  render() {
    const {language, amp, archiveByMonth} = this.props;
    return (
      <div className="sidebar">
        <section className="section">
          <Title color="skyblue" label="labels.sidebar.profile-title" />
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
              {i18next.t('labels.sidebar.profile-description')}
              <p>
                <Link to={aboutPath(language)}>
                  {i18next.t('labels.sidebar.profile-link')}
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <ArchiveByMonth language={language} items={archiveByMonth} />
        </section>
      </div>
    );
  }
}
