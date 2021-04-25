const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    passportId: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
   
})

module.exports = {
    User
}