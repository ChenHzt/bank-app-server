const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
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

accountSchema.virtual('transactions', {
    ref: 'TransactionLog',
    localField: '_id',
    foreignField: 'account'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    Account
}