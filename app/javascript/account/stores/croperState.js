import { observable } from 'mobx';

const croperState = observable({
  active: false,
  src: ''
});

export default croperState;
