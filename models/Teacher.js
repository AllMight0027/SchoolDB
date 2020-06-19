const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherScehma = new Schema({
    name:{
        type: String,
        required: true
    },
    registrationID:{
        type: Number,
        required: true
    },
    subjetcs:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        requierd: true
    },
    classes:[ //will be added in seperate route
        {
            class:{
                type:String,
                required: true
            },
            subject:{
                type: String,
                required: true
            }
        }
    ]
})

module.exports = Teacher = mongoose.model("myTeacher",teacherScehma)