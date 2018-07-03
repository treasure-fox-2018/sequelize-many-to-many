function checkNull (input){
  let list = []
  input.Teachers.forEach(teacher => {
    return `${teacher.first_name} ${teacher.last_name}`
  })
}


module.exports = checkNull