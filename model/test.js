const connection = require('../utilities/connection')
const { Collection } = require('mongoose')

let model = {}

model.getResults = () => {
    return connection.getResultCollection().then(collection => {
        return collection.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0  }).then(data => {
            console.log('data at model', data);
            if(data.length!==0){
                return data
            }
            else{
                return null
            }
        })
    })
}

model.getAdmissions = () => {
    return connection.getAdmissionCollection().then(collection => {
        return collection.find(({}, {})).then(data => {
            if(data.length!==0){
                const retVal = data.map(item => {
                    let tempObj = {}
                    tempObj['Name'] = item.Name
                    tempObj['LastName'] = item.LastName
                    tempObj['Class'] = item.Class
                    tempObj['Year'] = item.Year
                    tempObj['Marks'] = item.Marks
                    return tempObj
                })
                return retVal
            }
            else{
                return null
            }
        })
    })
}

model.createAdmission = (obj) => {
    return connection.getAdmissionCollection().then(collection => {
        return collection.create(obj).then(data => {
            if(data){
                return true
            }
            else{
                return false
            }
        })

    })
}
model.createResult = (obj) => {
    return connection.getResultCollection().then(collection => {
        return collection.find({},{}).then(data => {
            let rollNumbers = data.map(item => item.rollNumbers)
            if(rollNumbers.indexOf(obj.rollNumber) < 0){
                return collection.create(obj).then(data => {
                    if(data){
                        return data
                    }
                    else{
                        return null
                    }
                })
            }
            else{
                return 'DUPLICATE'
            }
        })
    })
}

module.exports = model