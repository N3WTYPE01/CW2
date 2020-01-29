const express = require('express');
const router = express.Router()
const user = require('../models/user')

//routes 

//all
router.get('/', async (req, res) => {
   try{
const users = await user.find()
res.json(users);
   }
   catch{ (err)
    res.status(500).json({message: err.message})

   }
})

//one
router.get('/:id', (req, res) => {
res.send(req.params.id)
})
// create

router.post('/', async (req, res) => {
const userx = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
 
})
try{
const newUser = await userx.save()
res.status(201).json(newUser)
}
catch (err) {
    res.status(400).json({message: err.message})

}

})

//update
router.patch('/:id', (req, res) => {

})


//delete

router.delete('/:id', (req, res) => {

})


module.exports = router;