import React from 'react';
import {Link} from 'gatsby';
import Layout from 'components/layouts/Index';
import Sidebar from 'components/Sidebar';
import Title from 'components/molecules/Title';
import Post from 'components/Post';

const Breadcrumbs = ({context}) => {
  return (
    <ul className="breadcrumbs">
      {context.map((item, idx) => {
        return (
          <li className="breadcrumbs-item" key={idx}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

class DefaultLayout extends React.PureComponent {
  render() {
    const {popPosts, language, amp, baseUrl, layout} = this.props;
    const {archiveByMonth, breadcrumbs = []} = layout;
    const posts = popPosts ? popPosts.data.allMarkdownRemark.edges : [];
    return (
      <Layout language={language} amp={amp} baseUrl={baseUrl}>
        <main className="row container">
          <Breadcrumbs context={breadcrumbs} />
          {posts.length > 0 ? (
            <section className="section pickup-list">
              <div className="section-container">
                <div className="section-content">
                  <Title label="labels.pick-up" />
                  <div className="section-list">
                    <div className="row">
                      {posts.map(({node: post}, index) => (
                        <Post post={post} key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}
          <section className="flex">
            <div className="col s12 m12 l8">
              <div className="main">{this.props.children}</div>
            </div>
            <div className="row flex">
              <div className="col s12 m12 l4 hide-on-med-and-down">
                <Sidebar
                  language={language}
                  amp={amp}
                  archiveByMonth={archiveByMonth}
                />
              </div>
            </div>
          </section>
          <div className="row flex">
            <div className="col s12 m12 hide-on-large-only">
              <Sidebar
                language={language}
                amp={amp}
                archiveByMonth={archiveByMonth}
              />
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export default DefaultLayout;
