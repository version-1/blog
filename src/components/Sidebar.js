import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import profile from '../assets/images/profile.png';
import {constants} from '../../config/constants';
import Img from '../components/atoms/Image';
import ArchiveByMonth from '../components/organisms/ArchiveByMonth';

export default class Sidebar extends PureComponent {
  render() {
    const {amp, archiveByMonth} = this.props;
    return (
      <div className="sidebar">
        <section className="section">
          <h3>プロフィール</h3>
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
              <p>
                フリーランスのRails&Reactエンジニア
                10月からフルリモートになりました。
                プログラミング、旅行、フリーランスの働き方などに
                ついてぼちぼち更新していきます。
              </p>
              <p>
                プロフィールは<Link to="/about">こちら</Link>です。
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <h3>オススメ記事</h3>
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
