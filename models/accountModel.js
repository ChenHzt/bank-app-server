const mongoose = require('mongoose')

const Account = mongoose.model('Account', {
    cash: {
        type: Number,
        default:0,
    },
    credit: {
        type: Number,
        default:0
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require:true
    }
})

module.exports = {
    Account
}