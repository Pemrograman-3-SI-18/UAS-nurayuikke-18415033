const workModel = require('../model/Work')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject)  => {
        try {
            workModel.create(data)
            .then(() => resolve(requestResponse.sukses('Berhasil Memproses ')))
            .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.getAllWork = () =>
    new Promise((resolve, reject) => {
        workModel.aggregate([
            {
                $lookup: {
                    from: "duties",
                    localField: "idTugas",
                    foreignField: "_id",
                    as: "dataTugas"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "dataUser"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.getWorkByUser = (id) =>
    new Promise((resolve, reject) => {
        workModel.aggregate([
            {
                $match: {
                    idUser: objectId(id)
                }
            },
            {
                $lookup: {
                    from: "duties",
                    localField: "idTugas",
                    foreignField: "_id",
                    as: "dataTugas"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.konfirmasiWork = (id) =>
    new Promise((resolve, reject) => {
        workModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 2
        }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi')))
        .catch(() => reject(requestResponse.serverError))
    })

    exports.terimaTugas = (id) =>
    new Promise((resolve, reject) => {
        workModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 3
        }).then(() => resolve(requestResponse.sukses('Berhasil Menerima ')))
        .catch(() => reject(requestResponse.serverError))
    })