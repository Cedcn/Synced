import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';

import RippleLink from './shared/RippleLink';

@inject('userinfo')
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    const { avatar, name } = this.props.userinfo;
    return (
      <section className="sidebar">
        <div className="user-wrapper">
          <div className="avatar">
            <img src={avatar} alt={name} />
          </div>
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

SideBar.propTypes = {
  userinfo: PropTypes.object
};

export default SideBar;
