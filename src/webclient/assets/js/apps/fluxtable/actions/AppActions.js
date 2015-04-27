import { Actions } from 'flummox';
import httpRequest from './../utils/HttpRequest.js';

export default class AppActions extends Actions {

  getBigData(id) {
    return {id: id, data:[
      {
        id: "Идентификатор",
        name: "Название",
        price: "Стоимость",
        quantity: "Количество"
      },
      [1, "iPhone 5", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7],
      [1, "iPhone 5", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7],
      [1, "iPhone 5", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7],
      [1, "iPhone 5", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7],
      [1, "iPhone 5", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7]
    ]};
  }

  getSmallData(id) {
    return {id: id, data:[
      {
        id: "Идентификатор",
        name: "Название",
        price: "Стоимость",
        quantity: "Количество"
      },
      [1, "iPhone 6", "400", 5],
      [2, "XBOX", "300", 7],
      [2, "XBOX", "300", 7]
    ]};
  }

  async getJSONData(id) {
    return await httpRequest
      .get(`data/data.json`)
      .exec()
      .then(val => {
        return {"id":id, "data":val.body}
      });
  }

}