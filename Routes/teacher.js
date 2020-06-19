const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const mongoose = require('mongoose');

//get all teachers details
router.get('/',(req,res)=>{
    Teacher.find()
        .then(teachers=>{
            if(teachers.length==0){
                return res.json({message: 'No teacher found'}).status(500)
            }
            res.json(teachers).status(200)
        })
        .catch(e=>console.log('while fetching all teachers' +e))
})

//get teacher by id
router.get('/:tid',(req,res)=>{
    Teacher.findById({_id: req.params.tid})
        .then(teacher=>{
            if(!teacher){
                return res.json({message: `Teacher id: ${req.params.tid} found`}).status(500)
            }
            res.json(teacher).status(200)
        })
        .catch(e=>console.log('while fetching teacher by id' +e))
})


//post teacher details
router.post('/',(req,res)=>{
    const newTeacher = new Teacher({
        name: req.body.name,
        registrationID: req.body.registrationID,
        subjetcs: req.body.subjetcs,
        salary: req.body.salary
    })
    newTeacher.save()
        .then(teacher=>{
            res.json(teacher).status(200)
        })
        .catch(e=>console.log('while saving new teacher' +e))
})

//post classes of teacher by id
router.post('/:tid/classes',(req,res)=>{
    Teacher.findById({_id: req.params.tid})
        .then(teacher=>{
            if(!teacher){
                return res.json({message: `Teacher id: ${req.params.tid} found`}).status(500)
            }
            const newClass = {
                class: req.body.class,
                subject: req.body.subject
            }
            teacher.classes.push(newClass);
            teacher.save()
                .then(teacher=>{
                    res.json(teacher).status(200)
                })
                .catch(e=>console.log('while saving new class' +e))
        })
        .catch(e=>console.log('while finding teacher by id' +e))
})

//update teacher
router.put('/:tid/update',(req,res)=>{
    Teacher.findByIdAndUpdate(
        {_id: req.params.tid},
        {$set: req.body},
        {new: true, useFindAndModify: false}
    )
        .then(teacher=>{
            if(!teacher) return res.status(400).json({status:'Failed',message:"teacher id doesn't exists"})
            res.status(200).json(teacher)
        })
        .catch(err=>console.log(err))
})

//delete teacher
router.delete('/:tid/delete',(req,res)=>{
    Teacher.findByIdAndDelete({_id: req.params.tid})
        .then(teacher=>{
            return res.status(200).json({status:'Success',message:"Product Deleted"})
        })
        .catch(err=>console.log(err))
})

module.exports = router;