//require necessary modules
const dbLayer = require('../model/test')
const validator = require('../utilities/validator')
let service = {}

//service functions
service.getResults = () => {
    return dbLayer.getResults().then(data => {
        console.log("data -> ",data)
        if(data && data.length !== 0 ){
            return data
        }
        else{
            let err = new Error("Some error occured")
            err.status = 501
            throw err
        }
    })
}

service.getAdmissions = () => {
    return dbLayer.getAdmissions().then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let err = new Error("Some error occured")
            err.status = 501
            throw err
        }
    })
}

service.createAdmission = (obj) => {
    validator.validateName(obj.Name)
    validator.validateName(obj.LastName)
    validator.validateClass(obj.Class)
    validator.validateYear(obj.Year)
    validator.validateMarks(obj.Marks)
    return dbLayer.createAdmission(obj).then(data => {
        if(data){
            return data
        }
        else if(data === 'DUPLICATE'){
            let err = new Error(`${obj.rollNumber} already exists on the board`)
            err.status = 401
            throw err
        }
        else{
            let err = new Error("Some error occured")
            err.status = 501
            throw err
        }
    })
}

service.createResult = (obj) => {
    validator.validateName(obj.name)
    validator.validateSubjectMarks(obj.marks.Maths)
    validator.validateSubjectMarks(obj.marks.English)
    validator.validateSubjectMarks(obj.marks.Science)
    return dbLayer.createResult(obj).then(data => {
        if(data){
            return data
        }
        else{
            let err = new Error("Some error occured")
            err.status = 501
            throw err
        }
    })
}

module.exports = service