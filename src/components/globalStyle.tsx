import React from 'react'
import { Global, css } from '@emotion/react'
import { colors } from 'constants/index'

// https://blog.s0014.com/posts/2017-01-19-il-to-svg/
const backgroundImage = `url('data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%221200%22%20height%3D%225000%22%20viewBox%3D%220%200%201200%205000%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0)%22%3E%3Crect%20width%3D%221200%22%20height%3D%225000%22%20fill%3D%22white%22%2F%3E%3Cellipse%20cx%3D%221177%22%20cy%3D%221654%22%20rx%3D%22665%22%20ry%3D%22634%22%20fill%3D%22url(%23paint0_radial)%22%2F%3E%3Cellipse%20cx%3D%22-145.5%22%20cy%3D%22363.5%22%20rx%3D%22983.5%22%20ry%3D%22937.5%22%20fill%3D%22url(%23paint1_radial)%22%2F%3E%3Cellipse%20cx%3D%22-7%22%20cy%3D%222436%22%20rx%3D%22665%22%20ry%3D%22634%22%20fill%3D%22url(%23paint2_radial)%22%2F%3E%3Cellipse%20cx%3D%22-7%22%20cy%3D%224607%22%20rx%3D%22665%22%20ry%3D%22634%22%20fill%3D%22url(%23paint3_radial)%22%2F%3E%3Cellipse%20cx%3D%221162%22%20cy%3D%223523%22%20rx%3D%22665%22%20ry%3D%22634%22%20fill%3D%22url(%23paint4_radial)%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(1177%201654)%20rotate(90)%20scale(634%20665)%22%3E%3Cstop%20stop-color%3D%22%230F0048%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23100246%22%20stop-opacity%3D%220.63%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint1_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(-145.5%20363.5)%20rotate(90)%20scale(937.5%20983.5)%22%3E%3Cstop%20stop-color%3D%22%230F0048%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23100246%22%20stop-opacity%3D%220.63%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint2_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(-7%202436)%20rotate(90)%20scale(634%20665)%22%3E%3Cstop%20stop-color%3D%22%230F0048%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23100246%22%20stop-opacity%3D%220.63%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint3_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(-7%204607)%20rotate(90)%20scale(634%20665)%22%3E%3Cstop%20stop-color%3D%22%230F0048%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23100246%22%20stop-opacity%3D%220.63%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint4_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(1162%203523)%20rotate(90)%20scale(634%20665)%22%3E%3Cstop%20stop-color%3D%22%230F0048%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23100246%22%20stop-opacity%3D%220.63%22%2F%3E%3C%2FradialGradient%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%221200%22%20height%3D%225000%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E')`
export const globalStyles = {
  blog: css`
    body {
      margin: 0;
      padding: 0;
      background-image: ${backgroundImage};
      background-repeat-x: no-repeat;
      background-size: cover;
    }
  `,
  lab: css``
}

type Props = {
  name: 'blog'
}

const globalStyle = ({ name }: Props) => {
  return <Global styles={globalStyles[name]} />
}

export default globalStyle
