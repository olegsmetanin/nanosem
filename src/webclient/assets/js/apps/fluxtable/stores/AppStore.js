import { Store } from 'flummox';
import mixin from './../utils/Mixins.js';
import lru from 'lru-cache';
import lunr from 'lunr';
import React from 'react';

export default class AppStore extends Store {

  constructor(flux) {
    super();

    let appActions = flux.getActions('appActions');

    this.register(appActions.getBigData, this.handleGetData);
    this.register(appActions.getSmallData, this.handleGetData);
    this.register(appActions.getJSONData, this.handleGetData);

    this._tablesData = {};
    this.state = {
      tablesData: {}
    };

  }

  handleGetData(idAndData) {
    var id = idAndData.id;
    var data = idAndData.data;
    this._tablesData[id] = data;
    this.emit('change:'+id);
  }

  getData(id) {
    var ret;

    if (this._tablesData.hasOwnProperty(id)) {
      ret = {data:this._tablesData[id]};
    } else {
      ret = {STORE_MISS: true}
    }
    return ret;
  }

}
