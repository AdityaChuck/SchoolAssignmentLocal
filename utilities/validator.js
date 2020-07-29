//validator functions
let validator = {}
validator.validateName = (name) => {
    const regEx2 = new RegExp(/^[A-Za-z ]+$/)
    if (!regEx2.test(name)){
        let err = new Error("Name must contain alphabets only")
        err.status = 401
        throw err
    }
}

validator.validateClass = (Class) => {
    const regEx2 = new RegExp(/^[0-9]{1,}[A-Za-z]{0,}$/)
    if (!regEx2.test(Class)){
        let err = new Error("Only alphabets and numbers are allowed")
        err.status = 401
        throw err
    }
}

validator.validateYear = (Year) => {
    if (Year > 2017){
        let err = new Error("Year of passing should not be after 2017")
        err.status = 401
        throw err
    }
}

validator.validateMarks = (Marks) => {
    if (Marks < 0 || Marks > 100){
        let err = new Error("Percentage of marks should be between 0 to 100")
        err.status = 401
        throw err
    }
}

validator.validateSubjectMarks = (Marks) => {
    if (Marks < 0 || Marks > 50){
        let err = new Error("Maximum marks is 50")
        err.status = 401
        throw err
    }
}

module.exports = validator