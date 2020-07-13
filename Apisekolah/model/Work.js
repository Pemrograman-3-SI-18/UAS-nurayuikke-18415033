const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const WorkSchema = new Schema({
    idUser: {
        type: objectId
    },
    idTugas: {
        type: objectId
    },
    namamurid: {
        type: String
    },
    jamkelas: {
        type: String
    },
    image: {
        type: String
    },
    // 1 = belum di verifikasi, 2 = sedang dalam pengiriman, 3 = sudah diterima
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('work', WorkSchema)