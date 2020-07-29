const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
mongoose.set("useCreateIndex",true)
let admissionSchema = {
    "Name" : {
        type:String,
        required:true
    },
    "LastName" : {
        type:String,
        requrired:true
    },
    "Class" : {
        type:String,
        required:true
    },
    "Year" : {
        type:Number,
        required:true
    },
    "Marks" : {
        type:Number,
        required:true
    }
}
let resultSchema = {
    "name" : {
        type : String,
        required : true
    },
    "marks" : {
        "Maths" : {
            type:Number,
            required:true
        },
        "English" : {
            type:Number,
            required:true
        },
        "Science" : {
            type:Number,
            required:true
        }
    },
    "rollNumber" : {
        type:String,
        required:true,
        unique:true
    }
}

let AdmissionSchema = new Schema(admissionSchema, { collection : "Admissions", timestamps : true})
let ResultSchema = new Schema(resultSchema, { collection : "Results", timestamps : true})


let connection = {}

connection.getAdmissionCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AssignmentDemo",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to Admission DB")
        return db.model("Admissions",AdmissionSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getResultCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AssignmentDemo",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to Result DB")
        return db.model("Results",ResultSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection