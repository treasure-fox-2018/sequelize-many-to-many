const models = require('../models');

class Controller {
  static showAll (){
    return models.Student.findAll({raw:true, order: [
      ['id', 'ASC']
    ] })
  }

  static add(inputObj){
    return models.Student.create(inputObj)
  }

  static findById(id){
    return models.Student.findById(id, {raw:true})
  }

  static update(inputObj, id){
    return models.Student.update(inputObj, {
      where: {
        id: id
      },
      returning:true
    })
  }

  static delete (id){
    return models.Student.destroy({where: {id:id}})
  }

}

module.exports = Controller;