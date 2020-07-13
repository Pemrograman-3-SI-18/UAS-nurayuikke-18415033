const router = require('express').Router()
const workController = require('../controller/Work')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])


    const data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    workController.insert(data)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getallwork', (req, res) => {
    workController.getAllWork()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getworkbyuser/:id', (req, res) => {
    workController.getWorkByUser(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.put('/konfirmasiwork/:id', (req, res) => {
    workController.konfirmasiWork(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.put('/terimatugas/:id', (req, res) => {
    workController.terimaTugas(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router