import React from 'react';
import Flux from './Flux.js';
import FluxComponent from 'flummox/component'
import FastClick from 'fastclick';
import TableList from './views/TableList.jsx';

FastClick.attach(document.body);

export default function(divid) {

  let flux = new Flux();

    async function run() {
      React.render(<FluxComponent
        flux={flux}
        render={() => <TableList />} />, document.getElementById(divid));
    }

    run().catch(error => {
      throw error;
    });

}
