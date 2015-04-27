import React from 'react';
import GUID from './../utils/GUID.js';
import Spinner from './../components/Spinner.jsx';
import DataTypeSelector from './../components/DataTypeSelector.jsx';
import TextFilter from './../components/TextFilter.jsx';
import PageFilter from './../components/PageFilter.jsx';
import TableContent from './../components/TableContent.jsx';
import TableHeader from './../components/TableHeader.jsx';
import './../utils/Array.js';

export default class Table extends React.Component {

  constructor(props, context) {
    super(props);
    this.store = context.flux.getStore('appStore');
    this.actions = context.flux.getActions('appActions');
    this.state = {
      id: this.props.id,
      dataState:0,
      fieldDefs:{},
      data:[],
      filter:{
        text:'',
        page:0,
        pageSize:5
      },
      sortDefs:[]
    };

    this.getFromStore = this.getFromStore.bind(this);

    this.onChangeDataSource = this.onChangeDataSource.bind(this);
    this.onChangeTextFilter = this.onChangeTextFilter.bind(this);
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this);
    this.onRemoveSortField = this.onRemoveSortField.bind(this);

    this.onChangePageFilter = this.onChangePageFilter.bind(this);

    this.applyTextFilter = this.applyTextFilter.bind(this);
    this.applySort = this.applySort.bind(this);
    this.applyPageFilter = this.applyPageFilter.bind(this);

  }

  componentDidMount () {
    this.store.addListener('change:'+this.state.id, this.getFromStore);
  }

  componentWillUnmount () {
    this.store.removeListener('change:'+this.state.id, this.getFromStore);
  }

  getFromStore () {
    var in_data = this.store.getData(this.state.id);
    var data = in_data.data;
    var fieldDefs = data[0];
    data.splice(0,1);
    this.setState({data:data, fieldDefs:fieldDefs, filter:{
        text:'',
        page:0,
        pageSize:5
      },
      sortDefs:[]
    });
  }

  onChangeDataSource(sourceType) {
    switch (sourceType) {
      case 0:
        this.actions.getBigData(this.state.id);
        break;
      case 1:
        this.actions.getSmallData(this.state.id);
        break;
      case 2:
        this.actions.getJSONData(this.state.id);
        break;
    }
  }

  onChangeTextFilter(text) {
    var newState = React.addons.update(this.state.filter, {text: {$set: text}});
    this.setState({filter:newState});
    this.onChangePageFilter(0);
  }

  onChangeSortOrder(fieldId, sortIndex) {
    if (sortIndex === -1) {
      var newState = React.addons.update(this.state.sortDefs, {$push: [{field:fieldId, order: 'asc'}]});
      this.setState({sortDefs:newState});
    } else {
      var newState = this.state.sortDefs.slice(0);
      newState[sortIndex] = {field:fieldId, order: newState[sortIndex].order === 'asc' ? 'desc' : 'asc'};
      this.setState({sortDefs:newState});
    }
    this.onChangePageFilter(0);
  }

  onRemoveSortField(sortIndex) {
    var newState = this.state.sortDefs.slice(0);
    newState.splice(sortIndex, 1);
    this.setState({sortDefs:newState});
  }

  onChangePageFilter(page) {
    var newState = React.addons.update(this.state.filter, {page: {$set: page}});
    this.setState({filter:newState});
  }

  applyTextFilter(data) {
    var textFiltredData,
    textFilter = this.state.filter.text;

    if (typeof(textFilter) !== "undefined" && textFilter !== '') {
     textFiltredData = data.filter(arr => {
      return arr.some(el => {
        return (el.toString().toLowerCase().indexOf(textFilter) !== -1)
      })
    })} else {
      textFiltredData = data;
    }
     return textFiltredData;
  }

  applySort(data) {
    return data.multiSort(this.state.fieldDefs, this.state.sortDefs);
  }

  applyPageFilter(data) {
    var pagedData,
      page =  this.state.filter.page,
      pageSize =  this.state.filter.pageSize;

    pagedData = data.slice(page*pageSize,(page+1)*pageSize);
    return pagedData;
  }

  render () {
    var textFiltredData = this.applyTextFilter(this.state.data),
      sortedData = this.applySort(textFiltredData),
      pagedData = this.applyPageFilter(textFiltredData);

    return <div>
      <DataTypeSelector id={this.state.id} onChange={this.onChangeDataSource} />
      <TextFilter className="" onChange={this.onChangeTextFilter} />
          <table className="table table-striped">
             <TableHeader fieldDefs={this.state.fieldDefs} sortDefs={this.state.sortDefs} onChangeSortOrder={this.onChangeSortOrder} onRemoveSortField={this.onRemoveSortField} />
             <TableContent data={pagedData}/>
          </table>
      <PageFilter data={textFiltredData} filter={this.state.filter} onChange={this.onChangePageFilter} />
    </div>;
  }
}

Table.contextTypes = {
  flux: React.PropTypes.object.isRequired,
};
