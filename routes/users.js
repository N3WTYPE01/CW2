const express = require('express');
const router = express.Router()
const user = require('../models/user')

//routes 

//all
router.get('/', async (req, res) => {
   
})

//one
router.get('/:id', (req, res) => {
res.send(req.params.id)
})
// create

router.post('/', (req, res) => {

})

//update
router.patch('/:id', (req, res) => {

})


//delete

router.delete('/:id', (req, res) => {

})


module.exports = router;