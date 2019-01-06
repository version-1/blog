import React from 'react';
import Img from '../../../components/atoms/Image';
import pocketIcon from '../../../assets/images/pocket-icon-color.svg';
const defaultSize = 40;

const PocketButton = ({amp, url, title, size = defaultSize}) => {
  const shareLink = `http://getpocket.com/edit?url=${url}&title=${title}`;
  return (
    <a className="share-btn pocket-btn" href={shareLink} rel="nofollow" rel="nofollow" target="_blank">
      <Img amp={amp} src={pocketIcon} width={45} height={45}/>
    </a>
  );
};

export default PocketButton;

// export default class PocketButton extends React.PureComponent {
// 公式のシェアスクリプトを使う場合
// componentDidMount() {
//   const i = 'pocket-btn-js';
//   const d = document;
//   if (!document.getElementById(i)) {
//     const j = d.createElement('script');
//     j.id = i;
//     j.src = 'https://widgets.getpocket.com/v1/j/btn.js?v=1';
//     const w = d.getElementById(i);
//     d.body.appendChild(j);
//   }
// }
// render() {
//   return (
//     <>
//       <a
//         data-pocket-label="pocket"
//         data-pocket-count="vertical"
//         className="pocket-btn"
//         data-lang="en"
//       />
//     </>
//   );
// }
// }
