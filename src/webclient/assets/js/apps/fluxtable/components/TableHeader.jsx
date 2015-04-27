import React from 'react';

export default class TableHeader extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
    }
    this.onChangeSortOrderClick = this.onChangeSortOrderClick.bind(this);
    this.onRemoveSortFieldClick = this.onRemoveSortFieldClick.bind(this);
  }

  onChangeSortOrderClick(fieldId, sortIndex) {
    this.props.onChangeSortOrder(fieldId, sortIndex);
  }

  onRemoveSortFieldClick(sortIndex) {
    this.props.onRemoveSortField(sortIndex);
  }

  render () {

    var fieldDefs = this.props.fieldDefs,
      sortDefs = this.props.sortDefs,
      sortIndex = {},
      markup=[];

    sortDefs.forEach( (el, i) =>  {
      sortIndex[el.field] = i
    });

    for (var key in fieldDefs) {
      var useInSort = typeof (sortIndex[key]) !== 'undefined',
        index = -1,
        order = null;

      if (useInSort) {
        index = sortIndex[key];
        order = sortDefs[sortIndex[key]].order === 'asc' ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
      }
      markup.push(<th key={key}>
        <span onClick={this.onChangeSortOrderClick.bind(this, key, index)}>
          {fieldDefs[key]}&nbsp;
          {order}&nbsp;
          </span>
        {index === -1 ? null : <span onClick={this.onRemoveSortFieldClick.bind(this, index)} className="badge">{index+1}</span>}
      </th>);
    }

    return <thead>
        <tr>
          {markup}
        </tr>
    </thead>

  }
}