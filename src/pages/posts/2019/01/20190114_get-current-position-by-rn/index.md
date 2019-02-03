---
templateKey: blog-post
title: ReactNativeで位置情報を取得する。
slug: /2019/01/14/get-current-position-by-rn
createdAt: 2019-01-14 08:41:11
updatedAt: 2019-01-14 08:41:11
thumbnail: /2019/01/20190114_get-current-position-by-rn/thumbnail.png
categories:
  - engineering
  - react
tags:
  - react-native
  - react
  - javascript
  - native
related:
  - dummy
---



iOSからだとcorelocationというAPIを使って位置情報を取得できるのですが、React Nativeの場合はGeolocationというブラウザなどで位置情報を取得するAPIを使って位置情報を取得できるようです。

<div class="adsense"></div>


## 現在地を取得するための設定

設定方法はここにあります。

https://facebook.github.io/react-native/docs/geolocation

Geolocationを使うにはいくつか設定を行う必要があるのですが、
expoだと使えず、xcodeやandroid sdkでビルドしないとGeolocationは使えないようです。

### iOSの場合

iOSの場合は、Info.plistに新たなキーを追加する必要があります。

アプリ起動中のみ位置情報を取得するには、
NSLocationWhenInUseUsageDescription
バックグランドでも位置情報を取得したい場合は
NSLocationAlwaysUsageDescriptionをさらに追加します。

キーの追加はXcodeから可能で、./ios下のXXXX.xcodeprojを開いて
'Capabilites'tabから設定できます。

![xcode tab](https://statics.ver-1-0.net/uploads/2019/01/20190114_get-current-position-by-rn/xcode.png)

画像だとPrivacy - Location When In Use Usage DescriptionとPrivacy - Location Always Usage Descriptionというのがそれです。

### Androidの場合

Androidの場合は、AndroidManifest.xmlを編集して

`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

を追加すればよいです。
さらにAndroid API 23以降を使用する場合は![PermissionAndroid API](https://facebook.github.io/react-native/docs/permissionsandroid.html)
を利用して権限の確認を行わないといけないそうです。


## 位置情報を取得するコード


上の設定が終わったら以下のコードで現在位置を取得できます。
Androidなどの場合は権限チェックしたりする必要がありますが、一旦iOS用ということで以下のようなコードになっています。

```jsx
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      error: null
    };
  }

  async componentDidMount() {
    const location = await this.getCurrentPos().catch(error => {
      this.setState({ error })
    });
    this.setState({ location });
  }

  getCurrentPos(timeout = 5000) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout,
        enableHighAccuracy: true,
      });
    });
  }

  render() {
    const { location, error } = this.state;
    return (
      <View style={styles.container}>
        {!location && !error && <Text> fetching data... </Text>}
        {location &&
          Object.keys(location.coords).map(key => {
            return (
              <Text key={key}>
                {key} : {location.coords[key]}{' '}
              </Text>
            );
          })}
        {error &&
          Object.keys(error).map(key => {
            return (
              <Text key={key}>
                {key} : {error[key]}
              </Text>
            );
          })}
      </View>
    );
  }
}
```

エミューレータで試すとエミュレータで設定された現在地が返ってくるようです。
実機でも試しましたが、試すときにiPhoneの設定で位置情報の許可をする必要があります。

位置情報の許可は「設定」->「プライバシー」->「位置情報サービス」から設定できます。

## 取得される位置情報オブジェクトについて

位置情報はgetCurrentPositionのコールバックで取得されますが、そこで取得されるオブジェクトはcoordsというキーを
持っていますが、そのcooridsに位置情報が入ってきます。

coordisは表のようなデータを返します。

| key | description |
| ---- | ----------|
| latitude | 緯度 |
| longitude | 経度 |
| altitude | 高度 |
| accuracy | 取得された緯度、経度の正確性 |
| altitudeAccuracy | 高度の正確性 |
| heading | 方向。北を0として時計回りに360までの値が返却される |
| speed | 速度。秒速何m移動しているかを表す |


accuracy, altitudeAccuracyあたりがピントこないのですが、
それぞれの誤差の範囲をmで表してくれるようです。

もっと詳しく知りたい方はこちらのGeolocationAPIのドキュメントから確認できます。

https://w3c.github.io/geolocation-api/#coordinates\_interface

## まとめ

これで一通りRNでの現在地取得方法はまとめられたかと思います。

RNでの現在地取得を調べるためにネットサーフィンをしていたら

https://github.com/facebook/react-native/issues/671

> We have geolocation support from CoreLocation (check out GeolocationExample.js), but not beacon support.

こんなissueを見つけました。CorelocationもGeolocation使っているんですかね？

わからない。

