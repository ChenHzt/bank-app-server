const mongoose = require('mongoose')

const TransactionLog = mongoose.model('TransactionLog', {
    date:{
        type: Date,
        default: Date.now
    },
    actionType: {
        type: String,
        require:true,
    },

    amount:{
        type: Number,
        require:true,
        validate(value) {
            if (value <= 0) {
              throw new Error("amount must be positive");
            }
        }
    },
    account:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account',
        require:true
    },
    info:{
        type:String,
    }

})

module.exports = {
    TransactionLog,
}