import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CitySelect extends React.Component {
  state = {
    value: 1
  }
  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <div className="city-select">
        <SelectField
          floatingLabelText="省份"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="其他" />
        </SelectField>
        <SelectField
          floatingLabelText="城市"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="其他" />

        </SelectField>
        <SelectField
          floatingLabelText="县区"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="其他" />
        </SelectField>
      </div>
    );
  }
}

export default CitySelect;
