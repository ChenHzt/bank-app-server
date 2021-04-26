const { Account } = require('../models/accountModel');
const { TransactionLog } = require('../models/transactionLogModel');

const createAccount = async (req, res) => {
    try {
        const account = new Account({ owner: req.user });

        await account.save();
        res.status(201).send(account);
    }
    catch (e) {
        res.status(400).send(e);
    }
}


const getUserAccounts = async (req, res) => {
    try {
        await req.user.populate('accounts').execPopulate()
        res.send(req.user.accounts)
    } catch (e) {
        res.status(500).send()
    }
}

const getAccountDetails = async (req, res) => {
    const _id = req.params.id;
    try {
        const account = await Account.findById(_id);
        if (!account) {
            return res.status(404).send({ error: "No account found" });
        }
        res.send(account);
    } catch (e) {
        res.status(500).send();
    }
}

const makeDeposit = async (req, res) => {

    try {
        if (!req.body.amount || req.body.amount < 0)
            throw new Error('must enter positive amount for depositing')
        const { accountid } = req.params;

        const account = await Account.findOne({ _id: accountid, owner: req.user._id });
        if (!account)
            throw new Error('account not found')
        account.cash += req.body.amount;
        await account.save();

        const newTransaction = new TransactionLog({ actionType: 'deposit', amount: req.body.amount, account: account._id });
        newTransaction.save();
        return res.status(201).send(account);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const updateCredit = async (req, res) => {
    try {
        if (!req.body.amount || req.body.amount < 0)
            throw new Error('must enter positive amount for credit')
        const { accountid } = req.params;
        const account = await Account.findOne({ _id: accountid, owner: req.user._id });
        if (!account)
            throw new Error('account not found')
        account.credit = req.body.amount;
        await account.save();

        return res.status(201).send(account);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const withdraw = async (req, res) => {

    try {
        if (!req.body.amount || req.body.amount < 0)
            throw new Error('must enter positive amount to withdraw')
        const { accountid } = req.params;

        const account = await Account.findOne({ _id: accountid, owner: req.user._id });
        if (!account)
            throw new Error('account not found')

        if (account.cash - req.body.amount < account.credit * -1)
            throw new Error(`can't allow the withrdawal. cash and credit run out`)


        account.cash -= req.body.amount;
        await account.save();
       
        const newTransaction = new TransactionLog({ actionType: 'withdraw', amount: req.body.amount, account: account._id });
        newTransaction.save();
        return res.status(201).send(account);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const transfer = async (req, res) => {
    try {
        if (!req.body.amount || req.body.amount < 0)
            throw new Error('must enter positive amount to transfer')
        const { idFrom } = req.params;
        const { idTo } = req.params;

        const fromAccount = await Account.findOne({ _id: idFrom, owner: req.user._id });
        const toAccount = await Account.findById(idTo);

        if(!fromAccount || !toAccount)
            throw new Error('account not found');
    
        if (fromAccount.cash - req.body.amount < fromAccount.credit * -1)
            throw new Error(`can't allow the withrdawal. cash and credit run out`)

        fromAccount.cash -= req.body.amount;    
        toAccount.cash += req.body.amount;    
        
        const newTransactionTransfer = new TransactionLog({ actionType: 'transfer', amount: req.body.amount, account: fromAccount._id });
        newTransactionTransfer.save();
        const newTransactionReceive = new TransactionLog({ actionType: 'receive', amount: req.body.amount, account: toAccount._id });
        newTransactionReceive.save();
        return res.status(201).send({ from: fromAccount, to: toAccount });
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

module.exports = {
    getAccountDetails,
    makeDeposit,
    updateCredit,
    withdraw,
    transfer,
    createAccount,
    getUserAccounts

}