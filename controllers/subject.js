const models = require('../models');

class Controller {
  static showAll (){
    return models.Subject.findAll({
      order: [['id', 'ASC']], 
      include: [models.Teacher]
    }
  )
  }

  static add(inputObj){
    return models.Subject.create(inputObj)
  }

  static findById(id){
    return models.Subject.findById(id, {raw:true})
  }

  static update(inputObj, id){
    return models.Subject.update(inputObj, {
      where: {
        id: id
      },
      returning:true
    })
  }

  static delete (id){
    return models.Subject.destroy({where: {id:id}})
  }

}

module.exports = Controller;