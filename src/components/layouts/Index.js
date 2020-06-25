import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import slack from 'slack-notify';
import {batchEventRegister} from 'ga-event-tracker-on-site';

import Navbar from 'components/Navbar';
import Head from 'components/Head';
import 'assets/stylesheets/index.sass';
import {constants} from 'config/constants';
import {isDevelopment, env} from 'lib/env';

const notifier = slack(env.slackWebhookUrl);

export default class IndexLayout extends React.PureComponent {
  componentDidMount() {
    if (isDevelopment) return;
    batchEventRegister(window, constants.selectors, 'click', {
      afterCallback: (ga, ele, params) => {
        notifier.send({
          channel: '#event',
          icon_emoji: ':ghost:',
          text: 'event fire',
          fields: params,
        });
      },
    });
  }

  render() {
    const {language, baseUrl} = this.props;
    const {children} = this.props;
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}
        render={data => (
          <div>
            <Head
              baseUrl={baseUrl}
              siteTitle={data.site.siteMetadata.title}
              description={data.site.siteMetadata.description}
            />
            <Navbar language={language} />
            <div>{children}</div>
            <div className="footer">
              <span className="copyright">
                Copyright © 2018 So Far , So Tech All Rights Reserved.
              </span>
            </div>
          </div>
        )}
      />
    );
  }
}
