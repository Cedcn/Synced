import React from 'react';

import RippleLink from './shared/RippleLink';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <section className="sidebar">
        <div className="user-wrapper">
          <div className="preview-avatar avatar" />
          <div className="intro">
            <div className="name">Cedcn</div>
            <div className="job">Frontend</div>
          </div>
        </div>
        <ul>
          <li>
            <RippleLink to="/my" activeClassName="active">
              <i className="iconfont icon-userinfo" />
              基本信息
            </RippleLink>
          </li>
          <li>
            <RippleLink to="/security" activeClassName="active">
              <i className="iconfont icon-safe" />
              账户安全
            </RippleLink>
          </li>
          <li>
            <RippleLink to="/third" activeClassName="active">
              <i className="iconfont icon-bind" />
              第三方账户
            </RippleLink>
          </li>
          <li>
            <RippleLink to="/email-subscriptions" activeClassName="active">
              <i className="iconfont icon-subscribe" />
              邮件订阅
            </RippleLink>
          </li>
        </ul>
      </section>
    );
  }
}

export default SideBar;
