
let M = null
try {
  M = require('materialize-css')
} catch(e) {
  // NOTE: Third Partyのライブラリでwindowが使われていると爆死するので
  console.warn(e)
}

export default M
