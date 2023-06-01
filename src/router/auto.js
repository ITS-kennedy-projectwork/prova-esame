const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send([
        {
            "marco": "Ford",
            "modello": "Focus",
            "anno": 2016
        },
        {
            "marco": "Ford",
            "modello": "Ka",
            "anno": 2018
        }
    ])
})

router.get('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params

    res.send({
        "marco": "Ford",
        "modello": "Focus",
        "anno": 2016
    })
})

router.post('/', (req, res) => {
    console.log('body', req.body)

    res.send({
        "marco": "Ford",
        "modello": "Focus",
        "anno": 2016
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params

    console.log('body', req.body)
    console.log('id', id)

    res.send({
        "marco": "Ford",
        "modello": "Focus",
        "anno": 2016
    })
})

router.patch('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params
        
    console.log('body', req.body)
    console.log('id', id)

    res.send({
        "marco": "Ford",
        "modello": "Focus",
        "anno": 2016
    })
})

router.delete('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params

    res.send(`elimino singola auto ${id}`)
})


module.exports = router