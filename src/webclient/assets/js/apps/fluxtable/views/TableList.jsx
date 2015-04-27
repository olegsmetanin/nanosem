import React from 'react';
import Table from './Table.jsx';
import GUID from './../utils/GUID.js';

export default class TableList extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      tables:[GUID()]
    };

    this.addTable = this.addTable.bind(this);

  }

  addTable() {
    var state = this.state.tables;
    state.push(GUID());
    this.setState(state);
  }

  removeTable(i) {
    var newState = this.state.tables.slice(0);
    newState.splice(i, 1);
    this.setState({tables:newState});
  }

  render () {
    return <div>
      {this.state.tables.map((item, i) => {
        return <div key={i}>
        <Table  id={item} onRemove={this.removeTable}/>
        <button onClick={this.removeTable.bind(this,i)}>Remove Table</button>
        </div>
      })}
      <button onClick={this.addTable}>Add table</button>
    </div>;
  }
}
