const router = require('express').Router();
const Person = require('../models/Person');

router.post('/',async (req, res) => {

    const {name,salary,approved} = req.body

    if(!name){
      res.status(422).json({error: 'Campo nome é obrigatório'})  
      return
    }

    const person = {name,salary,approved}

    try {
        await Person.create(person)
        res.status(201).json({message:"pessoa inserida com sucesso"})
    }catch (err) {
        res.status(500).json({error: err})
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({people})
    }catch (err) {
        res.status(500).json({error: err})
    }
})

router.get('/:id',async (req,res) => {
    console.log(req)

    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})

        if(!person){
            res.status(404).json({message: "usuario nao encontrado"})
            return
        }

        res.status(200).json({person})
    }catch (err){
        res.status(500).json({error: err})
    }
})

router.patch('/:id',async (req, res) => {
    console.log(req)

    const id = req.params.id

    const {name,salary,approved} = req.body
    const person = {name,salary,approved}

    try {
        const updatedPerson = await Person.updateOne({_id:id},person)
        if (updatedPerson.matchedCount === 0){
            res.status(422).json({message:'o usuario nao encontrado'})
            return
        }
        res.status(200).json(person)
    }catch (err){
        res.status(500).json({error: err})
    }
})

router.put('/:id',async (req, res) => {
    console.log(req)

    const id = req.params.id

    const {name,salary,approved} = req.body
    const person = {name,salary,approved}

    try {
        const updatedPerson = await Person.updateOne({_id:id},person)
        if (updatedPerson.matchedCount === 0){
            res.status(422).json({message:'o usuario nao encontrado'})
            return
        }
        res.status(200).json(person)
    }catch (err){
        res.status(500).json({error: err})
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id

    const person = await Person.findOne({_id:id})

    if(!person){
        res.status(422).json({message:"o usuario nao foi encontrado"})
        return
    }

    try{
        await Person.deleteOne({_id:id})
        res.status(200).json({message:"usuario removido com sucess"})
    }catch(err){
        res.status(500).json({error: err})
    }
})

module.exports = router