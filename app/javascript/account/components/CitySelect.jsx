import React from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import address3 from 'china-division/dist/address3';

import map from 'lodash/map';
const provinces = map(address3, (item, key) => ({ value: key, label: key }));

class CitySelect extends React.Component {
  state = {
    provinces,
    province: '',
    citys: [],
    city: '',
    countys: [],
    county: ''
  }

  handleChange = (value, name, level) => {
    this.setState({ [name]: value });

    if (level === 1) {
      this.setState({ city: '', county: '' });
      this.setState({ citys: map(address3[value], (item, key) => ({ value: key, label: key })), countys: [] });
    }

    if (level === 2) {
      this.setState({ county: '' });
      this.setState({ countys: map(address3[this.state.province][value], item => ({ value: item, label: item })) });
    }
  };

  render() {
    return (
      <div className="city-select">
        <Dropdown
          className="item"
          name="province"
          auto
          label="省份"
          onChange={value => this.handleChange(value, 'province', 1)}
          source={this.state.provinces}
          value={this.state.province}
        />
        <Dropdown
          className="item"
          name="city"
          auto
          label="城市"
          onChange={value => this.handleChange(value, 'city', 2)}
          source={this.state.citys}
          value={this.state.city}
        />
        <Dropdown
          className="item"
          name="county"
          auto
          label="县区"
          onChange={value => this.handleChange(value, 'county', 3)}
          source={this.state.countys}
          value={this.state.county}
        />
      </div>
    );
  }
}

export default CitySelect;
