const express = require('express');
const router  = express.Router();
const Place = require('../models/Place')

router.get('/', (req, res, next) => {
    
    Place.find()
        .then(placeDocs => {
            console.log(placeDocs)
            res.render('places/index', {placeDocs})
        })
        .catch(err => { next(err)})
    
})

router.post('/', (req, res, next) => {
    const { name, type } = req.body

    Place.create({ name, type })
        .then(newPlace => res.redirect('/places'))
        .catch(err => { next(err)})
})


router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    console.log(id)

    Place.findByIdAndRemove(id)
        .then(result =>  res.redirect('/places'))
        .catch(err => {next(err)})
})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params

    Place.findById(id)
        .then(result => res.render('places/edit', result))
        .catch(err => next(err))
})

router.post('/:id', (req, res, next) => {
    const { id } = req.params
    const { name, type } = req.body

    Place.findByIdAndUpdate(id, {$set: { name, type}}, { new : true })
        .then(updatedPlace => res.redirect('/places'))
        .catch(err => next(err))
})



module.exports = router
