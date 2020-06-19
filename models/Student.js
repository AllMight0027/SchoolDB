const mongoose = require('mongoose');
const { model } = require('./Teacher');
const Schema =mongoose.Schema;
const studentSchema = Schema({
    name:{
        type: String,
        required: true
    },
    registrationID:{
        type: Number,
        required: true
    },
    fees:{
        type: Number,
        requierd: true
    },
    classes:[ //will be added in seperate route
        {
            teacher:{
                type:Schema.Types.ObjectId,
                ref: 'myTeacher',
                required: true
            },
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

module.exports = Student = mongoose.model('myStudent',studentSchema);