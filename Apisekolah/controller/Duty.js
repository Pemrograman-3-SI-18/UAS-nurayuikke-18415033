const dutyModel = require('../model/Duty')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
exports.insertDuty = (data) =>
    new Promise((resolve, reject) => {
        dutyModel.create(data)
        .then(() => resolve(requestResponse.sukses('Berhasil Memperoses Tugas')))
        .catch(() => reject(requestResponse.serverError))
    })

 exports.getAllDuty = () =>
    new Promise((resolve, reject) => {
        dutyModel.find({})
        .then(duty => resolve(requestResponse.suksesWithData(duty)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
        dutyModel.findOne({
            _id: id
        }).then(duty => resolve(requestResponse.suksesWithData(duty)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
        dutyModel.updateOne({
            _id: objectId(id)
        }, data)
        .then (() => {
            if (changeImage) {
                deleteImage(data.oldImage)
            }
            resolve(requestResponse.sukses('Berhasil Edit Tugas'))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        dutyModel.findOne({
            _id: objectId(id)
        }).then(duty => {
            dutyModel.deleteOne({
                _id: objectId(id)
            }).then(() => {
                deleteImage(duty.image)
                resolve(requestResponse.sukses('Berhasil Delete Tugas'))
            }).catch(() => reject(requestResponse.serverError))
        })
    })