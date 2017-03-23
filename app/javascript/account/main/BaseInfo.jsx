import React from 'react';

import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
// import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';
// import CitySelect from '../components/CitySelect';
import AvatarCrop from '../components/AvatarCrop';

class BaseInfo extends React.Component {
  state = {
    name: 'Cedcn',
    realname: '马云',
    birthdate: new Date(2015, 10, 16),
    gender: '3',
    value: 1,
    company: 'Synced | 机器之心',
    intro: 'I‘m handsome boy'
  }

  TextChange = (name, value) => this.setState({ [name]: value });
  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <div className="base-info">
        <AvatarCrop />
        <br />
        <Input
          type="text"
          label="昵称*"
          name="name"
          value={this.state.name}
          onChange={value => this.TextChange('name', value)}
          maxLength={15}
        />
        <br />
        <Input
          type="text"
          label="真实姓名"
          name="realname"
          value={this.state.realname}
          onChange={value => this.TextChange('realname', value)}
        />
        <br />
        <RadioGroup name="gender" value={this.state.gender} onChange={value => this.TextChange('gender', value)}>
          <RadioButton label="The Walking Dead" value="1" />
          <RadioButton label="From Hell" value="2" />
          <RadioButton label="V for a Vendetta" value="3" />
        </RadioGroup>
        <br />
        <DatePicker
          label="生日"
          sundayFirstDayOfWeek
          onChange={value => this.TextChange('birthdate', value)}
          value={this.state.birthdate}
        />
        <Input
          type="text"
          label="公司"
          name="company"
          value={this.state.company}
          onChange={value => this.TextChange('company', value)}
        />
        <br />
        {/* <CitySelect /> */}
        <Input
          type="text"
          label="简介"
          name="intro"
          value={this.state.intro}
          onChange={value => this.TextChange('intro', value)}
        />
        <br />
      </div>
    );
  }
}

export default BaseInfo;
