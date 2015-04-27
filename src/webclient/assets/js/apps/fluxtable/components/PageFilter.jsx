import React from 'react';

export default class PageFilter extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //http://stackoverflow.com/questions/22639534/pass-props-to-parent-component-in-react-js
  handleClick(i) {
    this.props.onChange(i);
  }

  render () {

    var data = this.props.data,
      page = this.props.filter.page,
      pageSize = this.props.filter.pageSize,
      pageCount = Math.ceil(data.length/pageSize),
      items = [];

    for (var i = 0; i < pageCount; i++) {
      var active = i === page ? 'active' : '';
      items.push(<li key={i} className={active}><a href="#" onClick={this.handleClick.bind(this, i)}>{i+1}</a></li>);
    }

    return <nav>
      <ul className="pagination">
        {items}
      </ul>
    </nav>
  }
}

