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
          <List>
            <ListItem primaryText="基本信息" leftAvatar={<Avatar icon={<ContentInbox />} backgroundColor={blue500} />} />
            <ListItem primaryText="账户安全" leftAvatar={<Avatar icon={<ActionGrade />} />} />
            <ListItem primaryText="第三方账户" leftAvatar={<Avatar icon={<ContentSend />} />} />
            <ListItem primaryText="邮件订阅" leftAvatar={<Avatar icon={<ContentDrafts />} />} />
          </List>
        </Paper>
      </section>
    );
  }
}

export default SideBar;
