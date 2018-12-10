import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import profile from '../assets/images/profile.png';

const posts = [
  {
    title: 'フリーランスエンジニアが初めに選ぶオススメのフリーランスエージェント3選。',
    to: '/2018/12/03/freelance-agent-select',
    thumbnail: 'https://ver-1-0.net/wp-content/uploads/2018/12/freelance-begineer.jpg',
  },
  {
    title: 'Udemyでクーポンを利用して、気になるコースをお得に利用する方法',
    to: '2018/01/01/udemy-coupon',
    thumbnail: 'https://ver-1-0.net/wp-content/uploads/2017/11/Udemy-Top.png',
  },
  {
    title: 'フリーランスは相対取引が自由に働ける道？',
    to: '2018/03/22/trade-of-market-and-direct',
    thumbnail: 'https://ver-1-0.net/wp-content/uploads/2018/03/concept-1868728_1280.jpg',
  }
]

export default class Sidebar extends PureComponent {
  render() {
    return (
      <div className="sidebar">
        <section className="section">
          <h3>プロフィール</h3>
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
          {posts.map((post, index) => (
              <Link key={index} to={post.to}>
                <div className="flat-card">
                  <div className="card-image">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                    />
                  </div>
                  <div className="card-content">
                    <span>{post.title}</span>
                  </div>
                </div>
              </Link>
          ))}
        </section>
      </div>
    );
  }
}
