const defaultShare = {
  title: 'GMIS全球机器智能峰会重磅开启',
  desc: 'A Machine That Learns？',
  link: 'http://gmis.jiqizhixin.com',
  imgUrl: 'http://image.jiqizhixin.com/gmis2017/gmis-share-icon.jpg'
};

const wechat = shareInfo => {
  const share = { ...defaultShare, ...shareInfo };

  wx.config({
    debug: process.env.NODE_ENV === 'development',
    ...wxDefaultConfig,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareAppMessage',
      'onMenuShareQZone'
    ]
  });
  wx.ready(() => {
    wx.onMenuShareTimeline(share);
    wx.onMenuShareQQ(share);
    wx.onMenuShareWeibo(share);
    wx.onMenuShareAppMessage(share);
    wx.onMenuShareQZone(share);
  });
};

export default wechat;
