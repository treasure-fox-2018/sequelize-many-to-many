const models = require('../models');

class Controller {
  static showAll (){
    return models.Teacher.findAll({
      order: [['id', 'ASC']], 
      include: [models.Subject]
    }
  )
  }

  static add(inputObj){
    return models.Teacher.create(inputObj)
  }

  static findById(id){
    return models.Teacher.findById(id, {raw:true})
  }

  static update(inputObj, id){
    return models.Teacher.update(inputObj, {
      where: {
        id: id
      },
      returning:true
    })
  }

  static delete (id){
    return models.Teacher.destroy({where: {id:id}})
  }

}

module.exports = Controller;