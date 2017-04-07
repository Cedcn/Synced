import React, { PropTypes } from 'react';
import $ from 'jquery';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

import CitySelect from '../components/CitySelect';
import ColumnTitle from '../shared/ColumnTitle';
import AvatarCrop from '../components/AvatarCrop';

@inject('userinfo', 'croperState') @observer
class BaseInfo extends React.Component {
  textChange = function (name, value) { this.props.userinfo[name] = value; };
  handleChange = (event, index, value) => this.setState({ value })

  upLoadImage = e => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.props.croperState.active = true;
      this.props.croperState.src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  }

  render() {
    const { avatar, name, realname, gender, birthdate, company, intro } = this.props.userinfo;
    return (
      <div className="base-info">
        <Row>
          <Col md={12}>
            <ColumnTitle title="基本信息" en="info" />
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <div className="avatar-crop-wrapper">
              <div className="text-label">头像设置</div>
              <input ref="imageInput" type="file" accept="image/*" onChange={this.upLoadImage} />
              <div className="avatar-wrapper" onClick={() => $(this.refs.imageInput).trigger('click')} >
                <div className="avatar">
                  <img src={avatar} alt={name} />
                </div>
                <div className="tip">更新头像</div>
              </div>
              <AvatarCrop />
            </div>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  label="昵称"
                  name="name"
                  required
                  value={name}
                  onChange={value => this.textChange('name', value)}
                  maxLength={15}
                />
              </Col>
              <Col md={6}>
                <Input
                  type="text"
                  label="真实姓名"
                  name="realname"
                  value={realname}
                  onChange={value => this.textChange('realname', value)}
                  maxLength={10}
                />
              </Col>
            </Row>
            <div className="text-label">性别</div>
            <RadioGroup className="radio-group" name="gender" value={gender} onChange={value => this.textChange('gender', value)}>
              <RadioButton label="男" value="1" />
              <RadioButton label="女" value="2" />
              <RadioButton label="其他" value="3" />
            </RadioGroup>
            <CitySelect />
            <DatePicker
              label="生日"
              sundayFirstDayOfWeek
              onChange={value => this.textChange('birthdate', value)}
              value={birthdate}
            />
            <Input
              type="text"
              label="公司"
              name="company"
              value={company}
              onChange={value => this.textChange('company', value)}
            />
            <Input
              type="text"
              label="简介"
              name="intro"
              multiline
              value={intro}
              onChange={value => this.textChange('intro', value)}
            />
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}

BaseInfo.propTypes = {
  userinfo: PropTypes.object,
  croperState: PropTypes.object
};

export default BaseInfo;
