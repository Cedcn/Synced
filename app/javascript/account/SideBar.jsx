import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

const style = {
  paper: {
    display: 'inline-block',
    width: '80%'
  }
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <section className="sidebar">
        <Paper style={style.paper}>
          <List>
            <div className="user-wrapper">
              <div className="preview-avatar avatar" />
              <div className="intro">
                <div className="name">Cedcn</div>
                <div className="job">Frontend</div>
              </div>
            </div>
          </List>
          <Divider />
          <li><Link to="/my">基本信息</Link></li>
          <li><Link to="/security">账户安全</Link></li>
          <li><Link to="/third">第三方账户</Link></li>
          <li><Link to="/email-subscriptions">邮件订阅</Link></li>
        </Paper>
      </section>
    );
  }
}

export default SideBar;
