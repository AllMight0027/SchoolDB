const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const mongoose = require('mongoose');
const Student = require('../models/Student');

//get all student details
router.get('/',(req,res)=>{
    Student.find().populate('classes.teacher', 'name registrationID')
        .then(students=>{
            if(students.length==0){
                return res.json({message: 'No student found'}).status(500)
            }
            res.json(students).status(200)
        })
        .catch(e=>console.log('while fetching all students' +e))
})

//get student by id
router.get('/:sid',(req,res)=>{
    Student.findById({_id: req.params.sid}).populate('classes.teacher', 'name registrationID')
        .then(student=>{
            if(!student){
                return res.json({message: `Student id: ${req.params.sid} found`}).status(500)
            }
            res.json(student).status(200)
        })
        .catch(e=>console.log('while fetching student by id' +e))
})

//post student details
router.post('/',(req,res)=>{
    const newStudent = new Student({
        name: req.body.name,
        registrationID: req.body.registrationID,
        fees: req.body.fees
    })
    newStudent.save()
        .then(student=>{
            res.json(student).status(200)
        })
        .catch(e=>console.log('while saving new student' +e))
})

//post classes of student by id
router.post('/:sid/classes',(req,res)=>{
    Student.findById({_id: req.params.sid}).populate('classes.teacher', 'name registrationID')
        .then(student=>{
            if(!student){
                return res.json({message: `Student id: ${req.params.sid} found`}).status(500)
            }
            const newClass = {
                class: req.body.class,
                subject: req.body.subject,
                teacher: req.body.teacher
            }
            student.classes.push(newClass);
            student.save()
                .then(student=>{
                    res.json(student)
                })
                .catch(e=>console.log('while saving new class' +e))
        })
        .catch(e=>console.log('while finding student by id' +e))
})

//update student
router.put('/:sid/update',(req,res)=>{
    Student.findByIdAndUpdate(
        {_id: req.params.sid},
        {$set: req.body},
        {new: true, useFindAndModify: false}
    ).populate('classes.teacher', 'name registrationID')
        .then(student=>{
            if(!student) return res.status(400).json({status:'Failed',message:"student id doesn't exists"})
            res.status(200).json(student)
        })
        .catch(err=>console.log(err))
})

//delete student
router.delete('/:sid/delete',(req,res)=>{
    Student.findByIdAndDelete({_id: req.params.sid})
        .then(student=>{
            return res.status(200).json({status:'Success',message:"Product Deleted"})
        })
        .catch(err=>console.log(err))
})

module.exports = router;