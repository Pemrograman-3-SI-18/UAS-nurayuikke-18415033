const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DutySchema = new Schema({
    judulTugas: {
        type: String
    },
    tanggalkumpul: {
        type: String
    },
    jamkelas: {
        type: String
    },
    matapelajaran: {
        type: String
    },
    deskripsitugas: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('duty', DutySchema)