import React from 'react';

export default class DataTypeSelector extends React.Component {

  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      React.findDOMNode(this.refs.default).checked = true;
      this.props.onChange.call(this,0);
    },0);
  }

  render () {
    var groupName = 'group' + this.props.id;
    return <div>
      <input type="radio" name={groupName} value="0" ref="default" onChange={this.props.onChange.bind(this,0)}/>Big
      <input type="radio" name={groupName} value="1" onChange={this.props.onChange.bind(this,1)}/>Small
      <input type="radio" name={groupName} value="2" onChange={this.props.onChange.bind(this,2)}/>External JSON
    </div>;
  }
}