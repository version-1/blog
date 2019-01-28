const {google} = require('googleapis');
const moment = require('moment');
const { GA_AUTH_EMAIL, GA_AUTH_PRIVATE_KEY, GA_AUTH_VIEW_ID } = process.env
const auth = {
  email: GA_AUTH_EMAIL,
  privateKey: GA_AUTH_PRIVATE_KEY.replace(/\\n/g,"\n")
};
const viewId = GA_AUTH_VIEW_ID; // Google Analytics view ID
const analytics = google.analyticsreporting('v4'); // Used for pulling report
const jwtClient = new google.auth.JWT(
  auth.email, // For authenticating and permissions
  null,
  auth.privateKey,
  ['https://www.googleapis.com/auth/analytics.readonly'],
  null,
);

const authenticate = client =>
  client.authorize(function(err, tokens) {
    if (err) {
      console.log('Reeeeejected');
      console.log(err);
      return false;
    }
    return true;
  });

// Set up what we data we want to pull from Google Analytics
const metrics = [
  {
    expression: 'ga:pageviews',
    alias: 'pv',
  },
];

const dimensions = [
  {
    name: 'ga:pagePath',
  },
];

const postUrlRegexp = '^/[0-9]{4}/[01][0-9]/[0-3][0-9]/.+$';
const dimensionFilterClauses = [
  {
    filters: [
      {
        dimensionName: 'ga:pagePath',
        expressions: [postUrlRegexp],
      },
    ],
  },
];

const dateRanges = [
  {
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
];

const orderBys = [
  {
    fieldName: 'ga:pageviews',
    sortOrder: 'DESCENDING',
  },
];

const req = {
  reportRequests: [
    {
      viewId,
      dateRanges,
      metrics,
      dimensions,
      dimensionFilterClauses,
      orderBys,
      pageSize: 6,
    },
  ],
};

const fetch = (auth, resource) =>
  new Promise((resolve, reject) =>
    analytics.reports.batchGet(
      {
        auth,
        resource,
      },
      function(err, response) {
        if (err) {
          console.log('Failed to get Report');
          console.error(err);
          return reject(err);
        }
        resolve(response.data);
      },
    ),
  );

const fetchPv = async onSuccess => {
  authenticate(jwtClient);
  return await fetch(jwtClient, req);
};

module.exports = {
  fetchPv,
};
