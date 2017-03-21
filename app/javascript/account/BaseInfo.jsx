import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'cropperjs/dist/cropper.css';

import CitySelect from './components/CitySelect';
import AvatarCrop from './components/AvatarCrop';

class BaseInfo extends React.Component {
  state = {
    value: 1
  }

  handleChange = (event, index, value) => this.setState({ value })
  _crop = () => {
    // this.setState({ img: this.refs.cropper.getCroppedCanvas().toDataURL() });
  }

  render() {
    return (
      <div className="base-info">
        <AvatarCrop />
        <br />
        <TextField
          floatingLabelText="昵称*"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
        <TextField
          floatingLabelText="真实姓名"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
        <SelectField
          floatingLabelText="性别"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="其他" />
          <MenuItem value={2} primaryText="男" />
          <MenuItem value={3} primaryText="女" />
        </SelectField>
        <br />
        <DatePicker
          floatingLabelText="出生日期"
          mode="landscape"
        />
        <TextField
          floatingLabelText="公司"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
        <CitySelect />
        <TextField
          multiLine
          rows={2}
          floatingLabelText="简介"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
      </div>
    );
  }
}

export default BaseInfo;
