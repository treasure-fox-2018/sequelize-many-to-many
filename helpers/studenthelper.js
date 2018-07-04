
function formatDateId(data_date){
    let date  = data_date.getDate()
    let month = data_date.getMonth()
    let year = data_date.getFullYear()
    return `${date}/${month}/${year}`
}

module.exports = formatDateId;