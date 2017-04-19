import { observable } from 'mobx';

const userinfo = observable({
  avatar: 'https://o7h2xtq3g.qnssl.com/uploads/user/avatar/9ddec0bf-6de4-4bf3-9924-4b89d648e5c6/11457566__.png',
  name: '',
  realname: '',
  birthdate: new Date(1900, 0, 1),
  gender: '3',
  company: '',
  intro: ''
});

export default userinfo;
