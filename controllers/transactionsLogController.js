const { TransactionLog } = require('../models/transactionLogModel');

const getTransactions = async (req, res) => {
    const _id = req.params.id;
    try {
        const transactions = await TransactionLog.find({account:_id})
        res.send(transactions);
    } catch (e) {
        res.status(500).send();
    }
}

module.exports={
    getTransactions,
}