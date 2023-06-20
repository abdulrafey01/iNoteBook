const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const { route } = require('./notes');
const router = express.Router()


// ROUTE 1 : Fetch All Notes : /fetchallnotes: GET :  Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const userId = req.user
        const notes = await Note.find({ user: userId })
        res.json(notes)
    } catch (error) {
        res.status(401).json('Server Error In Notes')
    }
})


// ROUTE 2 : Add A Note : /addnote: GET :  Login Required
router.post('/addnote',[
    body('title','Please add a descriptive title').isLength({min:3}),
    body('description').isLength({min:10}),
    body('tag').isLength({min:3}),
], fetchuser, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
       return res.send({ errors: error.array() });
    }
    try {
        const { title, tag, description } = req.body
        const userId = req.user
        const newNote = await Note.create({
            user: userId,
            title, description, tag
        })
        res.json(newNote)
    } catch (error) {
        res.status(401).json('Server Error In Notes')
    }
})

// ROUTE 3 : Update Note : /updatenote: PUT : Login Required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description, tag} = req.body
    try {
    const newNote = {}
    if(title){
        newNote.title = title
    }
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    }

    // Find note to be updated and update it

    const userId = req.user
    let note = await Note.findById(req.params.id)
    if(!note){
      return  res.status(401).send("Note Not Found")
    }
    if(userId!==note.user.toString()){
      return  res.status(401).send("O Bhai Ye Tera Note Nhi Ha")
    }

    
    note =await  Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note)
} catch (error) {
        console.log(error.message)
}
})

// ROUTE 4 : Delete Note : /deletenote: DELETE : Login Required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
    const userId = req.user

    // Find note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if(!note){
      return  res.status(401).send("Note Not Found")
    }
    if(userId!==note.user.toString()){
      return  res.status(401).send("O Bhai Ye Tera Note Nhi Ha")
    }
  
    note =await  Note.findByIdAndDelete(req.params.id)
    res.send("Note Deleted")
} catch (error) { 
        console.log(error.message)
}
})

module.exports = router
