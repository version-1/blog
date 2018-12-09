import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import profile from '../assets/images/profile.png';

export default class Sidebar extends PureComponent {
  render() {
    const {posts} = this.props;
    return (
      <div className="sidebar">
        <section className="section">
          <h3>Profile</h3>
          <div className="self-introduction">
            <div className="profile-image">
              <img src={profile} alt="profile" />
            </div>
            <p className="introduction">
              フリーランスのRails&Reactエンジニア
              10月からフルリモートになりました。
              プログラミング、旅行、フリーランスの働き方などに
              ついてぼちぼち更新していきます。
            </p>
          </div>
        </section>
        <section className="section">
          <h3>検索</h3>
          <div className="search">
            <div className="input-field">
              <i className="material-icons prefix">search</i>
              <input id="icon_telephone" type="tel" />
              <label htmlFor="icon_telephone">Search</label>
            </div>
          </div>
        </section>
        <section className="section">
          <h3>オススメ記事</h3>
          {posts.map(({node: post}) => (
              <Link to={post.frontmatter.slug}>
                <div key={post.id} className="card small hoverable">
                  <div className="card-image">
                    <img
                      src={post.frontmatter.thumbnail}
                      alt={post.frontmatter.title}
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-title">{post.frontmatter.title}</span>
                  </div>
                </div>
              </Link>
          ))}
        </section>
      </div>
    );
  }
}
