import React from 'react';

export default class TableContent extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
    }
  }

  render () {
    var data = this.props.data;

    return <tbody>{data.map((arrEl,i) => {
      return <tr key={i}>{arrEl.map((el,j) => {
        return <td key={j}>{el}</td>
      })}</tr>
    })}</tbody>

  }
}