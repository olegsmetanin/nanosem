import React from 'react';
import { debounce } from './../utils/Timer.js';

export default class FilterText extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      value:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDebounced = debounce(function () {
     this.props.onChange(this.state.value);
    }, 500).bind(this);
  }

  handleChange (event) {
    this.setState({value: event.target.value});
    this.handleChangeDebounced();
  }

  render () {
    return <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="Filter by text"/>
  }
}