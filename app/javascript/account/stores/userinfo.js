import { observable } from 'mobx';

const userinfo = observable({
  avatar: 'https://o7h2xtq3g.qnssl.com/uploads/user/avatar/9ddec0bf-6de4-4bf3-9924-4b89d648e5c6/11457566__.png',
  name: 'Cedcn',
  realname: '马云',
  birthdate: new Date(2015, 10, 16),
  gender: '3',
  company: 'Synced | 机器之心',
  intro: 'I‘m handsome boy'
});

export default userinfo;
