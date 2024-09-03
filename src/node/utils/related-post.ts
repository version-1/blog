import moment from 'moment';
// categoryが一致 + 3
// tagsが一致     + 1
// あとはpv順
export const rating = (posts, post, pageviews) => {
  const {categories, tags, slug, createdAt} = post.frontmatter;
  const ratings = posts.reduce((acc, _post) => {
    let rate = 0;
    if (slug === _post.frontmatter.slug) {
      return acc;
    }

    _post.frontmatter.categories.forEach(category => {
      if (categories.includes(category)) {
        rate = rate + 3;
      }
    });

    _post.frontmatter.tags.forEach(tag => {
      if (tags.includes(tag)) {
        rate = rate + 1;
      }
    });

    const pageview = pageviews.find(pv => {
      return pv.dimensions[0] === slug;
    });
    const [pv] = pageview ? pageview.metrics[0].values : [0];
    return [
      ...acc,
      {
        rate,
        pv: Number(pv),
        createdAt: _post.frontmatter.createdAt,
        slug: _post.frontmatter.slug,
      },
    ];
  }, []);

  return sort(ratings);
};

const sort = ratings => {
  return ratings.sort((a, b) => {
    if (a.rate > b.rate) {
      return -1;
    } else if (a.rate === b.rate) {
      if (a.pv > b.pv) {
        return -1;
      } else if (a.pv == b.pv) {
        if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  });
};

