import React from 'react';
import HorizontalPostList from 'components/organisms/HorizontalPostList';

const PickupList = props => {
  const {posts} = props;
  if (!posts || posts.length <= 0) {
    return <></>;
  }
  return <HorizontalPostList posts={posts} label="labels.pickup" />;
};

export default React.memo(PickupList);
