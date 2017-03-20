import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    value: 1
  }
  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <div className="container">
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
        <br />
        <TextField
          floatingLabelText="公司"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
        <TextField
          floatingLabelText="职位"
          defaultValue="Default Value"
          onChange={(e, v) => console.log(v)}
        />
        <br />
        <RaisedButton label="提交修改" primary />
      </div>
    );
  }
}

export default BaseInfo;
