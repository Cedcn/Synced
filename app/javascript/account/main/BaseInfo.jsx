import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
// import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';
// import CitySelect from '../components/CitySelect';

import { Row, Col } from 'react-flexbox-grid';

import ColumnTitle from '../shared/ColumnTitle';
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
        <Row>
          <Col md={12}>
            <ColumnTitle title="基本信息" en="info" />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AvatarCrop />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              type="text"
              label="昵称"
              name="name"
              required
              value={this.state.name}
              onChange={value => this.TextChange('name', value)}
              maxLength={15}
            />
            <Input
              type="text"
              label="真实姓名"
              name="realname"
              value={this.state.realname}
              onChange={value => this.TextChange('realname', value)}
            />
            <div className="text-label">性别</div>
            <RadioGroup name="gender" value={this.state.gender} onChange={value => this.TextChange('gender', value)}>
              <RadioButton label="男" value="1" />
              <RadioButton label="女" value="2" />
              <RadioButton label="其他" value="3" />
            </RadioGroup>
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
            <Input
              type="text"
              label="简介"
              name="intro"
              value={this.state.intro}
              onChange={value => this.TextChange('intro', value)}
            />
          </Col>
        </Row>
        {/* <CitySelect /> */}

        <br />
      </div>
    );
  }
}

export default BaseInfo;
